// deleting a function from deployment:
// firebase functions:delete myFunction

const functions = require("firebase-functions");
const helpers = require("database-helper-funcs");


const baseURL = helpers.base();
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

async function classCheckinTest() {


	const text = "6a407";
	//const baseURL = helpers.base();
	const IDs = await helpers.get(baseURL.append(baseURL.professors, text));
	const classInfo = Object.values(IDs.classIDs);
	const classCheck = getDateTime().slice(0,10) + "_" + classInfo;
	helpers.put(baseURL.append(baseURL.class_days, classCheck), {"classDates": [" ",], "name": "test", "students": [" ",]});
	
}
exports.classCheckin = functions.https.onRequest(async (request, response) => {
	const text = request.query.profID;
	const IDs = await helpers.get(baseURL.append(baseURL.professors, text));
	const classInfo = Object.values(IDs.classIDs[0]);
	const classCheck = getDateTime().slice(0,10) + "_" + classInfo;
	helpers.put(baseURL.append(baseURL.class_days, classCheck), {"classDates": [" ",], "name": "none", "students": [" ",]});
	//document.write(classID);
	response.send(classCheck);
})

//classCheckinTest();



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

//example: https://us-central1-middleware-6a409.cloudfunctions.net/getProfessorAttendanceData?id=6a407
exports.getProfessorAttendanceData = functions.https.onRequest(async (request, response) => { // given a prof id, output the info associated
	let output = { "name": "",
				   "classes": []
	}
	let class_obj = {"class_name": "",
		"class_id": "", 
		"class_days": [],
	}
	let profID = request.query.id;
	if(profID == null){ // no id param given
		response.send("how dare you."); 
	}
	let baseURL = helpers.base(); 
	let proNode = baseURL.professors + "/" + profID;
	const profNode = await helpers.get(baseURL.append(proNode,""));
	if(profNode == null){ // id is not found in the database
		response.send("check your id."); 
	}
	output.name = await profNode.ProfessorName; 
	for(const i in await profNode.classIDs){
		let classNode = await helpers.get(baseURL.append(baseURL.classes, profNode.classIDs[i]));
		class_obj.class_name = await classNode.name; 
		class_obj.class_id = profNode.classIDs[i];
		let classDaysNode = await helpers.get(baseURL.urlclass_days());

		for(const x in classDaysNode){
			let cur = x.substring(x.length-4, x.length);
			if(cur == class_obj.class_id){
				//console.log(cur);
				class_obj.class_days.push(classDaysNode[x]);
				output.classes.push(class_obj);
			}
		}
	}
	response.send(output); 
})

