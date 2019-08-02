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
 * Actor to manage browser preferences.
 */
class Preference extends _actor2.default {
  /**
   * Get boolean preference.
   *
   * @param  {String}  value    name of preference
   * @return {Promise.Boolean}  preference value
   */
  getBoolPref(value) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const response = yield _this.request('getBoolPref', { value });
      return response.value;
    })();
  }

  /**
   * Get char preference.
   *
   * @param  {String}  value  name of preference
   * @return {Promise.Char}   preference value
   */
  getCharPref(value) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const response = yield _this2.request('getCharPref', { value });
      return response.value;
    })();
  }

  /**
   * Get integer preference.
   *
   * @param  {String}  value    name of preference
   * @return {Promise.Number}   preference value
   */
  getIntPref(value) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const response = yield _this3.request('getIntPref', { value });
      return response.value;
    })();
  }

  /**
   * Get all preferences.
   *
   * @return {Promise.Object[]}  list of preferences
   */
  getAllPrefs() {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { value } = yield _this4.request('getAllPrefs');
      return value;
    })();
  }

  /**
   * Set boolean preference.
   *
   * @param {String}  name   preference name
   * @param {Boolean} value  preference value
   * @return {Promise}       request response
   */
  setBoolPref(name, value) {
    return this.request('setBoolPref', { name, value });
  }

  /**
   * Set char preference.
   *
   * @param {String}  name   preference name
   * @param {Char}    value  preference value
   * @return {Promise}       request response
   */
  setCharPref(name, value) {
    return this.request('setCharPref', { name, value });
  }

  /**
   * Set integer preference.
   *
   * @param {String}  name   preference name
   * @param {Number}  value  preference value
   * @return {Promise}       request response
   */
  setIntPref(name, value) {
    return this.request('setIntPref', { name, value });
  }

  /**
   * Clear user set preference
   * @param  {Srting} name  name of preference
   * @return {Promise}      request response
   */
  clearUserPref(name) {
    return this.request('clearUserPref', { name });
  }
}
exports.default = Preference;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL3ByZWZlcmVuY2UuanMiXSwibmFtZXMiOlsiUHJlZmVyZW5jZSIsImdldEJvb2xQcmVmIiwidmFsdWUiLCJyZXNwb25zZSIsInJlcXVlc3QiLCJnZXRDaGFyUHJlZiIsImdldEludFByZWYiLCJnZXRBbGxQcmVmcyIsInNldEJvb2xQcmVmIiwibmFtZSIsInNldENoYXJQcmVmIiwic2V0SW50UHJlZiIsImNsZWFyVXNlclByZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLFVBQU4seUJBQStCO0FBQzFDOzs7Ozs7QUFNTUMsYUFBTixDQUFtQkMsS0FBbkIsRUFBMEI7QUFBQTs7QUFBQTtBQUN0QixZQUFNQyxXQUFXLE1BQU0sTUFBS0MsT0FBTCxDQUFhLGFBQWIsRUFBNEIsRUFBRUYsS0FBRixFQUE1QixDQUF2QjtBQUNBLGFBQU9DLFNBQVNELEtBQWhCO0FBRnNCO0FBR3pCOztBQUVEOzs7Ozs7QUFNTUcsYUFBTixDQUFtQkgsS0FBbkIsRUFBMEI7QUFBQTs7QUFBQTtBQUN0QixZQUFNQyxXQUFXLE1BQU0sT0FBS0MsT0FBTCxDQUFhLGFBQWIsRUFBNEIsRUFBRUYsS0FBRixFQUE1QixDQUF2QjtBQUNBLGFBQU9DLFNBQVNELEtBQWhCO0FBRnNCO0FBR3pCOztBQUVEOzs7Ozs7QUFNTUksWUFBTixDQUFrQkosS0FBbEIsRUFBeUI7QUFBQTs7QUFBQTtBQUNyQixZQUFNQyxXQUFXLE1BQU0sT0FBS0MsT0FBTCxDQUFhLFlBQWIsRUFBMkIsRUFBRUYsS0FBRixFQUEzQixDQUF2QjtBQUNBLGFBQU9DLFNBQVNELEtBQWhCO0FBRnFCO0FBR3hCOztBQUVEOzs7OztBQUtNSyxhQUFOLEdBQXFCO0FBQUE7O0FBQUE7QUFDakIsWUFBTSxFQUFFTCxLQUFGLEtBQVksTUFBTSxPQUFLRSxPQUFMLENBQWEsYUFBYixDQUF4QjtBQUNBLGFBQU9GLEtBQVA7QUFGaUI7QUFHcEI7O0FBRUQ7Ozs7Ozs7QUFPQU0sY0FBYUMsSUFBYixFQUFtQlAsS0FBbkIsRUFBMEI7QUFDdEIsV0FBTyxLQUFLRSxPQUFMLENBQWEsYUFBYixFQUE0QixFQUFFSyxJQUFGLEVBQVFQLEtBQVIsRUFBNUIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O0FBT0FRLGNBQWFELElBQWIsRUFBbUJQLEtBQW5CLEVBQTBCO0FBQ3RCLFdBQU8sS0FBS0UsT0FBTCxDQUFhLGFBQWIsRUFBNEIsRUFBRUssSUFBRixFQUFRUCxLQUFSLEVBQTVCLENBQVA7QUFDSDs7QUFFRDs7Ozs7OztBQU9BUyxhQUFZRixJQUFaLEVBQWtCUCxLQUFsQixFQUF5QjtBQUNyQixXQUFPLEtBQUtFLE9BQUwsQ0FBYSxZQUFiLEVBQTJCLEVBQUVLLElBQUYsRUFBUVAsS0FBUixFQUEzQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FVLGdCQUFlSCxJQUFmLEVBQXFCO0FBQ2pCLFdBQU8sS0FBS0wsT0FBTCxDQUFhLGVBQWIsRUFBOEIsRUFBRUssSUFBRixFQUE5QixDQUFQO0FBQ0g7QUFwRnlDO2tCQUF6QlQsVSIsImZpbGUiOiJwcmVmZXJlbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIEFjdG9yIHRvIG1hbmFnZSBicm93c2VyIHByZWZlcmVuY2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmZXJlbmNlIGV4dGVuZHMgQWN0b3Ige1xuICAgIC8qKlxuICAgICAqIEdldCBib29sZWFuIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICB2YWx1ZSAgICBuYW1lIG9mIHByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkJvb2xlYW59ICBwcmVmZXJlbmNlIHZhbHVlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0Qm9vbFByZWYgKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRCb29sUHJlZicsIHsgdmFsdWUgfSlcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNoYXIgcHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIHZhbHVlICBuYW1lIG9mIHByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkNoYXJ9ICAgcHJlZmVyZW5jZSB2YWx1ZVxuICAgICAqL1xuICAgIGFzeW5jIGdldENoYXJQcmVmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0Q2hhclByZWYnLCB7IHZhbHVlIH0pXG4gICAgICAgIHJldHVybiByZXNwb25zZS52YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpbnRlZ2VyIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICB2YWx1ZSAgICBuYW1lIG9mIHByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk51bWJlcn0gICBwcmVmZXJlbmNlIHZhbHVlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0SW50UHJlZiAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldEludFByZWYnLCB7IHZhbHVlIH0pXG4gICAgICAgIHJldHVybiByZXNwb25zZS52YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgcHJlZmVyZW5jZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdFtdfSAgbGlzdCBvZiBwcmVmZXJlbmNlc1xuICAgICAqL1xuICAgIGFzeW5jIGdldEFsbFByZWZzICgpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRBbGxQcmVmcycpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBib29sZWFuIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICBwcmVmZXJlbmNlIG5hbWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlICBwcmVmZXJlbmNlIHZhbHVlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHNldEJvb2xQcmVmIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdzZXRCb29sUHJlZicsIHsgbmFtZSwgdmFsdWUgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgY2hhciBwcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICAgcHJlZmVyZW5jZSBuYW1lXG4gICAgICogQHBhcmFtIHtDaGFyfSAgICB2YWx1ZSAgcHJlZmVyZW5jZSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBzZXRDaGFyUHJlZiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc2V0Q2hhclByZWYnLCB7IG5hbWUsIHZhbHVlIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGludGVnZXIgcHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgbmFtZSAgIHByZWZlcmVuY2UgbmFtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgdmFsdWUgIHByZWZlcmVuY2UgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgc2V0SW50UHJlZiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc2V0SW50UHJlZicsIHsgbmFtZSwgdmFsdWUgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB1c2VyIHNldCBwcmVmZXJlbmNlXG4gICAgICogQHBhcmFtICB7U3J0aW5nfSBuYW1lICBuYW1lIG9mIHByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBjbGVhclVzZXJQcmVmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NsZWFyVXNlclByZWYnLCB7IG5hbWUgfSlcbiAgICB9XG59XG4iXX0=