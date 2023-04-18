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


exports.checkInStudent = functions.https.onRequest((request, response) => {
	// Get from the request body the student ID and Class ID
	// url would be something like https.{firebase_functions_url}.com/example?sid=900887873&cid=1234
	const studentID = request.query.sid;
	const classID = request.query.cid;


	// Generate a key for the "class day":

	var date = getDateTime(); //Patrick. Returns dat in MMDDYYYY format
	var key = genClassDayKey(student.ID, date); // Veep

	// Add studentID to list in class day struct:
	//const today = apiHelpers.apiGetRequest

	//this should add a student to the attendance object
	thisclassDate.attendance = { studentID, date } // Seb

	// Update classID in firebase
	functions.update.classDay = thisClass;

	functions.logger.info("Hello logs!", { structuredData: true });
	response.send("student Checked In... Probably");
})



// callable function example
// I think for many of our functions this is the type we want to be using because it allows for client-side to call them
//https://www.youtube.com/watch?v=8mL1VuiL5Kk&list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf&index=5


exports.classCheckin = functions.https.onRequest((request, response) => {
	const text = {"aB2f":{"classDates":[4112023],"name":"Intro","students":[900887583]}};
	const classID = getDateTime() + "_" + getClassKey(text);
	//document.write(classID);
	response.send(classID);
})

function genClassDayKey(studentID, date) {
	return studentID + '_' + getDateTime();
}
// helper function to turn JSON into a string array
function getClassKey(text, obj) {
	const newObj = Object.keys(text)[0];
	return newObj;
}

function getDateTime() {

	var date = new Date();
	return date.toISOString();
}

