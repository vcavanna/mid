// deleting a function from deployment:
// firebase functions:delete myFunction

const functions = require("firebase-functions");
const helpers = require("database-helper-funcs");

// deleting a function from deployment:
// firebase functions:delete myFunction

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


exports.getProfessorAttendanceData = functions.https.onRequest(async (request, response) => { // given a prof id, output the info associated
	let profID = "-NQf4QJOOhET-uwZlmNA"; 
	
	let baseURL = helpers.base(); 
	const baseProfNode = await helpers.get(baseURL.append(baseURL.professors, profID));	

	response.send(baseProfNode); 

})
// async function i(){
// 	let baseURL = helpers.base(); 
// 	let profID = "-NQf4QJOOhET-uwZlmNA";
// 	profID = profID.concat("/classIDs");
// 	let JSON=  { "StudentName": "Se", "rfcCode": 1234567890 } ;
// 	helpers.put(baseURL.append(helpers.base().students, "-NQ7VkOctbQ9k1tdfe2K"), JSON );
// 	//const classthing = await 
// 	}



// Example return value for GetProfAttendance
//{
//     "name":"Robert Hochberg",
//     "classes":[
//         {
//             "class_name":"Introduction to Computer Science",
//             "class_id":"secretly-intro-class-id",
//             "class_days": {
//                 "2023-04-18T13:00:00Z_secretly-intro-class-id": {
//                     "classDate": "2023-04-18T13:00:00Z",
//                     "attendance": {
//                         "Jacob Humble": "2023-04-18T13:05:00Z",
//                         "Andrew Ferguson": "2023-04-18T12:59:00Z"
//                     }
//                 },
//                 "2023-04-20T13:00:00Z_secretly-intro-class-id": {
//                     "classDate": "2023-04-20T13:00:00Z",
//                     "attendance":{
//                         "Jacob Humble": "2023-04-20T13:25:00Z",
//                         "Andrew Ferguson":"2023-04-20T14:20:00Z",
//                         "Theresa Gasser":"2023-04-20T13:00:05Z"
//                     }
//                 }
//             }
//         }
//     ]
// }
async function x(){
	let profID = "-NQf4QJOOhET-uwZlmNA";
	let baseURL = helpers.base(); 
	let classID = "aB2f";
	const baseProfNode = await helpers.get(baseURL.append(baseURL.professors, profID));	

	const classthing = await helpers.get(baseURL.append(baseURL.classes, classID));	
	console.log(classthing);
}
x()