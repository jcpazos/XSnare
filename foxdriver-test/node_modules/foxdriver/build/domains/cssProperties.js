'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CSSProperties actor
 */
class CSSProperties extends _actor2.default {
  /**
   * get css database of current firefox version
   *
   * @return {Promise.<Object>}   request response
   */
  getCSSDatabase() {
    return this.request('getCSSDatabase');
  }
}
exports.default = CSSProperties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2Nzc1Byb3BlcnRpZXMuanMiXSwibmFtZXMiOlsiQ1NTUHJvcGVydGllcyIsImdldENTU0RhdGFiYXNlIiwicmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxhQUFOLHlCQUFrQztBQUM3Qzs7Ozs7QUFLQUMsbUJBQWtCO0FBQ2QsV0FBTyxLQUFLQyxPQUFMLENBQWEsZ0JBQWIsQ0FBUDtBQUNIO0FBUjRDO2tCQUE1QkYsYSIsImZpbGUiOiJjc3NQcm9wZXJ0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIENTU1Byb3BlcnRpZXMgYWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NTUHJvcGVydGllcyBleHRlbmRzIEFjdG9yIHtcbiAgICAvKipcbiAgICAgKiBnZXQgY3NzIGRhdGFiYXNlIG9mIGN1cnJlbnQgZmlyZWZveCB2ZXJzaW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBnZXRDU1NEYXRhYmFzZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldENTU0RhdGFiYXNlJylcbiAgICB9XG59XG4iXX0=