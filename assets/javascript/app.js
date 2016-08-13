//Variables

//Array to turn titles into posters
var movieList = ["return of the jedi", "amelie", "teen wolf", "titanic", "ghostbusters", "maleficent", "the secret life of walter mitty", "jaws", "the force awakens"];
 
//Firebase variable 
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

