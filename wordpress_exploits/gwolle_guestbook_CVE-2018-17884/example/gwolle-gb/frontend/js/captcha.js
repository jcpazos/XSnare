
/*
 * JavaScript for CAPTCHA for Gwolle Guestbook Frontend.
 * AJAX event for the CAPTCHA check.
 */
jQuery(document).ready(function($) {
	jQuery( "#gwolle_gb_captcha_code" ).focusout(function() {

		var gwolle_gb_captcha_code = jQuery( '#gwolle_gb_captcha_code' ).val();

		var data = {
			action:   'gwolle_gb_captcha_ajax',
			security: gwolle_gb_captcha.security,
			gwolle_gb_captcha_prefix: gwolle_gb_captcha.gwolle_gb_captcha_prefix,
			gwolle_gb_captcha_code: gwolle_gb_captcha_code
		};

		jQuery.post( gwolle_gb_captcha.ajaxurl, data, function(response) {

			// Update form verification feedback
			if ( 'true' == response ) {
				document.getElementById( 'gwolle_gb_captcha_verify' ).innerHTML = '<span style="color:green">' + gwolle_gb_captcha.correct + '</span>';
				jQuery( '#gwolle_gb_captcha_code' ).removeClass('error');
			} else if ( 'false' == response ) {
				document.getElementById( 'gwolle_gb_captcha_verify' ).innerHTML = '<span style="color:red">' + gwolle_gb_captcha.incorrect + '</span>';
				jQuery( '#gwolle_gb_captcha_code' ).addClass('error');
			}

		});

	});
});
