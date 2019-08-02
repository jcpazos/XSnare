'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Browser extends _actor2.default {
    constructor(host, port) {
        const client = new _client2.default(host, port);

        client.on('error', error => this.emit('error', error));
        client.on('end', () => this.emit('end'));
        client.on('timeout', () => this.emit('timeout'));

        super(client, 'root');
    }

    get preference() {
        return this._get('preference');
    }
    get actorRegistry() {
        return this._get('actorRegistry');
    }
    get addons() {
        return this._get('addons');
    }
    get device() {
        return this._get('device');
    }
    get heapSnapshotFile() {
        return this._get('heapSnapshotFile');
    }

    connect() {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            yield _this.client.connect();
            _this.client.expectReply(_this.name, function ({ traits }) {
                _this.traits = traits;
            });
            _this.tabs = yield _this.listTabs();
            return _this.tabs;
        })();
    }

    disconnect() {
        this.client.disconnect();
    }

    close() {
        this.disconnect();

        /**
         * only shut down browser if started via launcher
         */
        if (!this.firefoxProcess) {
            return console.error('Can\'t close the browser because client was attached to an' + 'already opened Firefox instance');
        }

        this.firefoxProcess.kill();
    }

    listTabs() {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const listTabsResponse = yield _this2.request('listTabs');
            _this2.setActors(listTabsResponse);
            return listTabsResponse.tabs.map(function (tab) {
                return new _tab2.default(_this2.client, tab.actor, tab);
            });
        })();
    }
}
exports.default = Browser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9icm93c2VyLmpzIl0sIm5hbWVzIjpbIkJyb3dzZXIiLCJjb25zdHJ1Y3RvciIsImhvc3QiLCJwb3J0IiwiY2xpZW50Iiwib24iLCJlcnJvciIsImVtaXQiLCJwcmVmZXJlbmNlIiwiX2dldCIsImFjdG9yUmVnaXN0cnkiLCJhZGRvbnMiLCJkZXZpY2UiLCJoZWFwU25hcHNob3RGaWxlIiwiY29ubmVjdCIsImV4cGVjdFJlcGx5IiwibmFtZSIsInRyYWl0cyIsInRhYnMiLCJsaXN0VGFicyIsImRpc2Nvbm5lY3QiLCJjbG9zZSIsImZpcmVmb3hQcm9jZXNzIiwiY29uc29sZSIsImtpbGwiLCJsaXN0VGFic1Jlc3BvbnNlIiwicmVxdWVzdCIsInNldEFjdG9ycyIsIm1hcCIsInRhYiIsImFjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFZSxNQUFNQSxPQUFOLHlCQUE0QjtBQUN2Q0MsZ0JBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCO0FBQ3JCLGNBQU1DLFNBQVMscUJBQVdGLElBQVgsRUFBaUJDLElBQWpCLENBQWY7O0FBRUFDLGVBQU9DLEVBQVAsQ0FBVSxPQUFWLEVBQW9CQyxLQUFELElBQVcsS0FBS0MsSUFBTCxDQUFVLE9BQVYsRUFBbUJELEtBQW5CLENBQTlCO0FBQ0FGLGVBQU9DLEVBQVAsQ0FBVSxLQUFWLEVBQWlCLE1BQU0sS0FBS0UsSUFBTCxDQUFVLEtBQVYsQ0FBdkI7QUFDQUgsZUFBT0MsRUFBUCxDQUFVLFNBQVYsRUFBcUIsTUFBTSxLQUFLRSxJQUFMLENBQVUsU0FBVixDQUEzQjs7QUFFQSxjQUFNSCxNQUFOLEVBQWMsTUFBZDtBQUNIOztBQUVELFFBQUlJLFVBQUosR0FBa0I7QUFBRSxlQUFPLEtBQUtDLElBQUwsQ0FBVSxZQUFWLENBQVA7QUFBZ0M7QUFDcEQsUUFBSUMsYUFBSixHQUFxQjtBQUFFLGVBQU8sS0FBS0QsSUFBTCxDQUFVLGVBQVYsQ0FBUDtBQUFtQztBQUMxRCxRQUFJRSxNQUFKLEdBQWM7QUFBRSxlQUFPLEtBQUtGLElBQUwsQ0FBVSxRQUFWLENBQVA7QUFBNEI7QUFDNUMsUUFBSUcsTUFBSixHQUFjO0FBQUUsZUFBTyxLQUFLSCxJQUFMLENBQVUsUUFBVixDQUFQO0FBQTRCO0FBQzVDLFFBQUlJLGdCQUFKLEdBQXdCO0FBQUUsZUFBTyxLQUFLSixJQUFMLENBQVUsa0JBQVYsQ0FBUDtBQUFzQzs7QUFFMURLLFdBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNiLGtCQUFNLE1BQUtWLE1BQUwsQ0FBWVUsT0FBWixFQUFOO0FBQ0Esa0JBQUtWLE1BQUwsQ0FBWVcsV0FBWixDQUF3QixNQUFLQyxJQUE3QixFQUFtQyxVQUFDLEVBQUVDLE1BQUYsRUFBRCxFQUFnQjtBQUFFLHNCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFBc0IsYUFBM0U7QUFDQSxrQkFBS0MsSUFBTCxHQUFZLE1BQU0sTUFBS0MsUUFBTCxFQUFsQjtBQUNBLG1CQUFPLE1BQUtELElBQVo7QUFKYTtBQUtoQjs7QUFFREUsaUJBQWM7QUFDVixhQUFLaEIsTUFBTCxDQUFZZ0IsVUFBWjtBQUNIOztBQUVEQyxZQUFTO0FBQ0wsYUFBS0QsVUFBTDs7QUFFQTs7O0FBR0EsWUFBSSxDQUFDLEtBQUtFLGNBQVYsRUFBMEI7QUFDdEIsbUJBQU9DLFFBQVFqQixLQUFSLENBQ0gsK0RBQ0EsaUNBRkcsQ0FBUDtBQUlIOztBQUVELGFBQUtnQixjQUFMLENBQW9CRSxJQUFwQjtBQUNIOztBQUVLTCxZQUFOLEdBQWtCO0FBQUE7O0FBQUE7QUFDZCxrQkFBTU0sbUJBQW1CLE1BQU0sT0FBS0MsT0FBTCxDQUFhLFVBQWIsQ0FBL0I7QUFDQSxtQkFBS0MsU0FBTCxDQUFlRixnQkFBZjtBQUNBLG1CQUFPQSxpQkFBaUJQLElBQWpCLENBQXNCVSxHQUF0QixDQUEwQixVQUFDQyxHQUFEO0FBQUEsdUJBQVMsa0JBQVEsT0FBS3pCLE1BQWIsRUFBcUJ5QixJQUFJQyxLQUF6QixFQUFnQ0QsR0FBaEMsQ0FBVDtBQUFBLGFBQTFCLENBQVA7QUFIYztBQUlqQjtBQWhEc0M7a0JBQXRCN0IsTyIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4vYWN0b3InXG5pbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50J1xuaW1wb3J0IFRhYiBmcm9tICcuL3RhYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJvd3NlciBleHRlbmRzIEFjdG9yIHtcbiAgICBjb25zdHJ1Y3RvciAoaG9zdCwgcG9ydCkge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KGhvc3QsIHBvcnQpXG5cbiAgICAgICAgY2xpZW50Lm9uKCdlcnJvcicsIChlcnJvcikgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKSlcbiAgICAgICAgY2xpZW50Lm9uKCdlbmQnLCAoKSA9PiB0aGlzLmVtaXQoJ2VuZCcpKVxuICAgICAgICBjbGllbnQub24oJ3RpbWVvdXQnLCAoKSA9PiB0aGlzLmVtaXQoJ3RpbWVvdXQnKSlcblxuICAgICAgICBzdXBlcihjbGllbnQsICdyb290JylcbiAgICB9XG5cbiAgICBnZXQgcHJlZmVyZW5jZSAoKSB7IHJldHVybiB0aGlzLl9nZXQoJ3ByZWZlcmVuY2UnKSB9XG4gICAgZ2V0IGFjdG9yUmVnaXN0cnkgKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdhY3RvclJlZ2lzdHJ5JykgfVxuICAgIGdldCBhZGRvbnMgKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdhZGRvbnMnKSB9XG4gICAgZ2V0IGRldmljZSAoKSB7IHJldHVybiB0aGlzLl9nZXQoJ2RldmljZScpIH1cbiAgICBnZXQgaGVhcFNuYXBzaG90RmlsZSAoKSB7IHJldHVybiB0aGlzLl9nZXQoJ2hlYXBTbmFwc2hvdEZpbGUnKSB9XG5cbiAgICBhc3luYyBjb25uZWN0ICgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuY29ubmVjdCgpXG4gICAgICAgIHRoaXMuY2xpZW50LmV4cGVjdFJlcGx5KHRoaXMubmFtZSwgKHsgdHJhaXRzIH0pID0+IHsgdGhpcy50cmFpdHMgPSB0cmFpdHMgfSlcbiAgICAgICAgdGhpcy50YWJzID0gYXdhaXQgdGhpcy5saXN0VGFicygpXG4gICAgICAgIHJldHVybiB0aGlzLnRhYnNcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0ICgpIHtcbiAgICAgICAgdGhpcy5jbGllbnQuZGlzY29ubmVjdCgpXG4gICAgfVxuXG4gICAgY2xvc2UgKCkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IHNodXQgZG93biBicm93c2VyIGlmIHN0YXJ0ZWQgdmlhIGxhdW5jaGVyXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZmlyZWZveFByb2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICdDYW5cXCd0IGNsb3NlIHRoZSBicm93c2VyIGJlY2F1c2UgY2xpZW50IHdhcyBhdHRhY2hlZCB0byBhbicgK1xuICAgICAgICAgICAgICAgICdhbHJlYWR5IG9wZW5lZCBGaXJlZm94IGluc3RhbmNlJ1xuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlZm94UHJvY2Vzcy5raWxsKClcbiAgICB9XG5cbiAgICBhc3luYyBsaXN0VGFicyAoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RUYWJzUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2xpc3RUYWJzJylcbiAgICAgICAgdGhpcy5zZXRBY3RvcnMobGlzdFRhYnNSZXNwb25zZSlcbiAgICAgICAgcmV0dXJuIGxpc3RUYWJzUmVzcG9uc2UudGFicy5tYXAoKHRhYikgPT4gbmV3IFRhYih0aGlzLmNsaWVudCwgdGFiLmFjdG9yLCB0YWIpKVxuICAgIH1cbn1cbiJdfQ==