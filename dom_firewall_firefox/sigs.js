//Database for user-defined signatures, currently shown in plaintext for ease of use
//might want to move to an actual database later?

const main_frame_signatures = {
    'WordPress': [
        {
            url: null,
            software: 'WordPress',
            softwareDetails: 'responsive-cookie-consent',
            version: '1.5',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            sigType: ['incomplete', 'complete'],
            sigOccurrence: 'unique',
            endPoints: ['<div class=\"rcc-panel group\"', 'class=\"rcc-info-btn\" >MORE INFO</a>']
        },
        {
            url: 'wp-admin/options-general.php?page=rcc-settings',
            software: 'WordPress',
            softwareDetails: 'responsive-cookie-consent',
            version: '1.5',
            type: 'string',
            typeDet: 'multiple-unique',
            description: '',
            sigType: ['complete', 'complete'],
            sigOccurrence: 'unique',
            endPoints: [
                ['<input id="rcc_settings[font]" name="rcc_settings[font]" type="text"', '<label class="description" for="rcc_settings[font]">'],
                ['<input id="rcc_settings[width]" name="rcc_settings[width]" type="text"', '<label class="description" for="rcc_settings[width]">'],
                ['<input id="rcc_settings[max-width]" name="rcc_settings[max-width]" type="text"', '<label class="description" for="rcc_settings[max-width]">'],
                ['<input id="rcc_settings[padding]" name="rcc_settings[padding]" type="text"', '<label class="description" for="rcc_settings[padding]">']
            ]
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
            version: '4.6',
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
            software: 'WordPress',
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
        },

        {
            url:'wp-admin/admin-ajax.php',
            software: '#wordPress #wpPlugin',
            softwareDetails: '',
            version: '',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['complete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['Array\n(\n' + '    [PFFREE_Access_Token]', '-1']
        },

        {
            url: 'wp-admin',
            software: 'WordPress',
            softwareDetails: 'tabs-responsive',
            version: '',
            type: 'htmlTag',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['complete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<select id="wpsm_tabs_r_insertselect" style="width: 100%;margin-bottom: 20px;">', '<button class="button primary wp_tabs_r_shortcode_button" id="wpsm_tabs_r_insert">']
        },

        {
            url: 'wp-admin/admin.php?page=tonjoo_excerpt',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'easy-custom-auto-excerpt',
            version: '',
            type: 'htmlTag',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['complete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<textarea id="ace_editor_value" name="tonjoo_ecae_options[custom_css]">', '<div class="postbox-container" style="float: right;margin-right: -300px;width: 280px;">']
        },

        {
            url: 'wp-admin/edit.php?post_type=sdm_downloads',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'simple-download-monitor',
            version: '',
            type: 'htmlTag',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['complete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<tbody id="the-list">', '<tfoot>']
        },

        {
            url: null,
            software: '#wordPress #wpPlugin',
            softwareDetails: 'simple-download-monitor',
            version: '',
            type: 'htmlTag',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<input id="sdm_upload" type="text" size="100" name="sdm_upload"', '<input id="upload_image_button" type="button" class="button-primary" value="Select File">']
        },

        {
            url: 'wp-admin/options-general.php?page=flickrrss-settingspage.php',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'flickrRSS',
            version: '5.3.1',
            type: 'string',
            typeDet: 'multiple-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete'],
                ['incomplete', 'complete'],
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: [
                ['<input name="flickrRSS_id" type="text" id="flickrRSS_id"', '<a href="#" id="idgetter">'],
                ['<input name="flickrRSS_set" type="text" id="flickrRSS_set"', '<tr valign=\"top\" id=\"tags\">'],
                ['<input name="flickrRSS_tags" type="text" id="flickrRSS_tags"', 'Comma separated, no spaces']
                ]
        },

        {
            url: null,
            software: '#wordPress #wpPlugin',
            softwareDetails: 'add-link-to-facebook',
            version: '2.2.8',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<input type="text" name="al2fb_facebook_id" id="al2fb_facebook_id"', '</a></td></tr>\n</table>']
        },
        {
            url:'wp-admin/options-general.php?page=wordpress_file_upload&action=plugin_settings',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'wp-file-upload',
            version: '4.3.3',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [],
            endPointsPositions : [
                [1,7],
            ],

            sigOccurrence: 'unique',
            endPoints: ['<input name="wfu_basedir" id="wfu_basedir" type="text"', '</strong></p>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>']
        },

        {
            url: 'wp-admin/options-general.php?page=srbtranslatoptions',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'srbtranslat',
            version: '1.46',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<input name="lang_identificator" type="text"', 'Set what identificator for script selection will be used in urls.']
        },

        {
            url: 'cf-api',
            software: '#wordPress #wpPlugin',
            softwareDetails: '',
            version: '1.46',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<div class="caldera-grid" id="caldera_form_1"', '</div>']
        },

        {
            url: 'wp-admin/admin.php?page=caldera-forms',
            software: 'WordPress',
            softwareDetails: 'caldera-forms',
            version: '1.5.9.1',
            type: 'string',
            listenerData: {
                listenerType: 'xhr',
                listenerMethod: 'POST',
                url: 'wp-admin/admin-ajax.php'
            },
            typeDet: 'multiple-unique',
            description: '',
            sigOccurrence: 'unique',
            endPoints: [
                ['<tr id="entry_row_3">', '<button class="hidden button button-small cfajax-trigger edit-entry-btn _tisBound" id="edit-entry-3"'],
                ['<tr id="entry_row_2">', '<button class="hidden button button-small cfajax-trigger edit-entry-btn _tisBound" id="edit-entry-2"'],
                ['<tr id="entry_row_1">', '<button class="hidden button button-small cfajax-trigger edit-entry-btn _tisBound" id="edit-entry-1"'],
                ['<div id="main-entry-panel" class="tab-detail-panel hidden" data-tab="Entry"', '<div id="meta-debug" data-tab="Mailer Debug" class="tab-detail-panel hidden">'],
                ['<div id="meta-debug" data-tab="Mailer Debug" class="tab-detail-panel hidden">', '<div class="baldrick-modal-footer" id="view_entry_baldrickModalFooter"'],

                ]
        },
        {
            url: 'wp-admin/admin.php?page=caldera-forms',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'caldera-forms',
            version: '1.5.9.1',
            type: 'listener',
            listenerData: {
                listenerType: 'xhr',
                listenerMethod: 'POST',
                type: 'string',
                url: 'wp-admin/admin-ajax.php',
                typeDet: 'single-unique',
                sigType: ['complete', 'complete'],
                endPoints: ['<p><strong>', '[AltBody]']
            },
        },
        {
            url: 'wp-admin/admin.php?edit=',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'caldera-forms',
            version: '1.5.9.1',
            type: 'string',
            typeDet: 'multiple-unique',
            description: '',
            sigType: [
                ['complete', 'complete'],
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: [
            ['id=\"fld_8768091\"', '<input type="hidden" class="field-config" name="config[fields][fld_8768091][ID]" value="fld_8768091">'],
            ['<input type="text" class="block-input field-config field-slug required" id="fld_8768091_slug" name="config[fields][fld_8768091][slug]" value=', '<label for="fld_8768091_fcond">']
            ]
        },
        {
            url: 'wp-admin/admin.php?page=bookly-payments',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'bookly-responsive-appointment-booking-tool',
            version: '13.2',
            type: 'listener',
            listenerData: {
                listenerType: 'xhr',
                listenerMethod: 'POST',
                type: 'string',
                url: 'wp-admin/admin-ajax.php?action=bookly_get_payment_details&payment_id=*',
                typeDet: 'single-unique',
                sigType: ['complete', 'complete'],
                endPoints: ['<tbody>', '<div>Date']
            },
        },

        {
            url: 'wp-admin/admin-ajax.php?action=wpdm_generate_password',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'download-manager',
            version: '2.9.51',
            type: 'all',
            typeDet: 'single-unique',
            description: ''
        },

         {
            url: 'wp-content/plugins/share-this-image/sharer.php',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'share-this-image',
            version: '1.03',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<meta http-equiv="refresh" content="0;url=', '<style type="text/css">']
        },

        {
            url: 'wp-content/plugins/z-url-preview/class.zlinkpreview.php',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'z-url-preview',
            version: '1.03',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['Info: Array', '[content_type]']
        },
        {
            url: 'wp-admin/options-general.php?page=wpdf-options',
            software: '#wordPress #wpPlugin',
            softwareDetails: 'wp-inject',
            version: '1.15',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<input class="regular-text" type="text" name="flickr_appid"', 'VERIFICATION BUTTON DISPLAY']
        },
        {
            url: '/wp-admin/options-general.php?page=relevanssi%2Frelevanssi.php',
            software: 'WordPress',
            softwareDetails: 'relevanssi',
            version: '4.0.4',
            type: 'string',
            typeDet: 'single-unique',
            description: '',
            sigType: [
                ['incomplete', 'complete']
            ],
            sigOccurrence: 'unique',
            endPoints: ['<input type=\'hidden\' name=\'tab\'', '<h2 class="nav-tab-wrapper">']
        },
        {
            url: '',
            software: 'WordPress',
            softwareDetails: 'wd-instagram-feed',
            version: '1.3.0',
            type: 'listener',
            listenerData: {
                listenerType: 'xhr',
                listenerMethod: 'POST',
                type: 'string',
                url: 'wp-admin/admin-ajax.php',
                typeDet: 'single-unique',
                sigType: ['complete', 'complete'],
                endPoints: ['\"bio\":', '\"website\":']
            },
        },
        {
            url: 'post_type=tggr',
            software: 'WordPress',
            softwareDetails: 'tagregator',
            version: '0.6',
            description: '',
            type: 'string',
            typeDet: 'multiple-unique',
            sigType: ['incomplete', 'complete'],
            sigOccurrence: 'unique',
            endPoints: [
                ['<h1 class="entry-title">', '<div class="entry-meta">'],
                ['<div class="entry-meta">', '<div class="entry-content">'],
                ['<footer class="entry-footer">', "</footer>"]
            ]
        },
        {
            url: null,
            software: 'WordPress',
            softwareDetails: 'multi-step-form',
            version: '1.2.5',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            sigType: ['incomplete', 'complete'],
            sigOccurrence: 'unique',
            endPoints: 
                ['<div class="fw-summary-container">', '<button type="button" class="fw-btn-submit">']
            
        },
        {
            url: 'wp-admin/admin.php?page=wps_pages_page&page-uri=',
            software: 'WordPress',
            softwareDetails: 'wp-statistics',
            version: '12.0.5',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            sigType: ['incomplete', 'complete'],
            sigOccurrence: 'unique',
            endPoints: 
                ['<form method="get">', '<input type="text" size="10" name="rangestart" id="datestartpicker"']
            
        },
        {
            url: null,
            software: 'WordPress',
            softwareDetails: 'ultimate-member',
            version: '2.0.27',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            endPoints: 
                ['<div class="um-left um-half">', '<div class="um-col-alt-b">']
        },
        {
            url: 'wp-admin/admin.php?page=um_options&tab=appearance&section=login_form',
            software: 'WordPress',
            softwareDetails: 'ultimate-member',
            version: '2.0.27',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            endPoints: 
                ['<input type=\"text\"  id=\"um_options_login_primary_btn_word\"   class=\"um-forms-field um-medium-field\"   name=\"um_options[login_primary_btn_word]\"   data-field_id=\"login_primary_btn_word\"', '<label  for="um_options_login_secondary_btn" >']
        },
        {
            url: null,
            software: 'WordPress',
            softwareDetails: 'quizlord',
            version: '2.0',
            description: '',
            type: 'string',
            typeDet: 'single-several',
            endPoints: 
                ['<h3 class="ql-name">', '<h5 class=\'ql-description\'>']
        },
        {
            url: 'wp-admin/admin.php?page=quizlord',
            software: 'WordPress',
            softwareDetails: 'quizlord',
            version: '2.0',
            description: '',
            type: 'string',
            typeDet: 'single-several',
            endPoints: 
                ['<a href=".*/wp-admin/admin\\.php\\?page=quizlord', '<td class="qlqid">']
        },
        {
            url: 'wp-content/plugins/sagepay-server-gateway-for-woocommerce/includes/pages/redirect.php?page=',
            software: 'WordPress',
            softwareDetails: 'sagepay-server-gateway-for-woocommerce',
            version: '1.0.7',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            endPoints: 
                ['<body OnLoad="OnLoadEvent();">', '<noscript><center><p>']
        },
        {
            url: 'wp-admin/admin.php?page=gd-rating-system-information&panel=',
            software: 'WordPress',
            softwareDetails: 'gd-rating-system',
            version: '2.3',
            description: '',
            type: 'string',
            typeDet: 'multiple-unique',
            sigType: [
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete']
                ],
            endPoints: [
                    ['<div class="d4p-wrap wpv-52 d4p-page-information d4p-panel d4p-panel', '<div class="d4p-header">'],
                    ['<input type="hidden" id="_wpnonce" name="_wpnonce"', '<div class="d4p-content-left">'],
                    ['<input id="gdrts-tool', '<div class="d4p-content-right">']
                ]
        },
        {
            url: 'wp-admin/admin.php?page=gd-rating-system-about&panel=',
            software: 'WordPress',
            softwareDetails: 'gd-rating-system',
            version: '2.3',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            endPoints: 
                    ['<div class="d4p-wrap wpv-52 d4p-page-about d4p-panel d4p-panel', '<div class="d4p-header">']
        },
        {
            url: 'wp-admin/admin.php?page=gd-rating-system-transfer&panel=',
            software: 'WordPress',
            softwareDetails: 'gd-rating-system',
            version: '2.3',
            description: '',
            type: 'string',
            typeDet: 'multiple-unique',
            sigType: [
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete']
                ],
            endPoints: [
                    ['<div class="d4p-wrap wpv-52 d4p-page-transfer d4p-panel d4p-panel', '<div class="d4p-header">'],
                    ['<input id="gdrts-tool', '<div class="d4p-content-right">']
                ]
        },
        {
            url: 'wp-admin/admin.php?page=gd-rating-system-tools&panel=',
            software: 'WordPress',
            softwareDetails: 'gd-rating-system',
            version: '2.3',
            description: '',
            type: 'string',
            typeDet: 'multiple-unique',
            sigType: [
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete']
                ],
            endPoints: [
                    ['<div class="d4p-wrap wpv-52 d4p-page-tools d4p-panel d4p-panel', '<div class="d4p-header">'],
                    ['<input type="hidden" id="_wpnonce" name="_wpnonce"', '<div class="d4p-content-left">'],
                    ['<input id="gdrts-tool', '<div class="d4p-content-right">']
                ]
        },
        {
            url: 'wp-admin/profile.php',
            software: 'WordPress',
            softwareDetails: 'dark-mode',
            version: '1.6',
            description: '',
            type: 'string',
            typeDet: 'single-unique',
            endPoints: 
                ['<input type="time" name="dark_mode_start" id="dark_mode_start"', '<input type="hidden" name="dark_mode_nonce" id="dark_mode_nonce"']
        },
        {
            url: 'wp-admin/admin.php?page=wpglobus_options',
            software: 'WordPress',
            softwareDetails: 'wpglobus',
            version: '1.9.6',
            description: '',
            type: 'string',
            typeDet: 'multiple-unique',
            sigType: [
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete'],
                    ['incomplete', 'complete']
                ],
            endPoints: [
                    ['<input type="hidden" name="wpglobus_option[enabled_languages][en]" id="enabled_languages-en-hidden"', '<label for="enabled_languages[en]">'],
                    ['<input type="hidden" class="checkbox-check" data-val="1" name="wpglobus_option[selector_wp_list_pages][show_selector]"', '<input type="checkbox" class="checkbox  compiler" id="wpglobus_option_selector_wp_list_pages_show_selector_0"'],
                    ['<input type="hidden" class="checkbox-check" data-val="1" name="wpglobus_option[post_type][post]"', '<input type="checkbox" class="checkbox " id="wpglobus_option_post_type_post_0"'],
                    ['<input type="hidden" class="checkbox-check" data-val="1" name="wpglobus_option[post_type][page]"', '<input type="checkbox" class="checkbox " id="wpglobus_option_post_type_page_1"'],
                    ['<input type="hidden" class="checkbox-check" data-val="1" name="wpglobus_option[browser_redirect][redirect_by_language]"', '<input type="checkbox" class="checkbox " id="wpglobus_option_browser_redirect_redirect_by_language_0"']
                ]
        },



    ]
};

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
        script_signatures,
    };


    Object.keys(exports).forEach(k => module[k] = exports[k]);
  return module;
})(window.Sigs || {});