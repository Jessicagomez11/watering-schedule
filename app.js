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
    var lastWatering = document.getElementById("lastWatering-input").value
    console.log(lastWatering)
    var frequency = document.getElementById("frequency-input").value
    console.log(frequency)
    var nextWatering= 

    //THIS FUNCTION ADDS THE INPUT TO THE DATABASE
    database.ref().push({
        //saving these values in firebase under the names on the left of the colon
        Name: name,
        LastWatered: lastWatering,
        howOften: frequency,
        // NextWatering: nextWatering,
    })
  })


  //THIS FUNCITON PULLS THE VALUES FROM FIREBASE
  database.ref().on('child_added', function(snapshot){

    const child = snapshot.val();
    console.log("This is the snapshot", child);
     
      makerow(child)
  })

//THIS FUNCTION MAKES THE NEW ROW WITH THE INFO FROM THE USER
  function makerow(child){
    
        var newRow= $('<tr>').append(
        $('<td>').text(child.Name),
         $('<td>').text(child.LastWatered),
         $('<td>').text(child.howOften),
         $('<td>').text(child.NextWatering)
      
         )
         
      $('#infoGoesHere').append(newRow)

  }

   



