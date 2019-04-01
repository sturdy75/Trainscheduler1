var config = {
  apiKey: "AIzaSyD1lXF63bW8d20u4ZH8UrsidsTG-4V2bFk",
  authDomain: "test-database-8a767.firebaseapp.com",
  databaseURL: "https://test-database-8a767.firebaseio.com",
  projectId: "test-database-8a767",
  storageBucket: "test-database-8a767.appspot.com",
  messagingSenderId: "1027455045871"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button to add a train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainTime);
  console.log(newTrain.frequency);

  // alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().trainTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  var trainPretty = moment(trainTime, "HH:mm").subtract(1,"years");

  var diffTime = moment().diff(moment(trainPretty), "minutes");

  var timeRemain = diffTime % frequency;
  var tMinAway = frequency - timeRemain;

  var nextTrain = moment().add(tMinAway, "minutes").format ("HH:mm");



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


