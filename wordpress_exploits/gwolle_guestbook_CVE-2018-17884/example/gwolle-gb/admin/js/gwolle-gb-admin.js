/*
 * JavaScript for Gwolle Guestbook, WP-Admin.
 */


/*
 * Postbox on every admin page of this plugin.
 */
jQuery(document).ready(function($) {
	jQuery('#gwolle_gb_editor_postbox_preview').addClass('closed');

	jQuery('.gwolle_gb .postbox button.handlediv').click( function() {
		jQuery(jQuery(this).parent().get(0)).toggleClass('closed');
	});
});
jQuery(document).ready(function($) {
	jQuery('.gwolle_gb .postbox h2').click( function() {
		jQuery(jQuery(this).parent().get(0)).toggleClass('closed');
	});
});


/*
 * Entries Page
 */
jQuery(document).ready(function($) {

	jQuery("#gwolle_gb_entries input[name='check-all-top']").change(function() {
		gwolle_gb_toggleCheckboxes($("input[name='check-all-top']").is(":checked"));
	});

	jQuery("#gwolle_gb_entries input[name='check-all-bottom']").change(function() {
		gwolle_gb_toggleCheckboxes($("input[name='check-all-bottom']").is(":checked"));
	});

	// Function to check/uncheck all checkboxes.
	function gwolle_gb_toggleCheckboxes(checkAll_checked) {
		jQuery("input[name^='check-']").attr("checked", checkAll_checked);
	}

});


/*
 * Editor page
 */

/* Edit metadata */
jQuery(document).ready(function($) {
	jQuery('.gwolle_gb_edit_meta').click( function() {
		jQuery('.gwolle_gb_edit_meta_inputs').toggle();
		return false;
	});

	jQuery('.gwolle_gb_cancel_timestamp').click( function() {
		jQuery('.gwolle_gb_edit_meta_inputs').toggle();
		return false;
	});

	jQuery('.gwolle_gb_save_timestamp').click( function() {

		var dd = jQuery("#dd").val();
		var mm = jQuery("#mm").find(":selected").val();
		var yy = jQuery("#yy").val();
		var hh = jQuery("#hh").val();
		var mn = jQuery("#mn").val();

		var gwolle_date = new Date( yy, mm - 1, dd, hh, mn );
		// Calculate offset between UTC and local time, and adjust our time.
		date_offset = gwolle_date.getTimezoneOffset() * -60;
		var timestamp = Math.round( gwolle_date.getTime() / 1000 ) + date_offset;
		jQuery("#gwolle_gb_timestamp").val(timestamp);

		var readable_time = gb_timeconverter( timestamp );
		jQuery( 'span.gb-datetime' ).text( readable_time );

		jQuery('.gwolle_gb_edit_meta_inputs').toggle();
		return false;
	});
});

/* Convert Unix timestamp to readable time. */
function gb_timeconverter( timestamp ) {
	var datetime = new Date( timestamp * 1000 );
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = datetime.getFullYear();
	var month = months[datetime.getMonth()];
	var date = datetime.getDate();
	var hour = datetime.getHours();
	var min = datetime.getMinutes();
	var readable_time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
	return readable_time;
}


/*
 * Settings Page
 */
jQuery(document).ready(function($) {

	/* Select the right tab on the options page */
	jQuery( '.gwolle-nav-tab-wrapper a' ).on('click', function() {
		jQuery( 'form.gwolle_gb_options' ).removeClass( 'active' );
		jQuery( '.gwolle-nav-tab-wrapper a' ).removeClass( 'nav-tab-active' );

		var rel = jQuery( this ).attr('rel');
		jQuery( '.' + rel ).addClass( 'active' );
		jQuery( this ).addClass( 'nav-tab-active' );

		return false;
	});


	/* Checking checkbox will enable the uninstall button */
	jQuery("input#gwolle_gb_uninstall_confirmed").prop("checked", false); // init

	jQuery("input#gwolle_gb_uninstall_confirmed").change(function() {
		var checked = jQuery( "input#gwolle_gb_uninstall_confirmed" ).prop('checked');
		if ( checked == true ) {
			jQuery("#gwolle_gb_uninstall").addClass( 'button-primary' );
			jQuery("#gwolle_gb_uninstall").removeAttr('disabled');
		} else {
			jQuery("#gwolle_gb_uninstall").removeClass( 'button-primary' );
			jQuery("#gwolle_gb_uninstall").attr('disabled', true);
		}
	});

});


/*
 * Import Page
 */
jQuery(document).ready(function($) {

	/* Checking checkbox will enable the submit button for DMS import */
	jQuery("input#gwolle_gb_dmsguestbook").prop("checked", false); // init

	jQuery("input#gwolle_gb_dmsguestbook").change(function() {
		var checked = jQuery( "input#gwolle_gb_dmsguestbook" ).prop('checked');
		if ( checked == true ) {
			jQuery("#start_import_dms").addClass( 'button-primary' );
			jQuery("#start_import_dms").removeAttr('disabled');
		} else {
			jQuery("#start_import_dms").removeClass( 'button-primary' );
			jQuery("#start_import_dms").attr('disabled', true);
		}
	});


	/* Checking radio-buttons will enable the submit button for Gwolle import */
	jQuery("input#gwolle_gb_importfrom").prop("checked", false); // init

	jQuery("input#gwolle_gb_importfrom").change(function() {
		if ( jQuery(this).val() ) {
			jQuery("#start_import_wp").addClass( 'button-primary' );
			jQuery("#start_import_wp").removeAttr('disabled');
		} else {
			jQuery("#start_import_wp").removeClass( 'button-primary' );
			jQuery("#start_import_wp").attr('disabled', true);
		}
	});


	/* Checking checkbox will enable the submit button for CSV-file */
	jQuery("input#start_import_gwolle_file").change(function() {
		if ( jQuery(this).val() ) {
			jQuery("#start_import_gwolle").addClass( 'button-primary' );
			jQuery("#start_import_gwolle").removeAttr('disabled');
		} else {
			jQuery("#start_import_gwolle").removeClass( 'button-primary' );
			jQuery("#start_import_gwolle").attr('disabled', true);
		}
	});

});


/*
 * Export Page for all entries.
 */
jQuery(document).ready(function($) {

	/* Checking checkbox will enable the submit button */
	jQuery("input#start_export_enable").prop("checked", false); // init
	jQuery("#gwolle_gb_export_part").val( 1 ); // init

	jQuery("input#start_export_enable").change(function() {
		var checked = jQuery( "input#start_export_enable" ).prop('checked');
		if ( checked == true ) {
			jQuery("#gwolle_gb_start_export").addClass( 'button-primary' );
			jQuery("#gwolle_gb_start_export").removeAttr('disabled');
		} else {
			jQuery("#gwolle_gb_start_export").removeClass( 'button-primary' );
			jQuery("#gwolle_gb_start_export").attr('disabled', true);
		}
	});


	/* Click Event, submit the form through AJAX and receive a CSV-file.
	 * Will request multi part files, every 5 seconds to be easy on the webserver.
	 */
	jQuery( 'input#gwolle_gb_start_export' ).click(function(event) {

		if ( jQuery("#gwolle_gb_start_export").attr('disabled') ) {
			// Not sure if this block is needed... Just in case.
			return;
		}

		// Reset for to initial state.
		jQuery( "#gwolle_gb_start_export" ).removeClass( 'button-primary' );
		jQuery( "#gwolle_gb_start_export" ).attr( 'disabled', true );
		jQuery( "input#start_export_enable" ).prop( 'checked', false );
		// Show that we are busy.
		jQuery( ".gwolle_gb_export_gif" ).css( 'visibility', 'visible' );

		var parts = parseFloat( jQuery("#gwolle_gb_export_parts").val() );

		for ( var part = 1; part < (parts + 1); part++ ) {
			var timeout = (part - 1) * 3000;
			gwolle_gb_export_part( part, timeout );
		}

		setTimeout(
			function() {
				jQuery( ".gwolle_gb_export_gif" ).css( 'visibility', 'hidden' );
			}, ( (part - 1)  * 3000 )
		);

		event.preventDefault();
	});

	/* Do the Submit Event. */
	function gwolle_gb_export_part( part, timeout ) {
		setTimeout(
			function() {
				jQuery("#gwolle_gb_export_part").val( part );
				var form = jQuery('form#gwolle_gb_export');
				form.submit();
			}, ( timeout )
		);
	}

});


/*
 * Export Page for user ID / Email.
 */
jQuery(document).ready(function($) {

	/* Checking checkbox will enable the submit button */
	jQuery("input#start_export_user_enable").prop("checked", false); // init

	jQuery("input#start_export_user_enable").change(function() {
		var checked = jQuery( "input#start_export_user_enable" ).prop('checked');
		if ( checked == true ) {
			jQuery("#gwolle_gb_start_export_user").addClass( 'button-primary' );
			jQuery("#gwolle_gb_start_export_user").removeAttr('disabled');
		} else {
			jQuery("#gwolle_gb_start_export_user").removeClass( 'button-primary' );
			jQuery("#gwolle_gb_start_export_user").attr('disabled', true);
		}
	});


	/* Click Event, submit the form through AJAX and receive a CSV-file.
	 * Will request multi part files, every 5 seconds to be easy on the webserver.
	 */
	jQuery( 'input#gwolle_gb_start_export_user' ).click(function(event) {

		if ( jQuery("#gwolle_gb_start_export_user").attr('disabled') ) {
			// Not sure if this block is needed... Just in case.
			return;
		}

		var form = jQuery('form#gwolle_gb_export_user');
		form.submit();

		// Reset for to initial state.
		jQuery( "#gwolle_gb_start_export_user" ).removeClass( 'button-primary' );
		jQuery( "#gwolle_gb_start_export_user" ).attr( 'disabled', true );
		jQuery( "input#start_export_user_enable" ).prop( 'checked', false );

		event.preventDefault();
	});

});
