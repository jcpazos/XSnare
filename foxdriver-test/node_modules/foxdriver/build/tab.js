'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tab extends _actor2.default {
    get console() {
        return this._get('console');
    }
    get network() {
        return this._get('console', 'network');
    }
    get memory() {
        return this._get('memory');
    }
    get performance() {
        return this._get('performance');
    }
    get profiler() {
        return this._get('profiler');
    }
    get timeline() {
        return this._get('timeline');
    }
    get styleSheets() {
        return this._get('styleSheets');
    }
    get cssUsage() {
        return this._get('cssUsage');
    }
    get cssProperties() {
        return this._get('cssProperties');
    }
    get emulation() {
        return this._get('emulation');
    }
    get inspector() {
        return this._get('inspector');
    }

    /**
     * attach to tab
     * @return {Promise}  request promise
     */
    attach() {
        return this.request('attach');
    }

    /**
     * detach from tab
     * @return {Promise}  request promise
     */
    detach() {
        return this.request('detach');
    }

    /**
     * reloads current page url
     * @return {Promise}  request promise
     */
    reload() {
        return this.request('reload');
    }

    /**
     * navigates to a certain url
     * @param  {string}  url to navigate to
     * @return {Promise}     request promise
     */
    navigateTo(url) {
        return this.request('navigateTo', { url });
    }
}
exports.default = Tab;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi90YWIuanMiXSwibmFtZXMiOlsiVGFiIiwiY29uc29sZSIsIl9nZXQiLCJuZXR3b3JrIiwibWVtb3J5IiwicGVyZm9ybWFuY2UiLCJwcm9maWxlciIsInRpbWVsaW5lIiwic3R5bGVTaGVldHMiLCJjc3NVc2FnZSIsImNzc1Byb3BlcnRpZXMiLCJlbXVsYXRpb24iLCJpbnNwZWN0b3IiLCJhdHRhY2giLCJyZXF1ZXN0IiwiZGV0YWNoIiwicmVsb2FkIiwibmF2aWdhdGVUbyIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVlLE1BQU1BLEdBQU4seUJBQXdCO0FBQ25DLFFBQUlDLE9BQUosR0FBZTtBQUFFLGVBQU8sS0FBS0MsSUFBTCxDQUFVLFNBQVYsQ0FBUDtBQUE2QjtBQUM5QyxRQUFJQyxPQUFKLEdBQWU7QUFBRSxlQUFPLEtBQUtELElBQUwsQ0FBVSxTQUFWLEVBQXFCLFNBQXJCLENBQVA7QUFBd0M7QUFDekQsUUFBSUUsTUFBSixHQUFjO0FBQUUsZUFBTyxLQUFLRixJQUFMLENBQVUsUUFBVixDQUFQO0FBQTRCO0FBQzVDLFFBQUlHLFdBQUosR0FBbUI7QUFBRSxlQUFPLEtBQUtILElBQUwsQ0FBVSxhQUFWLENBQVA7QUFBaUM7QUFDdEQsUUFBSUksUUFBSixHQUFnQjtBQUFFLGVBQU8sS0FBS0osSUFBTCxDQUFVLFVBQVYsQ0FBUDtBQUE4QjtBQUNoRCxRQUFJSyxRQUFKLEdBQWdCO0FBQUUsZUFBTyxLQUFLTCxJQUFMLENBQVUsVUFBVixDQUFQO0FBQThCO0FBQ2hELFFBQUlNLFdBQUosR0FBbUI7QUFBRSxlQUFPLEtBQUtOLElBQUwsQ0FBVSxhQUFWLENBQVA7QUFBaUM7QUFDdEQsUUFBSU8sUUFBSixHQUFnQjtBQUFFLGVBQU8sS0FBS1AsSUFBTCxDQUFVLFVBQVYsQ0FBUDtBQUE4QjtBQUNoRCxRQUFJUSxhQUFKLEdBQXFCO0FBQUUsZUFBTyxLQUFLUixJQUFMLENBQVUsZUFBVixDQUFQO0FBQW1DO0FBQzFELFFBQUlTLFNBQUosR0FBaUI7QUFBRSxlQUFPLEtBQUtULElBQUwsQ0FBVSxXQUFWLENBQVA7QUFBK0I7QUFDbEQsUUFBSVUsU0FBSixHQUFpQjtBQUFFLGVBQU8sS0FBS1YsSUFBTCxDQUFVLFdBQVYsQ0FBUDtBQUErQjs7QUFFbEQ7Ozs7QUFJQVcsYUFBVTtBQUNOLGVBQU8sS0FBS0MsT0FBTCxDQUFhLFFBQWIsQ0FBUDtBQUNIOztBQUVEOzs7O0FBSUFDLGFBQVU7QUFDTixlQUFPLEtBQUtELE9BQUwsQ0FBYSxRQUFiLENBQVA7QUFDSDs7QUFFRDs7OztBQUlBRSxhQUFVO0FBQ04sZUFBTyxLQUFLRixPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FHLGVBQVlDLEdBQVosRUFBaUI7QUFDYixlQUFPLEtBQUtKLE9BQUwsQ0FBYSxZQUFiLEVBQTJCLEVBQUVJLEdBQUYsRUFBM0IsQ0FBUDtBQUNIO0FBNUNrQztrQkFBbEJsQixHIiwiZmlsZSI6InRhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWIgZXh0ZW5kcyBBY3RvciB7XG4gICAgZ2V0IGNvbnNvbGUgKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdjb25zb2xlJykgfVxuICAgIGdldCBuZXR3b3JrICgpIHsgcmV0dXJuIHRoaXMuX2dldCgnY29uc29sZScsICduZXR3b3JrJykgfVxuICAgIGdldCBtZW1vcnkgKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdtZW1vcnknKSB9XG4gICAgZ2V0IHBlcmZvcm1hbmNlICgpIHsgcmV0dXJuIHRoaXMuX2dldCgncGVyZm9ybWFuY2UnKSB9XG4gICAgZ2V0IHByb2ZpbGVyICgpIHsgcmV0dXJuIHRoaXMuX2dldCgncHJvZmlsZXInKSB9XG4gICAgZ2V0IHRpbWVsaW5lICgpIHsgcmV0dXJuIHRoaXMuX2dldCgndGltZWxpbmUnKSB9XG4gICAgZ2V0IHN0eWxlU2hlZXRzICgpIHsgcmV0dXJuIHRoaXMuX2dldCgnc3R5bGVTaGVldHMnKSB9XG4gICAgZ2V0IGNzc1VzYWdlICgpIHsgcmV0dXJuIHRoaXMuX2dldCgnY3NzVXNhZ2UnKSB9XG4gICAgZ2V0IGNzc1Byb3BlcnRpZXMgKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdjc3NQcm9wZXJ0aWVzJykgfVxuICAgIGdldCBlbXVsYXRpb24gKCkgeyByZXR1cm4gdGhpcy5fZ2V0KCdlbXVsYXRpb24nKSB9XG4gICAgZ2V0IGluc3BlY3RvciAoKSB7IHJldHVybiB0aGlzLl9nZXQoJ2luc3BlY3RvcicpIH1cblxuICAgIC8qKlxuICAgICAqIGF0dGFjaCB0byB0YWJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCBwcm9taXNlXG4gICAgICovXG4gICAgYXR0YWNoICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnYXR0YWNoJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRhY2ggZnJvbSB0YWJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCBwcm9taXNlXG4gICAgICovXG4gICAgZGV0YWNoICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZGV0YWNoJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWxvYWRzIGN1cnJlbnQgcGFnZSB1cmxcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCBwcm9taXNlXG4gICAgICovXG4gICAgcmVsb2FkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgncmVsb2FkJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBuYXZpZ2F0ZXMgdG8gYSBjZXJ0YWluIHVybFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIHVybCB0byBuYXZpZ2F0ZSB0b1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICByZXF1ZXN0IHByb21pc2VcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZVRvICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnbmF2aWdhdGVUbycsIHsgdXJsIH0pXG4gICAgfVxufVxuIl19