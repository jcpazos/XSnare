'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This actor overrides various browser features to simulate different environments to
 * test how pages perform under various conditions.
 *
 * The design below, which saves the previous value of each property before setting, is
 * needed because it's possible to have multiple copies of this actor for a single page.
 * When some instance of this actor changes a property, we want it to be able to restore
 * that property to the way it was found before the change.
 *
 * A subtle aspect of the code below is that all get* methods must return non-undefined
 * values, so that the absence of a previous value can be distinguished from the value for
 * "no override" for each of the properties.
 */
class Emulation extends _actor2.default {
    /**
     * overwrite DPPX value
     *
     * @param  {Nimber}  dppx     dppx value
     * @return {Promise.Boolean}  true if value has changed
     */
    setDPPXOverride(dppx) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this.request('setDPPXOverride', { dppx });
            return valueChanged;
        })();
    }

    /**
     * get current DPPX value
     *
     * @return {Promise.Number}  current dppx value
     */
    getDPPXOverride() {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { dppx } = yield _this2.request('getDPPXOverride');
            return dppx;
        })();
    }

    /**
     * clear DPPX value
     *
     * @return {Promise.Boolean}  true if value has changed
     */
    clearDPPXOverride() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this3.request('clearDPPXOverride');
            return valueChanged;
        })();
    }

    /**
     * Transform the RDP format into the internal format and then set network throttling.
     *
     * @param  {Number}  downloadThroughput  throughput in byte/s
     * @param  {Number}  uploadThroughput    throughput in byte/s
     * @param  {Number}  latency             latency time in ms
     * @return {Promise.Boolean}             true if value has changed
     */
    setNetworkThrottling(downloadThroughput, uploadThroughput, latency) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this4.request('setNetworkThrottling', {
                options: {
                    downloadThroughput,
                    uploadThroughput,
                    latency
                }
            });
            return valueChanged;
        })();
    }

    /**
     * Get network throttling and then transform the internal format into the RDP format.
     *
     * @return {Promise.<Object>}  state of current throttle
     */
    getNetworkThrottling() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { state } = yield _this5.request('getNetworkThrottling');
            return state;
        })();
    }

    /**
     * clear network throttling
     *
     * @return {Promise.Boolean}   true if value has changed
     */
    clearNetworkThrottling() {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this6.request('clearNetworkThrottling');
            return valueChanged;
        })();
    }

    /**
     * overwrite touch events
     *
     * @param  {Boolean}  flag    true if overwrite is enabled
     * @return {Promise.Boolean}  true if value has changed
     */
    setTouchEventsOverride(flag) {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this7.request('setTouchEventsOverride', { flag });
            return valueChanged;
        })();
    }

    /**
     * check if touch event overwrite is enabled
     *
     * @return {Promise.Boolean}  true if enabled
     */
    getTouchEventsOverride() {
        var _this8 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { flag } = yield _this8.request('getTouchEventsOverride');
            return flag;
        })();
    }

    /**
     * clear state of touch event overwrite
     *
     * @return {Promise.Boolean}  true if enabled
     */
    clearTouchEventsOverride() {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this9.request('clearTouchEventsOverride');
            return valueChanged;
        })();
    }

    /**
     * Overwrite user agent
     *
     * @param  {String}  userAgent  new user agent
     * @return {Promise.Boolean}    true if value has changed
     */
    setUserAgentOverride(userAgent) {
        var _this10 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this10.request('setUserAgentOverride', { flag: userAgent });
            return valueChanged;
        })();
    }

    /**
     * Get current user agent overwrite
     *
     * @return {Promise.String}  current user agent
     */
    getUserAgentOverride() {
        var _this11 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { userAgent } = yield _this11.request('getUserAgentOverride');
            return userAgent;
        })();
    }

    /**
     * Clear user agent overwrite
     *
     * @return {Promise.Boolean}    true if value has changed
     */
    clearUserAgentOverride() {
        var _this12 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { valueChanged } = yield _this12.request('clearUserAgentOverride');
            return valueChanged;
        })();
    }
}
exports.default = Emulation;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2VtdWxhdGlvbi5qcyJdLCJuYW1lcyI6WyJFbXVsYXRpb24iLCJzZXREUFBYT3ZlcnJpZGUiLCJkcHB4IiwidmFsdWVDaGFuZ2VkIiwicmVxdWVzdCIsImdldERQUFhPdmVycmlkZSIsImNsZWFyRFBQWE92ZXJyaWRlIiwic2V0TmV0d29ya1Rocm90dGxpbmciLCJkb3dubG9hZFRocm91Z2hwdXQiLCJ1cGxvYWRUaHJvdWdocHV0IiwibGF0ZW5jeSIsIm9wdGlvbnMiLCJnZXROZXR3b3JrVGhyb3R0bGluZyIsInN0YXRlIiwiY2xlYXJOZXR3b3JrVGhyb3R0bGluZyIsInNldFRvdWNoRXZlbnRzT3ZlcnJpZGUiLCJmbGFnIiwiZ2V0VG91Y2hFdmVudHNPdmVycmlkZSIsImNsZWFyVG91Y2hFdmVudHNPdmVycmlkZSIsInNldFVzZXJBZ2VudE92ZXJyaWRlIiwidXNlckFnZW50IiwiZ2V0VXNlckFnZW50T3ZlcnJpZGUiLCJjbGVhclVzZXJBZ2VudE92ZXJyaWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYWUsTUFBTUEsU0FBTix5QkFBOEI7QUFDekM7Ozs7OztBQU1NQyxtQkFBTixDQUF1QkMsSUFBdkIsRUFBNkI7QUFBQTs7QUFBQTtBQUN6QixrQkFBTSxFQUFFQyxZQUFGLEtBQW1CLE1BQU0sTUFBS0MsT0FBTCxDQUFhLGlCQUFiLEVBQWdDLEVBQUVGLElBQUYsRUFBaEMsQ0FBL0I7QUFDQSxtQkFBT0MsWUFBUDtBQUZ5QjtBQUc1Qjs7QUFFRDs7Ozs7QUFLTUUsbUJBQU4sR0FBeUI7QUFBQTs7QUFBQTtBQUNyQixrQkFBTSxFQUFFSCxJQUFGLEtBQVcsTUFBTSxPQUFLRSxPQUFMLENBQWEsaUJBQWIsQ0FBdkI7QUFDQSxtQkFBT0YsSUFBUDtBQUZxQjtBQUd4Qjs7QUFFRDs7Ozs7QUFLTUkscUJBQU4sR0FBMkI7QUFBQTs7QUFBQTtBQUN2QixrQkFBTSxFQUFFSCxZQUFGLEtBQW1CLE1BQU0sT0FBS0MsT0FBTCxDQUFhLG1CQUFiLENBQS9CO0FBQ0EsbUJBQU9ELFlBQVA7QUFGdUI7QUFHMUI7O0FBRUQ7Ozs7Ozs7O0FBUU1JLHdCQUFOLENBQTRCQyxrQkFBNUIsRUFBZ0RDLGdCQUFoRCxFQUFrRUMsT0FBbEUsRUFBMkU7QUFBQTs7QUFBQTtBQUN2RSxrQkFBTSxFQUFFUCxZQUFGLEtBQW1CLE1BQU0sT0FBS0MsT0FBTCxDQUFhLHNCQUFiLEVBQXFDO0FBQ2hFTyx5QkFBUztBQUNMSCxzQ0FESztBQUVMQyxvQ0FGSztBQUdMQztBQUhLO0FBRHVELGFBQXJDLENBQS9CO0FBT0EsbUJBQU9QLFlBQVA7QUFSdUU7QUFTMUU7O0FBRUQ7Ozs7O0FBS01TLHdCQUFOLEdBQThCO0FBQUE7O0FBQUE7QUFDMUIsa0JBQU0sRUFBRUMsS0FBRixLQUFZLE1BQU0sT0FBS1QsT0FBTCxDQUFhLHNCQUFiLENBQXhCO0FBQ0EsbUJBQU9TLEtBQVA7QUFGMEI7QUFHN0I7O0FBRUQ7Ozs7O0FBS01DLDBCQUFOLEdBQWdDO0FBQUE7O0FBQUE7QUFDNUIsa0JBQU0sRUFBRVgsWUFBRixLQUFtQixNQUFNLE9BQUtDLE9BQUwsQ0FBYSx3QkFBYixDQUEvQjtBQUNBLG1CQUFPRCxZQUFQO0FBRjRCO0FBRy9COztBQUVEOzs7Ozs7QUFNTVksMEJBQU4sQ0FBOEJDLElBQTlCLEVBQW9DO0FBQUE7O0FBQUE7QUFDaEMsa0JBQU0sRUFBRWIsWUFBRixLQUFtQixNQUFNLE9BQUtDLE9BQUwsQ0FBYSx3QkFBYixFQUF1QyxFQUFFWSxJQUFGLEVBQXZDLENBQS9CO0FBQ0EsbUJBQU9iLFlBQVA7QUFGZ0M7QUFHbkM7O0FBRUQ7Ozs7O0FBS01jLDBCQUFOLEdBQWdDO0FBQUE7O0FBQUE7QUFDNUIsa0JBQU0sRUFBRUQsSUFBRixLQUFXLE1BQU0sT0FBS1osT0FBTCxDQUFhLHdCQUFiLENBQXZCO0FBQ0EsbUJBQU9ZLElBQVA7QUFGNEI7QUFHL0I7O0FBRUQ7Ozs7O0FBS01FLDRCQUFOLEdBQWtDO0FBQUE7O0FBQUE7QUFDOUIsa0JBQU0sRUFBRWYsWUFBRixLQUFtQixNQUFNLE9BQUtDLE9BQUwsQ0FBYSwwQkFBYixDQUEvQjtBQUNBLG1CQUFPRCxZQUFQO0FBRjhCO0FBR2pDOztBQUVEOzs7Ozs7QUFNTWdCLHdCQUFOLENBQTRCQyxTQUE1QixFQUF1QztBQUFBOztBQUFBO0FBQ25DLGtCQUFNLEVBQUVqQixZQUFGLEtBQW1CLE1BQU0sUUFBS0MsT0FBTCxDQUFhLHNCQUFiLEVBQXFDLEVBQUVZLE1BQU1JLFNBQVIsRUFBckMsQ0FBL0I7QUFDQSxtQkFBT2pCLFlBQVA7QUFGbUM7QUFHdEM7O0FBRUQ7Ozs7O0FBS01rQix3QkFBTixHQUE4QjtBQUFBOztBQUFBO0FBQzFCLGtCQUFNLEVBQUVELFNBQUYsS0FBZ0IsTUFBTSxRQUFLaEIsT0FBTCxDQUFhLHNCQUFiLENBQTVCO0FBQ0EsbUJBQU9nQixTQUFQO0FBRjBCO0FBRzdCOztBQUVEOzs7OztBQUtNRSwwQkFBTixHQUFnQztBQUFBOztBQUFBO0FBQzVCLGtCQUFNLEVBQUVuQixZQUFGLEtBQW1CLE1BQU0sUUFBS0MsT0FBTCxDQUFhLHdCQUFiLENBQS9CO0FBQ0EsbUJBQU9ELFlBQVA7QUFGNEI7QUFHL0I7QUFuSXdDO2tCQUF4QkgsUyIsImZpbGUiOiJlbXVsYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbi8qKlxuICogVGhpcyBhY3RvciBvdmVycmlkZXMgdmFyaW91cyBicm93c2VyIGZlYXR1cmVzIHRvIHNpbXVsYXRlIGRpZmZlcmVudCBlbnZpcm9ubWVudHMgdG9cbiAqIHRlc3QgaG93IHBhZ2VzIHBlcmZvcm0gdW5kZXIgdmFyaW91cyBjb25kaXRpb25zLlxuICpcbiAqIFRoZSBkZXNpZ24gYmVsb3csIHdoaWNoIHNhdmVzIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiBlYWNoIHByb3BlcnR5IGJlZm9yZSBzZXR0aW5nLCBpc1xuICogbmVlZGVkIGJlY2F1c2UgaXQncyBwb3NzaWJsZSB0byBoYXZlIG11bHRpcGxlIGNvcGllcyBvZiB0aGlzIGFjdG9yIGZvciBhIHNpbmdsZSBwYWdlLlxuICogV2hlbiBzb21lIGluc3RhbmNlIG9mIHRoaXMgYWN0b3IgY2hhbmdlcyBhIHByb3BlcnR5LCB3ZSB3YW50IGl0IHRvIGJlIGFibGUgdG8gcmVzdG9yZVxuICogdGhhdCBwcm9wZXJ0eSB0byB0aGUgd2F5IGl0IHdhcyBmb3VuZCBiZWZvcmUgdGhlIGNoYW5nZS5cbiAqXG4gKiBBIHN1YnRsZSBhc3BlY3Qgb2YgdGhlIGNvZGUgYmVsb3cgaXMgdGhhdCBhbGwgZ2V0KiBtZXRob2RzIG11c3QgcmV0dXJuIG5vbi11bmRlZmluZWRcbiAqIHZhbHVlcywgc28gdGhhdCB0aGUgYWJzZW5jZSBvZiBhIHByZXZpb3VzIHZhbHVlIGNhbiBiZSBkaXN0aW5ndWlzaGVkIGZyb20gdGhlIHZhbHVlIGZvclxuICogXCJubyBvdmVycmlkZVwiIGZvciBlYWNoIG9mIHRoZSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbXVsYXRpb24gZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogb3ZlcndyaXRlIERQUFggdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05pbWJlcn0gIGRwcHggICAgIGRwcHggdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICB0cnVlIGlmIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgYXN5bmMgc2V0RFBQWE92ZXJyaWRlIChkcHB4KSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWVDaGFuZ2VkIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3NldERQUFhPdmVycmlkZScsIHsgZHBweCB9KVxuICAgICAgICByZXR1cm4gdmFsdWVDaGFuZ2VkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IGN1cnJlbnQgRFBQWCB2YWx1ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5OdW1iZXJ9ICBjdXJyZW50IGRwcHggdmFsdWVcbiAgICAgKi9cbiAgICBhc3luYyBnZXREUFBYT3ZlcnJpZGUgKCkge1xuICAgICAgICBjb25zdCB7IGRwcHggfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0RFBQWE92ZXJyaWRlJylcbiAgICAgICAgcmV0dXJuIGRwcHhcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbGVhciBEUFBYIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICB0cnVlIGlmIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgYXN5bmMgY2xlYXJEUFBYT3ZlcnJpZGUgKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlQ2hhbmdlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdjbGVhckRQUFhPdmVycmlkZScpXG4gICAgICAgIHJldHVybiB2YWx1ZUNoYW5nZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhlIFJEUCBmb3JtYXQgaW50byB0aGUgaW50ZXJuYWwgZm9ybWF0IGFuZCB0aGVuIHNldCBuZXR3b3JrIHRocm90dGxpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBkb3dubG9hZFRocm91Z2hwdXQgIHRocm91Z2hwdXQgaW4gYnl0ZS9zXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgdXBsb2FkVGhyb3VnaHB1dCAgICB0aHJvdWdocHV0IGluIGJ5dGUvc1xuICAgICAqIEBwYXJhbSAge051bWJlcn0gIGxhdGVuY3kgICAgICAgICAgICAgbGF0ZW5jeSB0aW1lIGluIG1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5Cb29sZWFufSAgICAgICAgICAgICB0cnVlIGlmIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgYXN5bmMgc2V0TmV0d29ya1Rocm90dGxpbmcgKGRvd25sb2FkVGhyb3VnaHB1dCwgdXBsb2FkVGhyb3VnaHB1dCwgbGF0ZW5jeSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlQ2hhbmdlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdzZXROZXR3b3JrVGhyb3R0bGluZycsIHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBkb3dubG9hZFRocm91Z2hwdXQsXG4gICAgICAgICAgICAgICAgdXBsb2FkVGhyb3VnaHB1dCxcbiAgICAgICAgICAgICAgICBsYXRlbmN5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB2YWx1ZUNoYW5nZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmV0d29yayB0aHJvdHRsaW5nIGFuZCB0aGVuIHRyYW5zZm9ybSB0aGUgaW50ZXJuYWwgZm9ybWF0IGludG8gdGhlIFJEUCBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgc3RhdGUgb2YgY3VycmVudCB0aHJvdHRsZVxuICAgICAqL1xuICAgIGFzeW5jIGdldE5ldHdvcmtUaHJvdHRsaW5nICgpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXROZXR3b3JrVGhyb3R0bGluZycpXG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsZWFyIG5ldHdvcmsgdGhyb3R0bGluZ1xuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5Cb29sZWFufSAgIHRydWUgaWYgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICAgKi9cbiAgICBhc3luYyBjbGVhck5ldHdvcmtUaHJvdHRsaW5nICgpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZUNoYW5nZWQgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnY2xlYXJOZXR3b3JrVGhyb3R0bGluZycpXG4gICAgICAgIHJldHVybiB2YWx1ZUNoYW5nZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvdmVyd3JpdGUgdG91Y2ggZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSAgZmxhZyAgICB0cnVlIGlmIG92ZXJ3cml0ZSBpcyBlbmFibGVkXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5Cb29sZWFufSAgdHJ1ZSBpZiB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgICAqL1xuICAgIGFzeW5jIHNldFRvdWNoRXZlbnRzT3ZlcnJpZGUgKGZsYWcpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZUNoYW5nZWQgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnc2V0VG91Y2hFdmVudHNPdmVycmlkZScsIHsgZmxhZyB9KVxuICAgICAgICByZXR1cm4gdmFsdWVDaGFuZ2VkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgdG91Y2ggZXZlbnQgb3ZlcndyaXRlIGlzIGVuYWJsZWRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuQm9vbGVhbn0gIHRydWUgaWYgZW5hYmxlZFxuICAgICAqL1xuICAgIGFzeW5jIGdldFRvdWNoRXZlbnRzT3ZlcnJpZGUgKCkge1xuICAgICAgICBjb25zdCB7IGZsYWcgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0VG91Y2hFdmVudHNPdmVycmlkZScpXG4gICAgICAgIHJldHVybiBmbGFnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xlYXIgc3RhdGUgb2YgdG91Y2ggZXZlbnQgb3ZlcndyaXRlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICB0cnVlIGlmIGVuYWJsZWRcbiAgICAgKi9cbiAgICBhc3luYyBjbGVhclRvdWNoRXZlbnRzT3ZlcnJpZGUgKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlQ2hhbmdlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdjbGVhclRvdWNoRXZlbnRzT3ZlcnJpZGUnKVxuICAgICAgICByZXR1cm4gdmFsdWVDaGFuZ2VkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcndyaXRlIHVzZXIgYWdlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIHVzZXJBZ2VudCAgbmV3IHVzZXIgYWdlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICAgIHRydWUgaWYgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICAgKi9cbiAgICBhc3luYyBzZXRVc2VyQWdlbnRPdmVycmlkZSAodXNlckFnZW50KSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWVDaGFuZ2VkIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3NldFVzZXJBZ2VudE92ZXJyaWRlJywgeyBmbGFnOiB1c2VyQWdlbnQgfSlcbiAgICAgICAgcmV0dXJuIHZhbHVlQ2hhbmdlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IHVzZXIgYWdlbnQgb3ZlcndyaXRlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLlN0cmluZ30gIGN1cnJlbnQgdXNlciBhZ2VudFxuICAgICAqL1xuICAgIGFzeW5jIGdldFVzZXJBZ2VudE92ZXJyaWRlICgpIHtcbiAgICAgICAgY29uc3QgeyB1c2VyQWdlbnQgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0VXNlckFnZW50T3ZlcnJpZGUnKVxuICAgICAgICByZXR1cm4gdXNlckFnZW50XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdXNlciBhZ2VudCBvdmVyd3JpdGVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuQm9vbGVhbn0gICAgdHJ1ZSBpZiB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgICAqL1xuICAgIGFzeW5jIGNsZWFyVXNlckFnZW50T3ZlcnJpZGUgKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlQ2hhbmdlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdjbGVhclVzZXJBZ2VudE92ZXJyaWRlJylcbiAgICAgICAgcmV0dXJuIHZhbHVlQ2hhbmdlZFxuICAgIH1cbn1cbiJdfQ==