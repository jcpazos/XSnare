'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Logger;

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * levels that are available from `npmlog`
 */
const NPM_LEVELS = ['silly', 'verbose', 'debug', 'info', 'http', 'warn', 'error', 'chrome', 'firefox'];
_npmlog2.default.addLevel('debug', 1000, { fg: 'blue', bg: 'black' }, 'dbug');

function Logger(component) {
    const wrappedLogger = {};
    const prefix = _package2.default.name + (component ? `:${component}` : '');

    /**
     * allow access to the level of the underlying logger
     */
    Object.defineProperty(wrappedLogger, 'level', {
        get: () => {
            return _npmlog2.default.level;
        },
        set: newValue => {
            _npmlog2.default.level = newValue;
        },
        enumerable: true,
        configurable: true
    });

    /**
     * add all the levels from `npmlog`, and map to the underlying logger
     */
    for (let level of NPM_LEVELS) {
        wrappedLogger[level] = (...args) => {
            if (!process.env.DEBUG) return;
            return _npmlog2.default[level](prefix, ...args);
        };
    }

    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        wrappedLogger.level = 'verbose';
    }

    wrappedLogger.levels = NPM_LEVELS;
    return wrappedLogger;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9sb2dnZXIuanMiXSwibmFtZXMiOlsiTG9nZ2VyIiwiTlBNX0xFVkVMUyIsImFkZExldmVsIiwiZmciLCJiZyIsImNvbXBvbmVudCIsIndyYXBwZWRMb2dnZXIiLCJwcmVmaXgiLCJuYW1lIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJsZXZlbCIsInNldCIsIm5ld1ZhbHVlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImFyZ3MiLCJwcm9jZXNzIiwiZW52IiwiREVCVUciLCJOT0RFX0VOViIsImxldmVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBU3dCQSxNOztBQVR4Qjs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR0EsTUFBTUMsYUFBYSxDQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLE9BQXJCLEVBQThCLE1BQTlCLEVBQXNDLE1BQXRDLEVBQThDLE1BQTlDLEVBQXNELE9BQXRELEVBQStELFFBQS9ELEVBQXlFLFNBQXpFLENBQW5CO0FBQ0EsaUJBQU9DLFFBQVAsQ0FBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsRUFBRUMsSUFBSSxNQUFOLEVBQWNDLElBQUksT0FBbEIsRUFBL0IsRUFBNEQsTUFBNUQ7O0FBRWUsU0FBU0osTUFBVCxDQUFpQkssU0FBakIsRUFBNEI7QUFDdkMsVUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsVUFBTUMsU0FBUyxrQkFBSUMsSUFBSixJQUFZSCxZQUFhLElBQUdBLFNBQVUsRUFBMUIsR0FBOEIsRUFBMUMsQ0FBZjs7QUFFQTs7O0FBR0FJLFdBQU9DLGNBQVAsQ0FBc0JKLGFBQXRCLEVBQXFDLE9BQXJDLEVBQThDO0FBQzFDSyxhQUFLLE1BQU07QUFBRSxtQkFBTyxpQkFBT0MsS0FBZDtBQUFxQixTQURRO0FBRTFDQyxhQUFNQyxRQUFELElBQWM7QUFBRSw2QkFBT0YsS0FBUCxHQUFlRSxRQUFmO0FBQXlCLFNBRko7QUFHMUNDLG9CQUFZLElBSDhCO0FBSTFDQyxzQkFBYztBQUo0QixLQUE5Qzs7QUFPQTs7O0FBR0EsU0FBSyxJQUFJSixLQUFULElBQWtCWCxVQUFsQixFQUE4QjtBQUMxQkssc0JBQWNNLEtBQWQsSUFBdUIsQ0FBQyxHQUFHSyxJQUFKLEtBQWE7QUFDaEMsZ0JBQUksQ0FBQ0MsUUFBUUMsR0FBUixDQUFZQyxLQUFqQixFQUF3QjtBQUN4QixtQkFBTyxpQkFBT1IsS0FBUCxFQUFjTCxNQUFkLEVBQXNCLEdBQUdVLElBQXpCLENBQVA7QUFDSCxTQUhEO0FBSUg7O0FBRUQsUUFBSUMsUUFBUUMsR0FBUixDQUFZRSxRQUFaLElBQXdCSCxRQUFRQyxHQUFSLENBQVlFLFFBQVosS0FBeUIsYUFBckQsRUFBb0U7QUFDaEVmLHNCQUFjTSxLQUFkLEdBQXNCLFNBQXRCO0FBQ0g7O0FBRUROLGtCQUFjZ0IsTUFBZCxHQUF1QnJCLFVBQXZCO0FBQ0EsV0FBT0ssYUFBUDtBQUNIIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBucG1sb2cgZnJvbSAnbnBtbG9nJ1xuaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG5cbi8qKlxuICogbGV2ZWxzIHRoYXQgYXJlIGF2YWlsYWJsZSBmcm9tIGBucG1sb2dgXG4gKi9cbmNvbnN0IE5QTV9MRVZFTFMgPSBbJ3NpbGx5JywgJ3ZlcmJvc2UnLCAnZGVidWcnLCAnaW5mbycsICdodHRwJywgJ3dhcm4nLCAnZXJyb3InLCAnY2hyb21lJywgJ2ZpcmVmb3gnXVxubnBtbG9nLmFkZExldmVsKCdkZWJ1ZycsIDEwMDAsIHsgZmc6ICdibHVlJywgYmc6ICdibGFjaycgfSwgJ2RidWcnKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dnZXIgKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IHdyYXBwZWRMb2dnZXIgPSB7fVxuICAgIGNvbnN0IHByZWZpeCA9IHBrZy5uYW1lICsgKGNvbXBvbmVudCA/IGA6JHtjb21wb25lbnR9YCA6ICcnKVxuXG4gICAgLyoqXG4gICAgICogYWxsb3cgYWNjZXNzIHRvIHRoZSBsZXZlbCBvZiB0aGUgdW5kZXJseWluZyBsb2dnZXJcbiAgICAgKi9cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod3JhcHBlZExvZ2dlciwgJ2xldmVsJywge1xuICAgICAgICBnZXQ6ICgpID0+IHsgcmV0dXJuIG5wbWxvZy5sZXZlbCB9LFxuICAgICAgICBzZXQ6IChuZXdWYWx1ZSkgPT4geyBucG1sb2cubGV2ZWwgPSBuZXdWYWx1ZSB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogYWRkIGFsbCB0aGUgbGV2ZWxzIGZyb20gYG5wbWxvZ2AsIGFuZCBtYXAgdG8gdGhlIHVuZGVybHlpbmcgbG9nZ2VyXG4gICAgICovXG4gICAgZm9yIChsZXQgbGV2ZWwgb2YgTlBNX0xFVkVMUykge1xuICAgICAgICB3cmFwcGVkTG9nZ2VyW2xldmVsXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByb2Nlc3MuZW52LkRFQlVHKSByZXR1cm5cbiAgICAgICAgICAgIHJldHVybiBucG1sb2dbbGV2ZWxdKHByZWZpeCwgLi4uYXJncylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICB3cmFwcGVkTG9nZ2VyLmxldmVsID0gJ3ZlcmJvc2UnXG4gICAgfVxuXG4gICAgd3JhcHBlZExvZ2dlci5sZXZlbHMgPSBOUE1fTEVWRUxTXG4gICAgcmV0dXJuIHdyYXBwZWRMb2dnZXJcbn1cbiJdfQ==