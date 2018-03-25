// GLOBAL VARIABLES FOR INPUTS
var chosenPlaylist = "";
var mainIngredient = "";
var cuisine = "";
var allergies = "";
var allergyArr = []
var diet = "";
var alcohol = true;
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

  $("#modal-2-trigger").on("click", function () {
    $('#modal-1').modal('close');
    $('#modal-2').modal('open');
  })

  $("#modal-3-trigger").on("click", function () {
    $('#modal-2').modal('close');
    $('#modal-3').modal('open');
  })

  $("#modal-4-trigger").on("click", function () {
    $('#modal-3').modal('close');
    $('#modal-4').modal('open');
  })

  $(".modal-3-trigger").on("click", function () {
    $('#modal-1').modal('close');
    $('#modal-2').modal('close');
    $('#modal-3').modal('open')
  })

  $(".modal-4-trigger").on("click", function () {
    $('#modal-3').modal('close');
    $('#modal-4').modal('open');
  })

  $(".modal-5-trigger").on("click", function () {
    $('#modal-4').modal('close');
    $('#modal-5').modal('open');
  })

  $("#modal-5-close").on("click", function () {
    $('#modal-5').modal('close');

  })

  // SLIDERS
  $('.slider').slider();
  $('.slider').slider('pause');
  $('.indicator-item').on('click', function () {
    $('.slider').slider('pause');
  });




  // EVENT LISTENERS FOR ALL FORM INPUTS
  $("#playlistOptions").on("change", function () {
    chosenPlaylist = $(this).find(":selected").val();
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
    diet = $(this).find(":selected").val();
    // diet = parseInt($(this).find(":selected").val());
    console.log(diet);
  })

  $(":checkbox").on("change", function () {
    if (this.checked) {
      allergies = $(this).attr("id");
      console.log(allergies);
      allergyArr.push(allergies);
      console.log(allergyArr);
    }
    else {
      allergies = $(this).attr("id");
      console.log(allergies);
      for (var i = allergyArr.length - 1; i >= 0; i--) {
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

  $("#modal-5-close").on("click", function () {
    event.preventDefault();
    youtubeCall();
    yummlyRecipeCall();
    yummlyDrinksCall();
  })

});


function youtubeCall() {
  // YOUTUBE AJAX CALL

  // other cat option: cat+songs
  // romantic: romantic+songs
  // sexy: sexy+songs

  var playlistURL = "https://www.googleapis.com/youtube/v3/search?q=" + chosenPlaylist + "&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco"
  console.log(playlistURL);

  $.ajax({
    url: playlistURL,
    method: "GET"
  }).then(function (response) {
    var youtubeResult = response.items

    // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
    var playlist1 = Math.floor(Math.random() * youtubeResult.length);
    console.log(playlist1);

    var playlist2 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist2 === playlist1) {
      playlist2 = Math.floor(Math.random() * youtubeResult.length);
    }
    console.log(playlist2);

    var playlist3 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist3 === playlist1 || playlist3 === playlist2) {
      playlist3 = Math.floor(Math.random() * youtubeResult.length);
    }
    console.log(playlist3);

    // PUT ALL NECESSARY INFORMATION INTO ARRAY OF OBJECTS
    var playlistArr = [
      firstPlaylist = {
        title: youtubeResult[playlist1].snippet.title,
        link: "https://www.youtube.com/playlist?list=" + youtubeResult[playlist1].id.playlistId,
        description: youtubeResult[playlist1].snippet.description,
        image: youtubeResult[playlist1].snippet.thumbnails.high.url
      },

      secondPlaylist = {
        title: youtubeResult[playlist2].snippet.title,
        link: "https://www.youtube.com/playlist?list=" + youtubeResult[playlist2].id.playlistId,
        description: youtubeResult[playlist2].snippet.description,
        image: youtubeResult[playlist2].snippet.thumbnails.high.url
      },

      thirdPlaylist = {
        title: youtubeResult[playlist3].snippet.title,
        link: "https://www.youtube.com/playlist?list=" + youtubeResult[playlist3].id.playlistId,
        description: youtubeResult[playlist3].snippet.description,
        image: youtubeResult[playlist3].snippet.thumbnails.high.url
      }
    ];
    console.log(playlistArr);

    //FOR LOOP TO PUSH THE INFORMATION INTO THE CORRECT AREAS OF THE HTML
    for (var i = 0; i < playlistArr.length; i++) {
      var pTitle = $("<h4>");
      var pDescription = $("<p>");
      var pLink = $("<a>");
      var pImage = $("<img>");

      // LINKING AND CREATING THE TITLE ELEMENT
      pTitle.html(playlistArr[i].title);
      pLink.attr("href", playlistArr[i].link);
      pLink.attr("target", "blank");
      pLink.html(pTitle);

      // CREATING THE DESCRIPTION ELEMENT
      pDescription.text(playlistArr[i].description);
      pDescription.addClass("truncate");

      // CREATING THE IMAGE ELEMENT
      pImage.attr("src", playlistArr[i].image);
      pImage.addClass("responsive-img center-align");

      // ENSURING THAT THE CORRECT PLAYLIST GOES INTO THE CORRECT PART OF THE CARD IN THE HTML
      // NG-Pushing playlist description and link to #playlist1-text, #playlist2-text, playlist3-text
      if (i === 0) {
        console.log("ng-test-working");
        $("#playlist1-text").append(pLink);
        $("#playlist1-text").append(pDescription);
        $("#playlist1").prepend(pImage);
      }
      else if (i === 1) {
        console.log("ng-test-working");
        $("#playlist2-text").append(pLink);
        $("#playlist2-text").append(pDescription);
        $("#playlist2").prepend(pImage);
      }
      else {
        console.log("ng-test-working");
        $("#playlist3-text").append(pLink);
        $("#playlist3-text").append(pDescription);
        $("#playlist3").prepend(pImage);
      }
    }

  });

}

// AJAX CALL FOR YUMMLY RECIPES
function yummlyRecipeCall() {

  var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
  var recipeURL = "http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=" + mainIngredient + "&maxResult=25&requirePictures=true&allowedCuisine[]=" + cuisine + "&allowedDiet[]=" + diet;

  // IF AN ALLERGY IS SELECTED RUN THE FOLLOWING FOR LOOP TO INSERT ALL ALLERGIES INTO THE API CALL
  if (allergyArr.length > 0) {
    var recipeURL = "http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=" + mainIngredient + "&maxResult=25&requirePictures=true&allowedCuisine[]=" + cuisine + "&allowedDiet[]=" + diet + "&allowedAllergy[]=" + allergyArr[allergies];
    for (var i = 0; i < allergyArr.length; i++) {
      recipeURL.concat(allergyArr[i] = ",");
    }
  };
  console.log(recipeURL);

  var corsRecipeURL = cors_anywhere_url + recipeURL;

  $.ajax({
    url: corsRecipeURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var recipeResults = response.matches

    // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
    var recipe1 = Math.floor(Math.random() * recipeResults.length);
    console.log(recipe1);

    var recipe2 = Math.floor(Math.random() * recipeResults.length);
    if (recipe2 === recipe1) {
      recipe2 = Math.floor(Math.random() * recipeResults.length);
      console.log(recipe2);
    }

    var recipe3 = Math.floor(Math.random() * recipeResults.length);
    if (recipe3 === recipe1 || recipe3 === recipe2) {
      recipe3 = Math.floor(Math.random() * recipeResults.length);
      console.log(recipe3);
    }

    // ARRAY WITH OBJECTS TO BE DISPLAYED IN CARDS WITH ALL NECESSARY INFORMATION
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
      var timeInMinutes = moment.utc(recipeArr[i].time * 1000).format("mm");
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

// AJAX CALL FOR YUMMLY DRINK RECIPES

function yummlyDrinksCall() {

  // template drink call: http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=&allowedCourse[]=course^course-Beverages&excludedCourse[]=course^course-Cocktails

  var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
  var drinksURL = "http://api.yummly.com/v1/api/recipes?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab&q=" + drinkIngredient + "&maxResult=25&requirePictures=true&allowedCourse[]="

  if (alcohol === false) {
    drinksURL = drinksURL + "course^course-Beverages&excludedCourse[]=course^course-Cocktails"
  }
  else {
    drinksURL = drinksURL + "course^course-Cocktails"
  };
  console.log(drinksURL);

  var corsDrinksURL = cors_anywhere_url + drinksURL;

  $.ajax({
    url: corsDrinksURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var drinkResults = response.matches;

    // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
    var drink1 = Math.floor(Math.random() * drinkResults.length);
    console.log(drink1)

    var drink2 = Math.floor(Math.random() * drinkResults.length);
    if (drink2 === drink1) {
      drink2 = Math.floor(Math.random() * drinkResults.length);
    }
    console.log(drink2);

    var drink3 = Math.floor(Math.random() * drinkResults.length);
    if (drink3 === drink1 || drink3 === drink2) {
      drink3 = Math.floor(Math.random() * drinkResults.length);
    }
    console.log(drink3);

    // ARRAY WITH OBJECTS TO BE DISPLAYED IN CARDS WITH ALL NECESSARY INFORMATION
    var drinksArr = [
      firstDrink = {
        name: drinkResults[drink1].recipeName,
        link: "https://www.yummly.com/#recipe/" + drinkResults[drink1].id,
        image: drinkResults[drink1].smallImageUrls[0],
        ingredients: drinkResults[drink1].ingredients
      },
      secondDrink = {
        name: drinkResults[drink2].recipeName,
        link: "https://www.yummly.com/#recipe/" + drinkResults[drink2].id,
        image: drinkResults[drink2].smallImageUrls[0],
        ingredients: drinkResults[drink2].ingredients
      },
      thirdDrink = {
        name: drinkResults[drink3].recipeName,
        link: "https://www.yummly.com/#recipe/" + drinkResults[drink3].id,
        image: drinkResults[drink3].smallImageUrls[0],
        ingredients: drinkResults[drink3].ingredients
      }
    ];
    console.log(drinksArr);

    //FOR LOOP TO PUSH THE INFORMATION INTO THE CORRECT AREAS OF THE HTML
    for (var i = 0; i < drinksArr.length; i++) {
      var drinkName = $("<h4>");
      var drinkLink = $("<a>");
      var drinkImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      drinkName.html(drinksArr[i].name);
      drinkLink.attr("href", drinksArr[i].link);
      drinkLink.attr("target", "blank");
      drinkLink.html(drinkName);

      // CREATING THE IMAGE ELEMENT
      drinkImage.attr("src", drinksArr[i].image);
      drinkImage.addClass("responsive-img left");

      // ENSURING THAT THE CORRECT RECIPE GOES INTO THE CORRECT PART OF THE CARD IN THE HTML
      if (i === 0) {
        $("#drinks1").append(drinkLink);
        // $("#drinks1").append(ingredientList);
        $("#drinks1").prepend(drinkImage);
      }
      else if (i === 1) {
        $("#drinks2").append(drinkLink);
        // $("#drinks2").append(ingredientList);
        $("#drinks2").prepend(drinkImage);
      }
      else {
        $("#drinks3").append(drinkLink);
        // $("#drinks3").append(ingredientList);
        $("#drinks3").prepend(drinkImage);
      }

      // CREATING THE INGREDIENTS LIST ELEMENT
      for (var j = 0; j < drinksArr[i].ingredients.length; j++) {
        var ingredientList = $("<ul>");
        var ingredients = $("<li>");

        ingredients.text(drinksArr[i].ingredients[j]);
        ingredientList.append(ingredients);
        if (i === 0) {
          $("#drinks1").append(ingredientList);
        }
        else if (i === 1) {
          $("#drinks2").append(ingredientList);
        }
        else {
          $("#drinks3").append(ingredientList);
        }
      }
    }
  })
};

