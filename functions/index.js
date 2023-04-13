// deleting a function from deployment:
// firebase functions:delete myFunction
const functions = require("firebase-functions");

// Playing around with the "onCreate" function: this example replaces any student's name that's added to the database with "Theresa"
// so: if you deploy this function, then add a student to the database via postman, the student's name will be changed
// the "onCreate" function may be very useful for other things we want implemented in our database

// exports.onStudentAdd= functions.database
// .ref('/students/{studentID}')
// .onCreate((snapshot, context) => {
// 	const curStu = context.params.studentID
// 	const studentVals = snapshot.val() 

// 	return snapshot.ref.update({StudentName: 'Theresa'})
// })


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

  exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
  })
  

exports.checkInStudent = functions.https.onRequest((request, response) => {
	// Get from the request body the student ID and Class ID
  // url would be something like https.{firebase_functions_url}.com/example?sid=900887873&cid=1234
  const studentID = request.query.sid;
  const classID = request.query.cid;

 
	// Generate a key for the "class day":

	const date = getToday(); //Pat wrote this but it is in the ether now
	const key = genClassDayKey(studentID, date);

	// Add studentID to list in class day struct:
	//const today = apiHelpers.apiGetRequest
  	
	//this should add a student to the attendance object
	thisclassDate.attendance = {studentID, date} // Seb
	
	// Update classID in firebase
	functions.update.classDay = thisClass;

	functions.logger.info("Hello logs!", {structuredData: true});
  	response.send("student Checked In... Probably");
})

exports.randomNumber = functions.https.onRequest((request, response) => {
const number = Math.round(Math.random() * 100);
response.send(number.toString());
})

// callable function example
// I think for many of our functions this is the type we want to be using because it allows for client-side to call them
//https://www.youtube.com/watch?v=8mL1VuiL5Kk&list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf&index=5
exports.sayHello = functions.https.onCall((data, context) =>{
return 'hello mid team'
})


function genClassDayKey(studentID, date) {
	return studentID + '_' + date;
}
function getToday(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	
	today = mm + dd + yyyy;
	return today;
	}

