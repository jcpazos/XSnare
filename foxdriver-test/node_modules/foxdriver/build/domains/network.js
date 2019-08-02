'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _request = require('../models/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Network extends _actor2.default {

    constructor(client, name) {
        super(client, name);
        this.isEnabled = false;

        this.on('networkEvent', event => {
            const request = new _request2.default(client, event.eventActor);
            this.emit('request', request);
        });
    }

    /**
     * Start the given Network listeners.
     *
     * @param  {String[]} listeners  console listeners to listen to (default: NetworkActivity)
     * @return {Promise}             resolves once request has finished
     */
    startListeners(listeners = Network.listeners) {
        this.isEnabled = true;
        return this.request('startListeners', { listeners });
    }

    /**
     * Stop the given Web Console listeners.
     *
     * @param  {String[]} listeners  console listeners to stop listen to (default: NetworkActivity)
     * @return {Promise}             resolves once request has finished
     */
    stopListeners(listeners = Network.listeners) {
        this.isEnabled = false;
        return this.request('stopListeners', { listeners });
    }

    /**
     * Send a HTTP request with the given data.
     * @param  {Request} request  The details of the HTTP request
     * @return {Promise}          resolves once request has finished
     */
    sendHTTPRequest(request) {
        return this.request('sendHTTPRequest', { request });
    }
}
exports.default = Network;
Network.listeners = ['NetworkActivity'];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL25ldHdvcmsuanMiXSwibmFtZXMiOlsiTmV0d29yayIsImNvbnN0cnVjdG9yIiwiY2xpZW50IiwibmFtZSIsImlzRW5hYmxlZCIsIm9uIiwiZXZlbnQiLCJyZXF1ZXN0IiwiZXZlbnRBY3RvciIsImVtaXQiLCJzdGFydExpc3RlbmVycyIsImxpc3RlbmVycyIsInN0b3BMaXN0ZW5lcnMiLCJzZW5kSFRUUFJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVlLE1BQU1BLE9BQU4seUJBQTRCOztBQUd2Q0MsZ0JBQWFDLE1BQWIsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLGNBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsS0FBakI7O0FBRUEsYUFBS0MsRUFBTCxDQUFRLGNBQVIsRUFBeUJDLEtBQUQsSUFBVztBQUMvQixrQkFBTUMsVUFBVSxzQkFBWUwsTUFBWixFQUFvQkksTUFBTUUsVUFBMUIsQ0FBaEI7QUFDQSxpQkFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUJGLE9BQXJCO0FBQ0gsU0FIRDtBQUlIOztBQUVEOzs7Ozs7QUFNQUcsbUJBQWdCQyxZQUFZWCxRQUFRVyxTQUFwQyxFQUErQztBQUMzQyxhQUFLUCxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsZUFBTyxLQUFLRyxPQUFMLENBQWEsZ0JBQWIsRUFBK0IsRUFBRUksU0FBRixFQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BQyxrQkFBZUQsWUFBWVgsUUFBUVcsU0FBbkMsRUFBOEM7QUFDMUMsYUFBS1AsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQU8sS0FBS0csT0FBTCxDQUFhLGVBQWIsRUFBOEIsRUFBRUksU0FBRixFQUE5QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FFLG9CQUFpQk4sT0FBakIsRUFBMEI7QUFDdEIsZUFBTyxLQUFLQSxPQUFMLENBQWEsaUJBQWIsRUFBZ0MsRUFBRUEsT0FBRixFQUFoQyxDQUFQO0FBQ0g7QUExQ3NDO2tCQUF0QlAsTztBQUFBQSxPLENBQ1ZXLFMsR0FBWSxDQUFDLGlCQUFELEMiLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuLi9hY3RvcidcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL21vZGVscy9yZXF1ZXN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrIGV4dGVuZHMgQWN0b3Ige1xuICAgIHN0YXRpYyBsaXN0ZW5lcnMgPSBbJ05ldHdvcmtBY3Rpdml0eSddXG5cbiAgICBjb25zdHJ1Y3RvciAoY2xpZW50LCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGNsaWVudCwgbmFtZSlcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZVxuXG4gICAgICAgIHRoaXMub24oJ25ldHdvcmtFdmVudCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNsaWVudCwgZXZlbnQuZXZlbnRBY3RvcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVxdWVzdCcsIHJlcXVlc3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIGdpdmVuIE5ldHdvcmsgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nW119IGxpc3RlbmVycyAgY29uc29sZSBsaXN0ZW5lcnMgdG8gbGlzdGVuIHRvIChkZWZhdWx0OiBOZXR3b3JrQWN0aXZpdHkpXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgICAgICAgcmVzb2x2ZXMgb25jZSByZXF1ZXN0IGhhcyBmaW5pc2hlZFxuICAgICAqL1xuICAgIHN0YXJ0TGlzdGVuZXJzIChsaXN0ZW5lcnMgPSBOZXR3b3JrLmxpc3RlbmVycykge1xuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc3RhcnRMaXN0ZW5lcnMnLCB7IGxpc3RlbmVycyB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdGhlIGdpdmVuIFdlYiBDb25zb2xlIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ1tdfSBsaXN0ZW5lcnMgIGNvbnNvbGUgbGlzdGVuZXJzIHRvIHN0b3AgbGlzdGVuIHRvIChkZWZhdWx0OiBOZXR3b3JrQWN0aXZpdHkpXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgICAgICAgcmVzb2x2ZXMgb25jZSByZXF1ZXN0IGhhcyBmaW5pc2hlZFxuICAgICAqL1xuICAgIHN0b3BMaXN0ZW5lcnMgKGxpc3RlbmVycyA9IE5ldHdvcmsubGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc3RvcExpc3RlbmVycycsIHsgbGlzdGVuZXJzIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZCBhIEhUVFAgcmVxdWVzdCB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgICAqIEBwYXJhbSAge1JlcXVlc3R9IHJlcXVlc3QgIFRoZSBkZXRhaWxzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICAgICByZXNvbHZlcyBvbmNlIHJlcXVlc3QgaGFzIGZpbmlzaGVkXG4gICAgICovXG4gICAgc2VuZEhUVFBSZXF1ZXN0IChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3NlbmRIVFRQUmVxdWVzdCcsIHsgcmVxdWVzdCB9KVxuICAgIH1cbn1cbiJdfQ==