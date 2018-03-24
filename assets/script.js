// GLOBAL VARIABLES FOR INPUTS
var chosenPlaylist = "";
var mainIngredient = "";
var cuisine = "";
var foodRestrictons = "";
var alcohol = "";
var drinkIngredient = "";

// GLOBAL VARIABLES FOR PLAYLIST ARRAY
var firstPlaylist = "";
var secondPlaylist = "";
var thirdPlaylist = "";

$(document).ready(function () {

  // Initiallizes "Select" elements in forms and modal sequence
    $('select').material_select();
    $('.modal').modal();
    $('#modal-1').modal('open');

    // MODAL LOGIC:
    // Modal-1 opens on document.ready() with input fields for user name, password, options for sign-up

  
  // EVENT LISTENERS FOR ALL FORM INPUTS
  $("#playlistOptions").on("change", function () {
    chosenPlaylist = parseInt($(this).find(":selected").val());
    console.log(chosenPlaylist);
    youtubeCall();
  });

  $("#mainIngredient").on("change", function () {
    mainIngredient = $("#Food_Main_Ing").val().trim();
    console.log(mainIngredient);
  });

  $("#cuisine").on("change", function () {
    cuisine = $(this).find(":selected").val();
    console.log(cuisine);
  });

  $("#restrictions").on("change", function () {
    foodRestrictons = $(this).find(":selected").val();
    console.log(foodRestrictons);
  })

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
    console.log(response);
    var youtubeResult = response.items

    // MATH TO CHOOSE RANDOM NUMBERS FOR WHICH INDEX WE ARE GOING TO USE
    var playlist1 = Math.floor(Math.random() * youtubeResult.length);
    console.log(playlist1);

    var playlist2 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist1 === playlist2) {
      playlist2 = Math.floor(Math.random() * youtubeResult.length);
    }
    console.log(playlist2);

    var playlist3 = Math.floor(Math.random() * youtubeResult.length);
    if (playlist1 === playlist3 || playlist2 === playlist3) {
      playlist3 = Math.floor(Math.random() * youtubeResult.length);
    }
    console.log(playlist3);

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

    console.log(playlistArr);

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


