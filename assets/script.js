  // GLOBAL VARIABLES FOR INPUTS
  var chosenPlaylist = "";
  var mainIngredient = "";
  var cuisine = "";
  var foodRestrictons = "";
  var alcohol = "";
  var drinkIngredient = "";

$(document).ready(function () {

  // Initiallizes "Select" elements in forms
  $(document).ready(function () {
    $('select').material_select();
  });

  console.log("ready");
  // $('.modal').modal('open'); <-- COMMENTED OUT FOR NOW SO THAT THE REST OF JS CAN RUN

  // EVENT LISTENERS FOR ALL FORM INPUTS
  $("#playlistOptions").on("change", function () {
    chosenPlaylist = parseInt($(this).find(":selected").val());
    console.log(chosenPlaylist);
    youtubeCall ();
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


function youtubeCall () {
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
    var playlist1 = Math.floor(Math.random() * youtubeResult.length + 1);
    console.log(playlist1);

    var playlist2 = Math.floor(Math.random() * youtubeResult.length + 1);
    if (playlist1 === playlist2) {
      playlist2 = Math.floor(Math.random() * youtubeResult.length + 1);
    }
    console.log(playlist2);

    var playlist3 = Math.floor(Math.random() * youtubeResult.length + 1);
    if (playlist1 === playlist3 || playlist2 === playlist3) {
      playlist3 = Math.floor(Math.random() * youtubeResult.length + 1);
    }
    console.log(playlist3);

    // VARIABLES FOR PLAYLIST TITLES
    var pOneTitle = youtubeResult[playlist1].snippet.title;
    console.log("Playlist 1: " + youtubeResult[playlist1].snippet.title);

    var pTwoTitle = youtubeResult[playlist2].snippet.title;
    console.log("Playlist 2: " + youtubeResult[playlist2].snippet.title);

    var pThreeTitle = youtubeResult[playlist3].snippet.title;
    console.log("Playlist 3: " + youtubeResult[playlist3].snippet.title);

    // VARIABLES FOR PLAYLIST ID
    var pOneId = youtubeResult[playlist1].id.playlistId;
    console.log("Playlist 1 ID: " + pOneId);

    var pTwoId = youtubeResult[playlist2].id.playlistId;
    console.log("Playlist 2 ID: " + pTwoId);

    var pThreeId = youtubeResult[playlist3].id.playlistId;
    console.log("Playlist 3 ID: " + pThreeId);

    // VARIABLES FOR PLAYLIST DESCRIPTION
    // only pull this if a description exists for that item, otherwise it will cause an error
    var pOneDescription = youtubeResult[playlist1].snippet.description;
    console.log("Playlist 1 Description: " + pOneDescription);

    var pTwoDescription = youtubeResult[playlist2].snippet.description;
    console.log("Playlist 2 Description: " + pTwoDescription);

    var pThreeDescription = youtubeResult[playlist3].snippet.description;
    console.log("Playlist 3 Description: " + pThreeDescription);

    // VARIABLES FOR PLAYLIST PHOTO
    var pOnePhoto = youtubeResult[playlist1].snippet.thumbnails.high.url;
    console.log("Playlist 1 image: " + pOnePhoto);

    var pTwoPhoto = youtubeResult[playlist2].snippet.thumbnails.high.url;
    console.log("Playlist 2 image: " + pTwoPhoto);

    var pThreePhoto = youtubeResult[playlist3].snippet.thumbnails.high.url;
    console.log("Playlist 3 image: " + pThreePhoto);

    // VARIABLES FOR DYNAMIC ELEMENTS NEEDED
    var firstPlaylistTitle = $("<h4>");
    var firstPlaylistDescription = $("<p>");
    var firstPlaylistLink = $("<a>");
    var firstPlaylistImage = $("<img>");

    var secondPlaylistTitle = $("<h4>");
    var secondPlaylistDescription = $("<p>");
    var secondPlaylistLink = $("<a>");
    var secondPlaylistImage = $("<img>");

    var thirdPlaylistTitle = $("<h4>");
    var thirdPlaylistDescription = $("<p>");
    var thirdPlaylistLink = $("<a>");
    var thirdPlaylistImage = $("<img>");

    firstPlaylistTitle.html(pOneTitle);
    firstPlaylistLink.attr("href", "https://www.youtube.com/playlist?list=" + pOneId);
    firstPlaylistLink.attr("target", "blank");
    firstPlaylistLink.html(firstPlaylistTitle);
    $("#playlist1").append(firstPlaylistLink);

    firstPlaylistDescription.text(pOneDescription);
    firstPlaylistDescription.addClass("truncate");
    $("#playlist1").append(firstPlaylistDescription);

    firstPlaylistImage.attr("src", pOnePhoto);
    firstPlaylistImage.addClass("responsive-img center-align");
    $("#playlist1").prepend(firstPlaylistImage);


    secondPlaylistTitle.html(pTwoTitle);
    secondPlaylistLink.attr("href", "https://www.youtube.com/playlist?list=" + pTwoId);
    secondPlaylistLink.attr("target", "blank");
    secondPlaylistLink.html(secondPlaylistTitle);
    $("#playlist2").append(secondPlaylistLink);

    secondPlaylistDescription.text(pTwoDescription);
    secondPlaylistDescription.addClass("truncate");
    $("#playlist2").append(secondPlaylistDescription);

    secondPlaylistImage.attr("src", pTwoPhoto);
    secondPlaylistImage.attr("class", "responsive-img center-align");
    $("#playlist2").prepend(secondPlaylistImage);
  });

}


