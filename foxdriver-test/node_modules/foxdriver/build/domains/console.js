'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Console extends _actor2.default {

    /**
     * Start the given Web Console listeners.
     *
     * @param  {String[]} listeners  listeners to listen to (default: 'PageError', 'ConsoleAPI')
     * @return {Promise.<Object>}    request response
     */
    startListeners(listeners = Console.listeners) {
        this.isEnabled = true;
        return this.request('startListeners', { listeners });
    }

    /**
     * Stop the given Web Console listeners.
     *
     * @param  {String[]} listeners  listeners to stop listen to (default: 'PageError', 'ConsoleAPI')
     * @return {Promise.<Object>}    request response
     */
    stopListeners(listeners = Console.listeners) {
        this.isEnabled = false;
        return this.request('stopListeners', { listeners });
    }

    /**
     * Retrieve the cached messages from the server.
     *
     * @param  {String[]}  messageTypes  type of cached message to get (default: 'PageError', 'ConsoleAPI')
     * @return {Promise.<Object>[]}      list of console messages
     */
    getCachedMessages(messageTypes = Console.listeners) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            if (!_this.isEnabled) {
                throw new Error('Console is not enabled');
            }

            const resp = yield _this.request('getCachedMessages', { messageTypes });
            return resp.messages;
        })();
    }

    /**
     * Clear the cache of messages (console API calls only).
     *
     * @return {Promise.<Object>}  request response
     */
    clearMessagesCache() {
        return this.request('clearMessagesCache');
    }

    /**
     * Evaluate a JavaScript expression.
     *
     * @param  {String|Function}  script  js code to evaluate
     * @param  {Object}           args    arguments to pass to the function
     * @return {Promise.<Object, Error>}  result of the js function or an exception if script fails
     */
    evaluateJS(script, ...args) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const argsTransformed = (0, _utils.transformEvaluateArgs)(args);
            const text = (0, _utils.transformEvaluateScript)(script, argsTransformed);
            const { result, exception, exceptionMessage } = yield _this2.request('evaluateJS', { text });

            if (exception) {
                throw new Error(exceptionMessage);
            }

            return result;
        })();
    }

    /**
     * Get Web Console-related preferences on the server.
     *
     * @param  {String[]} preferences  An array with the preferences you want to retrieve.
     * @return {Promise.<Object>[]}    List of preferences
     */
    getPreferences(preferences) {
        return this.request('getPreferences', { preferences });
    }

    /**
     * Set Web Console-related preferences on the server.
     *
     * @param {Object} preferences  An object with the preferences you want to change.
     * @return {Promise.<Object>}   request response
     */
    setPreferences(preferences) {
        return this.request('setPreferences', { preferences });
    }

    /**
     * Autocomplete a JavaScript expression.
     *
     * @param  {String} text      The code you want to autocomplete.
     * @param  {Number} cursor    Cursor location inside the string. Index starts from 0.
     * @return {Promise.<Object>} request response
     */
    autocomplete(text, cursor) {
        return this.request('autocomplete', { text, cursor });
    }

    /**
     * Inspect the properties of an object.
     *
     * @return {Promise.<Object>} request response
     */
    inspectObjectProperties() {
        return this.request('inspectProperties');
    }
}
exports.default = Console;
Console.listeners = ['PageError', 'ConsoleAPI'];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2NvbnNvbGUuanMiXSwibmFtZXMiOlsiQ29uc29sZSIsInN0YXJ0TGlzdGVuZXJzIiwibGlzdGVuZXJzIiwiaXNFbmFibGVkIiwicmVxdWVzdCIsInN0b3BMaXN0ZW5lcnMiLCJnZXRDYWNoZWRNZXNzYWdlcyIsIm1lc3NhZ2VUeXBlcyIsIkVycm9yIiwicmVzcCIsIm1lc3NhZ2VzIiwiY2xlYXJNZXNzYWdlc0NhY2hlIiwiZXZhbHVhdGVKUyIsInNjcmlwdCIsImFyZ3MiLCJhcmdzVHJhbnNmb3JtZWQiLCJ0ZXh0IiwicmVzdWx0IiwiZXhjZXB0aW9uIiwiZXhjZXB0aW9uTWVzc2FnZSIsImdldFByZWZlcmVuY2VzIiwicHJlZmVyZW5jZXMiLCJzZXRQcmVmZXJlbmNlcyIsImF1dG9jb21wbGV0ZSIsImN1cnNvciIsImluc3BlY3RPYmplY3RQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVlLE1BQU1BLE9BQU4seUJBQTRCOztBQUd2Qzs7Ozs7O0FBTUFDLG1CQUFnQkMsWUFBWUYsUUFBUUUsU0FBcEMsRUFBK0M7QUFDM0MsYUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGVBQU8sS0FBS0MsT0FBTCxDQUFhLGdCQUFiLEVBQStCLEVBQUVGLFNBQUYsRUFBL0IsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQUcsa0JBQWVILFlBQVlGLFFBQVFFLFNBQW5DLEVBQThDO0FBQzFDLGFBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFPLEtBQUtDLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQUVGLFNBQUYsRUFBOUIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNTUkscUJBQU4sQ0FBeUJDLGVBQWVQLFFBQVFFLFNBQWhELEVBQTJEO0FBQUE7O0FBQUE7QUFDdkQsZ0JBQUksQ0FBQyxNQUFLQyxTQUFWLEVBQXFCO0FBQ2pCLHNCQUFNLElBQUlLLEtBQUosQ0FBVSx3QkFBVixDQUFOO0FBQ0g7O0FBRUQsa0JBQU1DLE9BQU8sTUFBTSxNQUFLTCxPQUFMLENBQWEsbUJBQWIsRUFBa0MsRUFBRUcsWUFBRixFQUFsQyxDQUFuQjtBQUNBLG1CQUFPRSxLQUFLQyxRQUFaO0FBTnVEO0FBTzFEOztBQUVEOzs7OztBQUtBQyx5QkFBc0I7QUFDbEIsZUFBTyxLQUFLUCxPQUFMLENBQWEsb0JBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O0FBT01RLGNBQU4sQ0FBa0JDLE1BQWxCLEVBQTBCLEdBQUdDLElBQTdCLEVBQW1DO0FBQUE7O0FBQUE7QUFDL0Isa0JBQU1DLGtCQUFrQixrQ0FBc0JELElBQXRCLENBQXhCO0FBQ0Esa0JBQU1FLE9BQU8sb0NBQXdCSCxNQUF4QixFQUFnQ0UsZUFBaEMsQ0FBYjtBQUNBLGtCQUFNLEVBQUVFLE1BQUYsRUFBVUMsU0FBVixFQUFxQkMsZ0JBQXJCLEtBQTBDLE1BQU0sT0FBS2YsT0FBTCxDQUFhLFlBQWIsRUFBMkIsRUFBRVksSUFBRixFQUEzQixDQUF0RDs7QUFFQSxnQkFBSUUsU0FBSixFQUFlO0FBQ1gsc0JBQU0sSUFBSVYsS0FBSixDQUFVVyxnQkFBVixDQUFOO0FBQ0g7O0FBRUQsbUJBQU9GLE1BQVA7QUFUK0I7QUFVbEM7O0FBRUQ7Ozs7OztBQU1BRyxtQkFBZ0JDLFdBQWhCLEVBQTZCO0FBQ3pCLGVBQU8sS0FBS2pCLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUFFaUIsV0FBRixFQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BQyxtQkFBZ0JELFdBQWhCLEVBQTZCO0FBQ3pCLGVBQU8sS0FBS2pCLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUFFaUIsV0FBRixFQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7QUFPQUUsaUJBQWNQLElBQWQsRUFBb0JRLE1BQXBCLEVBQTRCO0FBQ3hCLGVBQU8sS0FBS3BCLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLEVBQUVZLElBQUYsRUFBUVEsTUFBUixFQUE3QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0FDLDhCQUEyQjtBQUN2QixlQUFPLEtBQUtyQixPQUFMLENBQWEsbUJBQWIsQ0FBUDtBQUNIO0FBMUdzQztrQkFBdEJKLE87QUFBQUEsTyxDQUNWRSxTLEdBQVksQ0FBQyxXQUFELEVBQWMsWUFBZCxDIiwiZmlsZSI6ImNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5pbXBvcnQgeyB0cmFuc2Zvcm1FdmFsdWF0ZUFyZ3MsIHRyYW5zZm9ybUV2YWx1YXRlU2NyaXB0IH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGUgZXh0ZW5kcyBBY3RvciB7XG4gICAgc3RhdGljIGxpc3RlbmVycyA9IFsnUGFnZUVycm9yJywgJ0NvbnNvbGVBUEknXVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIGdpdmVuIFdlYiBDb25zb2xlIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ1tdfSBsaXN0ZW5lcnMgIGxpc3RlbmVycyB0byBsaXN0ZW4gdG8gKGRlZmF1bHQ6ICdQYWdlRXJyb3InLCAnQ29uc29sZUFQSScpXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHN0YXJ0TGlzdGVuZXJzIChsaXN0ZW5lcnMgPSBDb25zb2xlLmxpc3RlbmVycykge1xuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnc3RhcnRMaXN0ZW5lcnMnLCB7IGxpc3RlbmVycyB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdGhlIGdpdmVuIFdlYiBDb25zb2xlIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ1tdfSBsaXN0ZW5lcnMgIGxpc3RlbmVycyB0byBzdG9wIGxpc3RlbiB0byAoZGVmYXVsdDogJ1BhZ2VFcnJvcicsICdDb25zb2xlQVBJJylcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgc3RvcExpc3RlbmVycyAobGlzdGVuZXJzID0gQ29uc29sZS5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdzdG9wTGlzdGVuZXJzJywgeyBsaXN0ZW5lcnMgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgY2FjaGVkIG1lc3NhZ2VzIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ1tdfSAgbWVzc2FnZVR5cGVzICB0eXBlIG9mIGNhY2hlZCBtZXNzYWdlIHRvIGdldCAoZGVmYXVsdDogJ1BhZ2VFcnJvcicsICdDb25zb2xlQVBJJylcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+W119ICAgICAgbGlzdCBvZiBjb25zb2xlIG1lc3NhZ2VzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q2FjaGVkTWVzc2FnZXMgKG1lc3NhZ2VUeXBlcyA9IENvbnNvbGUubGlzdGVuZXJzKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uc29sZSBpcyBub3QgZW5hYmxlZCcpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRDYWNoZWRNZXNzYWdlcycsIHsgbWVzc2FnZVR5cGVzIH0pXG4gICAgICAgIHJldHVybiByZXNwLm1lc3NhZ2VzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGNhY2hlIG9mIG1lc3NhZ2VzIChjb25zb2xlIEFQSSBjYWxscyBvbmx5KS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdD59ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgY2xlYXJNZXNzYWdlc0NhY2hlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnY2xlYXJNZXNzYWdlc0NhY2hlJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmFsdWF0ZSBhIEphdmFTY3JpcHQgZXhwcmVzc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gIHNjcmlwdCAganMgY29kZSB0byBldmFsdWF0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICAgIGFyZ3MgICAgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0LCBFcnJvcj59ICByZXN1bHQgb2YgdGhlIGpzIGZ1bmN0aW9uIG9yIGFuIGV4Y2VwdGlvbiBpZiBzY3JpcHQgZmFpbHNcbiAgICAgKi9cbiAgICBhc3luYyBldmFsdWF0ZUpTIChzY3JpcHQsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgYXJnc1RyYW5zZm9ybWVkID0gdHJhbnNmb3JtRXZhbHVhdGVBcmdzKGFyZ3MpXG4gICAgICAgIGNvbnN0IHRleHQgPSB0cmFuc2Zvcm1FdmFsdWF0ZVNjcmlwdChzY3JpcHQsIGFyZ3NUcmFuc2Zvcm1lZClcbiAgICAgICAgY29uc3QgeyByZXN1bHQsIGV4Y2VwdGlvbiwgZXhjZXB0aW9uTWVzc2FnZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdldmFsdWF0ZUpTJywgeyB0ZXh0IH0pXG5cbiAgICAgICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IFdlYiBDb25zb2xlLXJlbGF0ZWQgcHJlZmVyZW5jZXMgb24gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ1tdfSBwcmVmZXJlbmNlcyAgQW4gYXJyYXkgd2l0aCB0aGUgcHJlZmVyZW5jZXMgeW91IHdhbnQgdG8gcmV0cmlldmUuXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0PltdfSAgICBMaXN0IG9mIHByZWZlcmVuY2VzXG4gICAgICovXG4gICAgZ2V0UHJlZmVyZW5jZXMgKHByZWZlcmVuY2VzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldFByZWZlcmVuY2VzJywgeyBwcmVmZXJlbmNlcyB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBXZWIgQ29uc29sZS1yZWxhdGVkIHByZWZlcmVuY2VzIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJlZmVyZW5jZXMgIEFuIG9iamVjdCB3aXRoIHRoZSBwcmVmZXJlbmNlcyB5b3Ugd2FudCB0byBjaGFuZ2UuXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgc2V0UHJlZmVyZW5jZXMgKHByZWZlcmVuY2VzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3NldFByZWZlcmVuY2VzJywgeyBwcmVmZXJlbmNlcyB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF1dG9jb21wbGV0ZSBhIEphdmFTY3JpcHQgZXhwcmVzc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dCAgICAgIFRoZSBjb2RlIHlvdSB3YW50IHRvIGF1dG9jb21wbGV0ZS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGN1cnNvciAgICBDdXJzb3IgbG9jYXRpb24gaW5zaWRlIHRoZSBzdHJpbmcuIEluZGV4IHN0YXJ0cyBmcm9tIDAuXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIGF1dG9jb21wbGV0ZSAodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2F1dG9jb21wbGV0ZScsIHsgdGV4dCwgY3Vyc29yIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zcGVjdCB0aGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgaW5zcGVjdE9iamVjdFByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdpbnNwZWN0UHJvcGVydGllcycpXG4gICAgfVxufVxuIl19