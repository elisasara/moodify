$(document).ready(function () {

  // Initiallizes "Select" elements in forms
  $(document).ready(function () {
    $('select').material_select();
  });

  console.log("ready");
  // $('.modal').modal('open'); <-- COMMENTED OUT FOR NOW SO THAT THE REST OF JS CAN RUN

  // GLOBAL VARIABLES FOR INPUTS
  var chosenPlaylist="";
  var mainIngredient="";
  var cuisine="";
  var foodRestrictons="";
  var alcohol="";
  var drinkIngredient="";

  // EVENT LISTENERS FOR ALL FORM INPUTS
  $("#playlistOptions").on("change", function(){
    chosenPlaylist = $(this).find(":selected").val();
    console.log(chosenPlaylist);
  });

  $("#mainIngredient").on("change", function(){
    mainIngredient = $("#Food_Main_Ing").val().trim();
    console.log(mainIngredient);
  });

  $("#cuisine").on("change", function(){
    cuisine = $(this).find(":selected").val();
    console.log(cuisine);
  });

  $("#restrictions").on("change", function(){
    foodRestrictons = $(this).find(":selected").val();
    console.log(foodRestrictons);
  })

  $("#Food-Surprise").on("click", function(){
    event.preventDefault();
    console.log("Food Surprise Clicked");
  })

  $("#alcohol-yes").on("change", function(){
    alcohol = true
    console.log(alcohol);
  })

  $("#alcohol-no").on("change", function(){
    alcohol = false
    console.log(alcohol);
  })

  $("#drinkIngredient").on("change", function(){
    drinkIngredient = $("#Drink_Main_Ing").val().trim();
    console.log(drinkIngredient);
  });

  $("#Drink-Surprise").on("click", function(){
    event.preventDefault();
    console.log("Drink Surprise Clicked");
  })
  

// YOUTUBE AJAX CALL
var playlistURL = [];
  $.ajax({
    url : "https://www.googleapis.com/youtube/v3/search?q=breakup+songs&maxResults=50&part=snippet&type=playlist&key=AIzaSyB4XTor6ysUMwFdHrCjxMsfe5Ly6dZ5Oco",
    method: "GET"
}).then(function(response){
    console.log(response);
});



  });




