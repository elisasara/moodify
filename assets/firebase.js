var config = {
  apiKey: "AIzaSyDwzle5vCr6byqAvvb79GCf55QYeakdGC8",
  authDomain: "moodify-6ca83.firebaseapp.com",
  databaseURL: "https://moodify-6ca83.firebaseio.com",
  projectId: "moodify-6ca83",
  storageBucket: "moodify-6ca83.appspot.com",
  messagingSenderId: "1099465054704"
};

firebase.initializeApp(config);

var database = firebase.database();
var auth = firebase.auth();

// SIGN IN
$(document).on("submit", "#existUser", function (event) {
  event.preventDefault();
  //get credentials from user input.
  var email = $("#email").val().trim();
  var password = $("#password").val();

  firebase.auth().signInWithEmailAndPassword(email, password, ).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // console.log(errorCode);
    // console.log(errorMessage);
    
  });

  var user = firebase.auth().currentUser;
    // console.log(user);
  
  // SIGN UP
  $(document).on("submit", "#newUser", function (event) {
    event.preventDefault();
    //get credentials from user input.
    var newEmail = $("#email_new").val().trim();
    var newPassword = $("#user_password_new").val();

    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword, ).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
     
    });
    var user = firebase.auth().currentUser;
    console.log(user);

    firebase.auth().ref().push({
      email: email,
      newEmail: newEmail,
      password: password,
      newPassword: newPassword,
    });

    firebase.database().ref().push({
      email: email,
      newEmail: newEmail,
      password: password,
      newPassword: newPassword,
      user: user,
      userUID: userUID

    });

    firebase.database().ref().on("child_added", function (childSnapshot) {

    });

    $(document).on("click", "#signout", function(){
      firebase.auth().signOut();  
      console.log("signed out");                  
 })

  })
})
