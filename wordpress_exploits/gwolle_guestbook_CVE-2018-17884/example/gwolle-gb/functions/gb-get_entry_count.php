<?php


// No direct calls to this script
if ( strpos($_SERVER['PHP_SELF'], basename(__FILE__) )) {
	die('No direct calls allowed!');
}


/*
 * gwolle_gb_get_entry_count
 * Get the number of entries.
 *
 * @param array $args
 * - checked  string: 'checked' or 'unchecked', List the entries that are checked or not checked
 * - trash    string: 'trash' or 'notrash', List the entries that are deleted or not deleted
 * - spam     string: 'spam' or 'nospam', List the entries marked as spam or as no spam
 * - all      string: 'all', List all entries
 * - book_id  int: Only entries from this book. Default in the shortcode is 1 (since 1.5.1).
 *
 * @return mixed int with the count of the entries, false if there's an error.
 */
function gwolle_gb_get_entry_count($args) {

	global $wpdb;


	$where = " 1 = %d";
	$values = Array(1);

	if ( !is_array($args) ) {
		return false;
	}

	if ( isset($args['checked']) ) {
		if ( $args['checked'] == 'checked' || $args['checked'] == 'unchecked' ) {
			$where .= "
				AND
				ischecked = %d";
			if ( $args['checked'] == 'checked' ) {
				$values[] = 1;
			} else if ( $args['checked'] == 'unchecked' ) {
				$values[] = 0;
			}
		}
	}
	if ( isset($args['spam']) ) {
		if ( $args['spam'] == 'spam' || $args['spam'] == 'nospam' ) {
			$where .= "
				AND
				isspam = %d";
			if ( $args['spam'] == 'spam' ) {
				$values[] = 1;
			} else if ( $args['spam'] == 'nospam' ) {
				$values[] = 0;
			}
		}
	}
	if ( isset($args['trash']) ) {
		if ( $args['trash'] == 'trash' || $args['trash'] == 'notrash' ) {
			$where .= "
				AND
				istrash = %d";
			if ( $args['trash'] == 'trash' ) {
				$values[] = 1;
			} else if ( $args['trash'] == 'notrash' ) {
				$values[] = 0;
			}
		}
	}
	if ( isset( $args['book_id']) && ((int) $args['book_id']) > 0 ) {
		$where .= "
			AND
			book_id = %d";
		$values[] = (int) $args['book_id'];
	}

	$tablename = $wpdb->prefix . "gwolle_gb_entries";

	$sql = "
			SELECT
				COUNT(id) AS count
			FROM
				" . $tablename . "
			WHERE
				" . $where . "
			;";

	$sql = $wpdb->prepare( $sql, $values );


	/* Support caching of the result. */
	$key         = md5( serialize( $sql ) );
	$cache_key   = "gwolle_gb_get_entry_count:$key";
	$cache_value = wp_cache_get( $cache_key );

	if ( false === $cache_value ) {

		// Do a real query.
		$data = $wpdb->get_results( $sql, ARRAY_A );

		wp_cache_add( $cache_key, $data );

		// $wpdb->print_error();
		// echo "number of rows: " . $wpdb->num_rows;

	} else {

		// This is data from cache.
		$data = $cache_value;

	}

	return (int) $data[0]['count'];

}
