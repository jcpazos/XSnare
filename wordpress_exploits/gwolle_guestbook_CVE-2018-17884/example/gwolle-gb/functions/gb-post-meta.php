<?php


// No direct calls to this script
if ( strpos($_SERVER['PHP_SELF'], basename(__FILE__) )) {
	die('No direct calls allowed!');
}


/*
 * Set meta_keys so we can find the post with the shortcode back.
 *
 * @param int $id ID of the post
 */
function gwolle_gb_save_post($id) {

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
		return;
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX )
		return;
	if ( defined( 'DOING_CRON' ) && DOING_CRON )
		return;

	if ( function_exists('has_shortcode') ) {
		$post = get_post( $id );

		if ( has_shortcode( $post->post_content, 'gwolle_gb' ) || has_shortcode( $post->post_content, 'gwolle_gb_read' ) ) {
			// Set a meta_key so we can find the post with the shortcode back.
			$meta_value = get_post_meta( $id, 'gwolle_gb_read', true );
			if ( $meta_value != 'true' ) {
				update_post_meta( $id, 'gwolle_gb_read', 'true' );
			}
		} else {
			// Remove the meta_key in case it is set.
			delete_post_meta( $id, 'gwolle_gb_read' );
		}

		if ( has_shortcode( $post->post_content, 'gwolle_gb' ) || has_shortcode( $post->post_content, 'gwolle_gb_read' ) || has_shortcode( $post->post_content, 'gwolle_gb_write' ) ) {
			// Nothing to do
		} else {
			delete_post_meta( $id, 'gwolle_gb_book_id' );
		}
	}
}
add_action('save_post', 'gwolle_gb_save_post');


/*
 * Make our meta fields protected, so they are not in the custom fields metabox.
 *
 * @since 2.1.5
 */
function gwolle_gb_is_protected_meta( $protected, $meta_key, $meta_type ) {

	switch ($meta_key) {
		case 'gwolle_gb_read':
			return true;
			break;
		case 'gwolle_gb_book_id':
			return true;
			break;
	}

	return $protected;
}
add_filter( 'is_protected_meta', 'gwolle_gb_is_protected_meta', 10, 3 );


/*
 * Set Meta_keys so we can find the post with the shortcode back.
 * Gets called from frontend/gb-shortcodes.php.
 *
 * @param string $shortcode value 'write' or 'read'.
 * @param array $shortcode_atts array with the shortcode attributes.
 *
 * @since 1.5.6
 */
function gwolle_gb_set_meta_keys( $shortcode, $shortcode_atts ) {

	if ( $shortcode = 'read' ) {
		// Set a meta_key so we can find the post with the shortcode back.
		$meta_value_read = get_post_meta( get_the_ID(), 'gwolle_gb_read', true );
		if ( $meta_value_read != 'true' ) {
			update_post_meta( get_the_ID(), 'gwolle_gb_read', 'true' );
		}
		if ( isset($shortcode_atts['entry_id']) && $shortcode_atts['entry_id'] > 0 ) {
			// There is only one entry visible (no form), remove the book_id.
			delete_post_meta( get_the_ID(), 'gwolle_gb_book_id' );
			return;
		}
	}

	$book_id = 1; // default
	if ( isset($shortcode_atts['book_id']) ) {
		$book_id = $shortcode_atts['book_id'];
	}
	$meta_value_book_id = get_post_meta( get_the_ID(), 'gwolle_gb_book_id', true );
	if ( $meta_value_book_id != $book_id ) {
		update_post_meta( get_the_ID(), 'gwolle_gb_book_id', $book_id );
	}

}
