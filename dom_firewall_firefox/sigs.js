//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

const main_frame_signatures = [
    {
        url: null,
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        description: '',
        type: 'htmlTag',
        typeDet: 'single-unique',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<div class="rcc-panel group" style="background: rgb(34, 34, 34) none repeat scroll 0% 0%; display: block;">', '<span class="screen-reader-text">']
    },
    {
        url: 'wp-admin/options-general.php?page=rcc-settings',
        software: '#wordPress',
        softwareDetails: 'responsive-cookie-consent',
        version: '1.5',
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<input id="rcc_settings[border-size]" name="rcc_settings[border-size]" type="text" value', '<label class="description" for="rcc_settings[border-size]">']
    },

    {
        url: null,
        software: '#wordPress',
        softwareDetails: 'wf-cookieconsent',
        version: '1.1.3',
        description: '',
        type: 'htmlTag',
        typeDet: 'single-unique',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<option class="level-0" value="133">', '<option class="level-0" value="12">']
    },
    {
        url: null,
        software: '#wordPress #wpPlugin',
        softwareDetails: 'snazzy-maps',
        version: '1.1.3',
        type: 'htmlTag',
        typeDet: 'multiple-unique',
        description: '',
        sigType: [
            ['complete', 'complete'],
            ['incomplete', 'complete']
        ],
        endPoints: [
            ['<a href="?page=snazzy_maps&amp;tab=1\\">', '<div class="col-md-10 col-lg-6">'],
            ['<input name="text" type="text" placeholder="Search..."', '<button class="button" type="submit">']
        ]
    },
    {
        url: 'https://www.cs.ubc.ca/~jpazos/',
        software: '',
        softwareDetails: '31sdasfas',
        version: '1.0',
        description: '',
        type: 'htmlTag',
        typeDet: 'single-unique',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<button type="button" onclick="myFunction()">', '<script id="foo" type="text/javascript">']
    },
    {
        url: null,
        software: '#wordPress #wpPlugin',
        softwareDetails: 'events-manager',
        version: '5.8',
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'htmlTag',
        typeDet: 'single-unique',
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
        type: 'string',
        typeDet: 'single-unique',
        sigType: [['complete', 'complete'],
            ['complete', 'complete'],
            ['complete', 'complete']
        ],
        endPointsPositions : [1,1],
        endPoints: ['/* <![CDATA[ */\nvar Aiofavicon = {\"frontendICO\":', "</script>\n\n<script type='text/javascript'>\n/* <![CDATA[ */\nvar userSettings"]
    },

    {
        url:'/wp-admin/admin.php?page=loginizer_brute_force',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'all-in-one-favicon',
        version: '4.6   ',
        description: '',
        type: 'string   ',
        typeDet: 'multiple-unique',
        sigType: [['complete', 'complete'],
                  ['complete', 'complete'],
                  ['complete', 'complete'],
                  ['complete', 'complete']
        ],
        endPointsPositions : [1,1],
        endPoints: [['<input id="aio-favicon_settings-frontendICO-text" type="text" name="aio-favicon_settings[frontendICO-text]" size="60" maxlength="100000" value="\\">', '<label id="aio-favicon_settings-frontendICO-button" name="frontendICO-button" class="button-secondary trigger-file-input" for="aio-favicon_settings-frontendICO" >'],
                    ['<input id="aio-favicon_settings-frontendICO" type="file" name="frontendICO" size="50" maxlength="100000" accept="image/*" value="\\">', '<label for="aio-favicon_settings-frontendGIF">'],
                    ['<input id="aio-favicon_settings-frontendGIF-text" type="text" name="aio-favicon_settings[frontendGIF-text]" size="60" maxlength="100000" value="\\">', '<label id="aio-favicon_settings-frontendGIF-button" name="frontendGIF-button" class="button-secondary trigger-file-input" for="aio-favicon_settings-frontendGIF" >'],
                    ['<input id="aio-favicon_settings-frontendGIF" type="file" name="frontendGIF" size="50" maxlength="100000" accept="image/*" value="\\">', '<label for="aio-favicon_settings-frontendPNG">']
        ]
    },

    {
        url:'wp-admin/admin.php?page=wplivechat-menu-gdpr-page',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'wp-live-chat-support',
        version: '8.0.15',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<input type="hidden" name="page" value="wplivechat-menu-gdpr-page">', '<input type="submit" class="button" value="Search">']
    },
    {
        url:'wp-admin/admin.php?page=slideshow-galleries',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'slideshow-gallery',
        version: '1.6.4',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<a href="/wp-admin/admin.php?page=slideshow-galleries', '<span class="sorting-indicator">']
    },

    {
        url:'wp-admin/admin.php?page=slideshow-slides',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'slideshow-gallery',
        version: '1.6.4',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<a href="/wp-admin/admin.php?page=slideshow-slides', '<span class="sorting-indicator">']
    },

    {
        url:'wp-admin/index.php',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'gwolle-gb',
        version: '2.5.3',
        type: 'string',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<a href=\"/wp-admin/index.php', '<a href=\"admin.php?page=gwolle-gb/entries.php&amp;show=all\" class=\"button button-primary\">']
    },

    {
        url:'?war_soundy_preview',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'soundy-background-music',
        version: '3.9',
        type: 'string',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['var war_soundy_front_end = new war_SoundyFrontEnd', '</head>']
    },

    {
        url:'?war_soundy_pl_preview',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'soundy-audio-playlist',
        version: '4.6',
        type: 'string',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['var war_soundy_front_end = new war_SoundyFrontEnd', '</head>']
    },

    {
        url:'wp-admin/admin.php?page=Acurax-Social-Widget-Settings',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'acurax-social-media-widget',
        version: '3.2.5',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['incomplete', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<li id="recordsArray', '<img src="http://localhost:8080/wp-content/plugins/acurax-social-media-widget/images/themes/1/facebook.png" border="0">']
    },

    {
        url:'wp-admin/admin.php?page=wpdevart-extras',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'booking-calendar',
        version: '1.8.4',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete ', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<div class="wpdevart-item-section-cont">', '<input type="hidden" name="task" value="save">']
    },
    {
        url:'wp-admin/admin.php?page=wpdevart-forms',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'booking-calendar',
        version: '1.8.4',
        type: 'htmlTag',
        typeDet: 'single-unique',
        description: '',
        sigType: ['complete ', 'complete'],
        sigOccurrence: 'unique',
        endPoints: ['<div class="wpdevart-item-section-cont">', '<input type="hidden" name="task" value="save">']
    },

    {
        url:'wp-admin/options-general.php?page=read-and-understood-menu-slug-01',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'read-and-understood',
        version: '2.1',
        type: 'htmlTag',
        typeDet: 'multiple-unique',
        description: '',
        sigType: [
                ['incomplete', 'complete'],
                ['incomplete', 'complete']
        ],
        sigOccurrence: 'unique',
        endPoints: [
                ['<input type="text" name="rnu_username_validation_pattern" class="ss_text" value', '<div name="rnu_ftr_username_validation_pattern">'],
                ['<input type="text" name="rnu_username_validation_title" class="ss_text" value', '<div class="table-cell" name="rnu_hdr_username_validation_title">'],
            ]
    },
    /*
    {
        url:'wp-admin/admin.php?page=rcsm-weblizar',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'responsive-coming-soon-page',
        version: '1.1.18',
        type: 'string',
        typeDet: 'multiple-unique',
        description: '',
        sigType: [
            ['incomplete', 'complete'],
            ['incomplete', 'complete']
        ],
        endPointsPositions : [
            [1,2],
            [1,2]
        ],

        sigOccurrence: 'unique',
        endPoints: [
            ['<input  class=\"form-control\" type=\"text\" name=\"coming-soon_title\" id=\"coming-soon_title\"  value', '<label>Sub Title</label>'],
            ['<input  class=\"form-control\" type=\"text\" name=\"coming-soon_sub_title\" id=\"coming-soon_sub_title\"  value', '<label>Message</label>'],
        ]
    }*/
    {
        url:'wp-admin/admin.php?page=rcsm-weblizar',
        software: '#wordPress #wpPlugin',
        softwareDetails: 'responsive-coming-soon-page',
        version: '1.1.18',
        type: 'string',
        typeDet: 'multiple-unique',
        description: '',
        sigType: [
            ['complete', 'complete'],
            ['complete', 'complete'],
            ['complete', 'complete'],
            ['complete', 'complete'],
            ['complete', 'complete'],
            ['complete', 'complete']
        ],
        endPointsPositions : [
            [5,24],
            [1,23],
            [47,3],
            [48,2],
            [1,22],
            [14,40],
            [9,21]
        ],

        sigOccurrence: 'unique',
        endPoints: [
            ['<div class="col-md-12 form-group">', '<div class="col-md-12 form-group">'],
            ['<div class="col-md-12 form-group logo-option active" id="logo_image">', '<div class="col-md-12 form-group">'],
            ['<div class="col-md-6">', '<div class="row">'],
            ['<div class="col-md-6">', '<div class="row">'],
            ['<div class="col-md-12 form-group template-option active" id="Background_Color">', '<div class="col-md-12 form-group">'],
            ['<div class="col-md-6">', '<div class="col-md-6">'],
            ['<div class="row">', '<div class="col-md-12 form-group">']
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