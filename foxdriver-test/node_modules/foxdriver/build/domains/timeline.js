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
 * The timeline actor pops and forwards timeline markers registered in docshells.
 */
class Timeline extends _actor2.default {
    /**
     * Are we recording profile markers currently?
     *
     * @return {Promise.Boolean}  true if actor is profiling
     */
    isRecording() {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this.request('isRecording');
            return value;
        })();
    }

    /**
     * Start recording profile markers.
     *
     * @param {Boolean} withMarkers
     *        Boolean indicating whether or not timeline markers are emitted
     *        once they're accumulated every `DEFAULT_TIMELINE_DATA_PULL_TIMEOUT`
     *        milliseconds.
     * @param {Boolean} withTicks
     *        Boolean indicating whether a `ticks` event is fired and a
     *        FramerateActor is created.
     * @param {Boolean} withMemory
     *        Boolean indiciating whether we want memory measurements sampled.
     * @param {Boolean} withFrames
     *        Boolean indicating whether or not stack frames should be handled
     *        from timeline markers.
     * @param {Boolean} withGCEvents
     *        Boolean indicating whether or not GC markers should be emitted.
     *        TODO: Remove these fake GC markers altogether in bug 1198127.
     * @param {Boolean} withDocLoadingEvents
     *        Boolean indicating whether or not DOMContentLoaded and Load
     *        marker events are emitted.
     * @return {Promise.Number}  start time of recording
     */
    start(withMarkers, withTicks, withMemory, withFrames, withGCEvents, withDocLoadingEvents) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this2.request('start', {
                withMarkers, withTicks, withMemory, withFrames, withGCEvents, withDocLoadingEvents
            });
            return value;
        })();
    }

    /**
     * Stop recording profile markers.
     *
     * @return {Promise.Number}  end time of recording
     */
    stop() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this3.request('stop');
            return value;
        })();
    }
}
exports.default = Timeline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL3RpbWVsaW5lLmpzIl0sIm5hbWVzIjpbIlRpbWVsaW5lIiwiaXNSZWNvcmRpbmciLCJ2YWx1ZSIsInJlcXVlc3QiLCJzdGFydCIsIndpdGhNYXJrZXJzIiwid2l0aFRpY2tzIiwid2l0aE1lbW9yeSIsIndpdGhGcmFtZXMiLCJ3aXRoR0NFdmVudHMiLCJ3aXRoRG9jTG9hZGluZ0V2ZW50cyIsInN0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLFFBQU4seUJBQTZCO0FBQ3hDOzs7OztBQUtNQyxlQUFOLEdBQXFCO0FBQUE7O0FBQUE7QUFDakIsa0JBQU0sRUFBRUMsS0FBRixLQUFZLE1BQU0sTUFBS0MsT0FBTCxDQUFhLGFBQWIsQ0FBeEI7QUFDQSxtQkFBT0QsS0FBUDtBQUZpQjtBQUdwQjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Qk1FLFNBQU4sQ0FBYUMsV0FBYixFQUEwQkMsU0FBMUIsRUFBcUNDLFVBQXJDLEVBQWlEQyxVQUFqRCxFQUE2REMsWUFBN0QsRUFBMkVDLG9CQUEzRSxFQUFpRztBQUFBOztBQUFBO0FBQzdGLGtCQUFNLEVBQUVSLEtBQUYsS0FBWSxNQUFNLE9BQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCO0FBQzFDRSwyQkFEMEMsRUFDN0JDLFNBRDZCLEVBQ2xCQyxVQURrQixFQUNOQyxVQURNLEVBQ01DLFlBRE4sRUFDb0JDO0FBRHBCLGFBQXRCLENBQXhCO0FBR0EsbUJBQU9SLEtBQVA7QUFKNkY7QUFLaEc7O0FBRUQ7Ozs7O0FBS01TLFFBQU4sR0FBYztBQUFBOztBQUFBO0FBQ1Ysa0JBQU0sRUFBRVQsS0FBRixLQUFZLE1BQU0sT0FBS0MsT0FBTCxDQUFhLE1BQWIsQ0FBeEI7QUFDQSxtQkFBT0QsS0FBUDtBQUZVO0FBR2I7QUFqRHVDO2tCQUF2QkYsUSIsImZpbGUiOiJ0aW1lbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuLi9hY3RvcidcblxuLyoqXG4gKiBUaGUgdGltZWxpbmUgYWN0b3IgcG9wcyBhbmQgZm9yd2FyZHMgdGltZWxpbmUgbWFya2VycyByZWdpc3RlcmVkIGluIGRvY3NoZWxscy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZWxpbmUgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogQXJlIHdlIHJlY29yZGluZyBwcm9maWxlIG1hcmtlcnMgY3VycmVudGx5P1xuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5Cb29sZWFufSAgdHJ1ZSBpZiBhY3RvciBpcyBwcm9maWxpbmdcbiAgICAgKi9cbiAgICBhc3luYyBpc1JlY29yZGluZyAoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnaXNSZWNvcmRpbmcnKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCByZWNvcmRpbmcgcHJvZmlsZSBtYXJrZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB3aXRoTWFya2Vyc1xuICAgICAqICAgICAgICBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgdGltZWxpbmUgbWFya2VycyBhcmUgZW1pdHRlZFxuICAgICAqICAgICAgICBvbmNlIHRoZXkncmUgYWNjdW11bGF0ZWQgZXZlcnkgYERFRkFVTFRfVElNRUxJTkVfREFUQV9QVUxMX1RJTUVPVVRgXG4gICAgICogICAgICAgIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhUaWNrc1xuICAgICAqICAgICAgICBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIGB0aWNrc2AgZXZlbnQgaXMgZmlyZWQgYW5kIGFcbiAgICAgKiAgICAgICAgRnJhbWVyYXRlQWN0b3IgaXMgY3JlYXRlZC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhNZW1vcnlcbiAgICAgKiAgICAgICAgQm9vbGVhbiBpbmRpY2lhdGluZyB3aGV0aGVyIHdlIHdhbnQgbWVtb3J5IG1lYXN1cmVtZW50cyBzYW1wbGVkLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2l0aEZyYW1lc1xuICAgICAqICAgICAgICBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3Qgc3RhY2sgZnJhbWVzIHNob3VsZCBiZSBoYW5kbGVkXG4gICAgICogICAgICAgIGZyb20gdGltZWxpbmUgbWFya2Vycy5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdpdGhHQ0V2ZW50c1xuICAgICAqICAgICAgICBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgR0MgbWFya2VycyBzaG91bGQgYmUgZW1pdHRlZC5cbiAgICAgKiAgICAgICAgVE9ETzogUmVtb3ZlIHRoZXNlIGZha2UgR0MgbWFya2VycyBhbHRvZ2V0aGVyIGluIGJ1ZyAxMTk4MTI3LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2l0aERvY0xvYWRpbmdFdmVudHNcbiAgICAgKiAgICAgICAgQm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgb3Igbm90IERPTUNvbnRlbnRMb2FkZWQgYW5kIExvYWRcbiAgICAgKiAgICAgICAgbWFya2VyIGV2ZW50cyBhcmUgZW1pdHRlZC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk51bWJlcn0gIHN0YXJ0IHRpbWUgb2YgcmVjb3JkaW5nXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnQgKHdpdGhNYXJrZXJzLCB3aXRoVGlja3MsIHdpdGhNZW1vcnksIHdpdGhGcmFtZXMsIHdpdGhHQ0V2ZW50cywgd2l0aERvY0xvYWRpbmdFdmVudHMpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdzdGFydCcsIHtcbiAgICAgICAgICAgIHdpdGhNYXJrZXJzLCB3aXRoVGlja3MsIHdpdGhNZW1vcnksIHdpdGhGcmFtZXMsIHdpdGhHQ0V2ZW50cywgd2l0aERvY0xvYWRpbmdFdmVudHNcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCByZWNvcmRpbmcgcHJvZmlsZSBtYXJrZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5OdW1iZXJ9ICBlbmQgdGltZSBvZiByZWNvcmRpbmdcbiAgICAgKi9cbiAgICBhc3luYyBzdG9wICgpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdzdG9wJylcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxufVxuIl19