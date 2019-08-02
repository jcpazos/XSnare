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
 * An actor that returns memory usage data for its parent actor's window. A tab-scoped instance
 * of this actor will measure the memory footprint of its parent tab. A global-scoped instance
 * however, will measure the memory footprint of the chrome window referenced by the root actor.
 *
 * This actor wraps the Memory module at devtools/server/performance/memory.js
 * and provides RDP definitions.
 */
class Memory extends _actor2.default {
    constructor(client, name) {
        super(client, name);
        this.isAttached = false;
    }

    /**
     * Attach to this MemoryBridge.
     *
     * This attaches the MemoryBridge's Debugger instance so that you can start
     * recording allocations or take a census of the heap. In addition, the
     * MemoryBridge will start emitting GC events.
     *
     * @return {Promise}  request response
     */
    attach() {
        this.isAttached = true;
        return this.request('attach');
    }

    /**
     * Detach from this MemoryBridge.
     *
     * @return {Promise}  request response
     */
    detach() {
        this.isAttached = false;
        return this.request('detach');
    }

    /**
     * Gets the current MemoryBridge attach/detach state.
     *
     * @return {Promise.String}  attach/detach state
     */
    getState() {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { state } = yield _this.request('getState');
            _this.isAttached = state === 'attached';
            return state;
        })();
    }

    /**
     * Take a census of the heap. See js/src/doc/Debugger/Debugger.Memory.md for more information.
     *
     * @return {Promise}  request response
     */
    takeCensus() {
        if (!this.isAttached) {
            throw new Error('You need to be attached to the tab');
        }

        return this.request('takeCensus');
    }

    /**
     * Start recording allocation sites.
     *
     * @param {number} options.probability
     *                 The probability we sample any given allocation when recording
     *                 allocations. Must be between 0 and 1 -- defaults to 1.
     * @param {number} options.maxLogLength
     *                 The maximum number of allocation events to keep in the
     *                 log. If new allocs occur while at capacity, oldest
     *                 allocations are lost. Must fit in a 32 bit signed integer.
     * @param {number} options.drainAllocationsTimeout
     *                 A number in milliseconds of how often, at least, an `allocation`
     *                 event gets emitted (and drained), and also emits and drains on every
     *                 GC event, resetting the timer.
     * @return {Promise}  request response
     */
    startRecordingAllocations(options) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            if (!_this2.isAttached) {
                throw new Error('You need to be attached to the tab');
            }

            const { value } = yield _this2.request('startRecordingAllocations', { options });
            return value;
        })();
    }

    /**
     * Stop recording allocation sites.
     *
     * @return {Promise}  request response
     */
    stopRecordingAllocations() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            if (!_this3.isAttached) {
                throw new Error('You need to be attached to the tab');
            }

            const { value } = yield _this3.request('stopRecordingAllocations');
            return value;
        })();
    }

    /**
     * Return settings used in `startRecordingAllocations` for `probability` and `maxLogLength`.
     * Currently only uses in tests.
     *
     * @return {Promise.Object}  allocation settings
     */
    getAllocationsSettings() {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            if (!_this4.isAttached) {
                throw new Error('You need to be attached to the tab');
            }

            const { options } = yield _this4.request('getAllocationsSettings');
            return options;
        })();
    }

    /**
     * Get a list of the most recent allocations since the last time we got
     * allocations, as well as a summary of all allocations since we've been
     * recording.
     *
     * @returns {Object} An object of the form:
     *
     *   {
     *     allocations: [<index into "frames" below>, ...],
     *     allocationsTimestamps: [
     *       <timestamp for allocations[0]>,
     *       <timestamp for allocations[1]>,
     *       ...
     *     ],
     *     allocationSizes: [
     *       <bytesize for allocations[0]>,
     *       <bytesize for allocations[1]>,
     *       ...
     *     ],
     *     frames: [
     *       {
     *         line: <line number for this frame>,
     *         column: <column number for this frame>,
     *         source: <filename string for this frame>,
     *         functionDisplayName:
     *           <this frame's inferred function name function or null>,
     *         parent: <index into "frames">
     *       },
     *       ...
     *     ],
     *   }
     *
     * The timestamps' unit is microseconds since the epoch.
     *
     * Subsequent `getAllocations` request within the same recording and
     * tab navigation will always place the same stack frames at the same
     * indices as previous `getAllocations` requests in the same
     * recording. In other words, it is safe to use the index as a
     * unique, persistent id for its frame.
     *
     * Additionally, the root node (null) is always at index 0.
     *
     * We use the indices into the "frames" array to avoid repeating the
     * description of duplicate stack frames both when listing
     * allocations, and when many stacks share the same tail of older
     * frames. There shouldn't be any duplicates in the "frames" array,
     * as that would defeat the purpose of this compression trick.
     *
     * In the future, we might want to split out a frame's "source" and
     * "functionDisplayName" properties out the same way we have split
     * frames out with the "frames" array. While this would further
     * compress the size of the response packet, it would increase CPU
     * usage to build the packet, and it should, of course, be guided by
     * profiling and done only when necessary.
     */
    getAllocations() {
        if (!this.isAttached) {
            throw new Error('You need to be attached to the tab');
        }

        return this.request('getAllocations');
    }

    /**
     * Force a browser-wide GC.
     *
     * @return {Promise.Object}  allocation settings
     */
    forceGarbageCollection() {
        if (!this.isAttached) {
            throw new Error('You need to be attached to the tab');
        }

        return this.request('forceGarbageCollection');
    }

    /**
     * Force an XPCOM cycle collection. For more information on XPCOM cycle
     * collection, see https://developer.mozilla.org/en-US/docs/Interfacing_with_the_XPCOM_cycle_collector#What_the_cycle_collector_does
     *
     * @return {Promise.Object}  request response
     */
    forceCycleCollection() {
        if (!this.isAttached) {
            throw new Error('You need to be attached to the tab');
        }

        return this.request('forceCycleCollection');
    }

    /**
     * A method that returns a detailed breakdown of the memory consumption of the
     * associated window.
     *
     * @return {Object}  memory consumption
     */
    measure() {
        return this.request('measure');
    }

    /**
     * Save a heap snapshot scoped to the current debuggees' portion of the heap
     * graph.
     *
     * @param {Object|null} boundaries
     * @return {String}     The snapshot id.
     */
    saveHeapSnapshot(boundaries) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            if (!_this5.isAttached) {
                throw new Error('You need to be attached to the tab');
            }

            const { snapshotId } = yield _this5.request('saveHeapSnapshot', { boundaries });
            return snapshotId;
        })();
    }
}
exports.default = Memory;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL21lbW9yeS5qcyJdLCJuYW1lcyI6WyJNZW1vcnkiLCJjb25zdHJ1Y3RvciIsImNsaWVudCIsIm5hbWUiLCJpc0F0dGFjaGVkIiwiYXR0YWNoIiwicmVxdWVzdCIsImRldGFjaCIsImdldFN0YXRlIiwic3RhdGUiLCJ0YWtlQ2Vuc3VzIiwiRXJyb3IiLCJzdGFydFJlY29yZGluZ0FsbG9jYXRpb25zIiwib3B0aW9ucyIsInZhbHVlIiwic3RvcFJlY29yZGluZ0FsbG9jYXRpb25zIiwiZ2V0QWxsb2NhdGlvbnNTZXR0aW5ncyIsImdldEFsbG9jYXRpb25zIiwiZm9yY2VHYXJiYWdlQ29sbGVjdGlvbiIsImZvcmNlQ3ljbGVDb2xsZWN0aW9uIiwibWVhc3VyZSIsInNhdmVIZWFwU25hcHNob3QiLCJib3VuZGFyaWVzIiwic25hcHNob3RJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7QUFRZSxNQUFNQSxNQUFOLHlCQUEyQjtBQUN0Q0MsZ0JBQWFDLE1BQWIsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLGNBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDSDs7QUFFRDs7Ozs7Ozs7O0FBU0FDLGFBQVU7QUFDTixhQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBTyxLQUFLRSxPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FDLGFBQVU7QUFDTixhQUFLSCxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsZUFBTyxLQUFLRSxPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS01FLFlBQU4sR0FBa0I7QUFBQTs7QUFBQTtBQUNkLGtCQUFNLEVBQUVDLEtBQUYsS0FBWSxNQUFNLE1BQUtILE9BQUwsQ0FBYSxVQUFiLENBQXhCO0FBQ0Esa0JBQUtGLFVBQUwsR0FBa0JLLFVBQVUsVUFBNUI7QUFDQSxtQkFBT0EsS0FBUDtBQUhjO0FBSWpCOztBQUVEOzs7OztBQUtBQyxpQkFBYztBQUNWLFlBQUksQ0FBQyxLQUFLTixVQUFWLEVBQXNCO0FBQ2xCLGtCQUFNLElBQUlPLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLTCxPQUFMLENBQWEsWUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk1NLDZCQUFOLENBQWlDQyxPQUFqQyxFQUEwQztBQUFBOztBQUFBO0FBQ3RDLGdCQUFJLENBQUMsT0FBS1QsVUFBVixFQUFzQjtBQUNsQixzQkFBTSxJQUFJTyxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNIOztBQUVELGtCQUFNLEVBQUVHLEtBQUYsS0FBWSxNQUFNLE9BQUtSLE9BQUwsQ0FBYSwyQkFBYixFQUEwQyxFQUFFTyxPQUFGLEVBQTFDLENBQXhCO0FBQ0EsbUJBQU9DLEtBQVA7QUFOc0M7QUFPekM7O0FBRUQ7Ozs7O0FBS01DLDRCQUFOLEdBQWtDO0FBQUE7O0FBQUE7QUFDOUIsZ0JBQUksQ0FBQyxPQUFLWCxVQUFWLEVBQXNCO0FBQ2xCLHNCQUFNLElBQUlPLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0g7O0FBRUQsa0JBQU0sRUFBRUcsS0FBRixLQUFZLE1BQU0sT0FBS1IsT0FBTCxDQUFhLDBCQUFiLENBQXhCO0FBQ0EsbUJBQU9RLEtBQVA7QUFOOEI7QUFPakM7O0FBRUQ7Ozs7OztBQU1NRSwwQkFBTixHQUFnQztBQUFBOztBQUFBO0FBQzVCLGdCQUFJLENBQUMsT0FBS1osVUFBVixFQUFzQjtBQUNsQixzQkFBTSxJQUFJTyxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNIOztBQUVELGtCQUFNLEVBQUVFLE9BQUYsS0FBYyxNQUFNLE9BQUtQLE9BQUwsQ0FBYSx3QkFBYixDQUExQjtBQUNBLG1CQUFPTyxPQUFQO0FBTjRCO0FBTy9COztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBSSxxQkFBa0I7QUFDZCxZQUFJLENBQUMsS0FBS2IsVUFBVixFQUFzQjtBQUNsQixrQkFBTSxJQUFJTyxLQUFKLENBQVUsb0NBQVYsQ0FBTjtBQUNIOztBQUVELGVBQU8sS0FBS0wsT0FBTCxDQUFhLGdCQUFiLENBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLQVksNkJBQTBCO0FBQ3RCLFlBQUksQ0FBQyxLQUFLZCxVQUFWLEVBQXNCO0FBQ2xCLGtCQUFNLElBQUlPLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLTCxPQUFMLENBQWEsd0JBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQWEsMkJBQXdCO0FBQ3BCLFlBQUksQ0FBQyxLQUFLZixVQUFWLEVBQXNCO0FBQ2xCLGtCQUFNLElBQUlPLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLTCxPQUFMLENBQWEsc0JBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQWMsY0FBVztBQUNQLGVBQU8sS0FBS2QsT0FBTCxDQUFhLFNBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O0FBT01lLG9CQUFOLENBQXdCQyxVQUF4QixFQUFvQztBQUFBOztBQUFBO0FBQ2hDLGdCQUFJLENBQUMsT0FBS2xCLFVBQVYsRUFBc0I7QUFDbEIsc0JBQU0sSUFBSU8sS0FBSixDQUFVLG9DQUFWLENBQU47QUFDSDs7QUFFRCxrQkFBTSxFQUFFWSxVQUFGLEtBQWlCLE1BQU0sT0FBS2pCLE9BQUwsQ0FBYSxrQkFBYixFQUFpQyxFQUFFZ0IsVUFBRixFQUFqQyxDQUE3QjtBQUNBLG1CQUFPQyxVQUFQO0FBTmdDO0FBT25DO0FBOU5xQztrQkFBckJ2QixNIiwiZmlsZSI6Im1lbW9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuLi9hY3RvcidcblxuLyoqXG4gKiBBbiBhY3RvciB0aGF0IHJldHVybnMgbWVtb3J5IHVzYWdlIGRhdGEgZm9yIGl0cyBwYXJlbnQgYWN0b3IncyB3aW5kb3cuIEEgdGFiLXNjb3BlZCBpbnN0YW5jZVxuICogb2YgdGhpcyBhY3RvciB3aWxsIG1lYXN1cmUgdGhlIG1lbW9yeSBmb290cHJpbnQgb2YgaXRzIHBhcmVudCB0YWIuIEEgZ2xvYmFsLXNjb3BlZCBpbnN0YW5jZVxuICogaG93ZXZlciwgd2lsbCBtZWFzdXJlIHRoZSBtZW1vcnkgZm9vdHByaW50IG9mIHRoZSBjaHJvbWUgd2luZG93IHJlZmVyZW5jZWQgYnkgdGhlIHJvb3QgYWN0b3IuXG4gKlxuICogVGhpcyBhY3RvciB3cmFwcyB0aGUgTWVtb3J5IG1vZHVsZSBhdCBkZXZ0b29scy9zZXJ2ZXIvcGVyZm9ybWFuY2UvbWVtb3J5LmpzXG4gKiBhbmQgcHJvdmlkZXMgUkRQIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW1vcnkgZXh0ZW5kcyBBY3RvciB7XG4gICAgY29uc3RydWN0b3IgKGNsaWVudCwgbmFtZSkge1xuICAgICAgICBzdXBlcihjbGllbnQsIG5hbWUpXG4gICAgICAgIHRoaXMuaXNBdHRhY2hlZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIHRvIHRoaXMgTWVtb3J5QnJpZGdlLlxuICAgICAqXG4gICAgICogVGhpcyBhdHRhY2hlcyB0aGUgTWVtb3J5QnJpZGdlJ3MgRGVidWdnZXIgaW5zdGFuY2Ugc28gdGhhdCB5b3UgY2FuIHN0YXJ0XG4gICAgICogcmVjb3JkaW5nIGFsbG9jYXRpb25zIG9yIHRha2UgYSBjZW5zdXMgb2YgdGhlIGhlYXAuIEluIGFkZGl0aW9uLCB0aGVcbiAgICAgKiBNZW1vcnlCcmlkZ2Ugd2lsbCBzdGFydCBlbWl0dGluZyBHQyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIGF0dGFjaCAoKSB7XG4gICAgICAgIHRoaXMuaXNBdHRhY2hlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnYXR0YWNoJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2ggZnJvbSB0aGlzIE1lbW9yeUJyaWRnZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgZGV0YWNoICgpIHtcbiAgICAgICAgdGhpcy5pc0F0dGFjaGVkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZGV0YWNoJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IE1lbW9yeUJyaWRnZSBhdHRhY2gvZGV0YWNoIHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5TdHJpbmd9ICBhdHRhY2gvZGV0YWNoIHN0YXRlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U3RhdGUgKCkge1xuICAgICAgICBjb25zdCB7IHN0YXRlIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldFN0YXRlJylcbiAgICAgICAgdGhpcy5pc0F0dGFjaGVkID0gc3RhdGUgPT09ICdhdHRhY2hlZCdcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBhIGNlbnN1cyBvZiB0aGUgaGVhcC4gU2VlIGpzL3NyYy9kb2MvRGVidWdnZXIvRGVidWdnZXIuTWVtb3J5Lm1kIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICB0YWtlQ2Vuc3VzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCd0YWtlQ2Vuc3VzJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCByZWNvcmRpbmcgYWxsb2NhdGlvbiBzaXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnByb2JhYmlsaXR5XG4gICAgICogICAgICAgICAgICAgICAgIFRoZSBwcm9iYWJpbGl0eSB3ZSBzYW1wbGUgYW55IGdpdmVuIGFsbG9jYXRpb24gd2hlbiByZWNvcmRpbmdcbiAgICAgKiAgICAgICAgICAgICAgICAgYWxsb2NhdGlvbnMuIE11c3QgYmUgYmV0d2VlbiAwIGFuZCAxIC0tIGRlZmF1bHRzIHRvIDEuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubWF4TG9nTGVuZ3RoXG4gICAgICogICAgICAgICAgICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhbGxvY2F0aW9uIGV2ZW50cyB0byBrZWVwIGluIHRoZVxuICAgICAqICAgICAgICAgICAgICAgICBsb2cuIElmIG5ldyBhbGxvY3Mgb2NjdXIgd2hpbGUgYXQgY2FwYWNpdHksIG9sZGVzdFxuICAgICAqICAgICAgICAgICAgICAgICBhbGxvY2F0aW9ucyBhcmUgbG9zdC4gTXVzdCBmaXQgaW4gYSAzMiBiaXQgc2lnbmVkIGludGVnZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuZHJhaW5BbGxvY2F0aW9uc1RpbWVvdXRcbiAgICAgKiAgICAgICAgICAgICAgICAgQSBudW1iZXIgaW4gbWlsbGlzZWNvbmRzIG9mIGhvdyBvZnRlbiwgYXQgbGVhc3QsIGFuIGBhbGxvY2F0aW9uYFxuICAgICAqICAgICAgICAgICAgICAgICBldmVudCBnZXRzIGVtaXR0ZWQgKGFuZCBkcmFpbmVkKSwgYW5kIGFsc28gZW1pdHMgYW5kIGRyYWlucyBvbiBldmVyeVxuICAgICAqICAgICAgICAgICAgICAgICBHQyBldmVudCwgcmVzZXR0aW5nIHRoZSB0aW1lci5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIGFzeW5jIHN0YXJ0UmVjb3JkaW5nQWxsb2NhdGlvbnMgKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3N0YXJ0UmVjb3JkaW5nQWxsb2NhdGlvbnMnLCB7IG9wdGlvbnMgfSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCByZWNvcmRpbmcgYWxsb2NhdGlvbiBzaXRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgYXN5bmMgc3RvcFJlY29yZGluZ0FsbG9jYXRpb25zICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3N0b3BSZWNvcmRpbmdBbGxvY2F0aW9ucycpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBzZXR0aW5ncyB1c2VkIGluIGBzdGFydFJlY29yZGluZ0FsbG9jYXRpb25zYCBmb3IgYHByb2JhYmlsaXR5YCBhbmQgYG1heExvZ0xlbmd0aGAuXG4gICAgICogQ3VycmVudGx5IG9ubHkgdXNlcyBpbiB0ZXN0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuT2JqZWN0fSAgYWxsb2NhdGlvbiBzZXR0aW5nc1xuICAgICAqL1xuICAgIGFzeW5jIGdldEFsbG9jYXRpb25zU2V0dGluZ3MgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBiZSBhdHRhY2hlZCB0byB0aGUgdGFiJylcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRBbGxvY2F0aW9uc1NldHRpbmdzJylcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHRoZSBtb3N0IHJlY2VudCBhbGxvY2F0aW9ucyBzaW5jZSB0aGUgbGFzdCB0aW1lIHdlIGdvdFxuICAgICAqIGFsbG9jYXRpb25zLCBhcyB3ZWxsIGFzIGEgc3VtbWFyeSBvZiBhbGwgYWxsb2NhdGlvbnMgc2luY2Ugd2UndmUgYmVlblxuICAgICAqIHJlY29yZGluZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBvZiB0aGUgZm9ybTpcbiAgICAgKlxuICAgICAqICAge1xuICAgICAqICAgICBhbGxvY2F0aW9uczogWzxpbmRleCBpbnRvIFwiZnJhbWVzXCIgYmVsb3c+LCAuLi5dLFxuICAgICAqICAgICBhbGxvY2F0aW9uc1RpbWVzdGFtcHM6IFtcbiAgICAgKiAgICAgICA8dGltZXN0YW1wIGZvciBhbGxvY2F0aW9uc1swXT4sXG4gICAgICogICAgICAgPHRpbWVzdGFtcCBmb3IgYWxsb2NhdGlvbnNbMV0+LFxuICAgICAqICAgICAgIC4uLlxuICAgICAqICAgICBdLFxuICAgICAqICAgICBhbGxvY2F0aW9uU2l6ZXM6IFtcbiAgICAgKiAgICAgICA8Ynl0ZXNpemUgZm9yIGFsbG9jYXRpb25zWzBdPixcbiAgICAgKiAgICAgICA8Ynl0ZXNpemUgZm9yIGFsbG9jYXRpb25zWzFdPixcbiAgICAgKiAgICAgICAuLi5cbiAgICAgKiAgICAgXSxcbiAgICAgKiAgICAgZnJhbWVzOiBbXG4gICAgICogICAgICAge1xuICAgICAqICAgICAgICAgbGluZTogPGxpbmUgbnVtYmVyIGZvciB0aGlzIGZyYW1lPixcbiAgICAgKiAgICAgICAgIGNvbHVtbjogPGNvbHVtbiBudW1iZXIgZm9yIHRoaXMgZnJhbWU+LFxuICAgICAqICAgICAgICAgc291cmNlOiA8ZmlsZW5hbWUgc3RyaW5nIGZvciB0aGlzIGZyYW1lPixcbiAgICAgKiAgICAgICAgIGZ1bmN0aW9uRGlzcGxheU5hbWU6XG4gICAgICogICAgICAgICAgIDx0aGlzIGZyYW1lJ3MgaW5mZXJyZWQgZnVuY3Rpb24gbmFtZSBmdW5jdGlvbiBvciBudWxsPixcbiAgICAgKiAgICAgICAgIHBhcmVudDogPGluZGV4IGludG8gXCJmcmFtZXNcIj5cbiAgICAgKiAgICAgICB9LFxuICAgICAqICAgICAgIC4uLlxuICAgICAqICAgICBdLFxuICAgICAqICAgfVxuICAgICAqXG4gICAgICogVGhlIHRpbWVzdGFtcHMnIHVuaXQgaXMgbWljcm9zZWNvbmRzIHNpbmNlIHRoZSBlcG9jaC5cbiAgICAgKlxuICAgICAqIFN1YnNlcXVlbnQgYGdldEFsbG9jYXRpb25zYCByZXF1ZXN0IHdpdGhpbiB0aGUgc2FtZSByZWNvcmRpbmcgYW5kXG4gICAgICogdGFiIG5hdmlnYXRpb24gd2lsbCBhbHdheXMgcGxhY2UgdGhlIHNhbWUgc3RhY2sgZnJhbWVzIGF0IHRoZSBzYW1lXG4gICAgICogaW5kaWNlcyBhcyBwcmV2aW91cyBgZ2V0QWxsb2NhdGlvbnNgIHJlcXVlc3RzIGluIHRoZSBzYW1lXG4gICAgICogcmVjb3JkaW5nLiBJbiBvdGhlciB3b3JkcywgaXQgaXMgc2FmZSB0byB1c2UgdGhlIGluZGV4IGFzIGFcbiAgICAgKiB1bmlxdWUsIHBlcnNpc3RlbnQgaWQgZm9yIGl0cyBmcmFtZS5cbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWxseSwgdGhlIHJvb3Qgbm9kZSAobnVsbCkgaXMgYWx3YXlzIGF0IGluZGV4IDAuXG4gICAgICpcbiAgICAgKiBXZSB1c2UgdGhlIGluZGljZXMgaW50byB0aGUgXCJmcmFtZXNcIiBhcnJheSB0byBhdm9pZCByZXBlYXRpbmcgdGhlXG4gICAgICogZGVzY3JpcHRpb24gb2YgZHVwbGljYXRlIHN0YWNrIGZyYW1lcyBib3RoIHdoZW4gbGlzdGluZ1xuICAgICAqIGFsbG9jYXRpb25zLCBhbmQgd2hlbiBtYW55IHN0YWNrcyBzaGFyZSB0aGUgc2FtZSB0YWlsIG9mIG9sZGVyXG4gICAgICogZnJhbWVzLiBUaGVyZSBzaG91bGRuJ3QgYmUgYW55IGR1cGxpY2F0ZXMgaW4gdGhlIFwiZnJhbWVzXCIgYXJyYXksXG4gICAgICogYXMgdGhhdCB3b3VsZCBkZWZlYXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBjb21wcmVzc2lvbiB0cmljay5cbiAgICAgKlxuICAgICAqIEluIHRoZSBmdXR1cmUsIHdlIG1pZ2h0IHdhbnQgdG8gc3BsaXQgb3V0IGEgZnJhbWUncyBcInNvdXJjZVwiIGFuZFxuICAgICAqIFwiZnVuY3Rpb25EaXNwbGF5TmFtZVwiIHByb3BlcnRpZXMgb3V0IHRoZSBzYW1lIHdheSB3ZSBoYXZlIHNwbGl0XG4gICAgICogZnJhbWVzIG91dCB3aXRoIHRoZSBcImZyYW1lc1wiIGFycmF5LiBXaGlsZSB0aGlzIHdvdWxkIGZ1cnRoZXJcbiAgICAgKiBjb21wcmVzcyB0aGUgc2l6ZSBvZiB0aGUgcmVzcG9uc2UgcGFja2V0LCBpdCB3b3VsZCBpbmNyZWFzZSBDUFVcbiAgICAgKiB1c2FnZSB0byBidWlsZCB0aGUgcGFja2V0LCBhbmQgaXQgc2hvdWxkLCBvZiBjb3Vyc2UsIGJlIGd1aWRlZCBieVxuICAgICAqIHByb2ZpbGluZyBhbmQgZG9uZSBvbmx5IHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqL1xuICAgIGdldEFsbG9jYXRpb25zICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRBbGxvY2F0aW9ucycpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yY2UgYSBicm93c2VyLXdpZGUgR0MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdH0gIGFsbG9jYXRpb24gc2V0dGluZ3NcbiAgICAgKi9cbiAgICBmb3JjZUdhcmJhZ2VDb2xsZWN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdmb3JjZUdhcmJhZ2VDb2xsZWN0aW9uJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JjZSBhbiBYUENPTSBjeWNsZSBjb2xsZWN0aW9uLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBYUENPTSBjeWNsZVxuICAgICAqIGNvbGxlY3Rpb24sIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0ludGVyZmFjaW5nX3dpdGhfdGhlX1hQQ09NX2N5Y2xlX2NvbGxlY3RvciNXaGF0X3RoZV9jeWNsZV9jb2xsZWN0b3JfZG9lc1xuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5PYmplY3R9ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgZm9yY2VDeWNsZUNvbGxlY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBiZSBhdHRhY2hlZCB0byB0aGUgdGFiJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2ZvcmNlQ3ljbGVDb2xsZWN0aW9uJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIG1ldGhvZCB0aGF0IHJldHVybnMgYSBkZXRhaWxlZCBicmVha2Rvd24gb2YgdGhlIG1lbW9yeSBjb25zdW1wdGlvbiBvZiB0aGVcbiAgICAgKiBhc3NvY2lhdGVkIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gIG1lbW9yeSBjb25zdW1wdGlvblxuICAgICAqL1xuICAgIG1lYXN1cmUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdtZWFzdXJlJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGEgaGVhcCBzbmFwc2hvdCBzY29wZWQgdG8gdGhlIGN1cnJlbnQgZGVidWdnZWVzJyBwb3J0aW9uIG9mIHRoZSBoZWFwXG4gICAgICogZ3JhcGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSBib3VuZGFyaWVzXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAgICAgVGhlIHNuYXBzaG90IGlkLlxuICAgICAqL1xuICAgIGFzeW5jIHNhdmVIZWFwU25hcHNob3QgKGJvdW5kYXJpZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIHRhYicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHNuYXBzaG90SWQgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnc2F2ZUhlYXBTbmFwc2hvdCcsIHsgYm91bmRhcmllcyB9KVxuICAgICAgICByZXR1cm4gc25hcHNob3RJZFxuICAgIH1cbn1cbiJdfQ==