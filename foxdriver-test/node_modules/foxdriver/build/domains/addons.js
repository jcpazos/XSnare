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
 * Addons actor allows to handle addons in Firefox
 */
class Addons extends _actor2.default {
  /**
   * install temporary addon
   * @param  {String}  addonPath  path to the add on
   * @return {Promise.<Object>}   addon data
   */
  installTemporaryAddon(addonPath) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { addon } = _this.request('installTemporaryAddon', { addonPath });
      return addon;
    })();
  }
}
exports.default = Addons;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2FkZG9ucy5qcyJdLCJuYW1lcyI6WyJBZGRvbnMiLCJpbnN0YWxsVGVtcG9yYXJ5QWRkb24iLCJhZGRvblBhdGgiLCJhZGRvbiIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLE1BQU4seUJBQTJCO0FBQ3RDOzs7OztBQUtNQyx1QkFBTixDQUE2QkMsU0FBN0IsRUFBd0M7QUFBQTs7QUFBQTtBQUNwQyxZQUFNLEVBQUVDLEtBQUYsS0FBWSxNQUFLQyxPQUFMLENBQWEsdUJBQWIsRUFBc0MsRUFBRUYsU0FBRixFQUF0QyxDQUFsQjtBQUNBLGFBQU9DLEtBQVA7QUFGb0M7QUFHdkM7QUFUcUM7a0JBQXJCSCxNIiwiZmlsZSI6ImFkZG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuLi9hY3RvcidcblxuLyoqXG4gKiBBZGRvbnMgYWN0b3IgYWxsb3dzIHRvIGhhbmRsZSBhZGRvbnMgaW4gRmlyZWZveFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRvbnMgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogaW5zdGFsbCB0ZW1wb3JhcnkgYWRkb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBhZGRvblBhdGggIHBhdGggdG8gdGhlIGFkZCBvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59ICAgYWRkb24gZGF0YVxuICAgICAqL1xuICAgIGFzeW5jIGluc3RhbGxUZW1wb3JhcnlBZGRvbiAoYWRkb25QYXRoKSB7XG4gICAgICAgIGNvbnN0IHsgYWRkb24gfSA9IHRoaXMucmVxdWVzdCgnaW5zdGFsbFRlbXBvcmFyeUFkZG9uJywgeyBhZGRvblBhdGggfSlcbiAgICAgICAgcmV0dXJuIGFkZG9uXG4gICAgfVxufVxuIl19