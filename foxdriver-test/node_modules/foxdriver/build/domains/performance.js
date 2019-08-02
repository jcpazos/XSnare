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
 * This actor wraps the Performance module at devtools/shared/shared/performance.js
 * and provides RDP definitions.
 *
 * @see devtools/shared/shared/performance.js for documentation.
 */
class Performance extends _actor2.default {
    connect(options) {
        return this.request('connect', { options });
    }

    /**
     * Checks whether or not a new recording is supported by the PerformanceFront.
     *
     * @return {Promise.Boolean}  true if it can record performance
     */
    canCurrentlyRecord(options) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this.request('canCurrentlyRecord');
            return value;
        })();
    }

    /**
     * Begins a recording session.
     *
     * @param  {Boolean}  options.withMarkers
     *                    include markers
     * @param  {Boolean}  options.withTicks
     *                    include ticks
     * @param  {Boolean}  options.withMemory
     *                    include memory
     * @param  {Boolean}  options.withAllocations
     *                    include allocations
     * @param  {Boolean}  options.allocationsSampleProbability
     *                    include allocation sample probability
     * @param  {Boolean}  options.allocationsMaxLogLength
     *                    include allocations max log length
     * @param  {Boolean}  options.bufferSize
     *                    include buffer size
     * @param  {Boolean}  options.sampleFrequency
     *                    include sample frequency
     * @param  {Boolean}  options.console
     *                    include console
     * @param  {String}   options.label
     *                    label of session recording
     * @param  {Boolean}  options.realtimeMarkers
     *                    use real time markers
     *
     * @return {Promise.<Object>} A promise that is resolved once recording has started.
     */
    startRecording(options) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { recording } = yield _this2.request('startRecording', { options });
            return recording;
        })();
    }

    /**
     * Manually ends the recording session for the corresponding PerformanceRecording.
     *
     * @param {PerformanceRecording} model
     *        The corresponding PerformanceRecording that belongs to the recording
     *        session wished to stop.
     * @return {Promise.PerformanceRecording}
     *         Returns the same model, populated with the profiling data.
     */
    stopRecording(options) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { recording } = yield _this3.request('stopRecording', { options });
            return recording;
        })();
    }

    /**
     * Checks all currently stored recording handles and returns a boolean
     * if there is a session currently being recorded.
     *
     * @return {Boolean} true if actor is currently recording
     */
    isRecording() {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { isRecording } = yield _this4.request('isRecording');
            return isRecording;
        })();
    }

    /**
     * Returns all current recordings.
     * @return {Promise.PerformanceRecording}  returns model with populated profing data
     */
    getRecordings() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { recordings } = yield _this5.request('getRecordings');
            return recordings;
        })();
    }

    /**
     * Returns the configurations set on underlying components, used in tests.
     * Returns an object with `probability`, `maxLogLength` for allocations, and
     * `features`, `threadFilters`, `entries` and `interval` for profiler.
     *
     * @return {Promise.Object}
     */
    getConfiguration() {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { config } = yield _this6.request('getConfiguration');
            return config;
        })();
    }
}
exports.default = Performance;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL3BlcmZvcm1hbmNlLmpzIl0sIm5hbWVzIjpbIlBlcmZvcm1hbmNlIiwiY29ubmVjdCIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiY2FuQ3VycmVudGx5UmVjb3JkIiwidmFsdWUiLCJzdGFydFJlY29yZGluZyIsInJlY29yZGluZyIsInN0b3BSZWNvcmRpbmciLCJpc1JlY29yZGluZyIsImdldFJlY29yZGluZ3MiLCJyZWNvcmRpbmdzIiwiZ2V0Q29uZmlndXJhdGlvbiIsImNvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7O0FBTWUsTUFBTUEsV0FBTix5QkFBZ0M7QUFDM0NDLFlBQVNDLE9BQVQsRUFBa0I7QUFDZCxlQUFPLEtBQUtDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLEVBQUVELE9BQUYsRUFBeEIsQ0FBUDtBQUNIOztBQUVEOzs7OztBQUtNRSxzQkFBTixDQUEwQkYsT0FBMUIsRUFBbUM7QUFBQTs7QUFBQTtBQUMvQixrQkFBTSxFQUFFRyxLQUFGLEtBQVksTUFBTSxNQUFLRixPQUFMLENBQWEsb0JBQWIsQ0FBeEI7QUFDQSxtQkFBT0UsS0FBUDtBQUYrQjtBQUdsQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCTUMsa0JBQU4sQ0FBc0JKLE9BQXRCLEVBQStCO0FBQUE7O0FBQUE7QUFDM0Isa0JBQU0sRUFBRUssU0FBRixLQUFnQixNQUFNLE9BQUtKLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUFFRCxPQUFGLEVBQS9CLENBQTVCO0FBQ0EsbUJBQU9LLFNBQVA7QUFGMkI7QUFHOUI7O0FBRUQ7Ozs7Ozs7OztBQVNNQyxpQkFBTixDQUFxQk4sT0FBckIsRUFBOEI7QUFBQTs7QUFBQTtBQUMxQixrQkFBTSxFQUFFSyxTQUFGLEtBQWdCLE1BQU0sT0FBS0osT0FBTCxDQUFhLGVBQWIsRUFBOEIsRUFBRUQsT0FBRixFQUE5QixDQUE1QjtBQUNBLG1CQUFPSyxTQUFQO0FBRjBCO0FBRzdCOztBQUVEOzs7Ozs7QUFNTUUsZUFBTixHQUFxQjtBQUFBOztBQUFBO0FBQ2pCLGtCQUFNLEVBQUVBLFdBQUYsS0FBa0IsTUFBTSxPQUFLTixPQUFMLENBQWEsYUFBYixDQUE5QjtBQUNBLG1CQUFPTSxXQUFQO0FBRmlCO0FBR3BCOztBQUVEOzs7O0FBSU1DLGlCQUFOLEdBQXVCO0FBQUE7O0FBQUE7QUFDbkIsa0JBQU0sRUFBRUMsVUFBRixLQUFpQixNQUFNLE9BQUtSLE9BQUwsQ0FBYSxlQUFiLENBQTdCO0FBQ0EsbUJBQU9RLFVBQVA7QUFGbUI7QUFHdEI7O0FBRUQ7Ozs7Ozs7QUFPTUMsb0JBQU4sR0FBMEI7QUFBQTs7QUFBQTtBQUN0QixrQkFBTSxFQUFFQyxNQUFGLEtBQWEsTUFBTSxPQUFLVixPQUFMLENBQWEsa0JBQWIsQ0FBekI7QUFDQSxtQkFBT1UsTUFBUDtBQUZzQjtBQUd6QjtBQTVGMEM7a0JBQTFCYixXIiwiZmlsZSI6InBlcmZvcm1hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIFRoaXMgYWN0b3Igd3JhcHMgdGhlIFBlcmZvcm1hbmNlIG1vZHVsZSBhdCBkZXZ0b29scy9zaGFyZWQvc2hhcmVkL3BlcmZvcm1hbmNlLmpzXG4gKiBhbmQgcHJvdmlkZXMgUkRQIGRlZmluaXRpb25zLlxuICpcbiAqIEBzZWUgZGV2dG9vbHMvc2hhcmVkL3NoYXJlZC9wZXJmb3JtYW5jZS5qcyBmb3IgZG9jdW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2UgZXh0ZW5kcyBBY3RvciB7XG4gICAgY29ubmVjdCAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdjb25uZWN0JywgeyBvcHRpb25zIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGEgbmV3IHJlY29yZGluZyBpcyBzdXBwb3J0ZWQgYnkgdGhlIFBlcmZvcm1hbmNlRnJvbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICB0cnVlIGlmIGl0IGNhbiByZWNvcmQgcGVyZm9ybWFuY2VcbiAgICAgKi9cbiAgICBhc3luYyBjYW5DdXJyZW50bHlSZWNvcmQgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdjYW5DdXJyZW50bHlSZWNvcmQnKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbnMgYSByZWNvcmRpbmcgc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59ICBvcHRpb25zLndpdGhNYXJrZXJzXG4gICAgICogICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgbWFya2Vyc1xuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59ICBvcHRpb25zLndpdGhUaWNrc1xuICAgICAqICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIHRpY2tzXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gIG9wdGlvbnMud2l0aE1lbW9yeVxuICAgICAqICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIG1lbW9yeVxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59ICBvcHRpb25zLndpdGhBbGxvY2F0aW9uc1xuICAgICAqICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIGFsbG9jYXRpb25zXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gIG9wdGlvbnMuYWxsb2NhdGlvbnNTYW1wbGVQcm9iYWJpbGl0eVxuICAgICAqICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIGFsbG9jYXRpb24gc2FtcGxlIHByb2JhYmlsaXR5XG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gIG9wdGlvbnMuYWxsb2NhdGlvbnNNYXhMb2dMZW5ndGhcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZSBhbGxvY2F0aW9ucyBtYXggbG9nIGxlbmd0aFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59ICBvcHRpb25zLmJ1ZmZlclNpemVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZSBidWZmZXIgc2l6ZVxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59ICBvcHRpb25zLnNhbXBsZUZyZXF1ZW5jeVxuICAgICAqICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIHNhbXBsZSBmcmVxdWVuY3lcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSAgb3B0aW9ucy5jb25zb2xlXG4gICAgICogICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgY29uc29sZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBvcHRpb25zLmxhYmVsXG4gICAgICogICAgICAgICAgICAgICAgICAgIGxhYmVsIG9mIHNlc3Npb24gcmVjb3JkaW5nXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gIG9wdGlvbnMucmVhbHRpbWVNYXJrZXJzXG4gICAgICogICAgICAgICAgICAgICAgICAgIHVzZSByZWFsIHRpbWUgbWFya2Vyc1xuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgb25jZSByZWNvcmRpbmcgaGFzIHN0YXJ0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnRSZWNvcmRpbmcgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyByZWNvcmRpbmcgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnc3RhcnRSZWNvcmRpbmcnLCB7IG9wdGlvbnMgfSlcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hbnVhbGx5IGVuZHMgdGhlIHJlY29yZGluZyBzZXNzaW9uIGZvciB0aGUgY29ycmVzcG9uZGluZyBQZXJmb3JtYW5jZVJlY29yZGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UGVyZm9ybWFuY2VSZWNvcmRpbmd9IG1vZGVsXG4gICAgICogICAgICAgIFRoZSBjb3JyZXNwb25kaW5nIFBlcmZvcm1hbmNlUmVjb3JkaW5nIHRoYXQgYmVsb25ncyB0byB0aGUgcmVjb3JkaW5nXG4gICAgICogICAgICAgIHNlc3Npb24gd2lzaGVkIHRvIHN0b3AuXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5QZXJmb3JtYW5jZVJlY29yZGluZ31cbiAgICAgKiAgICAgICAgIFJldHVybnMgdGhlIHNhbWUgbW9kZWwsIHBvcHVsYXRlZCB3aXRoIHRoZSBwcm9maWxpbmcgZGF0YS5cbiAgICAgKi9cbiAgICBhc3luYyBzdG9wUmVjb3JkaW5nIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgcmVjb3JkaW5nIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3N0b3BSZWNvcmRpbmcnLCB7IG9wdGlvbnMgfSlcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBhbGwgY3VycmVudGx5IHN0b3JlZCByZWNvcmRpbmcgaGFuZGxlcyBhbmQgcmV0dXJucyBhIGJvb2xlYW5cbiAgICAgKiBpZiB0aGVyZSBpcyBhIHNlc3Npb24gY3VycmVudGx5IGJlaW5nIHJlY29yZGVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhY3RvciBpcyBjdXJyZW50bHkgcmVjb3JkaW5nXG4gICAgICovXG4gICAgYXN5bmMgaXNSZWNvcmRpbmcgKCkge1xuICAgICAgICBjb25zdCB7IGlzUmVjb3JkaW5nIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2lzUmVjb3JkaW5nJylcbiAgICAgICAgcmV0dXJuIGlzUmVjb3JkaW5nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgY3VycmVudCByZWNvcmRpbmdzLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuUGVyZm9ybWFuY2VSZWNvcmRpbmd9ICByZXR1cm5zIG1vZGVsIHdpdGggcG9wdWxhdGVkIHByb2ZpbmcgZGF0YVxuICAgICAqL1xuICAgIGFzeW5jIGdldFJlY29yZGluZ3MgKCkge1xuICAgICAgICBjb25zdCB7IHJlY29yZGluZ3MgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0UmVjb3JkaW5ncycpXG4gICAgICAgIHJldHVybiByZWNvcmRpbmdzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29uZmlndXJhdGlvbnMgc2V0IG9uIHVuZGVybHlpbmcgY29tcG9uZW50cywgdXNlZCBpbiB0ZXN0cy5cbiAgICAgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGBwcm9iYWJpbGl0eWAsIGBtYXhMb2dMZW5ndGhgIGZvciBhbGxvY2F0aW9ucywgYW5kXG4gICAgICogYGZlYXR1cmVzYCwgYHRocmVhZEZpbHRlcnNgLCBgZW50cmllc2AgYW5kIGBpbnRlcnZhbGAgZm9yIHByb2ZpbGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5PYmplY3R9XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q29uZmlndXJhdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHsgY29uZmlnIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldENvbmZpZ3VyYXRpb24nKVxuICAgICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxufVxuIl19