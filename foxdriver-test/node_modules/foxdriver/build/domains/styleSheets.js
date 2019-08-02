'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _stylesheet = require('../models/stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a StyleSheetsActor. StyleSheetsActor provides remote access to the
 * stylesheets of a document.
 */
class StyleSheets extends _actor2.default {
  /**
   * Protocol method for getting a list of StyleSheetActors representing
   * all the style sheets in this document.
   *
   * @return {Promise.StyleSheet[]} list of all stylesheets of this document
   */
  getStyleSheets() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { styleSheets } = yield _this.request('getStyleSheets');
      return styleSheets.map(function (payload) {
        return new _stylesheet2.default(_this.client, payload);
      });
    })();
  }

  /**
   * Create a new style sheet in the document with the given text.
   * Return an actor for it.
   *
   * @param  {Object} request
   *         Debugging protocol request object, with 'text property'
   * @return {Promise.Object}
   *         Object with 'styelSheet' property for form on new actor.
   */
  addStyleSheet(text) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { styleSheet } = yield _this2.request('addStyleSheet', { text });
      return styleSheet;
    })();
  }
}
exports.default = StyleSheets;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL3N0eWxlU2hlZXRzLmpzIl0sIm5hbWVzIjpbIlN0eWxlU2hlZXRzIiwiZ2V0U3R5bGVTaGVldHMiLCJzdHlsZVNoZWV0cyIsInJlcXVlc3QiLCJtYXAiLCJwYXlsb2FkIiwiY2xpZW50IiwiYWRkU3R5bGVTaGVldCIsInRleHQiLCJzdHlsZVNoZWV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJZSxNQUFNQSxXQUFOLHlCQUFnQztBQUMzQzs7Ozs7O0FBTU1DLGdCQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDcEIsWUFBTSxFQUFFQyxXQUFGLEtBQWtCLE1BQU0sTUFBS0MsT0FBTCxDQUFhLGdCQUFiLENBQTlCO0FBQ0EsYUFBT0QsWUFBWUUsR0FBWixDQUFnQixVQUFDQyxPQUFEO0FBQUEsZUFBYSx5QkFBZSxNQUFLQyxNQUFwQixFQUE0QkQsT0FBNUIsQ0FBYjtBQUFBLE9BQWhCLENBQVA7QUFGb0I7QUFHdkI7O0FBRUQ7Ozs7Ozs7OztBQVNNRSxlQUFOLENBQXFCQyxJQUFyQixFQUEyQjtBQUFBOztBQUFBO0FBQ3ZCLFlBQU0sRUFBRUMsVUFBRixLQUFpQixNQUFNLE9BQUtOLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQUVLLElBQUYsRUFBOUIsQ0FBN0I7QUFDQSxhQUFPQyxVQUFQO0FBRnVCO0FBRzFCO0FBeEIwQztrQkFBMUJULFciLCJmaWxlIjoic3R5bGVTaGVldHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuLi9tb2RlbHMvc3R5bGVzaGVldCdcblxuLyoqXG4gKiBDcmVhdGVzIGEgU3R5bGVTaGVldHNBY3Rvci4gU3R5bGVTaGVldHNBY3RvciBwcm92aWRlcyByZW1vdGUgYWNjZXNzIHRvIHRoZVxuICogc3R5bGVzaGVldHMgb2YgYSBkb2N1bWVudC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVTaGVldHMgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogUHJvdG9jb2wgbWV0aG9kIGZvciBnZXR0aW5nIGEgbGlzdCBvZiBTdHlsZVNoZWV0QWN0b3JzIHJlcHJlc2VudGluZ1xuICAgICAqIGFsbCB0aGUgc3R5bGUgc2hlZXRzIGluIHRoaXMgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLlN0eWxlU2hlZXRbXX0gbGlzdCBvZiBhbGwgc3R5bGVzaGVldHMgb2YgdGhpcyBkb2N1bWVudFxuICAgICAqL1xuICAgIGFzeW5jIGdldFN0eWxlU2hlZXRzICgpIHtcbiAgICAgICAgY29uc3QgeyBzdHlsZVNoZWV0cyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRTdHlsZVNoZWV0cycpXG4gICAgICAgIHJldHVybiBzdHlsZVNoZWV0cy5tYXAoKHBheWxvYWQpID0+IG5ldyBTdHlsZVNoZWV0KHRoaXMuY2xpZW50LCBwYXlsb2FkKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgc3R5bGUgc2hlZXQgaW4gdGhlIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIHRleHQuXG4gICAgICogUmV0dXJuIGFuIGFjdG9yIGZvciBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gcmVxdWVzdFxuICAgICAqICAgICAgICAgRGVidWdnaW5nIHByb3RvY29sIHJlcXVlc3Qgb2JqZWN0LCB3aXRoICd0ZXh0IHByb3BlcnR5J1xuICAgICAqIEByZXR1cm4ge1Byb21pc2UuT2JqZWN0fVxuICAgICAqICAgICAgICAgT2JqZWN0IHdpdGggJ3N0eWVsU2hlZXQnIHByb3BlcnR5IGZvciBmb3JtIG9uIG5ldyBhY3Rvci5cbiAgICAgKi9cbiAgICBhc3luYyBhZGRTdHlsZVNoZWV0ICh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgc3R5bGVTaGVldCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdhZGRTdHlsZVNoZWV0JywgeyB0ZXh0IH0pXG4gICAgICAgIHJldHVybiBzdHlsZVNoZWV0XG4gICAgfVxufVxuIl19