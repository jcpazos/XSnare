// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2011 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Html tags
// http://en.wikipedia.org/wiki/html
// ----------------------------------------------------------------------------
// Basic set. Feel free to add more tags
// ----------------------------------------------------------------------------
var marktitup_mySettings = {
	onTab: { keepDefault:false, replaceWith:'    ' },
	markupSet:  [
		{name: gwolle_gb_localize.bold, key:'B', openWith:'(!([b]|!|<b>)!)', closeWith:'(!([/b]|!|</b>)!)' },
		{name: gwolle_gb_localize.italic, key:'I', openWith:'(!([i]|!|<i>)!)', closeWith:'(!([/i]|!|</i>)!)'  },
		{separator:'---------------' },
		{name: gwolle_gb_localize.bullet, openWith:'[li]', closeWith:'[/li]', multiline:true, openBlockWith:'[ul]\n', closeBlockWith:'\n[/ul]'},
		{name: gwolle_gb_localize.numeric, openWith:'[li]', closeWith:'[/li]', multiline:true, openBlockWith:'[ol]\n', closeBlockWith:'\n[/ol]'},
		{separator:'---------------' },
		{name: gwolle_gb_localize.picture, key:'P', replaceWith:'[img][![' + gwolle_gb_localize.source + ':!:http://]!][/img]' },
		{name: gwolle_gb_localize.link, key:'L', openWith:'[url href=[![' + gwolle_gb_localize.link + ':!:http://]!]]', closeWith:'[/url]', placeHolder: gwolle_gb_localize.linktext },
		{separator:'---------------' },
		{name: gwolle_gb_localize.clean, className:'clean', replaceWith:function(markitup) { return markitup.selection.replace(/\[(.*?)\]/g, "") } },
		{separator:'---------------' },
		{name: gwolle_gb_localize.emoji, className:'emoji' }
	]
}


jQuery(document).ready(function() {

	/* Initialize BBcode editor */
	jQuery('#gwolle_gb_content').markItUp(marktitup_mySettings);
	jQuery('#gwolle_gb_admin_reply').markItUp(marktitup_mySettings);


	/* Slide the Emoji rows (frontend, main editor) */
	jQuery( '#markItUpGwolle_gb_content li.markItUpButton.emoji a' ).click(function() {
		if ( jQuery('.gwolle_gb_emoji').css('display') == 'none' ) {
			jQuery('.gwolle_gb_emoji').slideDown("slow");
		} else {
			jQuery('.gwolle_gb_emoji').slideUp("slow");
		}
	});
	/* Slide the Emoji rows (admin_reply editor) */
	jQuery( '#markItUpGwolle_gb_admin_reply li.markItUpButton.emoji a' ).click(function() {
		if ( jQuery('.gwolle_gb_admin_reply_emoji').css('display') == 'none' ) {
			jQuery('.gwolle_gb_admin_reply_emoji').slideDown("slow");
		} else {
			jQuery('.gwolle_gb_admin_reply_emoji').slideUp("slow");
		}
	});


	/* Insert the Emoji symbol (frontend, main editor) */
	jQuery('.gwolle_gb_emoji a').click(function() {
		emoticon = jQuery(this).attr("title");
		jQuery.markItUp( { target:'#gwolle_gb_content', replaceWith:emoticon } );
	});
	/* Insert the Emoji symbol (admin_reply editor) */
	jQuery('.gwolle_gb_admin_reply_emoji a').click(function() {
		emoticon = jQuery(this).attr("title");
		jQuery.markItUp( { target:'#gwolle_gb_admin_reply', replaceWith:emoticon } );
	});
});

