//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

const main_frame_signatures = [
    {
        url: '',
        software: '#wordPress #wf-cookieconsent',
        softwareDetails: 'wf-cookie-consent',
        version: '1.1.3',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<h1 class="entry-title">', '<span class="screen-reader-text">']
    },
    {
        url: '',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'wf-cookie-consent',
        version: '1.1.3',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<option class="level-0" value="133">', '<option class="level-0" value="12">']
    },
    {
        url: '',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'snazzy-maps',
        version: '1.1.3',
        description: '',
        sigType: ['incomplete', 'complete'],
        endPoints: ['<input name="text" type="text" placeholder="Search..."', '<button class="button" type="submit">']
    },
    {
        url: 'https://www.cs.ubc.ca/~jpazos/',
        software: '',
        softwareDetails: '31sdasfas',
        version: '1.0',
        description: '',
        sigType: ['complete', 'complete'],
        endPoints: ['<button type="button" onclick="myFunction()">', '<script id="foo" type="text/javascript">']
    }
];

const script_signatures = [
    {
        url: '',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'events-manager',
        version: '',
        description: '',
        toReplace: [],
        replaceValues: []
    }
];

window.Sigs = (function (module) {


    const exports = {
        main_frame_signatures
    };


    Object.keys(exports).forEach(k => module[k] = exports[k]);
  return module;
})(window.Sigs || {});