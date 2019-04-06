 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDAtJ6aKRuyI2Rd_X0Ec6miO99q81s8cos",
    authDomain: "plant-watering-schedule.firebaseapp.com",
    databaseURL: "https://plant-watering-schedule.firebaseio.com",
    projectId: "plant-watering-schedule",
    storageBucket: "plant-watering-schedule.appspot.com",
    messagingSenderId: "181471983769"
  };
  firebase.initializeApp(config);

  //saving the firebase database into a database variable
  var database = firebase.database()

  //preparing to add and event listener
  //this button will add the contents of the user input
  var addingPlant = document.getElementById('addBtn')

  addingPlant.addEventListener('click', function(event){
      console.log("i've been clicked!")

    //prevent default doesn't refresh the page
    event.preventDefault()

    var name = document.getElementById("plantName-input").value
    console.log(name)
    var nextWatering = document.getElementById("nextWatering-input").value
    console.log(nextWatering)
    var lastWatering = document.getElementById("lastWatering-input").value
    console.log(lastWatering)
    var frequency = document.getElementById("frequency-input").value
    console.log(frequency)

    //htis functiion adds the input to the database
    database.ref().push({
        //saving these values in firebase under the names on the left of the colon
        Name: name,
        // nextWatering: nextWatering,
        LastWatered: lastWatering,
        Frequency:frequency
    })
  })


  //pulling the values from firebase
  database.ref().on('value', function(snapshot){
    console.log("this is the snapshot" + snapshot.val())
      //add a new row to the table
      //add a new colum for each thing 
// var nameTbDisp = document.getElementById('plantName-table')
$('#plantName-table').text(snapshot.val().name)
$('#lastWatering-table').text(snapshot.val().lastWatering)
$('#frequency-table').text(snapshot.val().frequency)
// $('#nextWatering-table').text(snapshot.val())



  })

   
    //to get the values from the input boxes
    //store them into the firebase database with the .set method

    // then we call them back from datase and display them onto the DOM
        //displaying them in a table
        //ceate rows and table data in javasccript
        //how am i going to start a new row



