/**
 * @projectDescription Load User Facebook Albums and Images with jQuery
 *
 * @version 1.2
 * @authors David Brukarz, Johannes Neumeier
 *	
 * Details on original version, in french, at 
 * http://www.davel.fr/techblog/2010/06/plugin-jquery-get-facebook-albums-photos
 *
 * Released under the MIT licence:
 * http://www.opensource.org/licenses/mit-license.php
 */


(function ($) {

	// namespace object for facebookAlbums plugin
	var fbA = {};

	fbA.albumsData = {};
	fbA.photosData = {};
	fbA.selectedPhoto = -1;
	
    fbA.options = {
        startConnectLabel  : 'Click to connect to Facebook',
        albumsLoadingLabel : 'Loading albums',
        imagesLoadingLabel : 'Loading images',
        needAuthorizeLabel : 'Please grant access to the application',
        pickImageLabel     : 'Pick image',
        loadingImage       : 'images/loading.gif',
        urlFacebookScript  : 'http://connect.facebook.net/en_US/all.js',
        useAlbumCoverImages: true,
        onImageSelected    : null,
        selectLargeImage   : true,
        ignoreEmptyAlbums  : true,
        debug			   : false,
        appId              : null
        // TODO implement 'target' to direct output at specific DOM element
        // TODO implement 'cssNamespace' to allow for customized css selectors
    }

	$.fn.getFacebookAlbums = function (pOptions) {
		
		$.extend(fbA.options, pOptions);

		// fail if there is no appId in options
		if (fbA.options.appId == null) {
			// debug trace
			if (fbA.options.debug) {
				console.log('The AppId is not set');
			}
			return;
		}

		// load fb sdk and init fb-root element if there are none present
		if ($('#fb-root').length === 0) {
			$('body').prepend('<div id="fb-root"></div>');
		}
		if (typeof FB === 'undefined') {
			$.getScript(fbA.options.urlFacebookScript);
		}

		// append plugin mark-up
		$(this).html('<div id="fbListAlbumsContainer"><a href="#">' + 
		  fbA.options.startConnectLabel + '</a></div><div id="fbImagesContainer">' +
		  '</div><div id="fbPhotoSelection"></div>');

		$("#fbListAlbumsContainer a").click(function (event) {
			event.preventDefault();
			fbA.login();
		});
	}
	
	
	/**
	 * log user in to facebook and request access to user_photos scope
	 */
	fbA.login = function () {
		$('#fbListAlbumsContainer').html(fbA.options.albumsLoadingLabel + 
		    '<br><img src="' + fbA.options.loadingImage + '" />');
		FB.init({
			appId: fbA.options.appId,
			cookie: true,
			status: true
        });
		
		FB.login(function (response) {
			if (response.status == 'connected') {
				fbA.getAlbums();
			 } else {
				$('#fbListAlbumsContainer').html(fbA.options.needAuthorizeLabel);
			 }
		 },{scope: 'user_photos'});
	}

	
	/**
	 * get user's albums
	 */
	fbA.getAlbums = function () {
		FB.api('/me/albums', fbA.onAlbumsGot);		
	}	


	/**
	 * process a response to the albums request
	 */
	fbA.onAlbumsGot = function (response) {
		var counter = 0;
		var contentHTML = '<ul>';

		// TODO validate response against errors

		fbA.albumsData = response.data;
		
		// debug trace
		if (fbA.options.debug) {
			console.log(fbA.albumsData);
		}

		for (var i = 0; i < response.data.length; i++) {		    
            var album = response.data[i];

		    if (album.count > 0 || fbA.options.ignoreEmptyAlbums === true) {
    			contentHTML += '<li class="fbAlbum" id="album_' + counter + '">';
    			if (fbA.options.useAlbumCoverImages) {    			               
					contentHTML += '<img src="https://graph.facebook.com/' + 
    			                 album.cover_photo + '/picture" alt="' + 
    			                 album.name + '" />';
    			}
    			contentHTML += album.name + '</li>';
    			counter++;
			}
		}
		contentHTML += '</ul>';
		$('#fbListAlbumsContainer').html(contentHTML);
		$('.fbAlbum').click(fbA.onFBAlbumSelected);
	}
	

	/**
	 * 
	 */
	fbA.onFBAlbumSelected = function () {
		$('#fbImagesContainer').html(fbA.options.imagesLoadingLabel + 
            '<br><img src="' + fbA.options.loadingImage + '">');
		var aid = fbA.albumsData[$(this).attr('id').replace('album_','')].id;
        FB.api(aid + '/photos', fbA.onPhotosGot);
	}

	
	/**
	 * process photos for the selected album
	 */
	fbA.onPhotosGot = function (response) {
		var counter = 0;
		var contentHTML = '';

		// TODO validate response against errors

		fbA.photosData = response.data;

		// debug trace
		if (fbA.options.debug) {
			console.log(fbA.photosData);
		}

		for (var i = 0; i < response.data.length; i++) {
			var photo = response.data[i];
			contentHTML += '<div class="fbBlock" id="image_' + counter + 
			                 '"><img src="' + photo.picture + '"/></div>';
			counter++;
		}
		$('#fbImagesContainer').html(contentHTML);
		$('.fbBlock').click(fbA.onFBPhotoSelected);
	}
	

	/**
	 * process photo select event
	 */
	fbA.onFBPhotoSelected = function () {
		fbA.selectedPhoto = $(this).attr('id').replace('image_','');
		contentHTML = '<p><img src="' + fbA.photosData[$(this).attr('id').replace('image_','')].picture + 
		              '"></p><div id="fbValidatePhoto">' + fbA.options.pickImageLabel + '</div>';
		$('#fbPhotoSelection').html(contentHTML);
		$('#fbValidatePhoto').click(fbA.finishValidatingPhoto);
	}

	
	/**
	 * pass the selected image's url to the listener
	 */
	fbA.finishValidatingPhoto = function () {
		var url = fbA.options.selectLargeImage 
				? fbA.photosData[fbA.selectedPhoto].source
				: fbA.photosData[fbA.selectedPhoto].picture
		fbA.options.onImageSelected(url);
	}

})(jQuery);