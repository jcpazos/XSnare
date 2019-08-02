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
 * Actor representing an original source of a style sheet that was specified
 * in a source map.
 */
class OriginalSource extends _actor2.default {
  /**
   * Protocol method to get the text of this source.
   *
   * @return {Promise}  text of source
   */
  getText() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { text } = yield _this.request('getText');
      return text;
    })();
  }
}
exports.default = OriginalSource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvb3JpZ2luYWxzb3VyY2UuanMiXSwibmFtZXMiOlsiT3JpZ2luYWxTb3VyY2UiLCJnZXRUZXh0IiwidGV4dCIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7Ozs7QUFJZSxNQUFNQSxjQUFOLHlCQUFtQztBQUM5Qzs7Ozs7QUFLTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2IsWUFBTSxFQUFFQyxJQUFGLEtBQVcsTUFBTSxNQUFLQyxPQUFMLENBQWEsU0FBYixDQUF2QjtBQUNBLGFBQU9ELElBQVA7QUFGYTtBQUdoQjtBQVQ2QztrQkFBN0JGLGMiLCJmaWxlIjoib3JpZ2luYWxzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbi8qKlxuICogQWN0b3IgcmVwcmVzZW50aW5nIGFuIG9yaWdpbmFsIHNvdXJjZSBvZiBhIHN0eWxlIHNoZWV0IHRoYXQgd2FzIHNwZWNpZmllZFxuICogaW4gYSBzb3VyY2UgbWFwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmlnaW5hbFNvdXJjZSBleHRlbmRzIEFjdG9yIHtcbiAgICAvKipcbiAgICAgKiBQcm90b2NvbCBtZXRob2QgdG8gZ2V0IHRoZSB0ZXh0IG9mIHRoaXMgc291cmNlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gIHRleHQgb2Ygc291cmNlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0VGV4dCAoKSB7XG4gICAgICAgIGNvbnN0IHsgdGV4dCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRUZXh0JylcbiAgICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG59XG4iXX0=