# jQuery-GetFacebookAlbum plugin

***

[Original plugin and further instructions in french at](https://www.davel.fr/techblog/2010/06/plugin-jquery-get-facebook-albums-photos/)

***

## Quick use instructions:

### 1. Create the facebook application
Create a facebook app at https://developers.facebook.com/apps/ if you have not done so already. Activate the **Website with Facebook Login** section and enter the website url you will be using the plugin on. Look up the **App ID** and use this in your jquery code when initializing the plugin (see 4.)

### 2. Include javascript and css links to your mark-up
Remember to include a version of jQuery (1.4.2 or higher)
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript"></script>
    <script src="js/jquery.getfacebookalbums.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/jquery.getfacebookalbums.css" />

### 3. Add a container that will hold the plugin dialog for fetching the photos
    <div id="albumsContainer"></div>

### 4. Lastly, throw the plugin on this container.
    $('#albumsContainer').getFacebookAlbums({
        appId: 'YOUR-APP-ID', 
        onImageSelected: function (data) {
            alert (data)
        }
        , ... further options like text strings
    });

#### Options available to configure the application to your needs _(default values in brackets)_: 
* **appId***: String provided by Facebook in your app settings (null)
* onImageSelected: Function with only one argument that returns the address of the image chosen by the user (null)
* startConnectLabel: String label of the bond loguer and to begin the loading of the albums
* albumsLoadingLabel: String message of waiting
* imagesLoadingLabel: String message of waiting
* needAuthorizeLabel: String error message if the user does not authorize the application to see his photographs
* loadingImage: String way towards the image of preloading (images/loading.gif')
* urlFacebookScript: String URL of the API Javascript of facebook (http://connect.facebook.net/en_US/all.js)
* useAlbumCoverImages: Boolean flag to use album cover images or only album labels (true)
* selectLargeImage: Boolean flag if to select the large image source or the small source (true)
* ignoreEmptyAlbums: Boolean flag to leave albums with 0 images unlisted (true)

\* mandatory!