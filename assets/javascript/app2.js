//Functions

//Grabs movie's data
var movieSearch = function(){

console.log("In movieSearch");

var storedMovie = '';  

var database = firebase.database();
    
     database.ref("currentmoviePick").on("value", function(snapshot) {

                // Print the initial data to the console.
                console.log(snapshot.val());

                // Log the value of the various properties
                console.log(snapshot.val().moviePick);
                
                storedMovie = snapshot.val().moviePick;

    //API URL with user's movie
    var queryURL = "http://api.myapifilms.com/imdb/idIMDB?title=" + storedMovie + "&token=66a93a66-d0a3-4bcf-b682-329ad22dc9c3";

    console.log(queryURL);
        //Ajax call
        $.ajax({url: queryURL, method: 'GET'})
            //Ajax response
            .done(function(response) {

                console.log(response);

                var image = response.data.movies[0].urlPoster;

                //Create movie object
                var movie = {
                    title: response.data.movies[0].title,
                    year: response.data.movies[0].year,
                    rating: response.data.movies[0].rated,
                    plot: response.data.movies[0].simplePlot,
                    poster: response.data.movies[0].urlPoster,
                    location: response.data.movies[0].filmingLocations.toString(), 
                };

                console.log(movie.location);
                //Push movie properties
                $('#title').append(movie.title);
                $('#year').append(movie.year);
                $('#rating').append(movie.rating);
                $('#plot').append(movie.plot);
                $('#poster').append('<img src =' + movie.poster + '</>');
            
            geoCode(movie.location);
        });
});

   
}
            //David's API call
            // $.ajax({
            //     url: 'https://temp-example.herokuapp.com/locations.html',
            //     type: 'GET',
            //     success: function(data) {
            //         // var htmlText = $(data).find('a');
            //         var htmlText = $(data).find('#filming_locations_content .sodavote > dt > a');
            //         $("#filming_locations_content").append(htmlText);
            //         $.each(htmlText, function(key, value) {
            //             console.log(key + ": " + $(value).text());
            //         });

            //     }
            // });

//Turn movie.location into longitude and latitude
var geoCode = function(location){

var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyBftOH0wF8TmozxEQNEfSFizvuk_LFtk0k";
//Ajax call
    $.ajax({url: geoURL, method: 'GET'})
        //Ajax response
        .done(function(response) {

            console.log(response);

            var lat = response.results[0].geometry.location.lat;
            var long = response.results[0].geometry.location.lng;

            console.log(lat);
            console.log(long);
            
            initMap(long, lat, location);
    });

}
//Create map based on lat and long
var initMap = function(long, lat, location) {

        var myLatLng = { lat: lat, lng: long};

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('googlemap'), {
          center: myLatLng,
          // {lat: lat, lng: long},
          scrollwheel: true,
          zoom: 8
        });

        var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: location
  });

 };
//Page ready
$(document).ready(function() { 

//Calls the function
 movieSearch();
});