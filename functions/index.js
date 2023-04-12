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
 
	// Generate a key for the "class day":
	string date = getDate(); //Pat
	string key = classKey(student.ID, date); // Veep

	// Add studentID to list in class day struct:
	classDay thisClass = getClassDay(key); // TG
	thisClass.attendance.add(student.name, timestamp) // Seb
	
	// Update classID in firebase
	functions.update.classDay = thisClass;

	functions.logger.info("Hello logs!", {structuredData: true});
  	response.send("Hello from Firebase!");
})