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
 * CSSUsage manages the collection of CSS usage data.
 * The core of a CSSUsage is a JSON-able data structure called _knownRules
 * which looks like this:
 * This records the CSSStyleRules and their usage.
 * The format is:
 *     Map({
 *       <CSS-URL>|<START-LINE>|<START-COLUMN>: {
 *         selectorText: <CSSStyleRule.selectorText>,
 *         test: <simplify(CSSStyleRule.selectorText)>,
 *         cssText: <CSSStyleRule.cssText>,
 *         isUsed: <TRUE|FALSE>,
 *         presentOn: Set([ <HTML-URL>, ... ]),
 *         preLoadOn: Set([ <HTML-URL>, ... ]),
 *         isError: <TRUE|FALSE>,
 *       }
 *     })
 *
 * For example:
 *     this._knownRules = Map({
 *       "http://eg.com/styles1.css|15|0": {
 *         selectorText: "p.quote:hover",
 *         test: "p.quote",
 *         cssText: "p.quote { color: red; }",
 *         isUsed: true,
 *         presentOn: Set([ "http://eg.com/page1.html", ... ]),
 *         preLoadOn: Set([ "http://eg.com/page1.html" ]),
 *         isError: false,
 *       }, ...
 *     });
 */
class CSSUsage extends _actor2.default {
  /**
   * Begin recording usage data
   *
   * @param  {Boolean} [url=false] It's best if we start by reloading the current page
   *                               because that starts the test at a known point, but there could be reasons
   *                               why we don't want to do that (e.g. the page contains state that will be
   *                               lost across a reload)
   * @return {Promise.<Object>}    request response
   */
  start(url = false) {
    return this.request('start', { url });
  }

  /**
   * Cease recording usage data
   *
   * @return {Promise.<Object>}    request response
   */
  stop() {
    return this.request('stop');
  }

  /**
   * Start/stop recording usage data depending on what we're currently doing.
   *
   * @return {Promise.<Object>}    request response
   */
  toggle() {
    return this.request('toggle');
  }

  /**
   * Running start() quickly followed by stop() does a bunch of unnecessary work, so this cuts all that out
   *
   * @return {Promise.<Object>}    request response
   */
  oneshot() {
    return this.request('oneshot');
  }

  /**
   * Returns a JSONable structure designed to help marking up the style editor,
   * which describes the CSS selector usage.
   * Example:
   * [
   *     {
   *         selectorText: "p#content",
   *         usage: "unused|used",
   *         start: { line: 3, column: 0 },
   *     },
   *     ...
   * ]
   *
   * @param  {String}  url        url of page you want to audit
   * @return {Promise.<Object>}   request response
   */
  createEditorReport(url) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { reports } = yield _this.request('createEditorReport', { url });
      return reports;
    })();
  }

  /**
   * Compute the stylesheet URL and delegate the report creation to createEditorReport.
   * See createEditorReport documentation.
   *
   * @param  {String}  url        url of page you want to audit
   * @return {Promise.<Object>}   request response
   */
  createEditorReportForSheet(url) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { reports } = yield _this2.request('createEditorReportForSheet', { url });
      return reports;
    })();
  }

  /**
   * Returns a JSONable structure designed for the page report which shows
   * the recommended changes to a page.
   *
   * "preload" means that a rule is used before the load event happens, which
   * means that the page could by optimized by placing it in a <style> element
   * at the top of the page, moving the <link> elements to the bottom.
   *
   * Example:
   *   {
   *     preload: [
   *       {
   *         url: "http://example.org/page1.html",
   *         shortUrl: "page1.html",
   *         rules: [
   *           {
   *             url: "http://example.org/style1.css",
   *             shortUrl: "style1.css",
   *             start: { line: 3, column: 4 },
   *             selectorText: "p#content",
   *             formattedCssText: "p#content {\n  color: red;\n }\n"
   *          },
   *          ...
   *         ]
   *       }
   *     ],
   *     unused: [
   *       {
   *         url: "http://example.org/style1.css",
   *         shortUrl: "style1.css",
   *         rules: [ ... ]
   *       }
   *     ]
   *   }
   *
   * @return {Promise.<Object>}   request response
   */
  createPageReport() {
    return this.request('createPageReport');
  }
}
exports.default = CSSUsage;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2Nzc1VzYWdlLmpzIl0sIm5hbWVzIjpbIkNTU1VzYWdlIiwic3RhcnQiLCJ1cmwiLCJyZXF1ZXN0Iiwic3RvcCIsInRvZ2dsZSIsIm9uZXNob3QiLCJjcmVhdGVFZGl0b3JSZXBvcnQiLCJyZXBvcnRzIiwiY3JlYXRlRWRpdG9yUmVwb3J0Rm9yU2hlZXQiLCJjcmVhdGVQYWdlUmVwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JlLE1BQU1BLFFBQU4seUJBQTZCO0FBQ3hDOzs7Ozs7Ozs7QUFTQUMsUUFBT0MsTUFBTSxLQUFiLEVBQW9CO0FBQ2hCLFdBQU8sS0FBS0MsT0FBTCxDQUFhLE9BQWIsRUFBc0IsRUFBRUQsR0FBRixFQUF0QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FFLFNBQVE7QUFDSixXQUFPLEtBQUtELE9BQUwsQ0FBYSxNQUFiLENBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLQUUsV0FBVTtBQUNOLFdBQU8sS0FBS0YsT0FBTCxDQUFhLFFBQWIsQ0FBUDtBQUNIOztBQUVEOzs7OztBQUtBRyxZQUFXO0FBQ1AsV0FBTyxLQUFLSCxPQUFMLENBQWEsU0FBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk1JLG9CQUFOLENBQTBCTCxHQUExQixFQUErQjtBQUFBOztBQUFBO0FBQzNCLFlBQU0sRUFBRU0sT0FBRixLQUFjLE1BQU0sTUFBS0wsT0FBTCxDQUFhLG9CQUFiLEVBQW1DLEVBQUVELEdBQUYsRUFBbkMsQ0FBMUI7QUFDQSxhQUFPTSxPQUFQO0FBRjJCO0FBRzlCOztBQUVEOzs7Ozs7O0FBT01DLDRCQUFOLENBQWtDUCxHQUFsQyxFQUF1QztBQUFBOztBQUFBO0FBQ25DLFlBQU0sRUFBRU0sT0FBRixLQUFjLE1BQU0sT0FBS0wsT0FBTCxDQUFhLDRCQUFiLEVBQTJDLEVBQUVELEdBQUYsRUFBM0MsQ0FBMUI7QUFDQSxhQUFPTSxPQUFQO0FBRm1DO0FBR3RDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBRSxxQkFBb0I7QUFDaEIsV0FBTyxLQUFLUCxPQUFMLENBQWEsa0JBQWIsQ0FBUDtBQUNIO0FBakh1QztrQkFBdkJILFEiLCJmaWxlIjoiY3NzVXNhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbi8qKlxuICogQ1NTVXNhZ2UgbWFuYWdlcyB0aGUgY29sbGVjdGlvbiBvZiBDU1MgdXNhZ2UgZGF0YS5cbiAqIFRoZSBjb3JlIG9mIGEgQ1NTVXNhZ2UgaXMgYSBKU09OLWFibGUgZGF0YSBzdHJ1Y3R1cmUgY2FsbGVkIF9rbm93blJ1bGVzXG4gKiB3aGljaCBsb29rcyBsaWtlIHRoaXM6XG4gKiBUaGlzIHJlY29yZHMgdGhlIENTU1N0eWxlUnVsZXMgYW5kIHRoZWlyIHVzYWdlLlxuICogVGhlIGZvcm1hdCBpczpcbiAqICAgICBNYXAoe1xuICogICAgICAgPENTUy1VUkw+fDxTVEFSVC1MSU5FPnw8U1RBUlQtQ09MVU1OPjoge1xuICogICAgICAgICBzZWxlY3RvclRleHQ6IDxDU1NTdHlsZVJ1bGUuc2VsZWN0b3JUZXh0PixcbiAqICAgICAgICAgdGVzdDogPHNpbXBsaWZ5KENTU1N0eWxlUnVsZS5zZWxlY3RvclRleHQpPixcbiAqICAgICAgICAgY3NzVGV4dDogPENTU1N0eWxlUnVsZS5jc3NUZXh0PixcbiAqICAgICAgICAgaXNVc2VkOiA8VFJVRXxGQUxTRT4sXG4gKiAgICAgICAgIHByZXNlbnRPbjogU2V0KFsgPEhUTUwtVVJMPiwgLi4uIF0pLFxuICogICAgICAgICBwcmVMb2FkT246IFNldChbIDxIVE1MLVVSTD4sIC4uLiBdKSxcbiAqICAgICAgICAgaXNFcnJvcjogPFRSVUV8RkFMU0U+LFxuICogICAgICAgfVxuICogICAgIH0pXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKiAgICAgdGhpcy5fa25vd25SdWxlcyA9IE1hcCh7XG4gKiAgICAgICBcImh0dHA6Ly9lZy5jb20vc3R5bGVzMS5jc3N8MTV8MFwiOiB7XG4gKiAgICAgICAgIHNlbGVjdG9yVGV4dDogXCJwLnF1b3RlOmhvdmVyXCIsXG4gKiAgICAgICAgIHRlc3Q6IFwicC5xdW90ZVwiLFxuICogICAgICAgICBjc3NUZXh0OiBcInAucXVvdGUgeyBjb2xvcjogcmVkOyB9XCIsXG4gKiAgICAgICAgIGlzVXNlZDogdHJ1ZSxcbiAqICAgICAgICAgcHJlc2VudE9uOiBTZXQoWyBcImh0dHA6Ly9lZy5jb20vcGFnZTEuaHRtbFwiLCAuLi4gXSksXG4gKiAgICAgICAgIHByZUxvYWRPbjogU2V0KFsgXCJodHRwOi8vZWcuY29tL3BhZ2UxLmh0bWxcIiBdKSxcbiAqICAgICAgICAgaXNFcnJvcjogZmFsc2UsXG4gKiAgICAgICB9LCAuLi5cbiAqICAgICB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NTVXNhZ2UgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogQmVnaW4gcmVjb3JkaW5nIHVzYWdlIGRhdGFcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IFt1cmw9ZmFsc2VdIEl0J3MgYmVzdCBpZiB3ZSBzdGFydCBieSByZWxvYWRpbmcgdGhlIGN1cnJlbnQgcGFnZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlY2F1c2UgdGhhdCBzdGFydHMgdGhlIHRlc3QgYXQgYSBrbm93biBwb2ludCwgYnV0IHRoZXJlIGNvdWxkIGJlIHJlYXNvbnNcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aHkgd2UgZG9uJ3Qgd2FudCB0byBkbyB0aGF0IChlLmcuIHRoZSBwYWdlIGNvbnRhaW5zIHN0YXRlIHRoYXQgd2lsbCBiZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3QgYWNyb3NzIGEgcmVsb2FkKVxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59ICAgIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBzdGFydCAodXJsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc3RhcnQnLCB7IHVybCB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENlYXNlIHJlY29yZGluZyB1c2FnZSBkYXRhXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgc3RvcCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3N0b3AnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0L3N0b3AgcmVjb3JkaW5nIHVzYWdlIGRhdGEgZGVwZW5kaW5nIG9uIHdoYXQgd2UncmUgY3VycmVudGx5IGRvaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHRvZ2dsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3RvZ2dsZScpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUnVubmluZyBzdGFydCgpIHF1aWNrbHkgZm9sbG93ZWQgYnkgc3RvcCgpIGRvZXMgYSBidW5jaCBvZiB1bm5lY2Vzc2FyeSB3b3JrLCBzbyB0aGlzIGN1dHMgYWxsIHRoYXQgb3V0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgb25lc2hvdCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ29uZXNob3QnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBKU09OYWJsZSBzdHJ1Y3R1cmUgZGVzaWduZWQgdG8gaGVscCBtYXJraW5nIHVwIHRoZSBzdHlsZSBlZGl0b3IsXG4gICAgICogd2hpY2ggZGVzY3JpYmVzIHRoZSBDU1Mgc2VsZWN0b3IgdXNhZ2UuXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICAgIHNlbGVjdG9yVGV4dDogXCJwI2NvbnRlbnRcIixcbiAgICAgKiAgICAgICAgIHVzYWdlOiBcInVudXNlZHx1c2VkXCIsXG4gICAgICogICAgICAgICBzdGFydDogeyBsaW5lOiAzLCBjb2x1bW46IDAgfSxcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgLi4uXG4gICAgICogXVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgdXJsICAgICAgICB1cmwgb2YgcGFnZSB5b3Ugd2FudCB0byBhdWRpdFxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59ICAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZUVkaXRvclJlcG9ydCAodXJsKSB7XG4gICAgICAgIGNvbnN0IHsgcmVwb3J0cyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdjcmVhdGVFZGl0b3JSZXBvcnQnLCB7IHVybCB9KVxuICAgICAgICByZXR1cm4gcmVwb3J0c1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdGhlIHN0eWxlc2hlZXQgVVJMIGFuZCBkZWxlZ2F0ZSB0aGUgcmVwb3J0IGNyZWF0aW9uIHRvIGNyZWF0ZUVkaXRvclJlcG9ydC5cbiAgICAgKiBTZWUgY3JlYXRlRWRpdG9yUmVwb3J0IGRvY3VtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICB1cmwgICAgICAgIHVybCBvZiBwYWdlIHlvdSB3YW50IHRvIGF1ZGl0XG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlRWRpdG9yUmVwb3J0Rm9yU2hlZXQgKHVybCkge1xuICAgICAgICBjb25zdCB7IHJlcG9ydHMgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnY3JlYXRlRWRpdG9yUmVwb3J0Rm9yU2hlZXQnLCB7IHVybCB9KVxuICAgICAgICByZXR1cm4gcmVwb3J0c1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBKU09OYWJsZSBzdHJ1Y3R1cmUgZGVzaWduZWQgZm9yIHRoZSBwYWdlIHJlcG9ydCB3aGljaCBzaG93c1xuICAgICAqIHRoZSByZWNvbW1lbmRlZCBjaGFuZ2VzIHRvIGEgcGFnZS5cbiAgICAgKlxuICAgICAqIFwicHJlbG9hZFwiIG1lYW5zIHRoYXQgYSBydWxlIGlzIHVzZWQgYmVmb3JlIHRoZSBsb2FkIGV2ZW50IGhhcHBlbnMsIHdoaWNoXG4gICAgICogbWVhbnMgdGhhdCB0aGUgcGFnZSBjb3VsZCBieSBvcHRpbWl6ZWQgYnkgcGxhY2luZyBpdCBpbiBhIDxzdHlsZT4gZWxlbWVudFxuICAgICAqIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2UsIG1vdmluZyB0aGUgPGxpbms+IGVsZW1lbnRzIHRvIHRoZSBib3R0b20uXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqICAge1xuICAgICAqICAgICBwcmVsb2FkOiBbXG4gICAgICogICAgICAge1xuICAgICAqICAgICAgICAgdXJsOiBcImh0dHA6Ly9leGFtcGxlLm9yZy9wYWdlMS5odG1sXCIsXG4gICAgICogICAgICAgICBzaG9ydFVybDogXCJwYWdlMS5odG1sXCIsXG4gICAgICogICAgICAgICBydWxlczogW1xuICAgICAqICAgICAgICAgICB7XG4gICAgICogICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9leGFtcGxlLm9yZy9zdHlsZTEuY3NzXCIsXG4gICAgICogICAgICAgICAgICAgc2hvcnRVcmw6IFwic3R5bGUxLmNzc1wiLFxuICAgICAqICAgICAgICAgICAgIHN0YXJ0OiB7IGxpbmU6IDMsIGNvbHVtbjogNCB9LFxuICAgICAqICAgICAgICAgICAgIHNlbGVjdG9yVGV4dDogXCJwI2NvbnRlbnRcIixcbiAgICAgKiAgICAgICAgICAgICBmb3JtYXR0ZWRDc3NUZXh0OiBcInAjY29udGVudCB7XFxuICBjb2xvcjogcmVkO1xcbiB9XFxuXCJcbiAgICAgKiAgICAgICAgICB9LFxuICAgICAqICAgICAgICAgIC4uLlxuICAgICAqICAgICAgICAgXVxuICAgICAqICAgICAgIH1cbiAgICAgKiAgICAgXSxcbiAgICAgKiAgICAgdW51c2VkOiBbXG4gICAgICogICAgICAge1xuICAgICAqICAgICAgICAgdXJsOiBcImh0dHA6Ly9leGFtcGxlLm9yZy9zdHlsZTEuY3NzXCIsXG4gICAgICogICAgICAgICBzaG9ydFVybDogXCJzdHlsZTEuY3NzXCIsXG4gICAgICogICAgICAgICBydWxlczogWyAuLi4gXVxuICAgICAqICAgICAgIH1cbiAgICAgKiAgICAgXVxuICAgICAqICAgfVxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgY3JlYXRlUGFnZVJlcG9ydCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NyZWF0ZVBhZ2VSZXBvcnQnKVxuICAgIH1cbn1cbiJdfQ==