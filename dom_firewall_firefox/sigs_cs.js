var signatures = [
    {
        url: 'https://www.cs.ubc.ca/~jpazos/',
        software: '',
        softwareDetails: '31sdasfas',
        version: '1.0',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<div id="test">', '<div class="second">']
    },
    {
        url: '',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'events-manager',
        version: '5.8',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<div id="location-balloon-content">', '<button style="background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; border: 0px none; margin: 0px; padding: 0px; position: absolute; cursor: pointer; -moz-user-select: none; top: 0px; right: 0px; width: 37px; height: 33px;" draggable="false" title="Close" aria-label="Close" type="button" class="gm-ui-hover-effect">']
    },
];

window.Sigs = (function (module) {


    const exports = {
        signatures
    };


    Object.keys(exports).forEach(k => module[k] = exports[k]);
    return module;
})(window.Sigs || {});

