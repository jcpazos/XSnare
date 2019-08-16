<?php

/*
 * WordPress Actions and Filters.
 * See the Plugin API in the Codex:
 * http://codex.wordpress.org/Plugin_API
 */


// No direct calls to this script
if ( strpos($_SERVER['PHP_SELF'], basename(__FILE__) )) {
	die('No direct calls allowed!');
}


/*
 * Add a menu in the WordPress backend.
 * Load JavaSCript and CSS for Admin.
 */
function gwolle_gb_adminmenu() {
	/*
	 * How to add new menu-entries:
	 * add_menu_page( $page_title, $menu_title, $access_level, $file, $function = '', $icon_url = '' )
	 */

	// Counter
	$count_unchecked = get_transient( 'gwolle_gb_menu_counter' );
	if ( false === $count_unchecked ) {
		$count_unchecked = (int) gwolle_gb_get_entry_count(
			array(
				'checked' => 'unchecked',
				'trash'   => 'notrash',
				'spam'    => 'nospam'
			)
		);
		set_transient( 'gwolle_gb_menu_counter', $count_unchecked, DAY_IN_SECONDS );
	}

	// Main navigation entry
	// Admin page: admin/welcome.php
	$menu_text = esc_html__('Guestbook', 'gwolle-gb') . '<span class="awaiting-mod count-' . $count_unchecked . '"><span>' . $count_unchecked . '</span></span>';
	add_menu_page(
		esc_html__('Guestbook', 'gwolle-gb'), /* translators: Menu entry */
		$menu_text,
		'moderate_comments',
		GWOLLE_GB_FOLDER . '/gwolle-gb.php',
		'gwolle_gb_welcome',
		'dashicons-admin-comments'
	);

	// Admin page: admin/entries.php
	$menu_text = esc_html__('Entries', 'gwolle-gb') . '<span class="awaiting-mod count-' . $count_unchecked . '"><span>' . $count_unchecked . '</span></span>';
	add_submenu_page(
		GWOLLE_GB_FOLDER . '/gwolle-gb.php',
		esc_html__('Entries', 'gwolle-gb'), /* translators: Menu entry */
		$menu_text,
		'moderate_comments',
		GWOLLE_GB_FOLDER . '/entries.php',
		'gwolle_gb_page_entries'
	);

	// Admin page: admin/editor.php
	add_submenu_page( GWOLLE_GB_FOLDER . '/gwolle-gb.php', esc_html__('Entry editor', 'gwolle-gb'), /* translators: Menu entry */ esc_html__('Add/Edit entry', 'gwolle-gb'), 'moderate_comments', GWOLLE_GB_FOLDER . '/editor.php', 'gwolle_gb_page_editor' );

	// Admin page: admin/settings.php
	add_submenu_page( GWOLLE_GB_FOLDER . '/gwolle-gb.php', esc_html__('Settings', 'gwolle-gb'), /* translators: Menu entry */ esc_html__('Settings', 'gwolle-gb'), 'manage_options', GWOLLE_GB_FOLDER . '/settings.php', 'gwolle_gb_page_settings' );

	// Admin page: admin/import.php
	add_submenu_page( GWOLLE_GB_FOLDER . '/gwolle-gb.php', esc_html__('Import', 'gwolle-gb'), /* translators: Menu entry */ esc_html__('Import', 'gwolle-gb'), 'manage_options', GWOLLE_GB_FOLDER . '/import.php', 'gwolle_gb_page_import' );

	// Admin page: admin/export.php
	add_submenu_page( GWOLLE_GB_FOLDER . '/gwolle-gb.php', esc_html__('Export', 'gwolle-gb'), /* translators: Menu entry */ esc_html__('Export', 'gwolle-gb'), 'manage_options', GWOLLE_GB_FOLDER . '/export.php', 'gwolle_gb_page_export' );
}
add_action('admin_menu', 'gwolle_gb_adminmenu');


/*
 * Load CSS for admin.
 */
function gwolle_gb_admin_enqueue_style() {
	wp_enqueue_style( 'gwolle-gb-admin-css', plugins_url( '/admin/css/gwolle-gb-admin.css', __FILE__ ), false, GWOLLE_GB_VER, 'all' );
}
add_action( 'admin_enqueue_scripts', 'gwolle_gb_admin_enqueue_style' );


/*
 * Load JavaScript for admin.
 * It's called directly on the adminpages, it's not being used as a hook.
 */
function gwolle_gb_admin_enqueue() {
	wp_enqueue_script( 'gwolle-gb-admin-js', plugins_url( '/admin/js/gwolle-gb-admin.js', __FILE__ ), 'jquery', GWOLLE_GB_VER, true );
}
//add_action( 'admin_enqueue_scripts', 'gwolle_gb_admin_enqueue' );


/*
 * Add Settings link to the main plugin page
 */
function gwolle_gb_links( $links, $file ) {
	if ( $file == plugin_basename( dirname(__FILE__).'/gwolle-gb.php' ) ) {
		$links[] = '<a href="' . admin_url( 'admin.php?page=gwolle-gb/settings.php' ) . '">'.__( 'Settings', 'gwolle-gb' ).'</a>';
	}
	return $links;
}
add_filter( 'plugin_action_links', 'gwolle_gb_links', 10, 2 );


/*
 * Check if we need to install or upgrade.
 * Supports MultiSite since 1.5.2.
 */
function gwolle_gb_init() {

	global $wpdb;

	$current_version = get_option( 'gwolle_gb_version' );

	if ($current_version && version_compare($current_version, GWOLLE_GB_VER, '<')) {
		// Upgrade, if this version differs from what the database says.

		if ( function_exists('is_multisite') && is_multisite() ) {
			$blogids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
			foreach ($blogids as $blog_id) {
				switch_to_blog($blog_id);
				gwolle_gb_upgrade();
				restore_current_blog();
			}
		} else {
			gwolle_gb_upgrade();
		}
	}
}
add_action('admin_init', 'gwolle_gb_init');


/*
 * Install database tables for new blog on MultiSite.
 *
 * @since 1.5.2
 */
function gwolle_gb_activate_new_site($blog_id) {
	switch_to_blog($blog_id);
	gwolle_gb_install();
	restore_current_blog();
}
add_action( 'wpmu_new_blog', 'gwolle_gb_activate_new_site' );


/*
 * Support uninstall for MultiSite through a filter.
 * Take Note: This will do an uninstall on all sites.
 * Only run on admin_init, no need for the frontend.
 *
 * @since 2.1.0
 */
function gwolle_gb_multisite_uninstall() {
	global $wpdb;

	if ( is_admin() ) {
		if ( function_exists('is_multisite') && is_multisite() ) {
			$do_uninstall = apply_filters( 'gwolle_gb_multisite_uninstall', false );
			if ( $do_uninstall ) {
				$blogids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
				foreach ($blogids as $blog_id) {
					switch_to_blog($blog_id);
					gwolle_gb_uninstall();
					restore_current_blog();
				}
				// Avoid database errors and PHP notices, don't run these actions anymore.
				remove_action( 'admin_menu', 'gwolle_gb_adminmenu', 10, 1 );
				remove_action( 'wp_dashboard_setup', 'gwolle_gb_dashboard_setup', 10, 1 );
				remove_action( 'admin_bar_menu', 'gwolle_gb_admin_bar_menu', 61, 1 );
			}
		}
	}
}
add_action('admin_init', 'gwolle_gb_multisite_uninstall', 99);


/*
 * Register styles and scripts.
 * Enqueue them in the frontend function only when we need them.
 */
function gwolle_gb_register() {

	// Always load jQuery, it's just easier this way.
	wp_enqueue_script('jquery');

	// Register script for frontend. Load it later.
	wp_register_script( 'gwolle_gb_frontend_js', plugins_url('frontend/js/gwolle-gb-frontend.js', __FILE__), 'jquery', GWOLLE_GB_VER, true );
	$dataToBePassed = array(
		'ajax_url'     => admin_url('admin-ajax.php'),
		'load_message' => /* translators: Infinite Scroll */ esc_html__('Loading more...', 'gwolle-gb'),
		'end_message'  => /* translators: Infinite Scroll */ esc_html__('No more entries.', 'gwolle-gb'),
		'honeypot'     => gwolle_gb_get_field_name( 'honeypot' ),
		'honeypot2'    => gwolle_gb_get_field_name( 'honeypot2' ),
		'timeout'      => gwolle_gb_get_field_name( 'timeout' ),
		'timeout2'     => gwolle_gb_get_field_name( 'timeout2' )
	);
	wp_localize_script( 'gwolle_gb_frontend_js', 'gwolle_gb_frontend_script', $dataToBePassed );


	// Register style for frontend. Load it later.
	wp_register_style('gwolle_gb_frontend_css', plugins_url('frontend/css/gwolle-gb-frontend.css', __FILE__), false, GWOLLE_GB_VER,  'screen');
}
add_action('wp_enqueue_scripts', 'gwolle_gb_register');


/*
 * Load Language files for frontend and backend.
 */
function gwolle_gb_load_lang() {
	load_plugin_textdomain( 'gwolle-gb', false, GWOLLE_GB_FOLDER . '/lang' );
}
add_action('plugins_loaded', 'gwolle_gb_load_lang');


/*
 * Add number of unchecked entries to admin bar, if > 0.
 */
function gwolle_gb_admin_bar_menu( $wp_admin_bar ) {
	if ( !current_user_can('moderate_comments') )
		return;

	// Counter
	$count_unchecked = gwolle_gb_get_entry_count(
		array(
			'checked' => 'unchecked',
			'trash'   => 'notrash',
			'spam'    => 'nospam'
		)
	);

	$count_unchecked_i18n = number_format_i18n( $count_unchecked );
	$awaiting_text = esc_attr( sprintf( /* translators: Toolbar */ _n(
			'%s guestbook entry awaiting moderation',
			'%s guestbook entries awaiting moderation',
			$count_unchecked_i18n,
			'gwolle-gb' ),
		$count_unchecked_i18n ) );

	if ( $count_unchecked > 0 ) {
		$icon  = '<span class="ab-icon"></span>';
		$title = '<span id="ab-unchecked-entries" class="ab-label awaiting-mod pending-count count-' . $count_unchecked . '" aria-hidden="true">' . $count_unchecked_i18n . '</span>';
		$title .= '<span class="screen-reader-text">' . $awaiting_text . '</span>';

		$wp_admin_bar->add_menu( array(
			'id'    => 'gwolle-gb',
			'title' => $icon . $title,
			'href'  => admin_url('admin.php?page=' . GWOLLE_GB_FOLDER . '/entries.php&amp;show=unchecked'),
		) );
	}
}
add_action( 'admin_bar_menu', 'gwolle_gb_admin_bar_menu', 61 );
