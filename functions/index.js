// deleting a function from deployment:
// firebase functions:delete myFunction

const functions = require("firebase-functions");
const helpers = require("database-helper-funcs");

const baseURL = helpers.base()

// deleting a function from deployment:
// firebase functions:delete myFunction

exports.checkInStudent = functions.https.onRequest((request, response) => {
	// Get from the request body the student ID and Class ID
	// url would be something like https.{firebase_functions_url}.com/example?sid=900887873&cid=1234
	const studentID = request.query.sid;
	const classID = request.query.cid;
	var date = getDateTime().slice(0, 10);

	const classDayID = date + "_" + classID;
	helpers.put(baseURL.append(baseURL.class_days, classDayID + "/attendance"), { studentID: getDateTime() });
	response.send("student " + studentID + " Checked In at " + getDateTime() + " Probably");
})

async function checkInStudentTest() {
	const studentID = 900888157;
	const classID = "aB2f";
	var date = getDateTime().slice(0, 10);

	const classDayID = date + "_" + classID;
	let recieved = await helpers.get(baseURL.append(baseURL.class_days, classDayID + "/attendance"))
}


async function classCheckinTest() {

	const text = "6a407";
	const IDs = await helpers.get(baseURL.append(baseURL.professors, text));
	//console.log(IDs);
	const classInfo = Object.values(IDs.classIDs);
	//console.log(classInfo);
	const classCheck = getDateTime().slice(0, 10) + "_" + classInfo;
	helpers.put(baseURL.append(baseURL.class_days, classCheck), { "classDate": getDateTime(), "name": "test", "attendance": [" ",] });

	const classDates = await helpers.get(baseURL.append(baseURL.classes, classInfo + "/classDates"));
	classDates["Day" + ((Object.keys(classDates).length) + 1)] = getDateTime();
	helpers.put(baseURL.append(baseURL.classes, classInfo + "/classDates"), classDates);
}

exports.classCheckin = functions.https.onRequest(async (request, response) => {
	const text = request.query.profID;
	const IDs = await helpers.get(baseURL.append(baseURL.professors, text));
	const classInfo = IDs.classIDs[0];
	const classCheck = getDateTime().slice(0, 10) + "_" + classInfo;
	await helpers.put(baseURL.append(baseURL.class_days, classCheck), { "classDate": getDateTime, "name": "none", "attendance": [" ",] });

	//putting the classDate into the classdates section in database
	const classDates = await helpers.get(baseURL.append(baseURL.classes, classInfo + "/classDates"));
	classDates["Day" + ((Object.keys(classDates).length) + 1)] = getDateTime();
	await helpers.put(baseURL.append(baseURL.classes, classInfo + "/classDates"), classDates);
	//document.write(classID);
	response.status(200).send(classCheck);
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

//example: https://us-central1-middleware-6a409.cloudfunctions.net/getProfessorAttendanceData?id=6a407
exports.getProfessorAttendanceData = functions.https.onRequest(async (request, response) => { // given a prof id, output the info associated
	//reformat data to be based on name:

	let output = { "name": "",
				   "classes": []
	}
	let class_obj = {"class_name": "",
					 "class_id": "", 
  					 "class_days": [],
	}
	let profID = request.query.id;
	if(profID == null){ // no id param given
		response.status(404).send('Insufficient Parameters: \n No ID provided');
	}
	let proNode = baseURL.professors + "/" + profID;
	const profNode = await helpers.get(baseURL.append(proNode,""));
	if(profNode == null){ // id is not found in the database
		response.status(404).send('ID not found');
	}
	output.name = await profNode.ProfessorName; 

	for(const i in await profNode.classIDs){

		let classNode = await helpers.get(baseURL.append(baseURL.classes, profNode.classIDs[i]));

		class_obj.class_name = await classNode.name; 
		class_obj.class_id = profNode.classIDs[i];

		let classDaysNode = await helpers.get(baseURL.urlclass_days());

		for(const x in classDaysNode){
			let cur = x.substring(x.length-4, x.length); //
			if(cur == class_obj.class_id){
				let class_day_id_obj = {
					date : x.substring(0,10),
					attendance: classDaysNode[x].attendance
				 };
				 class_obj.class_days.push(class_day_id_obj);
			}
		}
		output.classes.push(class_obj);
	}
	response.send(output); 
})

//https://us-central1-middleware-6a409.cloudfunctions.net/registerStudent?sn=Theresa_Gasser&sid=23456
exports.registerStudent = functions.https.onRequest(async (request, response) => { // puts a student into the database
	let studentName =  request.query.sn;
	let studentID = request.query.sid;
	let obj = {"studentName": studentName}

	if(studentName == null || studentID == null){
		response.status(404).send('Insufficient parameters');
	}
	try {
		await helpers.put(baseURL.append(baseURL.students, studentID),obj);
		response.send(obj);
	} catch(error) {
		response.status(500).send(error);
	}
	response.status(500).send("this should not have happened");
})

// async function putpersoninattendance(){
// 	let atnode = await helpers.get(baseURL.append())
// }

