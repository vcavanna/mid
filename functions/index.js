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
	if(IDs == null){
		response.status(500).send("ID not found");
	}
	const classInfo = IDs.classIDs[0];
	const classCheck = getDateTime().slice(0, 10) + "_" + classInfo;
	const curDateTime = getDateTime(); 
	await helpers.put(baseURL.append(baseURL.class_days, classCheck), { "classDate": curDateTime , "name": "none", "attendance": [" ",] });

	//putting the classDate into the classdates section in database
	const classDates = await helpers.get(baseURL.append(baseURL.classes, classInfo + "/classDates"));
	classDates["Day" + ((Object.keys(classDates).length) + 1)] = curDateTime;
	await helpers.put(baseURL.append(baseURL.classes, classInfo + "/classDates"), classDates);
	//document.write(classID);
	response.status(200).send(classCheck);
})


// helper function to turn JSON into a string array

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
					date : classDaysNode[x].classDate,
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
	} else {
		try {
			await helpers.put(baseURL.append(baseURL.students, studentID),obj);
			response.send(obj);
		} catch(error) {
			response.status(500).send(error);
		}
	}
	response.status(500).send("this should not have happened");
})

exports.addClass = functions.https.onRequest(async (request, response) => { // puts a professor into the database
	let className =  request.query.cn;
	let profID = request.query.pid;
	let classId = request.query.cid;
	
	let obj = {"classDates": [{"Day":""}],
			   "name": className };
			   
	if(className == null || classId == null || profID == null){
		response.status(500).send('Insufficient parameters');
	} else {
		try {
			await helpers.put(baseURL.append(baseURL.classes, classId), obj);
			let prof_classID_node = profID + "/classIDs"; 
			let x = await helpers.get(baseURL.append(baseURL.professors, prof_classID_node))
			x.push(classId);
			await helpers.put(baseURL.append(baseURL.professors, prof_classID_node), x);
			response.send(obj);
		} catch(error){
			response.status(500).send(error);
		}
	}
	response.status(500).send("this should not have happened");
})

exports.registerProfessor = functions.https.onRequest(async (request, response) => { // puts a professor into the database
	let profName =  request.query.pn;
	let profID = request.query.pid;
	
	let obj = {"ProfessorName": profName,
			   "classIDs": [""] };

	if(profName == null || profID == null){
		response.status(500).send('Insufficient parameters');
	} else {
		try {
			await helpers.put(baseURL.append(baseURL.professors, profID),obj);
			response.send(obj);
		} catch(error) {
			response.status(500).send(error);
		}
	}
	response.status(500).send("this should not have happened");
})

async function putpersoninattendance(){
	let student_name_time = { 
								name: "Student Name",
								time: "2023-04-25T14:07:42.448Z"
							}
	let class_day_node = baseURL.class_days + "/" + "2023-04-25_aB2f";

	let att_list = await helpers.get(baseURL.append(class_day_node, "attendance"));
	if(att_list[0].name == ""){
		att_list = [(student_name_time)]
	} else {
		att_list.push(student_name_time)
	}
	await helpers.put(baseURL.append(class_day_node, "attendance"), att_list);
}
async function call(){
	let x = await helpers.get("https://us-central1-middleware-6a409.cloudfunctions.net/registerStudent?sn=TG&sid=2345456789");
	console.log(x);
}

