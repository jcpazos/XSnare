'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _originalsource = require('./originalsource');

var _originalsource2 = _interopRequireDefault(_originalsource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A StyleSheetActor represents a stylesheet on the server.
 */
class StyleSheet extends _actor2.default {
    /**
     * Toggle the disabled property of the style sheet
     *
     * @return {Promise.Object}  'disabled' - the disabled state after toggling.
     */
    toggleDisabled() {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { disabled } = yield _this.request('toggleDisabled');
            return disabled;
        })();
    }

    /**
     * Protocol method to get the text of this stylesheet.
     *
     * @return {Promise.String}  text of stylesheet
     */
    getText() {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { text } = yield _this2.request('getText');
            return text;
        })();
    }

    /**
     * Protocol method to get the original source (actors) for this
     * stylesheet if it has uses source maps.
     *
     * @return {Promise.OriginalSource[]}  list of original sources of this stylesheet
     */
    getOriginalSources() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { originalSources } = yield _this3.request('getOriginalSources');
            return originalSources.map(function (originalsource) {
                return new _originalsource2.default(_this3.client, originalsource);
            });
        })();
    }

    /**
     * Protocol method that gets the location in the original source of a
     * line, column pair in this stylesheet, if its source mapped, otherwise
     * a promise of the same location.
     *
     * @return {Promise.Object} object with "source", "line" and "column" property
     */
    getOriginalLocation(_line, _column) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { source, line, column } = yield _this4.request('getOriginalLocation', {
                line: _line,
                column: _column
            });
            return { source, line, column };
        })();
    }

    /**
     * Protocol method to get the media rules for the stylesheet.
     *
     * @return {Promise.MediaRuleActors[]}  list of media rules actors
     */
    getMediaRules() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { mediaRules } = yield _this5.request('getMediaRules');
            return mediaRules;
        })();
    }

    /**
     * Update the style sheet in place with new text.
     *
     * @param  {object} request
     *         'text' - new text
     *         'transition' - whether to do CSS transition for change.
     * @return {Promise.Object}  request response
     */
    update(text, transition) {
        return this.request('update', { text, transition });
    }
}
exports.default = StyleSheet;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvc3R5bGVzaGVldC5qcyJdLCJuYW1lcyI6WyJTdHlsZVNoZWV0IiwidG9nZ2xlRGlzYWJsZWQiLCJkaXNhYmxlZCIsInJlcXVlc3QiLCJnZXRUZXh0IiwidGV4dCIsImdldE9yaWdpbmFsU291cmNlcyIsIm9yaWdpbmFsU291cmNlcyIsIm1hcCIsIm9yaWdpbmFsc291cmNlIiwiY2xpZW50IiwiZ2V0T3JpZ2luYWxMb2NhdGlvbiIsIl9saW5lIiwiX2NvbHVtbiIsInNvdXJjZSIsImxpbmUiLCJjb2x1bW4iLCJnZXRNZWRpYVJ1bGVzIiwibWVkaWFSdWxlcyIsInVwZGF0ZSIsInRyYW5zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsVUFBTix5QkFBK0I7QUFDMUM7Ozs7O0FBS01DLGtCQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDcEIsa0JBQU0sRUFBRUMsUUFBRixLQUFlLE1BQU0sTUFBS0MsT0FBTCxDQUFhLGdCQUFiLENBQTNCO0FBQ0EsbUJBQU9ELFFBQVA7QUFGb0I7QUFHdkI7O0FBRUQ7Ozs7O0FBS01FLFdBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNiLGtCQUFNLEVBQUVDLElBQUYsS0FBVyxNQUFNLE9BQUtGLE9BQUwsQ0FBYSxTQUFiLENBQXZCO0FBQ0EsbUJBQU9FLElBQVA7QUFGYTtBQUdoQjs7QUFFRDs7Ozs7O0FBTU1DLHNCQUFOLEdBQTRCO0FBQUE7O0FBQUE7QUFDeEIsa0JBQU0sRUFBRUMsZUFBRixLQUFzQixNQUFNLE9BQUtKLE9BQUwsQ0FBYSxvQkFBYixDQUFsQztBQUNBLG1CQUFPSSxnQkFBZ0JDLEdBQWhCLENBQW9CLFVBQUNDLGNBQUQ7QUFBQSx1QkFBb0IsNkJBQW1CLE9BQUtDLE1BQXhCLEVBQWdDRCxjQUFoQyxDQUFwQjtBQUFBLGFBQXBCLENBQVA7QUFGd0I7QUFHM0I7O0FBRUQ7Ozs7Ozs7QUFPTUUsdUJBQU4sQ0FBMkJDLEtBQTNCLEVBQWtDQyxPQUFsQyxFQUEyQztBQUFBOztBQUFBO0FBQ3ZDLGtCQUFNLEVBQUVDLE1BQUYsRUFBVUMsSUFBVixFQUFnQkMsTUFBaEIsS0FBMkIsTUFBTSxPQUFLYixPQUFMLENBQWEscUJBQWIsRUFBb0M7QUFDdkVZLHNCQUFNSCxLQURpRTtBQUV2RUksd0JBQVFIO0FBRitELGFBQXBDLENBQXZDO0FBSUEsbUJBQU8sRUFBRUMsTUFBRixFQUFVQyxJQUFWLEVBQWdCQyxNQUFoQixFQUFQO0FBTHVDO0FBTTFDOztBQUVEOzs7OztBQUtNQyxpQkFBTixHQUF1QjtBQUFBOztBQUFBO0FBQ25CLGtCQUFNLEVBQUVDLFVBQUYsS0FBaUIsTUFBTSxPQUFLZixPQUFMLENBQWEsZUFBYixDQUE3QjtBQUNBLG1CQUFPZSxVQUFQO0FBRm1CO0FBR3RCOztBQUVEOzs7Ozs7OztBQVFBQyxXQUFRZCxJQUFSLEVBQWNlLFVBQWQsRUFBMEI7QUFDdEIsZUFBTyxLQUFLakIsT0FBTCxDQUFhLFFBQWIsRUFBdUIsRUFBRUUsSUFBRixFQUFRZSxVQUFSLEVBQXZCLENBQVA7QUFDSDtBQW5FeUM7a0JBQXpCcEIsVSIsImZpbGUiOiJzdHlsZXNoZWV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuaW1wb3J0IE9yaWdpbmFsU291cmNlIGZyb20gJy4vb3JpZ2luYWxzb3VyY2UnXG5cbi8qKlxuICogQSBTdHlsZVNoZWV0QWN0b3IgcmVwcmVzZW50cyBhIHN0eWxlc2hlZXQgb24gdGhlIHNlcnZlci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVTaGVldCBleHRlbmRzIEFjdG9yIHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIGRpc2FibGVkIHByb3BlcnR5IG9mIHRoZSBzdHlsZSBzaGVldFxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5PYmplY3R9ICAnZGlzYWJsZWQnIC0gdGhlIGRpc2FibGVkIHN0YXRlIGFmdGVyIHRvZ2dsaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIHRvZ2dsZURpc2FibGVkICgpIHtcbiAgICAgICAgY29uc3QgeyBkaXNhYmxlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCd0b2dnbGVEaXNhYmxlZCcpXG4gICAgICAgIHJldHVybiBkaXNhYmxlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3RvY29sIG1ldGhvZCB0byBnZXQgdGhlIHRleHQgb2YgdGhpcyBzdHlsZXNoZWV0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5TdHJpbmd9ICB0ZXh0IG9mIHN0eWxlc2hlZXRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRUZXh0ICgpIHtcbiAgICAgICAgY29uc3QgeyB0ZXh0IH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldFRleHQnKVxuICAgICAgICByZXR1cm4gdGV4dFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3RvY29sIG1ldGhvZCB0byBnZXQgdGhlIG9yaWdpbmFsIHNvdXJjZSAoYWN0b3JzKSBmb3IgdGhpc1xuICAgICAqIHN0eWxlc2hlZXQgaWYgaXQgaGFzIHVzZXMgc291cmNlIG1hcHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9yaWdpbmFsU291cmNlW119ICBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMgb2YgdGhpcyBzdHlsZXNoZWV0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0T3JpZ2luYWxTb3VyY2VzICgpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbFNvdXJjZXMgfSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnZ2V0T3JpZ2luYWxTb3VyY2VzJylcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsU291cmNlcy5tYXAoKG9yaWdpbmFsc291cmNlKSA9PiBuZXcgT3JpZ2luYWxTb3VyY2UodGhpcy5jbGllbnQsIG9yaWdpbmFsc291cmNlKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm90b2NvbCBtZXRob2QgdGhhdCBnZXRzIHRoZSBsb2NhdGlvbiBpbiB0aGUgb3JpZ2luYWwgc291cmNlIG9mIGFcbiAgICAgKiBsaW5lLCBjb2x1bW4gcGFpciBpbiB0aGlzIHN0eWxlc2hlZXQsIGlmIGl0cyBzb3VyY2UgbWFwcGVkLCBvdGhlcndpc2VcbiAgICAgKiBhIHByb21pc2Ugb2YgdGhlIHNhbWUgbG9jYXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLk9iamVjdH0gb2JqZWN0IHdpdGggXCJzb3VyY2VcIiwgXCJsaW5lXCIgYW5kIFwiY29sdW1uXCIgcHJvcGVydHlcbiAgICAgKi9cbiAgICBhc3luYyBnZXRPcmlnaW5hbExvY2F0aW9uIChfbGluZSwgX2NvbHVtbikge1xuICAgICAgICBjb25zdCB7IHNvdXJjZSwgbGluZSwgY29sdW1uIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldE9yaWdpbmFsTG9jYXRpb24nLCB7XG4gICAgICAgICAgICBsaW5lOiBfbGluZSxcbiAgICAgICAgICAgIGNvbHVtbjogX2NvbHVtblxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4geyBzb3VyY2UsIGxpbmUsIGNvbHVtbiB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdG9jb2wgbWV0aG9kIHRvIGdldCB0aGUgbWVkaWEgcnVsZXMgZm9yIHRoZSBzdHlsZXNoZWV0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5NZWRpYVJ1bGVBY3RvcnNbXX0gIGxpc3Qgb2YgbWVkaWEgcnVsZXMgYWN0b3JzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0TWVkaWFSdWxlcyAoKSB7XG4gICAgICAgIGNvbnN0IHsgbWVkaWFSdWxlcyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRNZWRpYVJ1bGVzJylcbiAgICAgICAgcmV0dXJuIG1lZGlhUnVsZXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHN0eWxlIHNoZWV0IGluIHBsYWNlIHdpdGggbmV3IHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHJlcXVlc3RcbiAgICAgKiAgICAgICAgICd0ZXh0JyAtIG5ldyB0ZXh0XG4gICAgICogICAgICAgICAndHJhbnNpdGlvbicgLSB3aGV0aGVyIHRvIGRvIENTUyB0cmFuc2l0aW9uIGZvciBjaGFuZ2UuXG4gICAgICogQHJldHVybiB7UHJvbWlzZS5PYmplY3R9ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgdXBkYXRlICh0ZXh0LCB0cmFuc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3VwZGF0ZScsIHsgdGV4dCwgdHJhbnNpdGlvbiB9KVxuICAgIH1cbn1cbiJdfQ==