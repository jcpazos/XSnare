var signatures = [
    {
        url: 'https://www.cs.ubc.ca/~jpazos/',
        software: '',
        softwareDetails: '',
        version: '1.0',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<div id="test">', '<div class="second">']
    },
];

window.Sigs = (function (module) {


    const exports = {
        signatures
    };


    Object.keys(exports).forEach(k => module[k] = exports[k]);
    return module;
})(window.Sigs || {});