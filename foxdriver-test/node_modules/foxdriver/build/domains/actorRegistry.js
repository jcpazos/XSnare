'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _actorActor = require('../models/actorActor');

var _actorActor2 = _interopRequireDefault(_actorActor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * The ActorRegistryActor allows clients to define new actors on the
 * server. This is particularly useful for addons.
 */
class ActorRegistry extends _actor2.default {
  /**
   * register actor to registry
   *
   * @param  {String}  sourceText  source text of actor
   * @param  {String}  filename    file name of actor
   * @param  {Object}  options     actor options
   * @return {Promise}             resolves once request has finished
   */
  registerActor(sourceText, filename, options) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { actorActor } = _this.request('registerActor', { sourceText, filename, options });
      return new _actorActor2.default(_this.client, actorActor);
    })();
  }
}
exports.default = ActorRegistry;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2FjdG9yUmVnaXN0cnkuanMiXSwibmFtZXMiOlsiQWN0b3JSZWdpc3RyeSIsInJlZ2lzdGVyQWN0b3IiLCJzb3VyY2VUZXh0IiwiZmlsZW5hbWUiLCJvcHRpb25zIiwiYWN0b3JBY3RvciIsInJlcXVlc3QiLCJjbGllbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQUllLE1BQU1BLGFBQU4seUJBQWtDO0FBQzdDOzs7Ozs7OztBQVFNQyxlQUFOLENBQXFCQyxVQUFyQixFQUFpQ0MsUUFBakMsRUFBMkNDLE9BQTNDLEVBQW9EO0FBQUE7O0FBQUE7QUFDaEQsWUFBTSxFQUFFQyxVQUFGLEtBQWlCLE1BQUtDLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQUVKLFVBQUYsRUFBY0MsUUFBZCxFQUF3QkMsT0FBeEIsRUFBOUIsQ0FBdkI7QUFDQSxhQUFPLHlCQUFlLE1BQUtHLE1BQXBCLEVBQTRCRixVQUE1QixDQUFQO0FBRmdEO0FBR25EO0FBWjRDO2tCQUE1QkwsYSIsImZpbGUiOiJhY3RvclJlZ2lzdHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuaW1wb3J0IEFjdG9yQWN0b3IgZnJvbSAnLi4vbW9kZWxzL2FjdG9yQWN0b3InXG5cbi8qXG4gKiBUaGUgQWN0b3JSZWdpc3RyeUFjdG9yIGFsbG93cyBjbGllbnRzIHRvIGRlZmluZSBuZXcgYWN0b3JzIG9uIHRoZVxuICogc2VydmVyLiBUaGlzIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIGFkZG9ucy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JSZWdpc3RyeSBleHRlbmRzIEFjdG9yIHtcbiAgICAvKipcbiAgICAgKiByZWdpc3RlciBhY3RvciB0byByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgc291cmNlVGV4dCAgc291cmNlIHRleHQgb2YgYWN0b3JcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBmaWxlbmFtZSAgICBmaWxlIG5hbWUgb2YgYWN0b3JcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zICAgICBhY3RvciBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgICAgICAgcmVzb2x2ZXMgb25jZSByZXF1ZXN0IGhhcyBmaW5pc2hlZFxuICAgICAqL1xuICAgIGFzeW5jIHJlZ2lzdGVyQWN0b3IgKHNvdXJjZVRleHQsIGZpbGVuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0b3JBY3RvciB9ID0gdGhpcy5yZXF1ZXN0KCdyZWdpc3RlckFjdG9yJywgeyBzb3VyY2VUZXh0LCBmaWxlbmFtZSwgb3B0aW9ucyB9KVxuICAgICAgICByZXR1cm4gbmV3IEFjdG9yQWN0b3IodGhpcy5jbGllbnQsIGFjdG9yQWN0b3IpXG4gICAgfVxufVxuIl19