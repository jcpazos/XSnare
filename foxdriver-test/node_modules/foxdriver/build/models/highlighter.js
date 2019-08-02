'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Highlighter is the server-side entry points for any tool that wishes to
 * highlight elements in some way in the content document.
 *
 * A little bit of vocabulary:
 * - <something>HighlighterActor classes are the actors that can be used from
 *   the client. They do very little else than instantiate a given
 *   <something>Highlighter and use it to highlight elements.
 * - <something>Highlighter classes aren't actors, they're just JS classes that
 *   know how to create and attach the actual highlighter elements on top of the
 *   content
 *
 * The most used highlighter actor is the HighlighterActor which can be
 * conveniently retrieved via the InspectorActor's 'getHighlighter' method.
 * The InspectorActor will always return the same instance of
 * HighlighterActor if asked several times and this instance is used in the
 * toolbox to highlighter elements's box-model from the markup-view,
 * box model view, console, debugger, ... as well as select elements with the
 * pointer (pick).
 *
 * Other types of highlighter actors exist and can be accessed via the
 * InspectorActor's 'getHighlighterByType' method.
 */
class Highlighter extends _actor2.default {
    /**
     * Display the box model highlighting on a given NodeActor.
     * There is only one instance of the box model highlighter, so calling this
     * method several times won't display several highlighters, it will just move
     * the highlighter instance to these nodes.
     *
     * @param {NodeActor} node
     *        The node to be highlighted
     * @param {Object}    region
     *        region of box model
     * @param {Boolean}   hideInfoBar
     *        true if to hide info bar
     * @param {Boolean}   hideGuides
     *        true if to hide guides
     * @param {Boolean}   showOnly
     *        true if show only
     * @param {Boolean}   onlyRegionArea
     *        true if only region area
     * @return {Promise}  request response
     */
    showBoxModel(node, region, hideInfoBar, hideGuides, showOnly, onlyRegionArea) {
        return this.request('showBoxModel', {
            node, region, hideInfoBar, hideGuides, showOnly, onlyRegionArea
        });
    }

    /**
     * Hide the box model highlighting if it was shown before
     *
     * @return {Promise}  request response
     */
    hideBoxModel() {
        return this.request('hideBoxModel');
    }

    /**
     * Pick a node on click, and highlight hovered nodes in the process.
     *
     * This method doesn't respond anything interesting, however, it starts
     * mousemove, and click listeners on the content document to fire
     * events and let connected clients know when nodes are hovered over or
     * clicked.
     *
     * Once a node is picked, events will cease, and listeners will be removed.
     *
     * @return {Promise}  request response
     */
    pick() {
        return this.request('pick');
    }

    /**
     * This pick method also focuses the highlighter's target window.
     *
     * @return {Promise}  request response
     */
    pickAndFocus() {
        return this.request('pickAndFocus');
    }

    /**
     * cancel current pick
     *
     * @return {Promise}  request response
     */
    cancelPick() {
        return this.request('cancelPick');
    }
}
exports.default = Highlighter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvaGlnaGxpZ2h0ZXIuanMiXSwibmFtZXMiOlsiSGlnaGxpZ2h0ZXIiLCJzaG93Qm94TW9kZWwiLCJub2RlIiwicmVnaW9uIiwiaGlkZUluZm9CYXIiLCJoaWRlR3VpZGVzIiwic2hvd09ubHkiLCJvbmx5UmVnaW9uQXJlYSIsInJlcXVlc3QiLCJoaWRlQm94TW9kZWwiLCJwaWNrIiwicGlja0FuZEZvY3VzIiwiY2FuY2VsUGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCZSxNQUFNQSxXQUFOLHlCQUFnQztBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkFDLGlCQUFjQyxJQUFkLEVBQW9CQyxNQUFwQixFQUE0QkMsV0FBNUIsRUFBeUNDLFVBQXpDLEVBQXFEQyxRQUFyRCxFQUErREMsY0FBL0QsRUFBK0U7QUFDM0UsZUFBTyxLQUFLQyxPQUFMLENBQWEsY0FBYixFQUE2QjtBQUNoQ04sZ0JBRGdDLEVBQzFCQyxNQUQwQixFQUNsQkMsV0FEa0IsRUFDTEMsVUFESyxFQUNPQyxRQURQLEVBQ2lCQztBQURqQixTQUE3QixDQUFQO0FBR0g7O0FBRUQ7Ozs7O0FBS0FFLG1CQUFnQjtBQUNaLGVBQU8sS0FBS0QsT0FBTCxDQUFhLGNBQWIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7QUFZQUUsV0FBUTtBQUNKLGVBQU8sS0FBS0YsT0FBTCxDQUFhLE1BQWIsQ0FBUDtBQUNIOztBQUVEOzs7OztBQUtBRyxtQkFBZ0I7QUFDWixlQUFPLEtBQUtILE9BQUwsQ0FBYSxjQUFiLENBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLQUksaUJBQWM7QUFDVixlQUFPLEtBQUtKLE9BQUwsQ0FBYSxZQUFiLENBQVA7QUFDSDtBQXBFMEM7a0JBQTFCUixXIiwiZmlsZSI6ImhpZ2hsaWdodGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdG9yIGZyb20gJy4uL2FjdG9yJ1xuXG4vKipcbiAqIFRoZSBIaWdobGlnaHRlciBpcyB0aGUgc2VydmVyLXNpZGUgZW50cnkgcG9pbnRzIGZvciBhbnkgdG9vbCB0aGF0IHdpc2hlcyB0b1xuICogaGlnaGxpZ2h0IGVsZW1lbnRzIGluIHNvbWUgd2F5IGluIHRoZSBjb250ZW50IGRvY3VtZW50LlxuICpcbiAqIEEgbGl0dGxlIGJpdCBvZiB2b2NhYnVsYXJ5OlxuICogLSA8c29tZXRoaW5nPkhpZ2hsaWdodGVyQWN0b3IgY2xhc3NlcyBhcmUgdGhlIGFjdG9ycyB0aGF0IGNhbiBiZSB1c2VkIGZyb21cbiAqICAgdGhlIGNsaWVudC4gVGhleSBkbyB2ZXJ5IGxpdHRsZSBlbHNlIHRoYW4gaW5zdGFudGlhdGUgYSBnaXZlblxuICogICA8c29tZXRoaW5nPkhpZ2hsaWdodGVyIGFuZCB1c2UgaXQgdG8gaGlnaGxpZ2h0IGVsZW1lbnRzLlxuICogLSA8c29tZXRoaW5nPkhpZ2hsaWdodGVyIGNsYXNzZXMgYXJlbid0IGFjdG9ycywgdGhleSdyZSBqdXN0IEpTIGNsYXNzZXMgdGhhdFxuICogICBrbm93IGhvdyB0byBjcmVhdGUgYW5kIGF0dGFjaCB0aGUgYWN0dWFsIGhpZ2hsaWdodGVyIGVsZW1lbnRzIG9uIHRvcCBvZiB0aGVcbiAqICAgY29udGVudFxuICpcbiAqIFRoZSBtb3N0IHVzZWQgaGlnaGxpZ2h0ZXIgYWN0b3IgaXMgdGhlIEhpZ2hsaWdodGVyQWN0b3Igd2hpY2ggY2FuIGJlXG4gKiBjb252ZW5pZW50bHkgcmV0cmlldmVkIHZpYSB0aGUgSW5zcGVjdG9yQWN0b3IncyAnZ2V0SGlnaGxpZ2h0ZXInIG1ldGhvZC5cbiAqIFRoZSBJbnNwZWN0b3JBY3RvciB3aWxsIGFsd2F5cyByZXR1cm4gdGhlIHNhbWUgaW5zdGFuY2Ugb2ZcbiAqIEhpZ2hsaWdodGVyQWN0b3IgaWYgYXNrZWQgc2V2ZXJhbCB0aW1lcyBhbmQgdGhpcyBpbnN0YW5jZSBpcyB1c2VkIGluIHRoZVxuICogdG9vbGJveCB0byBoaWdobGlnaHRlciBlbGVtZW50cydzIGJveC1tb2RlbCBmcm9tIHRoZSBtYXJrdXAtdmlldyxcbiAqIGJveCBtb2RlbCB2aWV3LCBjb25zb2xlLCBkZWJ1Z2dlciwgLi4uIGFzIHdlbGwgYXMgc2VsZWN0IGVsZW1lbnRzIHdpdGggdGhlXG4gKiBwb2ludGVyIChwaWNrKS5cbiAqXG4gKiBPdGhlciB0eXBlcyBvZiBoaWdobGlnaHRlciBhY3RvcnMgZXhpc3QgYW5kIGNhbiBiZSBhY2Nlc3NlZCB2aWEgdGhlXG4gKiBJbnNwZWN0b3JBY3RvcidzICdnZXRIaWdobGlnaHRlckJ5VHlwZScgbWV0aG9kLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWdobGlnaHRlciBleHRlbmRzIEFjdG9yIHtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHRoZSBib3ggbW9kZWwgaGlnaGxpZ2h0aW5nIG9uIGEgZ2l2ZW4gTm9kZUFjdG9yLlxuICAgICAqIFRoZXJlIGlzIG9ubHkgb25lIGluc3RhbmNlIG9mIHRoZSBib3ggbW9kZWwgaGlnaGxpZ2h0ZXIsIHNvIGNhbGxpbmcgdGhpc1xuICAgICAqIG1ldGhvZCBzZXZlcmFsIHRpbWVzIHdvbid0IGRpc3BsYXkgc2V2ZXJhbCBoaWdobGlnaHRlcnMsIGl0IHdpbGwganVzdCBtb3ZlXG4gICAgICogdGhlIGhpZ2hsaWdodGVyIGluc3RhbmNlIHRvIHRoZXNlIG5vZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlQWN0b3J9IG5vZGVcbiAgICAgKiAgICAgICAgVGhlIG5vZGUgdG8gYmUgaGlnaGxpZ2h0ZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgcmVnaW9uXG4gICAgICogICAgICAgIHJlZ2lvbiBvZiBib3ggbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgaGlkZUluZm9CYXJcbiAgICAgKiAgICAgICAgdHJ1ZSBpZiB0byBoaWRlIGluZm8gYmFyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSAgIGhpZGVHdWlkZXNcbiAgICAgKiAgICAgICAgdHJ1ZSBpZiB0byBoaWRlIGd1aWRlc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICBzaG93T25seVxuICAgICAqICAgICAgICB0cnVlIGlmIHNob3cgb25seVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICBvbmx5UmVnaW9uQXJlYVxuICAgICAqICAgICAgICB0cnVlIGlmIG9ubHkgcmVnaW9uIGFyZWFcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHNob3dCb3hNb2RlbCAobm9kZSwgcmVnaW9uLCBoaWRlSW5mb0JhciwgaGlkZUd1aWRlcywgc2hvd09ubHksIG9ubHlSZWdpb25BcmVhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3Nob3dCb3hNb2RlbCcsIHtcbiAgICAgICAgICAgIG5vZGUsIHJlZ2lvbiwgaGlkZUluZm9CYXIsIGhpZGVHdWlkZXMsIHNob3dPbmx5LCBvbmx5UmVnaW9uQXJlYVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIGJveCBtb2RlbCBoaWdobGlnaHRpbmcgaWYgaXQgd2FzIHNob3duIGJlZm9yZVxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBoaWRlQm94TW9kZWwgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdoaWRlQm94TW9kZWwnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2sgYSBub2RlIG9uIGNsaWNrLCBhbmQgaGlnaGxpZ2h0IGhvdmVyZWQgbm9kZXMgaW4gdGhlIHByb2Nlc3MuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBkb2Vzbid0IHJlc3BvbmQgYW55dGhpbmcgaW50ZXJlc3RpbmcsIGhvd2V2ZXIsIGl0IHN0YXJ0c1xuICAgICAqIG1vdXNlbW92ZSwgYW5kIGNsaWNrIGxpc3RlbmVycyBvbiB0aGUgY29udGVudCBkb2N1bWVudCB0byBmaXJlXG4gICAgICogZXZlbnRzIGFuZCBsZXQgY29ubmVjdGVkIGNsaWVudHMga25vdyB3aGVuIG5vZGVzIGFyZSBob3ZlcmVkIG92ZXIgb3JcbiAgICAgKiBjbGlja2VkLlxuICAgICAqXG4gICAgICogT25jZSBhIG5vZGUgaXMgcGlja2VkLCBldmVudHMgd2lsbCBjZWFzZSwgYW5kIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgcmVxdWVzdCByZXNwb25zZVxuICAgICAqL1xuICAgIHBpY2sgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdwaWNrJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHBpY2sgbWV0aG9kIGFsc28gZm9jdXNlcyB0aGUgaGlnaGxpZ2h0ZXIncyB0YXJnZXQgd2luZG93LlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBwaWNrQW5kRm9jdXMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdwaWNrQW5kRm9jdXMnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbmNlbCBjdXJyZW50IHBpY2tcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICByZXF1ZXN0IHJlc3BvbnNlXG4gICAgICovXG4gICAgY2FuY2VsUGljayAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NhbmNlbFBpY2snKVxuICAgIH1cbn1cbiJdfQ==