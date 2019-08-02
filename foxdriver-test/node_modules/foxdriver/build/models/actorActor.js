'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The ActorActor gives you a handle to an actor you've dynamically
 * registered and allows you to unregister it.
 */
class ActorActor extends _actor2.default {
  /**
   * unregister actor
   *
   * @return {Promise}   resolves once request has finished
   */
  unregister() {
    return this.request('unregister');
  }
}
exports.default = ActorActor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvYWN0b3JBY3Rvci5qcyJdLCJuYW1lcyI6WyJBY3RvckFjdG9yIiwidW5yZWdpc3RlciIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQTs7OztBQUllLE1BQU1BLFVBQU4seUJBQStCO0FBQzFDOzs7OztBQUtBQyxlQUFjO0FBQ1YsV0FBTyxLQUFLQyxPQUFMLENBQWEsWUFBYixDQUFQO0FBQ0g7QUFSeUM7a0JBQXpCRixVIiwiZmlsZSI6ImFjdG9yQWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbi8qKlxuICogVGhlIEFjdG9yQWN0b3IgZ2l2ZXMgeW91IGEgaGFuZGxlIHRvIGFuIGFjdG9yIHlvdSd2ZSBkeW5hbWljYWxseVxuICogcmVnaXN0ZXJlZCBhbmQgYWxsb3dzIHlvdSB0byB1bnJlZ2lzdGVyIGl0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvckFjdG9yIGV4dGVuZHMgQWN0b3Ige1xuICAgIC8qKlxuICAgICAqIHVucmVnaXN0ZXIgYWN0b3JcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgcmVzb2x2ZXMgb25jZSByZXF1ZXN0IGhhcyBmaW5pc2hlZFxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCd1bnJlZ2lzdGVyJylcbiAgICB9XG59XG4iXX0=