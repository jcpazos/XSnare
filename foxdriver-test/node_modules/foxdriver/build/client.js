'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _safeBuffer = require('safe-buffer');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UNSOLICITED_EVENTS = ['tabNavigated', 'styleApplied', 'propertyChange', 'networkEventUpdate', 'networkEvent', 'propertyChange', 'newMutations', 'appOpen', 'appClose', 'appInstall', 'appUninstall', 'frameUpdate', 'tabListChanged'];

/**
 * a Client object handles connecting with a Firefox remote debugging
 * server instance (e.g. a Firefox instance), plus sending and receiving
 * packets on that conection using the Firefox remote debugging protocol.
 *
 * Important methods:
 * connect - Create the connection to the server.
 * makeRequest - Make a request to the server with a JSON message,
 *   and a callback to call with the response.
 *
 * Important events:
 * 'message' - An unsolicited (e.g. not a response to a prior request)
 *    packet has been received. These packets usually describe events.
 *
 * This code was adapted from https://github.com/harthur/firefox-client
 */
class Client extends _events.EventEmitter {
    constructor(host, port) {
        super();
        this.host = host;
        this.port = port;
        this.incoming = new _safeBuffer.Buffer('');
        this.log = (0, _logger2.default)('Client');
        this.supportedDomains = [];

        this._pendingRequests = [];
        this._activeRequests = {};
    }

    /**
     * create socket connection
     *
     * @return {Promise}  resolves once connected to socket
     */
    connect() {
        this.socket = _net2.default.createConnection({
            host: this.host,
            port: this.port
        });

        this.socket.on('data', this.onData.bind(this));
        this.socket.on('error', this.onError.bind(this));
        this.socket.on('end', this.onEnd.bind(this));
        this.socket.on('timeout', this.onTimeout.bind(this));

        return new _promise2.default(resolve => this.socket.on('connect', resolve));
    }

    /**
     * end socket connection
     */
    disconnect() {
        if (!this.socket) {
            return;
        }

        this.socket.end();
    }

    /**
     * Called when a new data chunk is received on the connection.
     * Parse data into message(s) and call message handler for any full
     * messages that are read in.
     */
    onData(data) {
        this.incoming = _safeBuffer.Buffer.concat([this.incoming, data]);
        while (this.readMessage()) {}
    }

    /**
     * Parse out and process the next message from the data read from
     * the connection. Returns true if a full meassage was parsed, false
     * otherwise.
     */
    readMessage() {
        var sep = this.incoming.toString().indexOf(':');

        if (sep < 0) {
            return false;
        }

        /**
         * beginning of a message is preceded by byteLength(message) + ":"
         */
        const count = parseInt(this.incoming.slice(0, sep));

        /**
         * check if response is complete
         */
        if (this.incoming.length - (sep + 1) < count) {
            return false;
        }

        this.incoming = this.incoming.slice(sep + 1);
        const packet = this.incoming.slice(0, count);
        this.incoming = this.incoming.slice(count);
        this.handleMessage(packet);
        return true;
    }

    /**
     * Handler for a new message coming in. It's either an unsolicited event
     * from the server, or a response to a previous request from the client.
     */
    handleMessage(packet) {
        let message;

        try {
            message = JSON.parse(packet.toString());
        } catch (e) {
            return this.log.error(`Couldn't parse packet from server as JSON ${e}, message:\n${packet}`);
        }

        if (!message.from) {
            if (message.error) {
                return this.log.error(message.message);
            }

            return this.log.error(`Server didn't specify an actor: ${packet}`);
        }

        /**
         * respond to request
         */
        if (!UNSOLICITED_EVENTS.includes(message.type) && this._activeRequests[message.from]) {
            this.emit('message', message);
            this.log.info(`response: ${packet}`);
            const callback = this._activeRequests[message.from];
            delete this._activeRequests[message.from];
            callback(message);
            return this._flushRequests();
        }

        /**
         * handle unsolicited event from server
         */
        if (message.type) {
            // this is an unsolicited event from the server
            this.log.info(`unsolicited event: ${packet}`);
            return this.emit('message', message);
        }

        this.log.error(`Unhandled message: ${(0, _stringify2.default)(message)}`);
    }

    /**
     * Send a JSON message over the connection to the server.
     */
    sendMessage(message) {
        if (!message.to) {
            throw new Error('No actor specified in request');
        }

        if (!this.socket) {
            throw new Error('Not connected, connect() before sending requests');
        }

        let str = (0, _stringify2.default)(message);
        this.emit('send', message);

        /**
         * message is preceded by byteLength(message):
         */
        str = `${new _safeBuffer.Buffer(str).length}:${str}`;

        try {
            this.socket.write(str);
        } catch (e) {
            this.log.error(`Couldn't set socket message: ${e.message}`);
        }
    }

    /**
     * Set a request to be sent to an actor on the server. If the actor
     * is already handling a request, queue this request until the actor
     * has responded to the previous request.
     *
     * @param {object} request
     *        Message to be JSON-ified and sent to server.
     * @param {function} callback
     *        Function that's called with the response from the server.
     */
    makeRequest(request) {
        this.log.info(`request: ${(0, _stringify2.default)(request)}`);

        if (!request.to) {
            throw new Error(`${request.type || ''} request packet has no destination.`);
        }

        let resolveCb;
        const resp = new _promise2.default(resolve => {
            resolveCb = resolve;
        });
        this._pendingRequests.push({ to: request.to, message: request, callback: resolveCb });
        this._flushRequests();

        return resp;
    }

    /**
     * Activate (send) any pending requests to actors that don't have an
     * active request.
     */
    _flushRequests() {
        this._pendingRequests = this._pendingRequests.filter(request => {
            /**
             * only one active request per actor at a time
             */
            if (this._activeRequests[request.to]) {
                return true;
            }

            /**
             * no active requests for this actor, so activate this one
             */
            this.sendMessage(request.message);
            this.expectReply(request.to, request.callback);

            /**
             * remove from pending requests
             */
            return false;
        });
    }

    /**
     * Arrange to hand the next reply from |actor| to |handler|.
     */
    expectReply(actor, handler) {
        if (this._activeRequests[actor]) {
            throw Error(`clashing handlers for next reply from ${actor}`);
        }
        this._activeRequests[actor] = handler;
    }

    onError(error) {
        var code = error.code ? error.code : error;
        this.log.error(`connection error: ${code}`);
        this.emit('error', error);
    }

    onEnd() {
        this.log.info('connection closed by server');
        this.emit('end');
    }

    onTimeout() {
        this.log.info('connection timeout');
        this.emit('timeout');
    }
}
exports.default = Client;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9jbGllbnQuanMiXSwibmFtZXMiOlsiVU5TT0xJQ0lURURfRVZFTlRTIiwiQ2xpZW50IiwiY29uc3RydWN0b3IiLCJob3N0IiwicG9ydCIsImluY29taW5nIiwibG9nIiwic3VwcG9ydGVkRG9tYWlucyIsIl9wZW5kaW5nUmVxdWVzdHMiLCJfYWN0aXZlUmVxdWVzdHMiLCJjb25uZWN0Iiwic29ja2V0IiwiY3JlYXRlQ29ubmVjdGlvbiIsIm9uIiwib25EYXRhIiwib25FcnJvciIsIm9uRW5kIiwib25UaW1lb3V0IiwicmVzb2x2ZSIsImRpc2Nvbm5lY3QiLCJlbmQiLCJkYXRhIiwiY29uY2F0IiwicmVhZE1lc3NhZ2UiLCJzZXAiLCJ0b1N0cmluZyIsImluZGV4T2YiLCJjb3VudCIsInBhcnNlSW50Iiwic2xpY2UiLCJsZW5ndGgiLCJwYWNrZXQiLCJoYW5kbGVNZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsImUiLCJlcnJvciIsImZyb20iLCJpbmNsdWRlcyIsInR5cGUiLCJlbWl0IiwiaW5mbyIsImNhbGxiYWNrIiwiX2ZsdXNoUmVxdWVzdHMiLCJzZW5kTWVzc2FnZSIsInRvIiwiRXJyb3IiLCJzdHIiLCJ3cml0ZSIsIm1ha2VSZXF1ZXN0IiwicmVxdWVzdCIsInJlc29sdmVDYiIsInJlc3AiLCJwdXNoIiwiZmlsdGVyIiwiZXhwZWN0UmVwbHkiLCJhY3RvciIsImhhbmRsZXIiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLE1BQU1BLHFCQUFxQixDQUN2QixjQUR1QixFQUNQLGNBRE8sRUFDUyxnQkFEVCxFQUMyQixvQkFEM0IsRUFDaUQsY0FEakQsRUFFdkIsZ0JBRnVCLEVBRUwsY0FGSyxFQUVXLFNBRlgsRUFFc0IsVUFGdEIsRUFFa0MsWUFGbEMsRUFFZ0QsY0FGaEQsRUFHdkIsYUFIdUIsRUFHUixnQkFIUSxDQUEzQjs7QUFNQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCZSxNQUFNQyxNQUFOLDhCQUFrQztBQUM3Q0MsZ0JBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCO0FBQ3JCO0FBQ0EsYUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQix1QkFBVyxFQUFYLENBQWhCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXLHNCQUFPLFFBQVAsQ0FBWDtBQUNBLGFBQUtDLGdCQUFMLEdBQXdCLEVBQXhCOztBQUVBLGFBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QixFQUF2QjtBQUNIOztBQUVEOzs7OztBQUtBQyxjQUFXO0FBQ1AsYUFBS0MsTUFBTCxHQUFjLGNBQUlDLGdCQUFKLENBQXFCO0FBQy9CVCxrQkFBTSxLQUFLQSxJQURvQjtBQUUvQkMsa0JBQU0sS0FBS0E7QUFGb0IsU0FBckIsQ0FBZDs7QUFLQSxhQUFLTyxNQUFMLENBQVlFLEVBQVosQ0FBZSxNQUFmLEVBQXlCLEtBQUtDLE1BQTlCLE1BQXlCLElBQXpCO0FBQ0EsYUFBS0gsTUFBTCxDQUFZRSxFQUFaLENBQWUsT0FBZixFQUEwQixLQUFLRSxPQUEvQixNQUEwQixJQUExQjtBQUNBLGFBQUtKLE1BQUwsQ0FBWUUsRUFBWixDQUFlLEtBQWYsRUFBd0IsS0FBS0csS0FBN0IsTUFBd0IsSUFBeEI7QUFDQSxhQUFLTCxNQUFMLENBQVlFLEVBQVosQ0FBZSxTQUFmLEVBQTRCLEtBQUtJLFNBQWpDLE1BQTRCLElBQTVCOztBQUVBLGVBQU8sc0JBQWFDLE9BQUQsSUFBYSxLQUFLUCxNQUFMLENBQVlFLEVBQVosQ0FBZSxTQUFmLEVBQTBCSyxPQUExQixDQUF6QixDQUFQO0FBQ0g7O0FBRUQ7OztBQUdBQyxpQkFBYztBQUNWLFlBQUksQ0FBQyxLQUFLUixNQUFWLEVBQWtCO0FBQ2Q7QUFDSDs7QUFFRCxhQUFLQSxNQUFMLENBQVlTLEdBQVo7QUFDSDs7QUFFRDs7Ozs7QUFLQU4sV0FBUU8sSUFBUixFQUFjO0FBQ1YsYUFBS2hCLFFBQUwsR0FBZ0IsbUJBQU9pQixNQUFQLENBQWMsQ0FBQyxLQUFLakIsUUFBTixFQUFnQmdCLElBQWhCLENBQWQsQ0FBaEI7QUFDQSxlQUFPLEtBQUtFLFdBQUwsRUFBUCxFQUEyQixDQUFFO0FBQ2hDOztBQUVEOzs7OztBQUtBQSxrQkFBZTtBQUNYLFlBQUlDLE1BQU0sS0FBS25CLFFBQUwsQ0FBY29CLFFBQWQsR0FBeUJDLE9BQXpCLENBQWlDLEdBQWpDLENBQVY7O0FBRUEsWUFBSUYsTUFBTSxDQUFWLEVBQWE7QUFDVCxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQ7OztBQUdBLGNBQU1HLFFBQVFDLFNBQVMsS0FBS3ZCLFFBQUwsQ0FBY3dCLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUJMLEdBQXZCLENBQVQsQ0FBZDs7QUFFQTs7O0FBR0EsWUFBSSxLQUFLbkIsUUFBTCxDQUFjeUIsTUFBZCxJQUF3Qk4sTUFBTSxDQUE5QixJQUFtQ0csS0FBdkMsRUFBOEM7QUFDMUMsbUJBQU8sS0FBUDtBQUNIOztBQUVELGFBQUt0QixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY3dCLEtBQWQsQ0FBb0JMLE1BQU0sQ0FBMUIsQ0FBaEI7QUFDQSxjQUFNTyxTQUFTLEtBQUsxQixRQUFMLENBQWN3QixLQUFkLENBQW9CLENBQXBCLEVBQXVCRixLQUF2QixDQUFmO0FBQ0EsYUFBS3RCLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjd0IsS0FBZCxDQUFvQkYsS0FBcEIsQ0FBaEI7QUFDQSxhQUFLSyxhQUFMLENBQW1CRCxNQUFuQjtBQUNBLGVBQU8sSUFBUDtBQUNIOztBQUVEOzs7O0FBSUFDLGtCQUFlRCxNQUFmLEVBQXVCO0FBQ25CLFlBQUlFLE9BQUo7O0FBRUEsWUFBSTtBQUNBQSxzQkFBVUMsS0FBS0MsS0FBTCxDQUFXSixPQUFPTixRQUFQLEVBQVgsQ0FBVjtBQUNILFNBRkQsQ0FFRSxPQUFPVyxDQUFQLEVBQVU7QUFDUixtQkFBTyxLQUFLOUIsR0FBTCxDQUFTK0IsS0FBVCxDQUFnQiw2Q0FBNENELENBQUUsZUFBY0wsTUFBTyxFQUFuRixDQUFQO0FBQ0g7O0FBRUQsWUFBSSxDQUFDRSxRQUFRSyxJQUFiLEVBQW1CO0FBQ2YsZ0JBQUlMLFFBQVFJLEtBQVosRUFBbUI7QUFDZix1QkFBTyxLQUFLL0IsR0FBTCxDQUFTK0IsS0FBVCxDQUFlSixRQUFRQSxPQUF2QixDQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBSzNCLEdBQUwsQ0FBUytCLEtBQVQsQ0FBZ0IsbUNBQWtDTixNQUFPLEVBQXpELENBQVA7QUFDSDs7QUFFRDs7O0FBR0EsWUFBSSxDQUFDL0IsbUJBQW1CdUMsUUFBbkIsQ0FBNEJOLFFBQVFPLElBQXBDLENBQUQsSUFBOEMsS0FBSy9CLGVBQUwsQ0FBcUJ3QixRQUFRSyxJQUE3QixDQUFsRCxFQUFzRjtBQUNsRixpQkFBS0csSUFBTCxDQUFVLFNBQVYsRUFBcUJSLE9BQXJCO0FBQ0EsaUJBQUszQixHQUFMLENBQVNvQyxJQUFULENBQWUsYUFBWVgsTUFBTyxFQUFsQztBQUNBLGtCQUFNWSxXQUFXLEtBQUtsQyxlQUFMLENBQXFCd0IsUUFBUUssSUFBN0IsQ0FBakI7QUFDQSxtQkFBTyxLQUFLN0IsZUFBTCxDQUFxQndCLFFBQVFLLElBQTdCLENBQVA7QUFDQUsscUJBQVNWLE9BQVQ7QUFDQSxtQkFBTyxLQUFLVyxjQUFMLEVBQVA7QUFDSDs7QUFFRDs7O0FBR0EsWUFBSVgsUUFBUU8sSUFBWixFQUFrQjtBQUNkO0FBQ0EsaUJBQUtsQyxHQUFMLENBQVNvQyxJQUFULENBQWUsc0JBQXFCWCxNQUFPLEVBQTNDO0FBQ0EsbUJBQU8sS0FBS1UsSUFBTCxDQUFVLFNBQVYsRUFBcUJSLE9BQXJCLENBQVA7QUFDSDs7QUFFRCxhQUFLM0IsR0FBTCxDQUFTK0IsS0FBVCxDQUFnQixzQkFBcUIseUJBQWVKLE9BQWYsQ0FBd0IsRUFBN0Q7QUFDSDs7QUFFRDs7O0FBR0FZLGdCQUFhWixPQUFiLEVBQXNCO0FBQ2xCLFlBQUksQ0FBQ0EsUUFBUWEsRUFBYixFQUFpQjtBQUNiLGtCQUFNLElBQUlDLEtBQUosQ0FBVSwrQkFBVixDQUFOO0FBQ0g7O0FBRUQsWUFBSSxDQUFDLEtBQUtwQyxNQUFWLEVBQWtCO0FBQ2Qsa0JBQU0sSUFBSW9DLEtBQUosQ0FBVSxrREFBVixDQUFOO0FBQ0g7O0FBRUQsWUFBSUMsTUFBTSx5QkFBZWYsT0FBZixDQUFWO0FBQ0EsYUFBS1EsSUFBTCxDQUFVLE1BQVYsRUFBa0JSLE9BQWxCOztBQUVBOzs7QUFHQWUsY0FBTyxHQUFHLHVCQUFXQSxHQUFYLENBQUQsQ0FBa0JsQixNQUFPLElBQUdrQixHQUFJLEVBQXpDOztBQUVBLFlBQUk7QUFDQSxpQkFBS3JDLE1BQUwsQ0FBWXNDLEtBQVosQ0FBa0JELEdBQWxCO0FBQ0gsU0FGRCxDQUVFLE9BQU9aLENBQVAsRUFBVTtBQUNSLGlCQUFLOUIsR0FBTCxDQUFTK0IsS0FBVCxDQUFnQixnQ0FBK0JELEVBQUVILE9BQVEsRUFBekQ7QUFDSDtBQUNKOztBQUVEOzs7Ozs7Ozs7O0FBVUFpQixnQkFBYUMsT0FBYixFQUFzQjtBQUNsQixhQUFLN0MsR0FBTCxDQUFTb0MsSUFBVCxDQUFlLFlBQVcseUJBQWVTLE9BQWYsQ0FBd0IsRUFBbEQ7O0FBRUEsWUFBSSxDQUFDQSxRQUFRTCxFQUFiLEVBQWlCO0FBQ2Isa0JBQU0sSUFBSUMsS0FBSixDQUFXLEdBQUVJLFFBQVFYLElBQVIsSUFBZ0IsRUFBRyxxQ0FBaEMsQ0FBTjtBQUNIOztBQUVELFlBQUlZLFNBQUo7QUFDQSxjQUFNQyxPQUFPLHNCQUFhbkMsT0FBRCxJQUFhO0FBQUVrQyx3QkFBWWxDLE9BQVo7QUFBcUIsU0FBaEQsQ0FBYjtBQUNBLGFBQUtWLGdCQUFMLENBQXNCOEMsSUFBdEIsQ0FBMkIsRUFBRVIsSUFBSUssUUFBUUwsRUFBZCxFQUFrQmIsU0FBU2tCLE9BQTNCLEVBQW9DUixVQUFVUyxTQUE5QyxFQUEzQjtBQUNBLGFBQUtSLGNBQUw7O0FBRUEsZUFBT1MsSUFBUDtBQUNIOztBQUVEOzs7O0FBSUFULHFCQUFrQjtBQUNkLGFBQUtwQyxnQkFBTCxHQUF3QixLQUFLQSxnQkFBTCxDQUFzQitDLE1BQXRCLENBQThCSixPQUFELElBQWE7QUFDOUQ7OztBQUdBLGdCQUFJLEtBQUsxQyxlQUFMLENBQXFCMEMsUUFBUUwsRUFBN0IsQ0FBSixFQUFzQztBQUNsQyx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQ7OztBQUdBLGlCQUFLRCxXQUFMLENBQWlCTSxRQUFRbEIsT0FBekI7QUFDQSxpQkFBS3VCLFdBQUwsQ0FBaUJMLFFBQVFMLEVBQXpCLEVBQTZCSyxRQUFRUixRQUFyQzs7QUFFQTs7O0FBR0EsbUJBQU8sS0FBUDtBQUNILFNBbEJ1QixDQUF4QjtBQW1CSDs7QUFFRDs7O0FBR0FhLGdCQUFhQyxLQUFiLEVBQW9CQyxPQUFwQixFQUE2QjtBQUN6QixZQUFJLEtBQUtqRCxlQUFMLENBQXFCZ0QsS0FBckIsQ0FBSixFQUFpQztBQUM3QixrQkFBTVYsTUFBTyx5Q0FBd0NVLEtBQU0sRUFBckQsQ0FBTjtBQUNIO0FBQ0QsYUFBS2hELGVBQUwsQ0FBcUJnRCxLQUFyQixJQUE4QkMsT0FBOUI7QUFDSDs7QUFFRDNDLFlBQVNzQixLQUFULEVBQWdCO0FBQ1osWUFBSXNCLE9BQU90QixNQUFNc0IsSUFBTixHQUFhdEIsTUFBTXNCLElBQW5CLEdBQTBCdEIsS0FBckM7QUFDQSxhQUFLL0IsR0FBTCxDQUFTK0IsS0FBVCxDQUFnQixxQkFBb0JzQixJQUFLLEVBQXpDO0FBQ0EsYUFBS2xCLElBQUwsQ0FBVSxPQUFWLEVBQW1CSixLQUFuQjtBQUNIOztBQUVEckIsWUFBUztBQUNMLGFBQUtWLEdBQUwsQ0FBU29DLElBQVQsQ0FBYyw2QkFBZDtBQUNBLGFBQUtELElBQUwsQ0FBVSxLQUFWO0FBQ0g7O0FBRUR4QixnQkFBYTtBQUNULGFBQUtYLEdBQUwsQ0FBU29DLElBQVQsQ0FBYyxvQkFBZDtBQUNBLGFBQUtELElBQUwsQ0FBVSxTQUFWO0FBQ0g7QUF2TzRDO2tCQUE1QnhDLE0iLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5ldCBmcm9tICduZXQnXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tICdzYWZlLWJ1ZmZlcidcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcidcblxuY29uc3QgVU5TT0xJQ0lURURfRVZFTlRTID0gW1xuICAgICd0YWJOYXZpZ2F0ZWQnLCAnc3R5bGVBcHBsaWVkJywgJ3Byb3BlcnR5Q2hhbmdlJywgJ25ldHdvcmtFdmVudFVwZGF0ZScsICduZXR3b3JrRXZlbnQnLFxuICAgICdwcm9wZXJ0eUNoYW5nZScsICduZXdNdXRhdGlvbnMnLCAnYXBwT3BlbicsICdhcHBDbG9zZScsICdhcHBJbnN0YWxsJywgJ2FwcFVuaW5zdGFsbCcsXG4gICAgJ2ZyYW1lVXBkYXRlJywgJ3RhYkxpc3RDaGFuZ2VkJ1xuXVxuXG4vKipcbiAqIGEgQ2xpZW50IG9iamVjdCBoYW5kbGVzIGNvbm5lY3Rpbmcgd2l0aCBhIEZpcmVmb3ggcmVtb3RlIGRlYnVnZ2luZ1xuICogc2VydmVyIGluc3RhbmNlIChlLmcuIGEgRmlyZWZveCBpbnN0YW5jZSksIHBsdXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nXG4gKiBwYWNrZXRzIG9uIHRoYXQgY29uZWN0aW9uIHVzaW5nIHRoZSBGaXJlZm94IHJlbW90ZSBkZWJ1Z2dpbmcgcHJvdG9jb2wuXG4gKlxuICogSW1wb3J0YW50IG1ldGhvZHM6XG4gKiBjb25uZWN0IC0gQ3JlYXRlIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gKiBtYWtlUmVxdWVzdCAtIE1ha2UgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIEpTT04gbWVzc2FnZSxcbiAqICAgYW5kIGEgY2FsbGJhY2sgdG8gY2FsbCB3aXRoIHRoZSByZXNwb25zZS5cbiAqXG4gKiBJbXBvcnRhbnQgZXZlbnRzOlxuICogJ21lc3NhZ2UnIC0gQW4gdW5zb2xpY2l0ZWQgKGUuZy4gbm90IGEgcmVzcG9uc2UgdG8gYSBwcmlvciByZXF1ZXN0KVxuICogICAgcGFja2V0IGhhcyBiZWVuIHJlY2VpdmVkLiBUaGVzZSBwYWNrZXRzIHVzdWFsbHkgZGVzY3JpYmUgZXZlbnRzLlxuICpcbiAqIFRoaXMgY29kZSB3YXMgYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9oYXJ0aHVyL2ZpcmVmb3gtY2xpZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IgKGhvc3QsIHBvcnQpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnRcbiAgICAgICAgdGhpcy5pbmNvbWluZyA9IG5ldyBCdWZmZXIoJycpXG4gICAgICAgIHRoaXMubG9nID0gbG9nZ2VyKCdDbGllbnQnKVxuICAgICAgICB0aGlzLnN1cHBvcnRlZERvbWFpbnMgPSBbXVxuXG4gICAgICAgIHRoaXMuX3BlbmRpbmdSZXF1ZXN0cyA9IFtdXG4gICAgICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzID0ge31cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgc29ja2V0IGNvbm5lY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICByZXNvbHZlcyBvbmNlIGNvbm5lY3RlZCB0byBzb2NrZXRcbiAgICAgKi9cbiAgICBjb25uZWN0ICgpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXQuY3JlYXRlQ29ubmVjdGlvbih7XG4gICAgICAgICAgICBob3N0OiB0aGlzLmhvc3QsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnNvY2tldC5vbignZGF0YScsIDo6dGhpcy5vbkRhdGEpXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdlcnJvcicsIDo6dGhpcy5vbkVycm9yKVxuICAgICAgICB0aGlzLnNvY2tldC5vbignZW5kJywgOjp0aGlzLm9uRW5kKVxuICAgICAgICB0aGlzLnNvY2tldC5vbigndGltZW91dCcsIDo6dGhpcy5vblRpbWVvdXQpXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB0aGlzLnNvY2tldC5vbignY29ubmVjdCcsIHJlc29sdmUpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVuZCBzb2NrZXQgY29ubmVjdGlvblxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QgKCkge1xuICAgICAgICBpZiAoIXRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZCgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gYSBuZXcgZGF0YSBjaHVuayBpcyByZWNlaXZlZCBvbiB0aGUgY29ubmVjdGlvbi5cbiAgICAgKiBQYXJzZSBkYXRhIGludG8gbWVzc2FnZShzKSBhbmQgY2FsbCBtZXNzYWdlIGhhbmRsZXIgZm9yIGFueSBmdWxsXG4gICAgICogbWVzc2FnZXMgdGhhdCBhcmUgcmVhZCBpbi5cbiAgICAgKi9cbiAgICBvbkRhdGEgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbmNvbWluZyA9IEJ1ZmZlci5jb25jYXQoW3RoaXMuaW5jb21pbmcsIGRhdGFdKVxuICAgICAgICB3aGlsZSAodGhpcy5yZWFkTWVzc2FnZSgpKSB7fVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIG91dCBhbmQgcHJvY2VzcyB0aGUgbmV4dCBtZXNzYWdlIGZyb20gdGhlIGRhdGEgcmVhZCBmcm9tXG4gICAgICogdGhlIGNvbm5lY3Rpb24uIFJldHVybnMgdHJ1ZSBpZiBhIGZ1bGwgbWVhc3NhZ2Ugd2FzIHBhcnNlZCwgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgcmVhZE1lc3NhZ2UgKCkge1xuICAgICAgICB2YXIgc2VwID0gdGhpcy5pbmNvbWluZy50b1N0cmluZygpLmluZGV4T2YoJzonKVxuXG4gICAgICAgIGlmIChzZXAgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiZWdpbm5pbmcgb2YgYSBtZXNzYWdlIGlzIHByZWNlZGVkIGJ5IGJ5dGVMZW5ndGgobWVzc2FnZSkgKyBcIjpcIlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgY291bnQgPSBwYXJzZUludCh0aGlzLmluY29taW5nLnNsaWNlKDAsIHNlcCkpXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIHJlc3BvbnNlIGlzIGNvbXBsZXRlXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5pbmNvbWluZy5sZW5ndGggLSAoc2VwICsgMSkgPCBjb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluY29taW5nID0gdGhpcy5pbmNvbWluZy5zbGljZShzZXAgKyAxKVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB0aGlzLmluY29taW5nLnNsaWNlKDAsIGNvdW50KVxuICAgICAgICB0aGlzLmluY29taW5nID0gdGhpcy5pbmNvbWluZy5zbGljZShjb3VudClcbiAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKHBhY2tldClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBhIG5ldyBtZXNzYWdlIGNvbWluZyBpbi4gSXQncyBlaXRoZXIgYW4gdW5zb2xpY2l0ZWQgZXZlbnRcbiAgICAgKiBmcm9tIHRoZSBzZXJ2ZXIsIG9yIGEgcmVzcG9uc2UgdG8gYSBwcmV2aW91cyByZXF1ZXN0IGZyb20gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBoYW5kbGVNZXNzYWdlIChwYWNrZXQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UocGFja2V0LnRvU3RyaW5nKCkpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcihgQ291bGRuJ3QgcGFyc2UgcGFja2V0IGZyb20gc2VydmVyIGFzIEpTT04gJHtlfSwgbWVzc2FnZTpcXG4ke3BhY2tldH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtZXNzYWdlLmZyb20pIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKG1lc3NhZ2UubWVzc2FnZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKGBTZXJ2ZXIgZGlkbid0IHNwZWNpZnkgYW4gYWN0b3I6ICR7cGFja2V0fWApXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzcG9uZCB0byByZXF1ZXN0XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIVVOU09MSUNJVEVEX0VWRU5UUy5pbmNsdWRlcyhtZXNzYWdlLnR5cGUpICYmIHRoaXMuX2FjdGl2ZVJlcXVlc3RzW21lc3NhZ2UuZnJvbV0pIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGByZXNwb25zZTogJHtwYWNrZXR9YClcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5fYWN0aXZlUmVxdWVzdHNbbWVzc2FnZS5mcm9tXVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2FjdGl2ZVJlcXVlc3RzW21lc3NhZ2UuZnJvbV1cbiAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmx1c2hSZXF1ZXN0cygpXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlIHVuc29saWNpdGVkIGV2ZW50IGZyb20gc2VydmVyXG4gICAgICAgICAqL1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIGFuIHVuc29saWNpdGVkIGV2ZW50IGZyb20gdGhlIHNlcnZlclxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgdW5zb2xpY2l0ZWQgZXZlbnQ6ICR7cGFja2V0fWApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KCdtZXNzYWdlJywgbWVzc2FnZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nLmVycm9yKGBVbmhhbmRsZWQgbWVzc2FnZTogJHtKU09OLnN0cmluZ2lmeShtZXNzYWdlKX1gKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgYSBKU09OIG1lc3NhZ2Ugb3ZlciB0aGUgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIHNlbmRNZXNzYWdlIChtZXNzYWdlKSB7XG4gICAgICAgIGlmICghbWVzc2FnZS50bykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RvciBzcGVjaWZpZWQgaW4gcmVxdWVzdCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBjb25uZWN0ZWQsIGNvbm5lY3QoKSBiZWZvcmUgc2VuZGluZyByZXF1ZXN0cycpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSlcbiAgICAgICAgdGhpcy5lbWl0KCdzZW5kJywgbWVzc2FnZSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogbWVzc2FnZSBpcyBwcmVjZWRlZCBieSBieXRlTGVuZ3RoKG1lc3NhZ2UpOlxuICAgICAgICAgKi9cbiAgICAgICAgc3RyID0gYCR7KG5ldyBCdWZmZXIoc3RyKSkubGVuZ3RofToke3N0cn1gXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LndyaXRlKHN0cilcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkbid0IHNldCBzb2NrZXQgbWVzc2FnZTogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIHJlcXVlc3QgdG8gYmUgc2VudCB0byBhbiBhY3RvciBvbiB0aGUgc2VydmVyLiBJZiB0aGUgYWN0b3JcbiAgICAgKiBpcyBhbHJlYWR5IGhhbmRsaW5nIGEgcmVxdWVzdCwgcXVldWUgdGhpcyByZXF1ZXN0IHVudGlsIHRoZSBhY3RvclxuICAgICAqIGhhcyByZXNwb25kZWQgdG8gdGhlIHByZXZpb3VzIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdFxuICAgICAqICAgICAgICBNZXNzYWdlIHRvIGJlIEpTT04taWZpZWQgYW5kIHNlbnQgdG8gc2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogICAgICAgIEZ1bmN0aW9uIHRoYXQncyBjYWxsZWQgd2l0aCB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIG1ha2VSZXF1ZXN0IChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYHJlcXVlc3Q6ICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdCl9YClcblxuICAgICAgICBpZiAoIXJlcXVlc3QudG8pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXF1ZXN0LnR5cGUgfHwgJyd9IHJlcXVlc3QgcGFja2V0IGhhcyBubyBkZXN0aW5hdGlvbi5gKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc29sdmVDYlxuICAgICAgICBjb25zdCByZXNwID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgcmVzb2x2ZUNiID0gcmVzb2x2ZSB9KVxuICAgICAgICB0aGlzLl9wZW5kaW5nUmVxdWVzdHMucHVzaCh7IHRvOiByZXF1ZXN0LnRvLCBtZXNzYWdlOiByZXF1ZXN0LCBjYWxsYmFjazogcmVzb2x2ZUNiIH0pXG4gICAgICAgIHRoaXMuX2ZsdXNoUmVxdWVzdHMoKVxuXG4gICAgICAgIHJldHVybiByZXNwXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgKHNlbmQpIGFueSBwZW5kaW5nIHJlcXVlc3RzIHRvIGFjdG9ycyB0aGF0IGRvbid0IGhhdmUgYW5cbiAgICAgKiBhY3RpdmUgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBfZmx1c2hSZXF1ZXN0cyAoKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdSZXF1ZXN0cyA9IHRoaXMuX3BlbmRpbmdSZXF1ZXN0cy5maWx0ZXIoKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogb25seSBvbmUgYWN0aXZlIHJlcXVlc3QgcGVyIGFjdG9yIGF0IGEgdGltZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHNbcmVxdWVzdC50b10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIG5vIGFjdGl2ZSByZXF1ZXN0cyBmb3IgdGhpcyBhY3Rvciwgc28gYWN0aXZhdGUgdGhpcyBvbmVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShyZXF1ZXN0Lm1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLmV4cGVjdFJlcGx5KHJlcXVlc3QudG8sIHJlcXVlc3QuY2FsbGJhY2spXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogcmVtb3ZlIGZyb20gcGVuZGluZyByZXF1ZXN0c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcnJhbmdlIHRvIGhhbmQgdGhlIG5leHQgcmVwbHkgZnJvbSB8YWN0b3J8IHRvIHxoYW5kbGVyfC5cbiAgICAgKi9cbiAgICBleHBlY3RSZXBseSAoYWN0b3IsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVJlcXVlc3RzW2FjdG9yXSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYGNsYXNoaW5nIGhhbmRsZXJzIGZvciBuZXh0IHJlcGx5IGZyb20gJHthY3Rvcn1gKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzW2FjdG9yXSA9IGhhbmRsZXJcbiAgICB9XG5cbiAgICBvbkVycm9yIChlcnJvcikge1xuICAgICAgICB2YXIgY29kZSA9IGVycm9yLmNvZGUgPyBlcnJvci5jb2RlIDogZXJyb3JcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGNvbm5lY3Rpb24gZXJyb3I6ICR7Y29kZX1gKVxuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpXG4gICAgfVxuXG4gICAgb25FbmQgKCkge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCdjb25uZWN0aW9uIGNsb3NlZCBieSBzZXJ2ZXInKVxuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgfVxuXG4gICAgb25UaW1lb3V0ICgpIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnY29ubmVjdGlvbiB0aW1lb3V0JylcbiAgICAgICAgdGhpcy5lbWl0KCd0aW1lb3V0JylcbiAgICB9XG59XG4iXX0=