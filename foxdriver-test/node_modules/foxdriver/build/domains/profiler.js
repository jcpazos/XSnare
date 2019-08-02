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
 * Main interface for interacting with nsIProfiler
 */
class Profiler extends _actor2.default {
  /**
   * Starts the nsIProfiler module. Doing so will discard any samples
   * that might have been accumulated so far.
   *
   * @param {Number} entries               number of entries
   * @param {Number} interval              recording interval
   * @param {Array<String>} features       list of features to include
   * @param {Array<String>} threadFilters  list of thread filters
   *
   * @return {Promise.Object}              request response
   */
  startProfiler(entries, interval, features, threadFilters) {
    return this.request('startProfiler', { entries, interval, features, threadFilters });
  }

  /**
   * Attempts to stop the nsIProfiler module.
   * @return {Promise.Object}  request response
   */
  stopProfiler() {
    return this.request('stopProfiler');
  }

  /**
   * Returns all the samples accumulated since the profiler was started,
   * along with the current time. The data has the following format:
   * {
   *   libs: string,
   *   meta: {
   *     interval: number,
   *     platform: string,
   *     ...
   *   },
   *   threads: [{
   *     samples: [{
   *       frames: [{
   *         line: number,
   *         location: string,
   *         category: number
   *       } ... ],
   *       name: string
   *       responsiveness: number
   *       time: number
   *     } ... ]
   *   } ... ]
   * }
   *
   *
   * @param {Number} startTime
   *        Since the circular buffer will only grow as long as the profiler lives,
   *        the buffer can contain unwanted samples. Pass in a `startTime` to only
   *        retrieve samples that took place after the `startTime`, with 0 being
   *        when the profiler just started.
   * @param {Boolean} stringify
   *        Whether or not the returned profile object should be a string or not to
   *        save JSON parse/stringify cycle if emitting over RDP.
   */
  getProfile(startTime, stringify) {
    return this.request('getProfile', { startTime, stringify });
  }

  /**
   * Returns an array of feature strings, describing the profiler features
   * that are available on this platform. Can be called while the profiler
   * is stopped.
   *
   * @return {Promise.String[]}  list of feature strings
   */
  getFeatures() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { features } = yield _this.request('getFeatures');
      return features;
    })();
  }

  /**
   * Returns an object with the values of the current status of the
   * circular buffer in the profiler, returning `position`, `totalSize`,
   * and the current `generation` of the buffer.
   *
   * @return {Promise.Object}  current status of the circular buffer
   */
  getBufferInfo() {
    return this.request('getBufferInfo');
  }

  /**
   * Returns the configuration used that was originally passed in to start up the
   * profiler. Used for tests, and does not account for others using nsIProfiler.
   *
   * @return {Promise.Object}  profiler configurations
   */
  getStartOptions() {
    return this.request('getStartOptions');
  }

  /**
   * Verifies whether or not the nsIProfiler module has started.
   * If already active, the current time is also returned.
   *
   * @return {Promise.Boolean}  true if nsIProfiler module has started
   */
  isActive() {
    return this.request('isActive');
  }

  /**
   * Returns an array of objects that describes the shared libraries
   * which are currently loaded into our process. Can be called while the
   * profiler is stopped.
   *
   * @return {Promise.Object[]}  list of objects that describes the shared libraries
   */
  sharedLibraries() {
    return this.request('sharedLibraries');
  }

  /**
   * Registers handlers for the following events to be emitted
   * on active Profiler instances:
   *   - "console-api-profiler"
   *   - "profiler-started"
   *   - "profiler-stopped"
   *   - "profiler-status"
   *
   * The ProfilerManager listens to all events, and individual
   * consumers filter which events they are interested in.
   *
   * @param  {String[]} events  events to listen to
   * @return {Promise}          request response
   */
  registerEventNotifications(events) {
    return this.request('registerEventNotifications', { events });
  }

  /**
   * Unregisters handlers for all system events.
   *
   * @param  {String[]} events  events to unregister of
   * @return {Promise}          request response
   */
  unregisterEventNotifications(events) {
    return this.request('unregisterEventNotifications', { events });
  }

  /**
   * Updates the frequency that the "profiler-status" event is emitted
   * during recording.
   *
   * @param {Number} interval  interval of recording
   */
  setProfilerStatusInterval(interval) {
    return this.request('setProfilerStatusInterval', { interval });
  }
}
exports.default = Profiler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL3Byb2ZpbGVyLmpzIl0sIm5hbWVzIjpbIlByb2ZpbGVyIiwic3RhcnRQcm9maWxlciIsImVudHJpZXMiLCJpbnRlcnZhbCIsImZlYXR1cmVzIiwidGhyZWFkRmlsdGVycyIsInJlcXVlc3QiLCJzdG9wUHJvZmlsZXIiLCJnZXRQcm9maWxlIiwic3RhcnRUaW1lIiwic3RyaW5naWZ5IiwiZ2V0RmVhdHVyZXMiLCJnZXRCdWZmZXJJbmZvIiwiZ2V0U3RhcnRPcHRpb25zIiwiaXNBY3RpdmUiLCJzaGFyZWRMaWJyYXJpZXMiLCJyZWdpc3RlckV2ZW50Tm90aWZpY2F0aW9ucyIsImV2ZW50cyIsInVucmVnaXN0ZXJFdmVudE5vdGlmaWNhdGlvbnMiLCJzZXRQcm9maWxlclN0YXR1c0ludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxRQUFOLHlCQUE2QjtBQUN4Qzs7Ozs7Ozs7Ozs7QUFXQUMsZ0JBQWVDLE9BQWYsRUFBd0JDLFFBQXhCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsYUFBNUMsRUFBMkQ7QUFDdkQsV0FBTyxLQUFLQyxPQUFMLENBQWEsZUFBYixFQUE4QixFQUFFSixPQUFGLEVBQVdDLFFBQVgsRUFBcUJDLFFBQXJCLEVBQStCQyxhQUEvQixFQUE5QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJQUUsaUJBQWdCO0FBQ1osV0FBTyxLQUFLRCxPQUFMLENBQWEsY0FBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0FFLGFBQVlDLFNBQVosRUFBdUJDLFNBQXZCLEVBQWtDO0FBQzlCLFdBQU8sS0FBS0osT0FBTCxDQUFhLFlBQWIsRUFBMkIsRUFBRUcsU0FBRixFQUFhQyxTQUFiLEVBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7OztBQU9NQyxhQUFOLEdBQXFCO0FBQUE7O0FBQUE7QUFDakIsWUFBTSxFQUFFUCxRQUFGLEtBQWUsTUFBTSxNQUFLRSxPQUFMLENBQWEsYUFBYixDQUEzQjtBQUNBLGFBQU9GLFFBQVA7QUFGaUI7QUFHcEI7O0FBRUQ7Ozs7Ozs7QUFPQVEsa0JBQWlCO0FBQ2IsV0FBTyxLQUFLTixPQUFMLENBQWEsZUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BTyxvQkFBbUI7QUFDZixXQUFPLEtBQUtQLE9BQUwsQ0FBYSxpQkFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BUSxhQUFZO0FBQ1IsV0FBTyxLQUFLUixPQUFMLENBQWEsVUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7QUFPQVMsb0JBQW1CO0FBQ2YsV0FBTyxLQUFLVCxPQUFMLENBQWEsaUJBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7OztBQWNBVSw2QkFBNEJDLE1BQTVCLEVBQW9DO0FBQ2hDLFdBQU8sS0FBS1gsT0FBTCxDQUFhLDRCQUFiLEVBQTJDLEVBQUVXLE1BQUYsRUFBM0MsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQUMsK0JBQThCRCxNQUE5QixFQUFzQztBQUNsQyxXQUFPLEtBQUtYLE9BQUwsQ0FBYSw4QkFBYixFQUE2QyxFQUFFVyxNQUFGLEVBQTdDLENBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBTUFFLDRCQUEyQmhCLFFBQTNCLEVBQXFDO0FBQ2pDLFdBQU8sS0FBS0csT0FBTCxDQUFhLDJCQUFiLEVBQTBDLEVBQUVILFFBQUYsRUFBMUMsQ0FBUDtBQUNIO0FBeEp1QztrQkFBdkJILFEiLCJmaWxlIjoicHJvZmlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbi8qKlxuICogTWFpbiBpbnRlcmZhY2UgZm9yIGludGVyYWN0aW5nIHdpdGggbnNJUHJvZmlsZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZmlsZXIgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSBuc0lQcm9maWxlciBtb2R1bGUuIERvaW5nIHNvIHdpbGwgZGlzY2FyZCBhbnkgc2FtcGxlc1xuICAgICAqIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIGFjY3VtdWxhdGVkIHNvIGZhci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBlbnRyaWVzICAgICAgICAgICAgICAgbnVtYmVyIG9mIGVudHJpZXNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgICAgICAgICAgICAgIHJlY29yZGluZyBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gZmVhdHVyZXMgICAgICAgbGlzdCBvZiBmZWF0dXJlcyB0byBpbmNsdWRlXG4gICAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSB0aHJlYWRGaWx0ZXJzICBsaXN0IG9mIHRocmVhZCBmaWx0ZXJzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdH0gICAgICAgICAgICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBzdGFydFByb2ZpbGVyIChlbnRyaWVzLCBpbnRlcnZhbCwgZmVhdHVyZXMsIHRocmVhZEZpbHRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc3RhcnRQcm9maWxlcicsIHsgZW50cmllcywgaW50ZXJ2YWwsIGZlYXR1cmVzLCB0aHJlYWRGaWx0ZXJzIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gc3RvcCB0aGUgbnNJUHJvZmlsZXIgbW9kdWxlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuT2JqZWN0fSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHN0b3BQcm9maWxlciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3N0b3BQcm9maWxlcicpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIHNhbXBsZXMgYWNjdW11bGF0ZWQgc2luY2UgdGhlIHByb2ZpbGVyIHdhcyBzdGFydGVkLFxuICAgICAqIGFsb25nIHdpdGggdGhlIGN1cnJlbnQgdGltZS4gVGhlIGRhdGEgaGFzIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICAgICAqIHtcbiAgICAgKiAgIGxpYnM6IHN0cmluZyxcbiAgICAgKiAgIG1ldGE6IHtcbiAgICAgKiAgICAgaW50ZXJ2YWw6IG51bWJlcixcbiAgICAgKiAgICAgcGxhdGZvcm06IHN0cmluZyxcbiAgICAgKiAgICAgLi4uXG4gICAgICogICB9LFxuICAgICAqICAgdGhyZWFkczogW3tcbiAgICAgKiAgICAgc2FtcGxlczogW3tcbiAgICAgKiAgICAgICBmcmFtZXM6IFt7XG4gICAgICogICAgICAgICBsaW5lOiBudW1iZXIsXG4gICAgICogICAgICAgICBsb2NhdGlvbjogc3RyaW5nLFxuICAgICAqICAgICAgICAgY2F0ZWdvcnk6IG51bWJlclxuICAgICAqICAgICAgIH0gLi4uIF0sXG4gICAgICogICAgICAgbmFtZTogc3RyaW5nXG4gICAgICogICAgICAgcmVzcG9uc2l2ZW5lc3M6IG51bWJlclxuICAgICAqICAgICAgIHRpbWU6IG51bWJlclxuICAgICAqICAgICB9IC4uLiBdXG4gICAgICogICB9IC4uLiBdXG4gICAgICogfVxuICAgICAqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRUaW1lXG4gICAgICogICAgICAgIFNpbmNlIHRoZSBjaXJjdWxhciBidWZmZXIgd2lsbCBvbmx5IGdyb3cgYXMgbG9uZyBhcyB0aGUgcHJvZmlsZXIgbGl2ZXMsXG4gICAgICogICAgICAgIHRoZSBidWZmZXIgY2FuIGNvbnRhaW4gdW53YW50ZWQgc2FtcGxlcy4gUGFzcyBpbiBhIGBzdGFydFRpbWVgIHRvIG9ubHlcbiAgICAgKiAgICAgICAgcmV0cmlldmUgc2FtcGxlcyB0aGF0IHRvb2sgcGxhY2UgYWZ0ZXIgdGhlIGBzdGFydFRpbWVgLCB3aXRoIDAgYmVpbmdcbiAgICAgKiAgICAgICAgd2hlbiB0aGUgcHJvZmlsZXIganVzdCBzdGFydGVkLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RyaW5naWZ5XG4gICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSByZXR1cm5lZCBwcm9maWxlIG9iamVjdCBzaG91bGQgYmUgYSBzdHJpbmcgb3Igbm90IHRvXG4gICAgICogICAgICAgIHNhdmUgSlNPTiBwYXJzZS9zdHJpbmdpZnkgY3ljbGUgaWYgZW1pdHRpbmcgb3ZlciBSRFAuXG4gICAgICovXG4gICAgZ2V0UHJvZmlsZSAoc3RhcnRUaW1lLCBzdHJpbmdpZnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0UHJvZmlsZScsIHsgc3RhcnRUaW1lLCBzdHJpbmdpZnkgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGZlYXR1cmUgc3RyaW5ncywgZGVzY3JpYmluZyB0aGUgcHJvZmlsZXIgZmVhdHVyZXNcbiAgICAgKiB0aGF0IGFyZSBhdmFpbGFibGUgb24gdGhpcyBwbGF0Zm9ybS4gQ2FuIGJlIGNhbGxlZCB3aGlsZSB0aGUgcHJvZmlsZXJcbiAgICAgKiBpcyBzdG9wcGVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5TdHJpbmdbXX0gIGxpc3Qgb2YgZmVhdHVyZSBzdHJpbmdzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RmVhdHVyZXMgKCkge1xuICAgICAgICBjb25zdCB7IGZlYXR1cmVzIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldEZlYXR1cmVzJylcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgdmFsdWVzIG9mIHRoZSBjdXJyZW50IHN0YXR1cyBvZiB0aGVcbiAgICAgKiBjaXJjdWxhciBidWZmZXIgaW4gdGhlIHByb2ZpbGVyLCByZXR1cm5pbmcgYHBvc2l0aW9uYCwgYHRvdGFsU2l6ZWAsXG4gICAgICogYW5kIHRoZSBjdXJyZW50IGBnZW5lcmF0aW9uYCBvZiB0aGUgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5PYmplY3R9ICBjdXJyZW50IHN0YXR1cyBvZiB0aGUgY2lyY3VsYXIgYnVmZmVyXG4gICAgICovXG4gICAgZ2V0QnVmZmVySW5mbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldEJ1ZmZlckluZm8nKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gdXNlZCB0aGF0IHdhcyBvcmlnaW5hbGx5IHBhc3NlZCBpbiB0byBzdGFydCB1cCB0aGVcbiAgICAgKiBwcm9maWxlci4gVXNlZCBmb3IgdGVzdHMsIGFuZCBkb2VzIG5vdCBhY2NvdW50IGZvciBvdGhlcnMgdXNpbmcgbnNJUHJvZmlsZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdH0gIHByb2ZpbGVyIGNvbmZpZ3VyYXRpb25zXG4gICAgICovXG4gICAgZ2V0U3RhcnRPcHRpb25zICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0U3RhcnRPcHRpb25zJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGUgbnNJUHJvZmlsZXIgbW9kdWxlIGhhcyBzdGFydGVkLlxuICAgICAqIElmIGFscmVhZHkgYWN0aXZlLCB0aGUgY3VycmVudCB0aW1lIGlzIGFsc28gcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICB0cnVlIGlmIG5zSVByb2ZpbGVyIG1vZHVsZSBoYXMgc3RhcnRlZFxuICAgICAqL1xuICAgIGlzQWN0aXZlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnaXNBY3RpdmUnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGRlc2NyaWJlcyB0aGUgc2hhcmVkIGxpYnJhcmllc1xuICAgICAqIHdoaWNoIGFyZSBjdXJyZW50bHkgbG9hZGVkIGludG8gb3VyIHByb2Nlc3MuIENhbiBiZSBjYWxsZWQgd2hpbGUgdGhlXG4gICAgICogcHJvZmlsZXIgaXMgc3RvcHBlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuT2JqZWN0W119ICBsaXN0IG9mIG9iamVjdHMgdGhhdCBkZXNjcmliZXMgdGhlIHNoYXJlZCBsaWJyYXJpZXNcbiAgICAgKi9cbiAgICBzaGFyZWRMaWJyYXJpZXMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdzaGFyZWRMaWJyYXJpZXMnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBoYW5kbGVycyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHMgdG8gYmUgZW1pdHRlZFxuICAgICAqIG9uIGFjdGl2ZSBQcm9maWxlciBpbnN0YW5jZXM6XG4gICAgICogICAtIFwiY29uc29sZS1hcGktcHJvZmlsZXJcIlxuICAgICAqICAgLSBcInByb2ZpbGVyLXN0YXJ0ZWRcIlxuICAgICAqICAgLSBcInByb2ZpbGVyLXN0b3BwZWRcIlxuICAgICAqICAgLSBcInByb2ZpbGVyLXN0YXR1c1wiXG4gICAgICpcbiAgICAgKiBUaGUgUHJvZmlsZXJNYW5hZ2VyIGxpc3RlbnMgdG8gYWxsIGV2ZW50cywgYW5kIGluZGl2aWR1YWxcbiAgICAgKiBjb25zdW1lcnMgZmlsdGVyIHdoaWNoIGV2ZW50cyB0aGV5IGFyZSBpbnRlcmVzdGVkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nW119IGV2ZW50cyAgZXZlbnRzIHRvIGxpc3RlbiB0b1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICByZWdpc3RlckV2ZW50Tm90aWZpY2F0aW9ucyAoZXZlbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3JlZ2lzdGVyRXZlbnROb3RpZmljYXRpb25zJywgeyBldmVudHMgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVycyBoYW5kbGVycyBmb3IgYWxsIHN5c3RlbSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmdbXX0gZXZlbnRzICBldmVudHMgdG8gdW5yZWdpc3RlciBvZlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyRXZlbnROb3RpZmljYXRpb25zIChldmVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgndW5yZWdpc3RlckV2ZW50Tm90aWZpY2F0aW9ucycsIHsgZXZlbnRzIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZnJlcXVlbmN5IHRoYXQgdGhlIFwicHJvZmlsZXItc3RhdHVzXCIgZXZlbnQgaXMgZW1pdHRlZFxuICAgICAqIGR1cmluZyByZWNvcmRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgIGludGVydmFsIG9mIHJlY29yZGluZ1xuICAgICAqL1xuICAgIHNldFByb2ZpbGVyU3RhdHVzSW50ZXJ2YWwgKGludGVydmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3NldFByb2ZpbGVyU3RhdHVzSW50ZXJ2YWwnLCB7IGludGVydmFsIH0pXG4gICAgfVxufVxuIl19