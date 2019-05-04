//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

const main_frame_signatures = [
    {
        url: null,
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        description: '',
        type: 'single-unique',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<div class="rcc-panel group" style="background: rgb(34, 34, 34) none repeat scroll 0% 0%; display: block;">', '<span class="screen-reader-text">']
    },
    {
        url: 'wp-admin/options-general.php?page=rcc-settings',
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<input id="rcc_settings[font]" name="rcc_settings[font]" type="text" value="">', '<label class="description" for="rcc_settings[font]">']
    },
    {
        url: 'wp-admin/options-general.php?page=rcc-settings',
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<input id="rcc_settings[border-size]" name="rcc_settings[border-size]" type="text" value="">', '<label class="description" for="rcc_settings[border-size]">']
    },

    {
        url: null,
        software: '#wordPress',
        softwareDetails: 'wf-cookieconsent',
        version: '1.1.3',
        description: '',
        type: 'single-unique',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<option class="level-0" value="133">', '<option class="level-0" value="12">']
    },
    {
        url: null,
        software: '#wordPress #wpPlugin',
        softwareDetails: 'snazzy-maps',
        version: '1.1.3',
        type: 'single-unique',
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
        type: 'single-unique',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<button type="button" onclick="myFunction()">', '<script id="foo" type="text/javascript">']
    },
    {
        url: null,
        software: '#wordPress #wpPlugin',
        softwareDetails: 'events-manager',
        version: '5.8',
        type: 'single-unique',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<input id="location-town" type="text" name="location_town"', '<tr class="em-location-data-state">']
    },
    {
        url: 'wp-admin/admin.php?page=activity_log_page',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'aryo-activity-log',
        version: '4.2.0',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'several',
        endPoints: ['<td class="description column-description" data-colname="Description">', '<td class="date column-date has-row-actions column-primary" data-colname="Date">']
    },
    {
        url:'wp-admin/options-general.php?page=wf-cookieconsent',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'wf-cookieconsent',
        version: '1.1.3',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<option class="level-0" value="30">', '<option class="level-0" value="12">']
    },
    {
        url:'wp-admin/options-general.php?page=ctcc&tab=content',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'uk-cookie-consent',
        version: '2.3.9',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<option value="28">', '<option value="27" selected="selected">']
    },
    {
        url:'wp-admin/options-general.php?page=wf-cookieconsent',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'wf-cookieconsent',
        version: '1.1.3',
        type: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<select name="wf_cookieconsent_options[en][wf_linkhref]" id="wf_cookieconsent_options[en][wf_linkhref]">', '<p class="description">']
    },
    {
        url:'/wp-admin/admin.php?page=loginizer_brute_force',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'loginizer',
        version: '1.3.9',
        description: '',
        type: 'single-unique',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'several',
        endPointsPositions : [1,1],
        endPoints: ['<table class="wp-list-table widefat fixed users" border="0">', '<input name="lz_reset_ip" class="button button-primary action" value="Remove From Logs" type="submit">']
    },

    {
        url:'/wp-admin/admin.php?page=loginizer_brute_force',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'all-in-one-favicon',
        version: '4.6   ',
        description: '',
        type: 'multiple-unique',
        sigType: [['complete', 'complete'],
                  ['complete', 'complete'],
                  ['complete', 'complete']
        ],
        sigOccurrence: 'unique',
        endPointsPositions : [1,1],
        endPoints: [['<div id="frontendICO-favicon">', '<input id="aio-favicon_settings-frontendICO-text" type="text" name="aio-favicon_settings[frontendICO-text]" size="60" maxlength="100000" value="\\">'],
                    ['<input id="aio-favicon_settings-frontendICO-text" type="text" name="aio-favicon_settings[frontendICO-text]" size="60" maxlength="100000" value="\\">', '<label id="aio-favicon_settings-frontendICO-button" name="frontendICO-button" class="button-secondary trigger-file-input" for="aio-favicon_settings-frontendICO">'],
                    ['<input id="aio-favicon_settings-frontendICO" type="file" name="frontendICO" size="50" maxlength="100000" accept="image/*" value="\\">', '<label for="aio-favicon_settings-frontendGIF">']
        ]
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
        main_frame_signatures,
        script_signatures
    };


    Object.keys(exports).forEach(k => module[k] = exports[k]);
  return module;
})(window.Sigs || {});