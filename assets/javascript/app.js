//Variables

var movieList = ["return of the jedi", "amelie", "teen wolf", "titanic", "ghostbusters", "maleficent", "the secret life of walter mitty", "jaws", "the force awakens"];
 
var database = firebase.database();

//Functions

//Populate movie posters
var posterMaker = function() {

	for (i = 0; i < movieList.length; i++){

		//Create img tag    
        var movieImage = $('<img>');

        //Attribute source
        movieImage.attr("src", 'assets/images/' + movieList[i] + '.jpg');

       	//Attribute name
        movieImage.attr("data-image", movieList[i]);

        //Adds frontPoster class
        movieImage.addClass("frontPoster");

        //Append to div
		$('#movie-posters').append(movieImage);

	}

};

//Submit button clicked
 $('.btn').on('click', function() {

 	//Take user input 
	var moviePick = $('#search').val().split(' ').join('+'); 

	//Store moviePick in localStorage

	// localStorage.setItem('movie', moviePick);
	
	//Store moviePick in Firebase
	var database = firebase.database();
    database.ref("currentmoviePick").set({moviePick});

	//Store moviePick in Firebase
	database.ref('movie').set({
		moviename: moviePick
	});
 	//Go to movie.html
 	window.open("movie.html", "_self");



});

//Page ready
$(document).ready(function() { 

//Make posters
posterMaker(); 

	//User clicks movie poster
	$(document).on('click', '.frontPoster', function() {

		console.log("Clicked");

		//Take user input 
		var moviePick = $(this).data('image').split(' ').join('+');

		//Store moviePick in Firebase
		var database = firebase.database();
	    database.ref("currentmoviePick").set({moviePick});

		console.log(moviePick);

		//Go to movie.html
	 	window.open("movie.html", "_self");

	});

});

// //Search by movie
// var movieSearch = function(moviePick){

// 	console.log("In movieSearch");

// 	//Retrieve movePick from localStorage
// 	var storedMovie = localStorage.getItem('movie');
	
// 	console.log(storedMovie);

// 	//API URL with user's movie
// 	var queryURL = "http://api.myapifilms.com/imdb/idIMDB?title=" + storedMovie + "&token=66a93a66-d0a3-4bcf-b682-329ad22dc9c3";

// 	//Ajax call
// 	$.ajax({url: queryURL, method: 'GET'})
// 		//Ajax response
// 		.done(function(response) {

// 			console.log(response);

// 			//Create movie object
// 			var movie = {
// 				title: response.data.movies[0].title,
// 				year: response.data.movies[0].year,
// 				rating: response.data.movies[0].rated,
// 				plot: response.data.movies[0].simplePlot,
// 				poster: response.data.movies[0].urlPoster,
// 				location: response.data.movies[0].filmingLocations.toString(), 
// 			};

// 			console.log(movie.location);
// 			//Push movie properties
// 			//movie.title
// 			//movie.year
// 			//movie.rating
// 			//movie.plot
// 			//movie.poster
// 			//movie.location
		
// 		//geoCode(movie.location);
// 	});
// }

//             $.ajax({
//                 url: 'https://temp-example.herokuapp.com/locations.html',
//                 type: 'GET',
//                 success: function(data) {
//                     // var htmlText = $(data).find('a');
//                     var htmlText = $(data).find('#filming_locations_content .sodavote > dt > a');
//                     $("#filming_locations_content").append(htmlText);
//                     $.each(htmlText, function(key, value) {
//                         console.log(key + ": " + $(value).text());
//                     });

//                 }
//             });

// //Turn movie.location into longitude and latitude
// var geoCode = function(location){

// var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyBftOH0wF8TmozxEQNEfSFizvuk_LFtk0k";
// //Ajax call
// 	$.ajax({url: geoURL, method: 'GET'})
// 		//Ajax response
// 		.done(function(response) {

// 			console.log(response);

// 			var lat = response.results[0].geometry.location.lat;
// 			var long = response.results[0].geometry.location.lng;

// 			console.log(lat);
// 			console.log(long);
			
// 			initMap(long, lat);
// 	});

// }
// //Create map based on lat and long
// var initMap = function(long, lat) {
//         // Create a map object and specify the DOM element for display.
//         var map = new google.maps.Map(document.getElementById('googlemap'), {
//           center: {lat: lat, lng: long},
//           scrollwheel: true,
//           zoom: 8
//  		});
//  };

// // // 2. This code loads the IFrame Player API code asynchronously.
// //       var tag = document.createElement('script');

// //       tag.src = "https://www.youtube.com/iframe_api";
// //       var firstScriptTag = document.getElementsByTagName('script')[0];
// //       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// //       // 3. This function creates an <iframe> (and YouTube player)
// //       //    after the API code downloads.
// //       var player;
// //       function onYouTubeIframeAPIReady() {
// //         player = new YT.Player('player', {
// //           height: '390',
// //           width: '640',
// //           videoId: 'M7lc1UVf-VE',
// //           events: {
// //             'onReady': onPlayerReady,
// //             'onStateChange': onPlayerStateChange
// //           }
// //         });
// //       }

// //       // 4. The API will call this function when the video player is ready.
// //       function onPlayerReady(event) {
// //         event.target.playVideo();
// //       }

// //       // 5. The API calls this function when the player's state changes.
// //       //    The function indicates that when playing a video (state=1),
// //       //    the player should play for six seconds and then stop.
// //       var done = false;

// //       function onPlayerStateChange(event) {
// //         if (event.data == YT.PlayerState.PLAYING && !done) {
// //           setTimeout(stopVideo, 6000);
// //           done = true;
// //         }
// //       }
// //       function stopVideo() {
// //         player.stopVideo();
// //       };


// // var testSearch = function(){
// // 	var locationPick = "England".split(' ').join('+');
// // 	var queryURL = "http://www.omdbapi.com/?s=star+wars";

// // 		$.ajax({url: queryURL, method: 'GET'})
		
// // 			.done(function(response) {

// // 			console.log(response);
			
// // 		});
// // };



// //Map API: AIzaSyBftOH0wF8TmozxEQNEfSFizvuk_LFtk0k

// //Call search functions
// // locationSearch();
// //zmovieSearch();
// //testSearch();
// //object { "Guatemala":[], "Brazil": []   }
// //data.movies[0].filmingLocations[1]

// //var places = { "Guatemala": ["star wars", "batman"] };

// //data.movies[0].filmingLocations[1]   //Guatemala

// //if object key contains Guatemala skip and just add originalTitle to its array
// //if object key doesn't contain Guatemala (and initialize as array object), add it as a key and at originalTitle to its array



// //if Guatamal  ( txtbox.val() if that is in places object(any of the keys) then print out that array)



// //"Page one" (index) functions
// //onClick to submit 
// 	//get .val() input
// 	//Ajax call

// //"Page two" (list) functions
// //Push movie titles to a "well"
// //Display locationPic
// //onClick to select moviePick
// 	//Ajax call

// //"Page three" (movie) functions
// //Push poster and trailer variables to a div
// //Get poster


// //Display locationPic

// //www.omdbapi.com/?s=star+wars

// //http://www.imdb.com/xml/find?q=starwars


// // //Search by location
// // var locationSearch = function(){
// // 	var locationPick = "England".split(' ').join('+');
// // 	var queryURL = "http://api.myapifilms.com/imdb/idIMDB?title=batman&token=66a93a66-d0a3-4bcf-b682-329ad22dc9c3";

// // 		$.ajax({url: queryURL, method: 'GET'})
		
// // 			.done(function(response) {

// // 			locationCheck(response, locationPick);
			
// // 		});
// // };
// // var locationCheck = function(response, locationPick) {

// // 	console.log(response);

// // 	for(i = 0; i < response.data.movies[0].filmingLocations.length; i++){


// // 		if (locationPick.indexOf(response.data.movies[0].filmingLocations[i])){


			
// // 		}
// // 		else {
			
// // 			movieList.push(response.data.movies[0].title);
// // 			console.log(movieList);
// // 		}
// // 	}


// // }
