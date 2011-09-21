Les dernière versions, les instructions, les news et tout le restent se trouvent vers là : 
http://www.davel.fr/techblog/2010/06/plugin-jquery-get-facebook-albums-photos/


Voici un petit mode d’emploi en 5 points que vous pouvez réaliser vous même sous la supervision d’un adulte consentant.

1/ Créer l’application facebook.
Ça ressemble un peu à mon article pour installer une fan page personnalisée mais ici il est uniquement nécessaire de renseigner la section « Connect » des paramètres de l’application pour y indiquer l’URL de votre site et le nom de domaine de base (utile si vos utilisateur utilisent votre URL avec ou sans le www).

Et normalement les autres valeurs par défaut devraient être bonnes (elles le sont à l’heure actuelle, je changerai cette partie dans le futur si ça devait changer)


2/ Inclure dans votre code HTML les fichiers javascript et CSS. N’oubliez pas que ce plugin est basé sur jQuery, il faut donc bien penser à le charger.

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
<script src="js/jquery.getfacebookalbums.js" type="text/javascript"></script>



3/ Ajouter dans votre code HTML un conteneur qui va recevoir les données chargées par le plugin.

<div id="albumsContainer"></div>



4/ Enfin, lancer le plugin sur ce conteneur. (pas trop fort bien sur)

$('#albumsContainer').getFacebookAlbums(
									{appId:'VOTRE-APP-ID',
									onImageSelected:function(data){alert(data)},
									autres options...})
Voici les autres options disponibles pour configurer au mieux l’application :

nom					 -> 	fonction																							 	-> 	valeur par défaut
appId*				 -> 	String fournie par Facebook, c’est l’id de l’applciation que vous avez créé pour l’occasion 			-> 	null
onImageSelected		 -> 	Function fonction avec un seul argument qui contiendra l’adresse de l’image choisie par l’utilisateur 	-> 	null
startConnectLabel	 -> 	String label du lien pour se loguer et commencer le chargement des albums 								-> ‘Cliquez-ici pour vous connecter sur votre compte Facebook’
albumsLoadingLabel	 -> 	String message d’attente																				-> ‘chargement des albums’
imagesLoadingLabel	 -> 	String message d’attente																				-> ‘chargement des images’
needAuthorizeLabel	 -> 	String message d’erreur si l’utilisateur n’autorise pas l’application à voir ses photos					-> ‘Vous devez autoriser l’application.’
loadingImage		 -> 	String chemin vers l’image de pré-chargement															-> ‘images/loading.gif’
urlFacebookScript	 -> 	String URL de l’API Javascript de facebook, j’ai mis la version française par défaut.					-> ‘http://connect.facebook.net/fr_FR/all.js’

* Obligatoire !