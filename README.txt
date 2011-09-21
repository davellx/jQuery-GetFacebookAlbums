TRanslated very quickly with BabelFish

Last the versions, the instructions, the news and all remain it are towards there: 
http://www.davel.fr/techblog/2010/06/plugin-jquery-get-facebook-albums-photos/ 

Here small directions for use in 5 points which you can carry out you even under the supervision of an agreeing adult. 


1/ To create the facebook application. 
That resembles a little in my article to install a fan personalized page but here it is only necessary to inform the section “Connect” of the parameters of the application to indicate to it the URL of your site and domain name basic (useful if your user use your URL with or without the www). 
And normally the other default values should be good (they are it at the present time, I will change this part in the future if that were to change) 


2/ To include in your code HTML the files Javascript and CS. 
Do not forget that this plugin is based on jQuery, it is thus necessary well to think of charging it. 

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
<script src="js/jquery.getfacebookalbums.js" type="text/javascript"></script>


3/ To add in your code HTML a container which will receive the data charged by the plugin. 

<div id="albumsContainer"></div>


4/ Lastly, throw the plugin on this container. (not too extremely well on) 
$ (' #albumsContainer').getFacebookAlbums ( {appId: ' YOUR-APP-ID' , onImageSelected: function (data) {alert (data)}, other options…}) 

Here other options available to configure the application as well as possible: 
name	 - > function	 - > default value 
appId*	 - > String provided by Facebook, it is the id application which you created for the occasion - > null 
onImageSelected	 - > Function function with only one argument which will contain the address of the image chosen by the user - > null
startConnectLabel	 - > String label of the bond loguer and to begin the loading of the albums - > Cliquez-ici pour vous connecter sur votre compte Facebook’
albumsLoadingLabel	 - > String message of waiting	 - > ‘chargement des albums’
imagesLoadingLabel	 - > String message of waiting	 - > ‘chargement des images’
needAuthorizeLabel	 - > String error message if the user does not authorize the application to see his photographs	 - > ‘Vous devez autoriser l’application.’
loadingImage	 - > String way towards the image of preloading	 - > `images/loading.gif' 
urlFacebookScript	 - > String URL of the API Javascript of facebook, I put the French version by default.	 - > `http://connect.facebook.net/fr_FR/all.js '

* mandatory!