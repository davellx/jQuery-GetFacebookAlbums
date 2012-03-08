/**
 * @projectDescription Load User Facebook Albums and Images with jQuery
 *
 * @version 1.0
 * @author David Brukarz
 *	
 * Example on http://www.davel.fr/demo/facebook/getFacebookAlbums.html
 * Details, in french, at http://www.davel.fr/techblog/2010/06/plugin-jquery-get-facebook-albums-photos
 * Date : 17/06/2010
 * Copyright ©2010 David Brukarz <http://davel.fr/>
 *
 * Released under the MIT licence:
 * http://www.opensource.org/licenses/mit-license.php
 */


(function($) {

	var sessionVars;
	var albumsData;
	var photosData;
	var selectedPhoto;
	
	var options = {
					startConnectLabel:'Cliquez-ici pour vous connecter sur votre compte Facebook',
					albumsLoadingLabel:'chargement des albums',
					imagesLoadingLabel:'chargement des images',
					needAuthorizeLabel:"Vous devez autoriser l'application.",
					loadingImage:'images/loading.gif',
					urlFacebookScript:'http://connect.facebook.net/fr_FR/all.js',
					onImageSelected:null,
					appId:null
					}
	

	$.fn.getFacebookAlbums = function (pOptions) {
		
		$.extend(options,pOptions);
		
		if(options.appId == null){
			$(this).html("The AppId is not set, try this code : $('#reference').getFacebookAlbums({appId:'YOUR-APP-ID'})");
			return;
		}
		
		$.getScript(options.urlFacebookScript);
		
		$('body').prepend('<div id="fb-root"></div>');
		$(this).html('<div id="fbListAlbumsContainer"><a href="#">'+options.startConnectLabel+'</a></div><div id="fbImagesContainer"></div><div id="fbPhotoSelection"></div>');
		
		$("#fbListAlbumsContainer a").click(function(){
			login();
			return false;
		})
	}
	
	login = function(){
		$('#fbListAlbumsContainer').html( options.albumsLoadingLabel + '<br><img src="'+options.loadingImage+'" />');
		FB.init({
			appId: options.appId,
			cookie : true,
			status: true
		  });
		  
		//FB.getLoginStatus(function(response){console.log(response);});
		
		FB.login(function(response) {
			if(response.status == "connected"){//response.scope && response.scope.indexOf('user_photos') != -1){
				getAlbums();
			 }else{
				$('#fbListAlbumsContainer').html(options.needAuthorizeLabel);
			 }
		 },{scope: 'user_photos'});
	}
	
	getAlbums = function(){
		FB.api(
          {
            method: 'photos.getAlbums'
          },
          onAlbumsGot
        );		
	}	

	onAlbumsGot = function(data){
		var counter = 0;
		var contentHTML = '<ul>';
		albumsData = data;
		for (var i = 0; i < data.length; i++){
			var album = data[i];
			contentHTML += '<li class="fbAlbum" id="album_'+counter+'">'+album.name+'</li>';
			counter++
		}
		contentHTML += '</ul>';
		$('#fbListAlbumsContainer').html(contentHTML);
		$('.fbAlbum').click(onFBAlbumSelected);
	}
	
	onFBAlbumSelected = function (){
		$('#fbImagesContainer').html(options.imagesLoadingLabel+'<br><img src="'+options.loadingImage+'">');
		var aid = albumsData[$(this).attr('id').replace('album_','')].aid;
		FB.api(
          {
            method: 'photos.get',
			aid: aid
          },
          onPhotosGot
        );		
	}
	
	onPhotosGot = function(data){
		var counter = 0;
		var contentHTML = '';
		photosData = data;
		for (var i = 0; i < data.length; i++){
			var photo = data[i];
			contentHTML += '<div class="fbBlock" id="image_'+counter+'"><img src="'+photo.src+'"/></div>';
			counter++
		}
		$('#fbImagesContainer').html(contentHTML);
		$('.fbBlock').click(onFBPhotoSelected);
	}
	
	onFBPhotoSelected = function (){
		// TODO set size
		selectedPhoto = $(this).attr('id').replace('image_','');
		contentHTML = '<p><img src="'+photosData[$(this).attr('id').replace('image_','')].src+'"></p><div id="fbValidatePhoto">Valider</div>';
		$('#fbPhotoSelection').html(contentHTML);
		$('#fbValidatePhoto').click(finishValidatingPhoto);
	}
	
	finishValidatingPhoto = function (){
		options.onImageSelected(photosData[selectedPhoto].src_big);
	}
	
	
})(jQuery);
