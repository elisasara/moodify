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

// GLOBAL VARIABLES FOR DRINK ARRAY
var firstDrink = "";
var secondDrink = "";
var thirdDrink = "";

$(document).ready(function () {

  // on page load, divs are hidden 

  // Initiallizes "Select" elements in forms and modal sequence
  $('select').material_select();

  // MODAL LOGIC:
  // Modal-1 opens on document.ready() with input fields for user name, password, options for sign-up
  // When user clicks "sign up" Modal-2 gets triggered

  $('.modal').modal({
    dismissible: false,
    opacity: .2
    
  });
  $('#modal-1').modal('open');

  $("#modal-2-trigger").on("click", function () {
    $('#modal-1').modal('close');
    $('#modal-2').modal('open');
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
    var ingredientOptions = ["chicken", "steak", "beef", "fish", "seafood", "pasta", "pizza", "vegetables"];
    var foodMath = Math.floor(Math.random() * ingredientOptions.length);
    console.log(foodMath);
    mainIngredient = ingredientOptions[foodMath];
    console.log(mainIngredient);
    console.log("Food Surprise Clicked");
    // needs to go to next modal after this clicked!
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
    var drinkOptions = ["vodka", "gin", "tequila", "wine", "rum", "lemonade", "tea", "juice"];
    var drinkMath = Math.floor(Math.random() * drinkOptions.length);
    console.log(drinkMath);
    drinkIngredient = drinkOptions[drinkMath];
    console.log(drinkIngredient);
    console.log("Drink Surprise Clicked");
    // needs to go to next modal after this clicked!
  })

  $("#modal-5-close").on("click", function () {
    event.preventDefault();
    $(".main").removeClass("hide");
    $("#header").removeClass("hide");
    $("body").removeClass("load-background")
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
      var pTitle = $("<h3>");
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
        $("#playlist1-text").append(pLink);
        $("#playlist1-text").append(pDescription);
        $("#playlist1").prepend(pImage);
      }
      else if (i === 1) {
        $("#playlist2-text").append(pLink);
        $("#playlist2-text").append(pDescription);
        $("#playlist2").prepend(pImage);
      }
      else {
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

  var corsRecipeURL = cors_anywhere_url + recipeURL;

  // AJAX CALL TO GET RECIPES THAT FIT ALL CRITERIA
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

    // GRAB THE RECIPE IDS FOR EACH ONE
    var recipe1Id = recipeResults[recipe1].id;
    console.log(recipe1Id);
    var recipe2Id = recipeResults[recipe2].id;
    console.log(recipe2Id);
    var recipe3Id = recipeResults[recipe3].id;
    console.log(recipe3Id);

    // URLS FOR AJAX CALL FOR MORE INFO ON EACH RECIPE
    var recipe1URL = "http://api.yummly.com/v1/api/recipe/" + recipe1Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";
    var recipe2URL = "http://api.yummly.com/v1/api/recipe/" + recipe2Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";
    var recipe3URL = "http://api.yummly.com/v1/api/recipe/" + recipe3Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";

    // RECIPE 1 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + recipe1URL,
      method: "GET"
    }).then(function (response) {
      var recipe1Result = response;
      console.log(response);
      firstRecipe = {
        name: recipe1Result.name,
        link: recipe1Result.attribution.url,
        image: recipe1Result.images[0].hostedLargeUrl,
        time: recipe1Result.totalTimeInSeconds
      };
      console.log(firstRecipe);

      var recipeName = $("<h4>");
      var recipeTime = $("<p>");
      var recipeLink = $("<a>");
      var recipeImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      recipeName.html(firstRecipe.name);
      recipeLink.attr("href", firstRecipe.link);
      recipeLink.attr("target", "blank");
      recipeLink.html(recipeName);

      $("#recipe1-text").append(recipeLink);

      // CREATING THE TIME ELEMENT
      var timeInMinutes = firstRecipe.time / 60;
      console.log(timeInMinutes);
      recipeTime.text("Prep time: " + timeInMinutes + " minutes");
      $("#recipe1-text").append(recipeTime);

      // // CREATING THE IMAGE ELEMENT
      recipeImage.attr("src", firstRecipe.image);
      recipeImage.addClass("responsive-img");
      $("#recipe1").prepend(recipeImage);
    });

    // RECIPE 2 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + recipe2URL,
      method: "GET"
    }).then(function (response) {
      var recipe2Result = response
      console.log(response);
      secondRecipe = {
        name: recipe2Result.name,
        link: recipe2Result.attribution.url,
        image: recipe2Result.images[0].hostedLargeUrl,
        time: recipe2Result.totalTimeInSeconds
      };
      console.log(secondRecipe);


      var recipeName = $("<h4>");

      var recipeTime = $("<p>");
      var recipeLink = $("<a>");
      var recipeImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      recipeName.html(secondRecipe.name);
      recipeLink.attr("href", secondRecipe.link);
      recipeLink.attr("target", "blank");
      recipeLink.html(recipeName);

      $("#recipe2-text").append(recipeLink);

      // CREATING THE TIME ELEMENT
      var timeInMinutes = secondRecipe.time / 60;
      console.log(timeInMinutes);
      recipeTime.text("Prep time: " + timeInMinutes + " minutes");
      $("#recipe2-text").append(recipeTime);

      // // CREATING THE IMAGE ELEMENT
      recipeImage.attr("src", secondRecipe.image);
      recipeImage.addClass("responsive-img");
      $("#recipe2").prepend(recipeImage);
    });

    // RECIPE 3 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + recipe3URL,
      method: "GET"
    }).then(function (response) {
      var recipe3Result = response
      console.log(response);
      thirdRecipe = {
        name: recipe3Result.name,
        link: recipe3Result.attribution.url,
        image: recipe3Result.images[0].hostedLargeUrl,
        time: recipe3Result.totalTimeInSeconds
      };
      console.log(thirdRecipe);

      var recipeName = $("<h4>");
      var recipeTime = $("<p>");
      var recipeLink = $("<a>");
      var recipeImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      recipeName.html(thirdRecipe.name);
      recipeLink.attr("href", thirdRecipe.link);
      recipeLink.attr("target", "blank");
      recipeLink.html(recipeName);

      $("#recipe3-text").append(recipeLink);

      // CREATING THE TIME ELEMENT
      var timeInMinutes = thirdRecipe.time / 60;
      console.log(timeInMinutes);
      recipeTime.text("Prep time: " + timeInMinutes + " minutes");
      $("#recipe3-text").append(recipeTime);

      // // CREATING THE IMAGE ELEMENT
      recipeImage.attr("src", thirdRecipe.image);
      recipeImage.addClass("responsive-img");
      $("#recipe3").prepend(recipeImage);
    });

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

    // GRAB THE DRINK IDS FOR EACH ONE
    var drink1Id = drinkResults[drink1].id;
    var drink2Id = drinkResults[drink2].id;
    var drink3Id = drinkResults[drink3].id;

    // URLS FOR AJAX CALL FOR MORE INFO ON EACH DRINK
    var drink1URL = "http://api.yummly.com/v1/api/recipe/" + drink1Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";
    var drink2URL = "http://api.yummly.com/v1/api/recipe/" + drink2Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";
    var drink3URL = "http://api.yummly.com/v1/api/recipe/" + drink3Id + "?_app_id=9e74b819&_app_key=b87669ce79a8dc3323432bf6424282ab";

    // DRINK 1 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + drink1URL,
      method: "GET"
    }).then(function (response) {
      var drink1Result = response;
      firstDrink = {
        name: drink1Result.name,
        link: drink1Result.attribution.url,
        image: drink1Result.images[0].hostedLargeUrl,
        ingredients: drink1Result.ingredientLines
      };


      var drinkName = $("<h4>");

      var drinkLink = $("<a>");
      var drinkImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      drinkName.html(firstDrink.name);
      drinkLink.attr("href", firstDrink.link);
      drinkLink.attr("target", "blank");
      drinkLink.html(drinkName);
      $("#drinks1-text").append(drinkLink);

      // CREATING THE IMAGE ELEMENT
      drinkImage.attr("src", firstDrink.image);
      drinkImage.addClass("responsive-img");
      $("#drinks1").prepend(drinkImage);


      // CREATING THE INGREDIENTS LIST ELEMENT
      for (var i = 0; i < firstDrink.ingredients.length; i++) {
        var ingredientList = $("<ul>");
        var ingredients = $("<li>");

        ingredients.text(firstDrink.ingredients[i]);
        ingredientList.append(ingredients);
        $("#drinks1-text").append(ingredientList);

      }
    })

    // DRINK 2 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + drink2URL,
      method: "GET"
    }).then(function (response) {
      var drink2Result = response;
      secondDrink = {
        name: drink2Result.name,
        link: drink2Result.attribution.url,
        image: drink2Result.images[0].hostedLargeUrl,
        ingredients: drink2Result.ingredientLines
      };

      var drinkName = $("<h4>");
      var drinkLink = $("<a>");
      var drinkImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      drinkName.html(secondDrink.name);
      drinkLink.attr("href", secondDrink.link);
      drinkLink.attr("target", "blank");
      drinkLink.html(drinkName);
      $("#drinks2-text").append(drinkLink);

      // CREATING THE IMAGE ELEMENT
      drinkImage.attr("src", secondDrink.image);
      drinkImage.addClass("responsive-img");
      $("#drinks2").prepend(drinkImage);

      // CREATING THE INGREDIENTS LIST ELEMENT
      for (var i = 0; i < secondDrink.ingredients.length; i++) {
        var ingredientList = $("<ul>");
        var ingredients = $("<li>");

        ingredients.text(secondDrink.ingredients[i]);
        ingredientList.append(ingredients);
        $("#drinks2-text").append(ingredientList);
      }
    });

    // DRINK 3 AJAX CALL
    $.ajax({
      url: cors_anywhere_url + drink3URL,
      method: "GET"
    }).then(function (response) {
      var drink3Result = response;
      thirdDrink = {
        name: drink3Result.name,
        link: drink3Result.attribution.url,
        image: drink3Result.images[0].hostedLargeUrl,
        ingredients: drink3Result.ingredientLines
      };

      var drinkName = $("<h4>");
      var drinkLink = $("<a>");
      var drinkImage = $("<img>");

      // LINKING AND CREATING THE NAME ELEMENT
      drinkName.html(thirdDrink.name);
      drinkLink.attr("href", thirdDrink.link);
      drinkLink.attr("target", "blank");
      drinkLink.html(drinkName);
      $("#drinks3-text").append(drinkLink);

      // CREATING THE IMAGE ELEMENT
      drinkImage.attr("src", thirdDrink.image);
      drinkImage.addClass("responsive-img");
      $("#drinks3").prepend(drinkImage);

      // CREATING THE INGREDIENTS LIST ELEMENT
      for (var i = 0; i < thirdDrink.ingredients.length; i++) {
        var ingredientList = $("<ul>");
        var ingredients = $("<li>");

        ingredients.text(thirdDrink.ingredients[i]);
        ingredientList.append(ingredients);
        $("#drinks3-text").append(ingredientList);
      };
    })
  })
};

