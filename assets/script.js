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
  });

}


