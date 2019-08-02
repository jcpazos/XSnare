'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The HeapSnapshotFileActor handles transferring heap snapshot files from the
 * server to the client. This has to be a global actor in the parent process
 * because child processes are sandboxed and do not have access to the file
 * system.
 */
class HeapSnapshotFile extends _actor2.default {
  /**
   * transfer heap snapshot
   *
   * @param  {String} snapshotId  id of heap snapshot file
   * @return {Promise.<Object>}   request response
   */
  getHeapSnapshot(snapshotId) {
    return this.request('transferHeapSnapshot', { snapshotId });
  }
}
exports.default = HeapSnapshotFile;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2hlYXBTbmFwc2hvdEZpbGUuanMiXSwibmFtZXMiOlsiSGVhcFNuYXBzaG90RmlsZSIsImdldEhlYXBTbmFwc2hvdCIsInNuYXBzaG90SWQiLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUE7Ozs7OztBQU1lLE1BQU1BLGdCQUFOLHlCQUFxQztBQUNoRDs7Ozs7O0FBTUFDLGtCQUFpQkMsVUFBakIsRUFBNkI7QUFDekIsV0FBTyxLQUFLQyxPQUFMLENBQWEsc0JBQWIsRUFBcUMsRUFBRUQsVUFBRixFQUFyQyxDQUFQO0FBQ0g7QUFUK0M7a0JBQS9CRixnQiIsImZpbGUiOiJoZWFwU25hcHNob3RGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIFRoZSBIZWFwU25hcHNob3RGaWxlQWN0b3IgaGFuZGxlcyB0cmFuc2ZlcnJpbmcgaGVhcCBzbmFwc2hvdCBmaWxlcyBmcm9tIHRoZVxuICogc2VydmVyIHRvIHRoZSBjbGllbnQuIFRoaXMgaGFzIHRvIGJlIGEgZ2xvYmFsIGFjdG9yIGluIHRoZSBwYXJlbnQgcHJvY2Vzc1xuICogYmVjYXVzZSBjaGlsZCBwcm9jZXNzZXMgYXJlIHNhbmRib3hlZCBhbmQgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoZSBmaWxlXG4gKiBzeXN0ZW0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXBTbmFwc2hvdEZpbGUgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogdHJhbnNmZXIgaGVhcCBzbmFwc2hvdFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBzbmFwc2hvdElkICBpZCBvZiBoZWFwIHNuYXBzaG90IGZpbGVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBnZXRIZWFwU25hcHNob3QgKHNuYXBzaG90SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgndHJhbnNmZXJIZWFwU25hcHNob3QnLCB7IHNuYXBzaG90SWQgfSlcbiAgICB9XG59XG4iXX0=