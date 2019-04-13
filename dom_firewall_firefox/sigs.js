//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

const main_frame_signatures = [
    {
        url: null,
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<div class="rcc-panel group" style="background: rgb(34, 34, 34) none repeat scroll 0% 0%; display: block;">', '<span class="screen-reader-text">']
    },
    {
        url: 'wp-admin/options-general.php?page=rcc-settings',
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
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
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<option class="level-0" value="133">', '<option class="level-0" value="12">']
    },
    {
        url: null,
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
        sigOccurrence: 'unique',
        endPoints: ['<button type="button" onclick="myFunction()">', '<script id="foo" type="text/javascript">']
    },
    {
        url: null,
        software: '#wordPress #wpPlugin',
        softwareDetails: 'events-manager',
        version: '5.8',
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
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<select name="wf_cookieconsent_options[en][wf_linkhref]" id="wf_cookieconsent_options[en][wf_linkhref]">', '<p class="description">']
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