'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

var _longString = require('../models/longString');

var _longString2 = _interopRequireDefault(_longString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataURLPreamble = 'data:image/png;base64,';

class Device extends _actor2.default {
    /**
     * Returns general info about browser an OS, e.g.
     * Example:
     * {
     *     appid: '{ec8030f7-c20a-464f-9b0e-13a3a9e97384}',
     *     apptype: 'firefox',
     *     vendor: 'Mozilla',
     *     name: 'Firefox',
     *     version: '55.0.2',
     *     appbuildid: '20170814073321',
     *     changeset: '45ab6e362747102d00fd75378727fcddcfd35f44',
     *     platformbuildid: '20170814073321',
     *     geckobuildid: '20170814073321',
     *     platformversion: '55.0.2',
     *     geckoversion: '55.0.2',
     *     locale: 'de',
     *     endianness: 'LE',
     *     hostname: 'Christian-Bromann-NAT',
     *     os: 'Darwin',
     *     platform: 'Darwin',
     *     hardware: 'unknown',
     *     arch: 'x86_64',
     *     processor: 'x86_64',
     *     compiler: 'gcc3',
     *     profile: 'firefox_dev_profile-BhzvUp',
     *     channel: 'release',
     *     dpi: 258,
     *     useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
     *     width: 2560,
     *     height: 1440,
     *     physicalWidth: 2560,
     *     physicalHeight: 1440,
     *     brandName: 'Mozilla Firefox'
     * }
     *
     * @return {Promise.<Object>}    request object (see example)
     */
    getDescription() {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this.request('getDescription');
            return value;
        })();
    }

    /**
     * get Firefox wallpaper
     *
     * @return {Promise.<Object>}    request object (see example)
     */
    getWallpaper() {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this2.request('getWallpaper');
            return value;
        })();
    }

    /**
     * Returns base64 data url string of the browser screenshot
     *
     * @return {Promise.<Object>}    request object (see example)
     */
    screenshotToDataURL() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this3.request('screenshotToDataURL');
            const imageBlob = new _longString2.default(_this3.client, value.actor);
            return imageBlob.substring(0, value.length);
        })();
    }

    /**
     * Saves browser screenshot to file
     *
     * @param  {String}  path of image file to save the screenshot to (should be PNG)
     * @return {Promise}      resolves once image is written
     */
    screenshotToFile(path) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const dataUrl = yield _this4.screenshotToDataURL();

            return new _promise2.default(function (resolve, reject) {
                return _fs2.default.writeFile(path, dataUrl.substr(dataURLPreamble.length), 'base64', function (err) {
                    /* istanbul ignore next */
                    if (err) {
                        return reject(err);
                    }

                    return resolve();
                });
            });
        })();
    }
}
exports.default = Device;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kb21haW5zL2RldmljZS5qcyJdLCJuYW1lcyI6WyJkYXRhVVJMUHJlYW1ibGUiLCJEZXZpY2UiLCJnZXREZXNjcmlwdGlvbiIsInZhbHVlIiwicmVxdWVzdCIsImdldFdhbGxwYXBlciIsInNjcmVlbnNob3RUb0RhdGFVUkwiLCJpbWFnZUJsb2IiLCJjbGllbnQiLCJhY3RvciIsInN1YnN0cmluZyIsImxlbmd0aCIsInNjcmVlbnNob3RUb0ZpbGUiLCJwYXRoIiwiZGF0YVVybCIsInJlc29sdmUiLCJyZWplY3QiLCJ3cml0ZUZpbGUiLCJzdWJzdHIiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxrQkFBa0Isd0JBQXhCOztBQUVlLE1BQU1DLE1BQU4seUJBQTJCO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNNQyxrQkFBTixHQUF3QjtBQUFBOztBQUFBO0FBQ3BCLGtCQUFNLEVBQUVDLEtBQUYsS0FBWSxNQUFNLE1BQUtDLE9BQUwsQ0FBYSxnQkFBYixDQUF4QjtBQUNBLG1CQUFPRCxLQUFQO0FBRm9CO0FBR3ZCOztBQUVEOzs7OztBQUtNRSxnQkFBTixHQUFzQjtBQUFBOztBQUFBO0FBQ2xCLGtCQUFNLEVBQUVGLEtBQUYsS0FBWSxNQUFNLE9BQUtDLE9BQUwsQ0FBYSxjQUFiLENBQXhCO0FBQ0EsbUJBQU9ELEtBQVA7QUFGa0I7QUFHckI7O0FBRUQ7Ozs7O0FBS01HLHVCQUFOLEdBQTZCO0FBQUE7O0FBQUE7QUFDekIsa0JBQU0sRUFBRUgsS0FBRixLQUFZLE1BQU0sT0FBS0MsT0FBTCxDQUFhLHFCQUFiLENBQXhCO0FBQ0Esa0JBQU1HLFlBQVkseUJBQWUsT0FBS0MsTUFBcEIsRUFBNEJMLE1BQU1NLEtBQWxDLENBQWxCO0FBQ0EsbUJBQU9GLFVBQVVHLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJQLE1BQU1RLE1BQTdCLENBQVA7QUFIeUI7QUFJNUI7O0FBRUQ7Ozs7OztBQU1NQyxvQkFBTixDQUF3QkMsSUFBeEIsRUFBOEI7QUFBQTs7QUFBQTtBQUMxQixrQkFBTUMsVUFBVSxNQUFNLE9BQUtSLG1CQUFMLEVBQXRCOztBQUVBLG1CQUFPLHNCQUNILFVBQUNTLE9BQUQsRUFBVUMsTUFBVjtBQUFBLHVCQUFxQixhQUFHQyxTQUFILENBQWFKLElBQWIsRUFBbUJDLFFBQVFJLE1BQVIsQ0FBZWxCLGdCQUFnQlcsTUFBL0IsQ0FBbkIsRUFBMkQsUUFBM0QsRUFBcUUsVUFBQ1EsR0FBRCxFQUFTO0FBQy9GO0FBQ0Esd0JBQUlBLEdBQUosRUFBUztBQUNMLCtCQUFPSCxPQUFPRyxHQUFQLENBQVA7QUFDSDs7QUFFRCwyQkFBT0osU0FBUDtBQUNILGlCQVBvQixDQUFyQjtBQUFBLGFBREcsQ0FBUDtBQUgwQjtBQWE3QjtBQW5GcUM7a0JBQXJCZCxNIiwiZmlsZSI6ImRldmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcydcblxuaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuaW1wb3J0IExvbmdTdHJpbmcgZnJvbSAnLi4vbW9kZWxzL2xvbmdTdHJpbmcnXG5cbmNvbnN0IGRhdGFVUkxQcmVhbWJsZSA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2UgZXh0ZW5kcyBBY3RvciB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBnZW5lcmFsIGluZm8gYWJvdXQgYnJvd3NlciBhbiBPUywgZS5nLlxuICAgICAqIEV4YW1wbGU6XG4gICAgICoge1xuICAgICAqICAgICBhcHBpZDogJ3tlYzgwMzBmNy1jMjBhLTQ2NGYtOWIwZS0xM2EzYTllOTczODR9JyxcbiAgICAgKiAgICAgYXBwdHlwZTogJ2ZpcmVmb3gnLFxuICAgICAqICAgICB2ZW5kb3I6ICdNb3ppbGxhJyxcbiAgICAgKiAgICAgbmFtZTogJ0ZpcmVmb3gnLFxuICAgICAqICAgICB2ZXJzaW9uOiAnNTUuMC4yJyxcbiAgICAgKiAgICAgYXBwYnVpbGRpZDogJzIwMTcwODE0MDczMzIxJyxcbiAgICAgKiAgICAgY2hhbmdlc2V0OiAnNDVhYjZlMzYyNzQ3MTAyZDAwZmQ3NTM3ODcyN2ZjZGRjZmQzNWY0NCcsXG4gICAgICogICAgIHBsYXRmb3JtYnVpbGRpZDogJzIwMTcwODE0MDczMzIxJyxcbiAgICAgKiAgICAgZ2Vja29idWlsZGlkOiAnMjAxNzA4MTQwNzMzMjEnLFxuICAgICAqICAgICBwbGF0Zm9ybXZlcnNpb246ICc1NS4wLjInLFxuICAgICAqICAgICBnZWNrb3ZlcnNpb246ICc1NS4wLjInLFxuICAgICAqICAgICBsb2NhbGU6ICdkZScsXG4gICAgICogICAgIGVuZGlhbm5lc3M6ICdMRScsXG4gICAgICogICAgIGhvc3RuYW1lOiAnQ2hyaXN0aWFuLUJyb21hbm4tTkFUJyxcbiAgICAgKiAgICAgb3M6ICdEYXJ3aW4nLFxuICAgICAqICAgICBwbGF0Zm9ybTogJ0RhcndpbicsXG4gICAgICogICAgIGhhcmR3YXJlOiAndW5rbm93bicsXG4gICAgICogICAgIGFyY2g6ICd4ODZfNjQnLFxuICAgICAqICAgICBwcm9jZXNzb3I6ICd4ODZfNjQnLFxuICAgICAqICAgICBjb21waWxlcjogJ2djYzMnLFxuICAgICAqICAgICBwcm9maWxlOiAnZmlyZWZveF9kZXZfcHJvZmlsZS1CaHp2VXAnLFxuICAgICAqICAgICBjaGFubmVsOiAncmVsZWFzZScsXG4gICAgICogICAgIGRwaTogMjU4LFxuICAgICAqICAgICB1c2VyYWdlbnQ6ICdNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMC4xMjsgcnY6NTUuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC81NS4wJyxcbiAgICAgKiAgICAgd2lkdGg6IDI1NjAsXG4gICAgICogICAgIGhlaWdodDogMTQ0MCxcbiAgICAgKiAgICAgcGh5c2ljYWxXaWR0aDogMjU2MCxcbiAgICAgKiAgICAgcGh5c2ljYWxIZWlnaHQ6IDE0NDAsXG4gICAgICogICAgIGJyYW5kTmFtZTogJ01vemlsbGEgRmlyZWZveCdcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgICByZXF1ZXN0IG9iamVjdCAoc2VlIGV4YW1wbGUpXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RGVzY3JpcHRpb24gKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldERlc2NyaXB0aW9uJylcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IEZpcmVmb3ggd2FsbHBhcGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3Q+fSAgICByZXF1ZXN0IG9iamVjdCAoc2VlIGV4YW1wbGUpXG4gICAgICovXG4gICAgYXN5bmMgZ2V0V2FsbHBhcGVyICgpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRXYWxscGFwZXInKVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGJhc2U2NCBkYXRhIHVybCBzdHJpbmcgb2YgdGhlIGJyb3dzZXIgc2NyZWVuc2hvdFxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZS48T2JqZWN0Pn0gICAgcmVxdWVzdCBvYmplY3QgKHNlZSBleGFtcGxlKVxuICAgICAqL1xuICAgIGFzeW5jIHNjcmVlbnNob3RUb0RhdGFVUkwgKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ3NjcmVlbnNob3RUb0RhdGFVUkwnKVxuICAgICAgICBjb25zdCBpbWFnZUJsb2IgPSBuZXcgTG9uZ1N0cmluZyh0aGlzLmNsaWVudCwgdmFsdWUuYWN0b3IpXG4gICAgICAgIHJldHVybiBpbWFnZUJsb2Iuc3Vic3RyaW5nKDAsIHZhbHVlLmxlbmd0aClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBicm93c2VyIHNjcmVlbnNob3QgdG8gZmlsZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgcGF0aCBvZiBpbWFnZSBmaWxlIHRvIHNhdmUgdGhlIHNjcmVlbnNob3QgdG8gKHNob3VsZCBiZSBQTkcpXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICByZXNvbHZlcyBvbmNlIGltYWdlIGlzIHdyaXR0ZW5cbiAgICAgKi9cbiAgICBhc3luYyBzY3JlZW5zaG90VG9GaWxlIChwYXRoKSB7XG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSBhd2FpdCB0aGlzLnNjcmVlbnNob3RUb0RhdGFVUkwoKVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IGZzLndyaXRlRmlsZShwYXRoLCBkYXRhVXJsLnN1YnN0cihkYXRhVVJMUHJlYW1ibGUubGVuZ3RoKSwgJ2Jhc2U2NCcsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==