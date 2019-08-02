'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Pagestyle extends _actor2.default {
    getComputed(node, markMatched, onlyMatched, filter) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { computed } = yield _this.request('getComputed', {
                node, markMatched, onlyMatched, filter
            });
            return computed;
        })();
    }

    getAllUsedFontFaces(includePreviews, previewText, previewFontSize, previewFillStyle) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { fontFaces } = yield _this2.request('getAllUsedFontFaces', {
                includePreviews, previewText, previewFontSize, previewFillStyle
            });
            return fontFaces;
        })();
    }

    getUsedFontFaces(node, includePreviews, previewText, previewFontSize, previewFillStyle) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { fontFaces } = yield _this3.request('getUsedFontFaces', {
                node, includePreviews, previewText, previewFontSize, previewFillStyle
            });
            return fontFaces;
        })();
    }

    getMatchedSelectors(node, property, filter) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { rules, sheets, matched } = yield _this4.request('getMatchedSelectors', {
                node, property, filter
            });
            return { rules, sheets, matched };
        })();
    }

    getApplied(node, inherited, matchedSelectors, skipPseudo, filter) {
        return this.request('getApplied', {
            node, inherited, matchedSelectors, skipPseudo, filter
        });
    }

    isPositionEditable(node) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)(function* () {
            const { value } = yield _this5.request('isPositionEditable', { node });
            return value;
        })();
    }

    getLayout(node, autoMargins) {
        return this.request('getLayout', { node, autoMargins });
    }

    addNewRule(node, pseudoClasses, editAuthored) {
        return this.request('addNewRule', { node, pseudoClasses, editAuthored });
    }
}
exports.default = Pagestyle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvcGFnZXN0eWxlLmpzIl0sIm5hbWVzIjpbIlBhZ2VzdHlsZSIsImdldENvbXB1dGVkIiwibm9kZSIsIm1hcmtNYXRjaGVkIiwib25seU1hdGNoZWQiLCJmaWx0ZXIiLCJjb21wdXRlZCIsInJlcXVlc3QiLCJnZXRBbGxVc2VkRm9udEZhY2VzIiwiaW5jbHVkZVByZXZpZXdzIiwicHJldmlld1RleHQiLCJwcmV2aWV3Rm9udFNpemUiLCJwcmV2aWV3RmlsbFN0eWxlIiwiZm9udEZhY2VzIiwiZ2V0VXNlZEZvbnRGYWNlcyIsImdldE1hdGNoZWRTZWxlY3RvcnMiLCJwcm9wZXJ0eSIsInJ1bGVzIiwic2hlZXRzIiwibWF0Y2hlZCIsImdldEFwcGxpZWQiLCJpbmhlcml0ZWQiLCJtYXRjaGVkU2VsZWN0b3JzIiwic2tpcFBzZXVkbyIsImlzUG9zaXRpb25FZGl0YWJsZSIsInZhbHVlIiwiZ2V0TGF5b3V0IiwiYXV0b01hcmdpbnMiLCJhZGROZXdSdWxlIiwicHNldWRvQ2xhc3NlcyIsImVkaXRBdXRob3JlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFZSxNQUFNQSxTQUFOLHlCQUE4QjtBQUNuQ0MsZUFBTixDQUFtQkMsSUFBbkIsRUFBeUJDLFdBQXpCLEVBQXNDQyxXQUF0QyxFQUFtREMsTUFBbkQsRUFBMkQ7QUFBQTs7QUFBQTtBQUN2RCxrQkFBTSxFQUFFQyxRQUFGLEtBQWUsTUFBTSxNQUFLQyxPQUFMLENBQWEsYUFBYixFQUE0QjtBQUNuREwsb0JBRG1ELEVBQzdDQyxXQUQ2QyxFQUNoQ0MsV0FEZ0MsRUFDbkJDO0FBRG1CLGFBQTVCLENBQTNCO0FBR0EsbUJBQU9DLFFBQVA7QUFKdUQ7QUFLMUQ7O0FBRUtFLHVCQUFOLENBQTJCQyxlQUEzQixFQUE0Q0MsV0FBNUMsRUFBeURDLGVBQXpELEVBQTBFQyxnQkFBMUUsRUFBNEY7QUFBQTs7QUFBQTtBQUN4RixrQkFBTSxFQUFFQyxTQUFGLEtBQWdCLE1BQU0sT0FBS04sT0FBTCxDQUFhLHFCQUFiLEVBQW9DO0FBQzVERSwrQkFENEQsRUFDM0NDLFdBRDJDLEVBQzlCQyxlQUQ4QixFQUNiQztBQURhLGFBQXBDLENBQTVCO0FBR0EsbUJBQU9DLFNBQVA7QUFKd0Y7QUFLM0Y7O0FBRUtDLG9CQUFOLENBQXdCWixJQUF4QixFQUE4Qk8sZUFBOUIsRUFBK0NDLFdBQS9DLEVBQTREQyxlQUE1RCxFQUE2RUMsZ0JBQTdFLEVBQStGO0FBQUE7O0FBQUE7QUFDM0Ysa0JBQU0sRUFBRUMsU0FBRixLQUFnQixNQUFNLE9BQUtOLE9BQUwsQ0FBYSxrQkFBYixFQUFpQztBQUN6REwsb0JBRHlELEVBQ25ETyxlQURtRCxFQUNsQ0MsV0FEa0MsRUFDckJDLGVBRHFCLEVBQ0pDO0FBREksYUFBakMsQ0FBNUI7QUFHQSxtQkFBT0MsU0FBUDtBQUoyRjtBQUs5Rjs7QUFFS0UsdUJBQU4sQ0FBMkJiLElBQTNCLEVBQWlDYyxRQUFqQyxFQUEyQ1gsTUFBM0MsRUFBbUQ7QUFBQTs7QUFBQTtBQUMvQyxrQkFBTSxFQUFFWSxLQUFGLEVBQVNDLE1BQVQsRUFBaUJDLE9BQWpCLEtBQTZCLE1BQU0sT0FBS1osT0FBTCxDQUFhLHFCQUFiLEVBQW9DO0FBQ3pFTCxvQkFEeUUsRUFDbkVjLFFBRG1FLEVBQ3pEWDtBQUR5RCxhQUFwQyxDQUF6QztBQUdBLG1CQUFPLEVBQUVZLEtBQUYsRUFBU0MsTUFBVCxFQUFpQkMsT0FBakIsRUFBUDtBQUorQztBQUtsRDs7QUFFREMsZUFBWWxCLElBQVosRUFBa0JtQixTQUFsQixFQUE2QkMsZ0JBQTdCLEVBQStDQyxVQUEvQyxFQUEyRGxCLE1BQTNELEVBQW1FO0FBQy9ELGVBQU8sS0FBS0UsT0FBTCxDQUFhLFlBQWIsRUFBMkI7QUFDOUJMLGdCQUQ4QixFQUN4Qm1CLFNBRHdCLEVBQ2JDLGdCQURhLEVBQ0tDLFVBREwsRUFDaUJsQjtBQURqQixTQUEzQixDQUFQO0FBR0g7O0FBRUttQixzQkFBTixDQUEwQnRCLElBQTFCLEVBQWdDO0FBQUE7O0FBQUE7QUFDNUIsa0JBQU0sRUFBRXVCLEtBQUYsS0FBWSxNQUFNLE9BQUtsQixPQUFMLENBQWEsb0JBQWIsRUFBbUMsRUFBRUwsSUFBRixFQUFuQyxDQUF4QjtBQUNBLG1CQUFPdUIsS0FBUDtBQUY0QjtBQUcvQjs7QUFFREMsY0FBV3hCLElBQVgsRUFBaUJ5QixXQUFqQixFQUE4QjtBQUMxQixlQUFPLEtBQUtwQixPQUFMLENBQWEsV0FBYixFQUEwQixFQUFFTCxJQUFGLEVBQVF5QixXQUFSLEVBQTFCLENBQVA7QUFDSDs7QUFFREMsZUFBWTFCLElBQVosRUFBa0IyQixhQUFsQixFQUFpQ0MsWUFBakMsRUFBK0M7QUFDM0MsZUFBTyxLQUFLdkIsT0FBTCxDQUFhLFlBQWIsRUFBMkIsRUFBRUwsSUFBRixFQUFRMkIsYUFBUixFQUF1QkMsWUFBdkIsRUFBM0IsQ0FBUDtBQUNIO0FBOUN3QztrQkFBeEI5QixTIiwiZmlsZSI6InBhZ2VzdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3RvciBmcm9tICcuLi9hY3RvcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZXN0eWxlIGV4dGVuZHMgQWN0b3Ige1xuICAgIGFzeW5jIGdldENvbXB1dGVkIChub2RlLCBtYXJrTWF0Y2hlZCwgb25seU1hdGNoZWQsIGZpbHRlcikge1xuICAgICAgICBjb25zdCB7IGNvbXB1dGVkIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldENvbXB1dGVkJywge1xuICAgICAgICAgICAgbm9kZSwgbWFya01hdGNoZWQsIG9ubHlNYXRjaGVkLCBmaWx0ZXJcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QWxsVXNlZEZvbnRGYWNlcyAoaW5jbHVkZVByZXZpZXdzLCBwcmV2aWV3VGV4dCwgcHJldmlld0ZvbnRTaXplLCBwcmV2aWV3RmlsbFN0eWxlKSB7XG4gICAgICAgIGNvbnN0IHsgZm9udEZhY2VzIH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldEFsbFVzZWRGb250RmFjZXMnLCB7XG4gICAgICAgICAgICBpbmNsdWRlUHJldmlld3MsIHByZXZpZXdUZXh0LCBwcmV2aWV3Rm9udFNpemUsIHByZXZpZXdGaWxsU3R5bGVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGZvbnRGYWNlc1xuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZWRGb250RmFjZXMgKG5vZGUsIGluY2x1ZGVQcmV2aWV3cywgcHJldmlld1RleHQsIHByZXZpZXdGb250U2l6ZSwgcHJldmlld0ZpbGxTdHlsZSkge1xuICAgICAgICBjb25zdCB7IGZvbnRGYWNlcyB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRVc2VkRm9udEZhY2VzJywge1xuICAgICAgICAgICAgbm9kZSwgaW5jbHVkZVByZXZpZXdzLCBwcmV2aWV3VGV4dCwgcHJldmlld0ZvbnRTaXplLCBwcmV2aWV3RmlsbFN0eWxlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBmb250RmFjZXNcbiAgICB9XG5cbiAgICBhc3luYyBnZXRNYXRjaGVkU2VsZWN0b3JzIChub2RlLCBwcm9wZXJ0eSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IHsgcnVsZXMsIHNoZWV0cywgbWF0Y2hlZCB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXRNYXRjaGVkU2VsZWN0b3JzJywge1xuICAgICAgICAgICAgbm9kZSwgcHJvcGVydHksIGZpbHRlclxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4geyBydWxlcywgc2hlZXRzLCBtYXRjaGVkIH1cbiAgICB9XG5cbiAgICBnZXRBcHBsaWVkIChub2RlLCBpbmhlcml0ZWQsIG1hdGNoZWRTZWxlY3RvcnMsIHNraXBQc2V1ZG8sIGZpbHRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRBcHBsaWVkJywge1xuICAgICAgICAgICAgbm9kZSwgaW5oZXJpdGVkLCBtYXRjaGVkU2VsZWN0b3JzLCBza2lwUHNldWRvLCBmaWx0ZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBpc1Bvc2l0aW9uRWRpdGFibGUgKG5vZGUpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdpc1Bvc2l0aW9uRWRpdGFibGUnLCB7IG5vZGUgfSlcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgZ2V0TGF5b3V0IChub2RlLCBhdXRvTWFyZ2lucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRMYXlvdXQnLCB7IG5vZGUsIGF1dG9NYXJnaW5zIH0pXG4gICAgfVxuXG4gICAgYWRkTmV3UnVsZSAobm9kZSwgcHNldWRvQ2xhc3NlcywgZWRpdEF1dGhvcmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2FkZE5ld1J1bGUnLCB7IG5vZGUsIHBzZXVkb0NsYXNzZXMsIGVkaXRBdXRob3JlZCB9KVxuICAgIH1cbn1cbiJdfQ==