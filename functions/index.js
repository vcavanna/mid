// deleting a function from deployment:
// firebase functions:delete myFunction

const functions = require("firebase-functions");
const helpers = require("./database-helper-funcs/base-requests.js");

//see ISO-8601 for date time use this for 

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
	const today = apiHelpers.apiGetRequest
  
	thisclassDate.attendance = {studentID, date} // Seb
	
	// Update classID in firebase
	functions.update.classDay = thisClass;

	functions.logger.info("Hello logs!", {structuredData: true});
  	response.send("student Checked In... Probably");
})


// callable function example
// I think for many of our functions this is the type we want to be using because it allows for client-side to call them
//https://www.youtube.com/watch?v=8mL1VuiL5Kk&list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf&index=5


function genClassDayKey(studentID, date) {
	return studentID + '_' + date;


}
function getToday(){
	var today = new Date(); //use function today.toISOString()
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	
	today = mm + dd + yyyy;
	return today;
}

async function getClassDay(key){ // is given a class key: example usage: //getClassDay("04112023_aB2f");
	let key_JSON= await helpers.get(helpers.base().append(helpers.base().class_days, key)); // gets the node associated with classdays
	console.log(key_JSON);
	return key_JSON;
}