// GLOBAL VARIABLES FOR INPUTS
var chosenPlaylist = "";
var mainIngredient = "";
var cuisine = "";
var allergies = "";
var allergyArr = []
var diet = "";
var alcohol = "";
var drinkIngredient = "";

// GLOBAL VARIABLES FOR PLAYLIST ARRAY
var firstPlaylist = "";
var secondPlaylist = "";
var thirdPlaylist = "";

// GLOBAL VARIABLES FOR RECIPE ARRAY
var firstRecipe = "";
var secondRecipe = "";
var thirdRecipe = "";

$(document).ready(function () {

  // Initiallizes "Select" elements in forms and modal sequence
    $('select').material_select();

    // MODAL LOGIC:
    // Modal-1 opens on document.ready() with input fields for user name, password, options for sign-up
    // When user clicks "sign up" Modal-2 gets triggered

    $('.modal').modal();
    $('#modal-1').modal('open');

    $("#modal-2-trigger").on("click", function() {
      $('#modal-1').modal('close');
      $('#modal-2').modal('open');
    })

    $("#modal-3-trigger").on("click", function() {
      $('#modal-2').modal('close');
      $('#modal-3').modal('open');
    })

    $("#modal-4-trigger").on("click", function() {
      $('#modal-3').modal('close');
      $('#modal-4').modal('open');
    })

    $("#modal-5-trigger").on("click", function() {
      $('#modal-4').modal('close');
      $('#modal-5').modal('open');
    })

    $("#modal-5-close").on("click", function() {
      $('#modal-5').modal('close');
    })

    

  
  // EVENT LISTENERS FOR ALL FORM INPUTS
  $("#playlistOptions").on("change", function () {
    chosenPlaylist = parseInt($(this).find(":selected").val());
    // youtubeCall();
  });

  $("#mainIngredient").on("change", function () {
    mainIngredient = $("#Food_Main_Ing").val().trim();
    console.log(mainIngredient);
  });

  $("#cuisine").on("change", function () {
    cuisine = $(this).find(":selected").val();
    console.log(cuisine);
  });

  $("#diet").on("change", function () {
    diet = parseInt($(this).find(":selected").val());
    console.log(diet);
  })

  $(":checkbox").on("change", function(){
    if (this.checked) {
      allergies = $(this).attr("id");
      console.log(allergies);
      allergyArr.push(allergies);
      console.log(allergyArr);
    }
    else {
      allergies = $(this).attr("id");
      console.log(allergies);
      for (var i = allergyArr.length - 1; i>=0; i--){
        if (allergyArr[i] === allergies) {
          allergyArr.splice(i, 1);
        }
      }
      console.log(allergyArr);
    }
  });


  $("#Food-Surprise").on("click", function () {
    event.preventDefault();
    console.log("Food Surprise Clicked");
  })

  $("#modal-5-trigger").on("click", function (){
    yummlyRecipeCall();
  })


  $("#alcohol-yes").on("change", function () {
    alcohol = true
    console.log(alcohol);
  })

  $("#alcohol-no").on("change", function () {
    alcohol = false
    console.log(alcohol);
  })

  $("#drinkIngredient").on("change", function () {
    drinkIngredient = $("#Drink_Main_Ing").val().trim();
    console.log(drinkIngredient);
  });

  $("#Drink-Surprise").on("click", function () {
    event.preventDefault();
    console.log("Drink Surprise Clicked");
  })

});


function youtubeCall() {
  // YOUTUBE AJAX CALL
  var playlistURL = ["https://www.googleapis.com/youtube/v3/search?q=casual+playlist&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco", "https://www.googleapis.com/youtube/v3/search?q=apology+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco", "https://www.googleapis.com/youtube/v3/search?q=breakup+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco", "https://www.googleapis.com/youtube/v3/search?q=date+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco", "https://www.googleapis.com/youtube/v3/search?q=friend+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco", "https://www.googleapis.com/youtube/v3/search?q=lonely+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco"];

  // other cat option URL "https://www.googleapis.com/youtube/v3/search?q=cat+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco",
  // romantic URL "https://www.googleapis.com/youtube/v3/search?q=romantic+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco",
  // sexy URL "https://www.googleapis.com/youtube/v3/search?q=sexy+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco",

  $.ajax({
    url: playlistURL[chosenPlaylist],
    method: "GET"
  }).then(function (response) {
    var youtubeResult = response.items

    // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
    var playlist1 = Math.floor(Math.random() * youtubeResult.length);

    var playlist2 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist1 === playlist2) {
      playlist2 = Math.floor(Math.random() * youtubeResult.length);
    }

    var playlist3 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist1 === playlist3 || playlist2 === playlist3) {
      playlist3 = Math.floor(Math.random() * youtubeResult.length);
    }

    // PUT ALL NECESSARY INFORMATION INTO ARRAY OF OBJECTS
    var playlistArr = [
      firstPlaylist = {
        title: youtubeResult[playlist1].snippet.title,
        id: youtubeResult[playlist1].id.playlistId,
        description: youtubeResult[playlist1].snippet.description,
        image: youtubeResult[playlist1].snippet.thumbnails.high.url
      },

      secondPlaylist = {
        title: youtubeResult[playlist2].snippet.title,
        id: youtubeResult[playlist2].id.playlistId,
        description: youtubeResult[playlist2].snippet.description,
        image: youtubeResult[playlist2].snippet.thumbnails.high.url
      },

      thirdPlaylist = {
        title: youtubeResult[playlist3].snippet.title,
        id: youtubeResult[playlist3].id.playlistId,
        description: youtubeResult[playlist3].snippet.description,
        image: youtubeResult[playlist3].snippet.thumbnails.high.url
      }
    ];

    //FOR LOOP TO PUSH THE INFORMATION INTO THE CORRECT AREAS OF THE HTML
    for (var i = 0; i < playlistArr.length; i++) {
      var pTitle = $("<h4>");
      var pDescription = $("<p>");
      var pLink = $("<a>");
      var pImage = $("<img>");

      // LINKING AND CREATING THE TITLE ELEMENT
      pTitle.html(playlistArr[i].title);
      pLink.attr("href", "https://www.youtube.com/playlist?list=" + playlistArr[i].id);
      pLink.attr("target", "blank");
      pLink.html(pTitle);

      // CREATING THE DESCRIPTION ELEMENT
      pDescription.text(playlistArr[i].description);
      pDescription.addClass("truncate");

      // CREATING THE IMAGE ELEMENT
      pImage.attr("src", playlistArr[i].image);
      pImage.addClass("responsive-img center-align");

      // ENSURING THAT THE CORRECT PLAYLIST GOES INTO THE CORRECT PART OF THE CARD IN THE HTML
      if (i === 0) {
        $("#playlist1").append(pLink);
        $("#playlist1").append(pDescription);
        $("#playlist1").prepend(pImage);
      }
      else if (i === 1) {
        $("#playlist2").append(pLink);
        $("#playlist2").append(pDescription);
        $("#playlist2").prepend(pImage);
      }
      else {
        $("#playlist3").append(pLink);
        $("#playlist3").append(pDescription);
        $("#playlist3").prepend(pImage);
      }
    }

  });

}

// AJAX CALL FOR YUMMLY RECIPES
function yummlyRecipeCall (){
var cuisineArr = ["cuisine^cuisine-american", "cuisine^cuisine-mexican", "cuisine^cuisine-asian", "cuisine^cuisine-indian", "cuisine^cuisine-mediterranean", "cuisine^cuisine-italian", ""];
// var allergyArr = ["393^Gluten-Free", "394^Peanut-Free", "395^Tree Nut-Free", "398^Seafood-Free", "396^Dairy-Free", "392^Wheat-Free", ""];
var dietArr= ["387^Lacto-ovo vegetarian", "386^Vegan", "403^Paleo", ""];

var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
var recipeURL = "http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=" + mainIngredient + "&allowedCuisine[]=" + cuisineArr[cuisine] + "&allowedDiet[]=" + dietArr[diet];

// IF AN ALLERGY IS SELECTED RUN THE FOLLOWING FOR LOOP TO INSERT ALL ALLERGIES INTO THE API CALL
if (allergyArr.length>0) {
  var recipeURL = "http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=" + mainIngredient + "&maxResult=25&allowedCuisine[]=" + cuisineArr[cuisine] + "&allowedDiet[]=" + dietArr[diet] + "&allowedAllergy[]=" + allergyArr[allergies];
  for (var i=0; i<allergyArr.length; i++){
    recipeURL.concat(allergyArr[i] = ",");
  }
};

var corsRecipeURL = cors_anywhere_url + recipeURL;
$.ajax({
  url: corsRecipeURL,
  method: "GET"
}).then(function (response){
  console.log(response);
  var recipeResults = response.matches

      // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
      var recipe1 = Math.floor(Math.random() * recipeResults.length);
      console.log(recipe1);

      var recipe2 = Math.floor(Math.random() * recipeResults.length);
      if (recipe1 === recipe2) {
        recipe2 = Math.floor(Math.random() * recipeResults.length);
        console.log(recipe2);
      }
  
      var recipe3 = Math.floor(Math.random() * recipeResults.length);
      if (recipe1 === recipe3 || recipe2 === recipe3) {
        recipe3 = Math.floor(Math.random() * recipeResults.length);
        console.log(recipe3);
      }

      var recipeArr = [
        firstRecipe = {
          name: recipeResults[recipe1].recipeName,
          link: "https://www.yummly.com/#recipe/" + recipeResults[recipe1].id,
          image: recipeResults[recipe1].smallImageUrls[0],
          time: recipeResults[recipe1].totalTimeInSeconds
        },
        secondRecipe = {
          name: recipeResults[recipe2].recipeName,
          link: "https://www.yummly.com/#recipe/" + recipeResults[recipe2].id,
          image: recipeResults[recipe2].smallImageUrls[0],
          time: recipeResults[recipe2].totalTimeInSeconds
        },
        thirdRecipe = {
          name: recipeResults[recipe3].recipeName,
          link: "https://www.yummly.com/#recipe/" + recipeResults[recipe3].id,
          image: recipeResults[recipe3].smallImageUrls[0],
          time: recipeResults[recipe3].totalTimeInSeconds
        }
      ];
      console.log(recipeArr);

          //FOR LOOP TO PUSH THE INFORMATION INTO THE CORRECT AREAS OF THE HTML
    for (var i = 0; i < recipeArr.length; i++) {
      var recipeName = $("<h4>");
      var recipeTime = $("<p>");
      var recipeLink = $("<a>");
      var recipeImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      recipeName.html(recipeArr[i].name);
      recipeLink.attr("href", recipeArr[i].link);
      recipeLink.attr("target", "blank");
      recipeLink.html(recipeName);

      // CREATING THE TIME ELEMENT
      var timeInMinutes = moment.utc(recipeArr[i].time*1000).format("mm");
      console.log(timeInMinutes);
      recipeTime.text("Prep time: " + timeInMinutes + " minutes");

      // CREATING THE IMAGE ELEMENT
      recipeImage.attr("src", recipeArr[i].image);
      recipeImage.addClass("responsive-img left");

      // ENSURING THAT THE CORRECT RECIPE GOES INTO THE CORRECT PART OF THE CARD IN THE HTML
      if (i === 0) {
        $("#recipe1").append(recipeLink);
        $("#recipe1").append(recipeTime);
        $("#recipe1").prepend(recipeImage);
      }
      else if (i === 1) {
        $("#recipe2").append(recipeLink);
        $("#recipe2").append(recipeTime);
        $("#recipe2").prepend(recipeImage);
      }
      else {
        $("#recipe3").append(recipeLink);
        $("#recipe3").append(recipeTime);
        $("#recipe3").prepend(recipeImage);
      }
    }


})
};