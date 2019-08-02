'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _launcher = require('./launcher');

var _launcher2 = _interopRequireDefault(_launcher);

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Foxdriver {
    static attach(host, port) {
        return (0, _asyncToGenerator3.default)(function* () {
            if (typeof host !== 'string' || typeof port !== 'number') {
                throw new Error('attach() requires host and port parameter');
            }

            const browser = new _browser2.default(host, port);
            const tabs = yield browser.connect();
            return { browser, tabs };
        })();
    }

    static launch(options) {
        return _launcher2.default.launch(options);
    }
}
exports.default = Foxdriver;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJGb3hkcml2ZXIiLCJhdHRhY2giLCJob3N0IiwicG9ydCIsIkVycm9yIiwiYnJvd3NlciIsInRhYnMiLCJjb25uZWN0IiwibGF1bmNoIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVlLE1BQU1BLFNBQU4sQ0FBZ0I7QUFDM0IsV0FBYUMsTUFBYixDQUFxQkMsSUFBckIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQUE7QUFDN0IsZ0JBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFoQixJQUE0QixPQUFPQyxJQUFQLEtBQWdCLFFBQWhELEVBQTBEO0FBQ3RELHNCQUFNLElBQUlDLEtBQUosQ0FBVSwyQ0FBVixDQUFOO0FBQ0g7O0FBRUQsa0JBQU1DLFVBQVUsc0JBQVlILElBQVosRUFBa0JDLElBQWxCLENBQWhCO0FBQ0Esa0JBQU1HLE9BQU8sTUFBTUQsUUFBUUUsT0FBUixFQUFuQjtBQUNBLG1CQUFPLEVBQUVGLE9BQUYsRUFBV0MsSUFBWCxFQUFQO0FBUDZCO0FBUWhDOztBQUVELFdBQU9FLE1BQVAsQ0FBZUMsT0FBZixFQUF3QjtBQUNwQixlQUFPLG1CQUFTRCxNQUFULENBQWdCQyxPQUFoQixDQUFQO0FBQ0g7QUFiMEI7a0JBQVZULFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF1bmNoZXIgZnJvbSAnLi9sYXVuY2hlcidcbmltcG9ydCBCcm93c2VyIGZyb20gJy4vYnJvd3NlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm94ZHJpdmVyIHtcbiAgICBzdGF0aWMgYXN5bmMgYXR0YWNoIChob3N0LCBwb3J0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaG9zdCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIHBvcnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0dGFjaCgpIHJlcXVpcmVzIGhvc3QgYW5kIHBvcnQgcGFyYW1ldGVyJylcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSBuZXcgQnJvd3Nlcihob3N0LCBwb3J0KVxuICAgICAgICBjb25zdCB0YWJzID0gYXdhaXQgYnJvd3Nlci5jb25uZWN0KClcbiAgICAgICAgcmV0dXJuIHsgYnJvd3NlciwgdGFicyB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxhdW5jaCAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gTGF1bmNoZXIubGF1bmNoKG9wdGlvbnMpXG4gICAgfVxufVxuIl19