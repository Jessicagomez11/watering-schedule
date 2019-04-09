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


var addingPlant = document.getElementById('addBtn')


addingPlant.addEventListener('click', function (event) {
  console.log("i've been clicked!")

  //prevent default doesn't refresh the page
  event.preventDefault()

  var name = document.getElementById("plantName-input").value
  console.log("plant name: "+name)

  var lastWatering = moment(document.getElementById("lastWatering-input").value).format('LL')
  console.log("last watered on " + lastWatering)

  
  
  var frequency = document.getElementById("frequency-input").value
  console.log("water every "+frequency + " days")

  // moment stuff
  
  var today= moment().format('LL')
  console.log(today)

  var daysSinceLastWatering = moment().diff(moment(lastWatering), 'days')
  console.log(daysSinceLastWatering+ " days since last watering")

  var remainder= daysSinceLastWatering % frequency
  console.log("remainder"+remainder)
  
  var daysTillNextWatering = frequency - remainder
  console.log(daysTillNextWatering)

  var nextWaterDate = moment().add(daysTillNextWatering, 'days')
  console.log(nextWaterDate)


    //THIS FUNCTION ADDS THE INPUT TO THE DATABASE
    database.ref().push({

      //saving these values in firebase under the names on the left of the colon
      Name: name,
      LastWatered: lastWatering,
      howOften: frequency,
      NextWatering: moment(nextWaterDate).format('LL'),
      TimeTillNextWatering: daysTillNextWatering,
      DaysSinceLastWatering: daysSinceLastWatering,
    })

    $(".form").empty()
})


//THIS FUNCITON PULLS THE VALUES FROM FIREBASE
database.ref().on('child_added', function (snapshot) {

  const child = snapshot.val();
  console.log("This is the snapshot", child);

  makerow(child)
})

//THIS FUNCTION MAKES THE NEW ROW WITH THE INFO FROM THE USER
function makerow(child) {

  var newRow = $('<tr>').append(
    $('<td>').text(child.Name),
    $('<td>').text(child.LastWatered),
    $('<td>').text('every '+child.howOften +' days'),
    $('<td>').text(child.NextWatering),
    $('<td>').text(child.TimeTillNextWatering + ' more days'),
  )

  $('#infoGoesHere').append(newRow)

  if (child.TimeTillNextWatering === 3){
   var haveYouWateredToday = confirm("It's time to water the " + child.Name + ".  Have you watered  it today?" )
   if (haveYouWateredToday){
     child.LastWatered.textContent= moment().format('LL')

   }
  }

}
