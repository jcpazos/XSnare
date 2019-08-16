<?php


// No direct calls to this script
if ( strpos($_SERVER['PHP_SELF'], basename(__FILE__) )) {
	die('No direct calls allowed!');
}


/*
 * Add debug info to debug tab on the settings page.
 *
 * @since 1.6.2
 */
function gwolle_gb_debug_info() {
	global $wp_version, $wp_db_version, $wpdb;

	if ( function_exists( 'current_user_can' ) && ! current_user_can( 'manage_options' ) ) {
		return;
	} ?>

	<tr>
		<th><?php esc_html_e('WordPress version:', 'gwolle-gb'); ?></th>
		<td><?php echo $wp_version . ' (db: ' . $wp_db_version . ')'; ?></td>
	</tr>

	<tr>
		<th><?php esc_html_e('WordPress theme:', 'gwolle-gb'); ?></th>
		<td><?php
			if ( version_compare($wp_version,'3.4', '>=') ) {
				echo wp_get_theme()->get('Name');
			} else {
				echo get_current_theme();
			} ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('Active plugins:', 'gwolle-gb'); ?></th>
		<td><?php
			$active_plugins = get_option('active_plugins');
			print_r( $active_plugins ); ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('PHP Version:', 'gwolle-gb'); ?></th>
		<td><?php
			echo PHP_VERSION;
			if ( version_compare( PHP_VERSION, '5.3', '<' ) ) {
				// PHP 5.2 is insecure, urge for an upgrade.
				echo '<br />' . esc_html__( 'You have a very old version of PHP. Please contact your hosting provider and request an upgrade.', 'gwolle-gb' );
			} ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('MySQL Version:', 'gwolle-gb'); ?></th>
		<td><?php
			$mysql_version = $wpdb->get_var('SELECT VERSION()');
			echo $mysql_version; ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('MySQL Charset:', 'gwolle-gb'); ?></th>
		<td><?php
			echo esc_html__('MySQL Charset:', 'gwolle-gb') . ' ' . $wpdb->charset;

			// Make sure we do not run this query after uninstall.
			$table_entries = $wpdb->query("SHOW TABLES LIKE '" . $wpdb->prefix . "gwolle_gb_entries'");

			if ( $table_entries != 0 && method_exists($wpdb, 'get_col_charset') ) {
				$charset = $wpdb->get_col_charset( $wpdb->gwolle_gb_entries, 'content' );
				echo '<br />' . esc_html__('MySQL Column Charset:', 'gwolle-gb') . ' ' . $charset;
			} ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('MySQL / MySQLi:', 'gwolle-gb'); ?></th>
		<td><?php
			if ( $wpdb->use_mysqli == true ) {
				echo 'mysqli';
			} else {
				echo 'mysql';
			} ?>
		</td>
	</tr>

	<tr>
		<th><?php esc_html_e('MySQL variables:', 'gwolle-gb'); ?></th>
		<td><?php
			$mysql_variables = (array) $wpdb->get_results('SHOW VARIABLES', ARRAY_N);
			$mysql_variables_char = array();
			foreach ( $mysql_variables as $variable ) {
				$pattern = '/^char/';
				if ( preg_match( $pattern, $variable[0], $matches ) ) {
					$mysql_variables_char[$variable[0]] = $variable[1];
				}
			}
			print_r( $mysql_variables_char );
			?>
		</td>
	</tr>

	<?php
}


/*
 * Test adding an entry.
 *
 * @param bool $emoji save text with or without emoji characters
 * @return int ID of the saved entry, 0 if not saved
 *
 * @since 1.6.2
 */
function gwolle_gb_test_add_entry( $emoji = false ) {
	// Sample data
	$content = esc_html__('Test entry, delete if you wish.', 'gwolle-gb');
	$data = array(
		'author_name'     => 'You',
		'author_id'       => 0,
		'author_email'    => 'test@example.com',
		'author_origin'   => 'Zwolle',
		'author_website'  => 'http://example.com',
		'author_ip'       => '127.0.0.1',
		'author_host'     => 'example.com',
		'content'         => $content,
		'datetime'        => current_time( 'timestamp' ),
		'ischecked'       => 0,
		'checkedby'       => 0,
		'istrash'         => 1,
		'isspam'          => 0,
		'admin_reply'     => esc_html__('Just a test', 'gwolle-gb'),
		'admin_reply_uid' => 0,
		'book_id'         => 1
	);
	if ( $emoji ) {
		$data['content'] = gwolle_gb_maybe_encode_emoji( $content . ' 😄👍👌', 'content' );
	}

	$entry = new gwolle_gb_entry();

	$set_data = $entry->set_data( $data );
	$entry_id = 0;

	if ( $set_data ) {
		$entry_id = $entry->save();
	}

	return $entry_id;
}
