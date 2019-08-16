<?php


// No direct calls to this script
if ( strpos($_SERVER['PHP_SELF'], basename(__FILE__) )) {
	die('No direct calls allowed!');
}


/*
 * Handles AJAX request from Gwolle-GB Captcha AJAX check.
 * Expects that the plugin Really Simple Captcha is enabled.
 *
 * @return bool 'true' or 'false', if the CAPTCHA is filled in correctly.
 * This response is not required for validation and being able to submit the form.
 */
function gwolle_gb_captcha_ajax_callback() {

	if ( class_exists('ReallySimpleCaptcha') ) {

		check_ajax_referer( 'gwolle_gb_captcha_ajax', 'security' );

		// Instantiate class
		$gwolle_gb_captcha = new ReallySimpleCaptcha();

		// This variable holds the CAPTCHA image prefix, which corresponds to the correct answer
		$gwolle_gb_captcha_prefix = ( isset( $_POST['gwolle_gb_captcha_prefix'] ) ? $_POST['gwolle_gb_captcha_prefix'] : false );

		// This variable holds the CAPTCHA response, entered by the user
		$gwolle_gb_captcha_code = ( isset( $_POST['gwolle_gb_captcha_code'] ) ? $_POST['gwolle_gb_captcha_code'] : false );

		// This variable will hold the result of the CAPTCHA validation. Set to 'false' until CAPTCHA validation passes
		$gwolle_gb_captcha_correct = ( $gwolle_gb_captcha->check( $gwolle_gb_captcha_prefix, $gwolle_gb_captcha_code ) ? 'true' : 'false' );

		// Return response
		echo $gwolle_gb_captcha_correct;

	}

	die(); // this is required to return a proper result

}
add_action( 'wp_ajax_gwolle_gb_captcha_ajax', 'gwolle_gb_captcha_ajax_callback' );
add_action( 'wp_ajax_nopriv_gwolle_gb_captcha_ajax', 'gwolle_gb_captcha_ajax_callback' );
