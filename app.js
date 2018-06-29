/* global firebase moment */

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDHrXmp4KT5-oPdvY_xZHXj41E9jO3DxVk",
    authDomain: "train-scheduler-114a1.firebaseapp.com",
    databaseURL: "https://train-scheduler-114a1.firebaseio.com",
    projectId: "train-scheduler-114a1",
    storageBucket: "",
    messagingSenderId: "1012359468539"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "hh:mm a").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  // console.log(trainName);
  // console.log(trainDestination);
  // console.log(trainTime);
  // console.log(trainFrequency);


  var trainTimeFormatted = moment.unix(trainTime).subtract(1, "years").format("hh:mm a");
  console.log(trainTimeFormatted);
  var diffTime = moment().diff(moment([trainTimeFormatted]), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % trainFrequency;
  var minutesAway = trainFrequency - tRemainder;
  var minutes = moment();
  var nextTrain = moment().add(minutesAway, "m").format("hh:mm a");
  console.log(minutesAway);
  console.log(nextTrain);
  console.log(minutes)


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
   + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
});