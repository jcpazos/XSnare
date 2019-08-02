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
 * A LongString actor provides a way to access "very long" strings from the
 * debugger server.
 */
class LongString extends _actor2.default {
  /**
   * Get the substring of this LongString from start to end.
   *
   * @param {Number} start
   *        The starting index.
   * @param {Number} end
   *        The ending index.
   * @return {String}  long string text
   */
  substring(start, end) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { substring } = yield _this.request('substring', { start, end });
      return substring;
    })();
  }
}
exports.default = LongString;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvbG9uZ1N0cmluZy5qcyJdLCJuYW1lcyI6WyJMb25nU3RyaW5nIiwic3Vic3RyaW5nIiwic3RhcnQiLCJlbmQiLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7O0FBSWUsTUFBTUEsVUFBTix5QkFBK0I7QUFDMUM7Ozs7Ozs7OztBQVNNQyxXQUFOLENBQWlCQyxLQUFqQixFQUF3QkMsR0FBeEIsRUFBNkI7QUFBQTs7QUFBQTtBQUN6QixZQUFNLEVBQUVGLFNBQUYsS0FBZ0IsTUFBTSxNQUFLRyxPQUFMLENBQWEsV0FBYixFQUEwQixFQUFFRixLQUFGLEVBQVNDLEdBQVQsRUFBMUIsQ0FBNUI7QUFDQSxhQUFPRixTQUFQO0FBRnlCO0FBRzVCO0FBYnlDO2tCQUF6QkQsVSIsImZpbGUiOiJsb25nU3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIEEgTG9uZ1N0cmluZyBhY3RvciBwcm92aWRlcyBhIHdheSB0byBhY2Nlc3MgXCJ2ZXJ5IGxvbmdcIiBzdHJpbmdzIGZyb20gdGhlXG4gKiBkZWJ1Z2dlciBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvbmdTdHJpbmcgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdWJzdHJpbmcgb2YgdGhpcyBMb25nU3RyaW5nIGZyb20gc3RhcnQgdG8gZW5kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0XG4gICAgICogICAgICAgIFRoZSBzdGFydGluZyBpbmRleC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZW5kXG4gICAgICogICAgICAgIFRoZSBlbmRpbmcgaW5kZXguXG4gICAgICogQHJldHVybiB7U3RyaW5nfSAgbG9uZyBzdHJpbmcgdGV4dFxuICAgICAqL1xuICAgIGFzeW5jIHN1YnN0cmluZyAoc3RhcnQsIGVuZCkge1xuICAgICAgICBjb25zdCB7IHN1YnN0cmluZyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdzdWJzdHJpbmcnLCB7IHN0YXJ0LCBlbmQgfSlcbiAgICAgICAgcmV0dXJuIHN1YnN0cmluZ1xuICAgIH1cbn1cbiJdfQ==