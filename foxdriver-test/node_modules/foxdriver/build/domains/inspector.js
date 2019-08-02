'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _highlighter = require('../models/highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _pagestyle = require('../models/pagestyle');

var _pagestyle2 = _interopRequireDefault(_pagestyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Server side of the inspector actor, which is used to create
 * inspector-related actors, including the walker.
 */
class Inspector extends _actor2.default {
  /**
   * Get walker
   *
   * @param  {Object}  options  Walker options
   * @return {Promise.Object}   Walker
   */
  getWalker(options) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { walker } = yield _this.request('getWalker', { options });
      return walker;
    })();
  }

  /**
   * Get page style actor.
   *
   * @return {Promise.Pagestyle}  Pagestyle actor
   */
  getPageStyle() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { pageStyle } = yield _this2.request('getPageStyle');
      return new _pagestyle2.default(_this2.client, pageStyle);
    })();
  }

  /**
   * The most used highlighter actor is the HighlighterActor which can be conveniently
   * retrieved by this method. The same instance will always be returned by this method
   * when called several times. The highlighter actor returned here is used to highlighter
   * elements's box-models from the markup-view, box model, console, debugger, ... as well
   * as select elements with the pointer (pick).
   *
   * @param  {Boolean}  autohide    Optionally autohide the highlighter after an element has been picked
   * @return {Promise.Highlighter}  instance of highlighter
   */
  getHighlighter(autohide) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { highligter } = _this3.request('getHighlighter', { autohide });
      return new _highlighter2.default(_this3.client, highligter);
    })();
  }

  /**
   * If consumers need to display several highlighters at the same time or different types of
   * highlighters, then this method should be used, passing the type name of the highlighter
   * needed as argument. A new instance will be created everytime the method is called, so it's
   * up to the consumer to release it when it is not needed anymore
   *
   * @param  {String}  typeName     The type of highlighter to create
   * @return {Promise.Highlighter}  The highlighter actor instance or null if the typeName passed
   *                                doesn't match any available highlighter
   */
  getHighlighterByType(typeName) {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { highligter } = _this4.request('getHighlighterByType', { typeName });
      return new _highlighter2.default(_this4.client, highligter);
    })();
  }

  /**
   * Get the node's image data if any (for canvas and img nodes). Returns an imageData object with
   * the actual data being a LongStringActor and a size json object. The image data is transmitted
   * as a base64 encoded png data-uri. The method rejects if the node isn't an image or if the
   * image is missing.
   *
   * Accepts a maxDim request parameter to resize images that are larger. This is important as the
   * resizing occurs server-side so that image-data being transfered in the longstring back to the
   * client will be that much smaller.
   *
   * @param  {String} url        image url
   * @param  {Number} maxDim     resizing parameter
   * @return {Promise.<Object>}  image data
   */
  getImageDataFromURL(url, maxDim) {
    return this.request('getImageDataFromURL', { url, maxDim });
  }

  /**
   * Resolve a URL to its absolute form, in the scope of a given content window.
   *
   * @param  {String}    url   url to be resolved
   * @param  {NodeActor} node  If provided, the owner window of this node will be used to resolve
   *                           the URL. Otherwise, the top-level content window will be used instead.
   * @return {Promise.String}  resolved url
   */
  resolveRelativeURL(url, node) {
    var _this5 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { value } = yield _this5.request('resolveRelativeURL', { url, node });
      return value;
    })();
  }

  /**
   * Pick a color from the page using the eye-dropper. This method doesn't return anything
   * but will cause events to be sent to the front when a color is picked or when the user
   * cancels the picker.
   *
   * @param  {Object} options  color picker options
   * @return {Promise}         request response
   */
  pickColorFromPage(options) {
    return this.request('pickColorFromPage', { options });
  }

  /**
   * After the pickColorFromPage method is called, the only way to dismiss the eye-dropper
   * highlighter is for the user to click in the page and select a color. If you need to
   * dismiss the eye-dropper programatically instead, use this method.
   *
   * @return {Promise}  request response
   */
  cancelPickColorFromPage() {
    return this.request('cancelPickColorFromPage');
  }

  /**
   * Check if the current document supports highlighters using a canvasFrame anonymous
   * content container (ie all highlighters except the SimpleOutlineHighlighter).
   * It is impossible to detect the feature programmatically as some document types simply
   * don't render the canvasFrame without throwing any error.
   *
   * @return {Promise}  request response
   */
  supportsHighlighters() {
    var _this6 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { value } = yield _this6.request('supportsHighlighters');
      return value;
    })();
  }
}
exports.default = Inspector;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2luc3BlY3Rvci5qcyJdLCJuYW1lcyI6WyJJbnNwZWN0b3IiLCJnZXRXYWxrZXIiLCJvcHRpb25zIiwid2Fsa2VyIiwicmVxdWVzdCIsImdldFBhZ2VTdHlsZSIsInBhZ2VTdHlsZSIsImNsaWVudCIsImdldEhpZ2hsaWdodGVyIiwiYXV0b2hpZGUiLCJoaWdobGlndGVyIiwiZ2V0SGlnaGxpZ2h0ZXJCeVR5cGUiLCJ0eXBlTmFtZSIsImdldEltYWdlRGF0YUZyb21VUkwiLCJ1cmwiLCJtYXhEaW0iLCJyZXNvbHZlUmVsYXRpdmVVUkwiLCJub2RlIiwidmFsdWUiLCJwaWNrQ29sb3JGcm9tUGFnZSIsImNhbmNlbFBpY2tDb2xvckZyb21QYWdlIiwic3VwcG9ydHNIaWdobGlnaHRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7O0FBSWUsTUFBTUEsU0FBTix5QkFBOEI7QUFDekM7Ozs7OztBQU1NQyxXQUFOLENBQWlCQyxPQUFqQixFQUEwQjtBQUFBOztBQUFBO0FBQ3RCLFlBQU0sRUFBRUMsTUFBRixLQUFhLE1BQU0sTUFBS0MsT0FBTCxDQUFhLFdBQWIsRUFBMEIsRUFBRUYsT0FBRixFQUExQixDQUF6QjtBQUNBLGFBQU9DLE1BQVA7QUFGc0I7QUFHekI7O0FBRUQ7Ozs7O0FBS01FLGNBQU4sR0FBc0I7QUFBQTs7QUFBQTtBQUNsQixZQUFNLEVBQUVDLFNBQUYsS0FBZ0IsTUFBTSxPQUFLRixPQUFMLENBQWEsY0FBYixDQUE1QjtBQUNBLGFBQU8sd0JBQWMsT0FBS0csTUFBbkIsRUFBMkJELFNBQTNCLENBQVA7QUFGa0I7QUFHckI7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTUUsZ0JBQU4sQ0FBc0JDLFFBQXRCLEVBQWdDO0FBQUE7O0FBQUE7QUFDNUIsWUFBTSxFQUFFQyxVQUFGLEtBQWlCLE9BQUtOLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUFFSyxRQUFGLEVBQS9CLENBQXZCO0FBQ0EsYUFBTywwQkFBZ0IsT0FBS0YsTUFBckIsRUFBNkJHLFVBQTdCLENBQVA7QUFGNEI7QUFHL0I7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTUMsc0JBQU4sQ0FBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQUE7QUFDbEMsWUFBTSxFQUFFRixVQUFGLEtBQWlCLE9BQUtOLE9BQUwsQ0FBYSxzQkFBYixFQUFxQyxFQUFFUSxRQUFGLEVBQXJDLENBQXZCO0FBQ0EsYUFBTywwQkFBZ0IsT0FBS0wsTUFBckIsRUFBNkJHLFVBQTdCLENBQVA7QUFGa0M7QUFHckM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0FBY0FHLHNCQUFxQkMsR0FBckIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQzlCLFdBQU8sS0FBS1gsT0FBTCxDQUFhLHFCQUFiLEVBQW9DLEVBQUVVLEdBQUYsRUFBT0MsTUFBUCxFQUFwQyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUU1DLG9CQUFOLENBQTBCRixHQUExQixFQUErQkcsSUFBL0IsRUFBcUM7QUFBQTs7QUFBQTtBQUNqQyxZQUFNLEVBQUVDLEtBQUYsS0FBWSxNQUFNLE9BQUtkLE9BQUwsQ0FBYSxvQkFBYixFQUFtQyxFQUFFVSxHQUFGLEVBQU9HLElBQVAsRUFBbkMsQ0FBeEI7QUFDQSxhQUFPQyxLQUFQO0FBRmlDO0FBR3BDOztBQUVEOzs7Ozs7OztBQVFBQyxvQkFBbUJqQixPQUFuQixFQUE0QjtBQUN4QixXQUFPLEtBQUtFLE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxFQUFFRixPQUFGLEVBQWxDLENBQVA7QUFDSDs7QUFFRDs7Ozs7OztBQU9Ba0IsNEJBQTJCO0FBQ3ZCLFdBQU8sS0FBS2hCLE9BQUwsQ0FBYSx5QkFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUU1pQixzQkFBTixHQUE4QjtBQUFBOztBQUFBO0FBQzFCLFlBQU0sRUFBRUgsS0FBRixLQUFZLE1BQU0sT0FBS2QsT0FBTCxDQUFhLHNCQUFiLENBQXhCO0FBQ0EsYUFBT2MsS0FBUDtBQUYwQjtBQUc3QjtBQXJId0M7a0JBQXhCbEIsUyIsImZpbGUiOiJpbnNwZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5pbXBvcnQgSGlnaGxpZ2h0ZXIgZnJvbSAnLi4vbW9kZWxzL2hpZ2hsaWdodGVyJ1xuaW1wb3J0IFBhZ2VzdHlsZSBmcm9tICcuLi9tb2RlbHMvcGFnZXN0eWxlJ1xuXG4vKipcbiAqIFNlcnZlciBzaWRlIG9mIHRoZSBpbnNwZWN0b3IgYWN0b3IsIHdoaWNoIGlzIHVzZWQgdG8gY3JlYXRlXG4gKiBpbnNwZWN0b3ItcmVsYXRlZCBhY3RvcnMsIGluY2x1ZGluZyB0aGUgd2Fsa2VyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnNwZWN0b3IgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogR2V0IHdhbGtlclxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgb3B0aW9ucyAgV2Fsa2VyIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdH0gICBXYWxrZXJcbiAgICAgKi9cbiAgICBhc3luYyBnZXRXYWxrZXIgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyB3YWxrZXIgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0V2Fsa2VyJywgeyBvcHRpb25zIH0pXG4gICAgICAgIHJldHVybiB3YWxrZXJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgcGFnZSBzdHlsZSBhY3Rvci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuUGFnZXN0eWxlfSAgUGFnZXN0eWxlIGFjdG9yXG4gICAgICovXG4gICAgYXN5bmMgZ2V0UGFnZVN0eWxlICgpIHtcbiAgICAgICAgY29uc3QgeyBwYWdlU3R5bGUgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0UGFnZVN0eWxlJylcbiAgICAgICAgcmV0dXJuIG5ldyBQYWdlc3R5bGUodGhpcy5jbGllbnQsIHBhZ2VTdHlsZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9zdCB1c2VkIGhpZ2hsaWdodGVyIGFjdG9yIGlzIHRoZSBIaWdobGlnaHRlckFjdG9yIHdoaWNoIGNhbiBiZSBjb252ZW5pZW50bHlcbiAgICAgKiByZXRyaWV2ZWQgYnkgdGhpcyBtZXRob2QuIFRoZSBzYW1lIGluc3RhbmNlIHdpbGwgYWx3YXlzIGJlIHJldHVybmVkIGJ5IHRoaXMgbWV0aG9kXG4gICAgICogd2hlbiBjYWxsZWQgc2V2ZXJhbCB0aW1lcy4gVGhlIGhpZ2hsaWdodGVyIGFjdG9yIHJldHVybmVkIGhlcmUgaXMgdXNlZCB0byBoaWdobGlnaHRlclxuICAgICAqIGVsZW1lbnRzJ3MgYm94LW1vZGVscyBmcm9tIHRoZSBtYXJrdXAtdmlldywgYm94IG1vZGVsLCBjb25zb2xlLCBkZWJ1Z2dlciwgLi4uIGFzIHdlbGxcbiAgICAgKiBhcyBzZWxlY3QgZWxlbWVudHMgd2l0aCB0aGUgcG9pbnRlciAocGljaykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSAgYXV0b2hpZGUgICAgT3B0aW9uYWxseSBhdXRvaGlkZSB0aGUgaGlnaGxpZ2h0ZXIgYWZ0ZXIgYW4gZWxlbWVudCBoYXMgYmVlbiBwaWNrZWRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLkhpZ2hsaWdodGVyfSAgaW5zdGFuY2Ugb2YgaGlnaGxpZ2h0ZXJcbiAgICAgKi9cbiAgICBhc3luYyBnZXRIaWdobGlnaHRlciAoYXV0b2hpZGUpIHtcbiAgICAgICAgY29uc3QgeyBoaWdobGlndGVyIH0gPSB0aGlzLnJlcXVlc3QoJ2dldEhpZ2hsaWdodGVyJywgeyBhdXRvaGlkZSB9KVxuICAgICAgICByZXR1cm4gbmV3IEhpZ2hsaWdodGVyKHRoaXMuY2xpZW50LCBoaWdobGlndGVyKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIGNvbnN1bWVycyBuZWVkIHRvIGRpc3BsYXkgc2V2ZXJhbCBoaWdobGlnaHRlcnMgYXQgdGhlIHNhbWUgdGltZSBvciBkaWZmZXJlbnQgdHlwZXMgb2ZcbiAgICAgKiBoaWdobGlnaHRlcnMsIHRoZW4gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIHVzZWQsIHBhc3NpbmcgdGhlIHR5cGUgbmFtZSBvZiB0aGUgaGlnaGxpZ2h0ZXJcbiAgICAgKiBuZWVkZWQgYXMgYXJndW1lbnQuIEEgbmV3IGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZCBldmVyeXRpbWUgdGhlIG1ldGhvZCBpcyBjYWxsZWQsIHNvIGl0J3NcbiAgICAgKiB1cCB0byB0aGUgY29uc3VtZXIgdG8gcmVsZWFzZSBpdCB3aGVuIGl0IGlzIG5vdCBuZWVkZWQgYW55bW9yZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgdHlwZU5hbWUgICAgIFRoZSB0eXBlIG9mIGhpZ2hsaWdodGVyIHRvIGNyZWF0ZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuSGlnaGxpZ2h0ZXJ9ICBUaGUgaGlnaGxpZ2h0ZXIgYWN0b3IgaW5zdGFuY2Ugb3IgbnVsbCBpZiB0aGUgdHlwZU5hbWUgcGFzc2VkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXNuJ3QgbWF0Y2ggYW55IGF2YWlsYWJsZSBoaWdobGlnaHRlclxuICAgICAqL1xuICAgIGFzeW5jIGdldEhpZ2hsaWdodGVyQnlUeXBlICh0eXBlTmFtZSkge1xuICAgICAgICBjb25zdCB7IGhpZ2hsaWd0ZXIgfSA9IHRoaXMucmVxdWVzdCgnZ2V0SGlnaGxpZ2h0ZXJCeVR5cGUnLCB7IHR5cGVOYW1lIH0pXG4gICAgICAgIHJldHVybiBuZXcgSGlnaGxpZ2h0ZXIodGhpcy5jbGllbnQsIGhpZ2hsaWd0ZXIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBub2RlJ3MgaW1hZ2UgZGF0YSBpZiBhbnkgKGZvciBjYW52YXMgYW5kIGltZyBub2RlcykuIFJldHVybnMgYW4gaW1hZ2VEYXRhIG9iamVjdCB3aXRoXG4gICAgICogdGhlIGFjdHVhbCBkYXRhIGJlaW5nIGEgTG9uZ1N0cmluZ0FjdG9yIGFuZCBhIHNpemUganNvbiBvYmplY3QuIFRoZSBpbWFnZSBkYXRhIGlzIHRyYW5zbWl0dGVkXG4gICAgICogYXMgYSBiYXNlNjQgZW5jb2RlZCBwbmcgZGF0YS11cmkuIFRoZSBtZXRob2QgcmVqZWN0cyBpZiB0aGUgbm9kZSBpc24ndCBhbiBpbWFnZSBvciBpZiB0aGVcbiAgICAgKiBpbWFnZSBpcyBtaXNzaW5nLlxuICAgICAqXG4gICAgICogQWNjZXB0cyBhIG1heERpbSByZXF1ZXN0IHBhcmFtZXRlciB0byByZXNpemUgaW1hZ2VzIHRoYXQgYXJlIGxhcmdlci4gVGhpcyBpcyBpbXBvcnRhbnQgYXMgdGhlXG4gICAgICogcmVzaXppbmcgb2NjdXJzIHNlcnZlci1zaWRlIHNvIHRoYXQgaW1hZ2UtZGF0YSBiZWluZyB0cmFuc2ZlcmVkIGluIHRoZSBsb25nc3RyaW5nIGJhY2sgdG8gdGhlXG4gICAgICogY2xpZW50IHdpbGwgYmUgdGhhdCBtdWNoIHNtYWxsZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCAgICAgICAgaW1hZ2UgdXJsXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBtYXhEaW0gICAgIHJlc2l6aW5nIHBhcmFtZXRlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59ICBpbWFnZSBkYXRhXG4gICAgICovXG4gICAgZ2V0SW1hZ2VEYXRhRnJvbVVSTCAodXJsLCBtYXhEaW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0SW1hZ2VEYXRhRnJvbVVSTCcsIHsgdXJsLCBtYXhEaW0gfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIGEgVVJMIHRvIGl0cyBhYnNvbHV0ZSBmb3JtLCBpbiB0aGUgc2NvcGUgb2YgYSBnaXZlbiBjb250ZW50IHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgdXJsICAgdXJsIHRvIGJlIHJlc29sdmVkXG4gICAgICogQHBhcmFtICB7Tm9kZUFjdG9yfSBub2RlICBJZiBwcm92aWRlZCwgdGhlIG93bmVyIHdpbmRvdyBvZiB0aGlzIG5vZGUgd2lsbCBiZSB1c2VkIHRvIHJlc29sdmVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBVUkwuIE90aGVyd2lzZSwgdGhlIHRvcC1sZXZlbCBjb250ZW50IHdpbmRvdyB3aWxsIGJlIHVzZWQgaW5zdGVhZC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLlN0cmluZ30gIHJlc29sdmVkIHVybFxuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVSZWxhdGl2ZVVSTCAodXJsLCBub2RlKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgncmVzb2x2ZVJlbGF0aXZlVVJMJywgeyB1cmwsIG5vZGUgfSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGljayBhIGNvbG9yIGZyb20gdGhlIHBhZ2UgdXNpbmcgdGhlIGV5ZS1kcm9wcGVyLiBUaGlzIG1ldGhvZCBkb2Vzbid0IHJldHVybiBhbnl0aGluZ1xuICAgICAqIGJ1dCB3aWxsIGNhdXNlIGV2ZW50cyB0byBiZSBzZW50IHRvIHRoZSBmcm9udCB3aGVuIGEgY29sb3IgaXMgcGlja2VkIG9yIHdoZW4gdGhlIHVzZXJcbiAgICAgKiBjYW5jZWxzIHRoZSBwaWNrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgIGNvbG9yIHBpY2tlciBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgcGlja0NvbG9yRnJvbVBhZ2UgKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgncGlja0NvbG9yRnJvbVBhZ2UnLCB7IG9wdGlvbnMgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciB0aGUgcGlja0NvbG9yRnJvbVBhZ2UgbWV0aG9kIGlzIGNhbGxlZCwgdGhlIG9ubHkgd2F5IHRvIGRpc21pc3MgdGhlIGV5ZS1kcm9wcGVyXG4gICAgICogaGlnaGxpZ2h0ZXIgaXMgZm9yIHRoZSB1c2VyIHRvIGNsaWNrIGluIHRoZSBwYWdlIGFuZCBzZWxlY3QgYSBjb2xvci4gSWYgeW91IG5lZWQgdG9cbiAgICAgKiBkaXNtaXNzIHRoZSBleWUtZHJvcHBlciBwcm9ncmFtYXRpY2FsbHkgaW5zdGVhZCwgdXNlIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBjYW5jZWxQaWNrQ29sb3JGcm9tUGFnZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NhbmNlbFBpY2tDb2xvckZyb21QYWdlJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgY3VycmVudCBkb2N1bWVudCBzdXBwb3J0cyBoaWdobGlnaHRlcnMgdXNpbmcgYSBjYW52YXNGcmFtZSBhbm9ueW1vdXNcbiAgICAgKiBjb250ZW50IGNvbnRhaW5lciAoaWUgYWxsIGhpZ2hsaWdodGVycyBleGNlcHQgdGhlIFNpbXBsZU91dGxpbmVIaWdobGlnaHRlcikuXG4gICAgICogSXQgaXMgaW1wb3NzaWJsZSB0byBkZXRlY3QgdGhlIGZlYXR1cmUgcHJvZ3JhbW1hdGljYWxseSBhcyBzb21lIGRvY3VtZW50IHR5cGVzIHNpbXBseVxuICAgICAqIGRvbid0IHJlbmRlciB0aGUgY2FudmFzRnJhbWUgd2l0aG91dCB0aHJvd2luZyBhbnkgZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIGFzeW5jIHN1cHBvcnRzSGlnaGxpZ2h0ZXJzICgpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdzdXBwb3J0c0hpZ2hsaWdodGVycycpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbn1cbiJdfQ==