
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const baseURL = "https://middleware-6a409-default-rtdb.firebaseio.com";
const studentNode = "/students";
const access = ".json?auth=cDfzhozB6OioVvrNbg2qgT1ByaUpfEVg4y6u7lRO"

let raw = ""

var postOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
};

const jobj = {
	data: JSON,
	set data(data) {
		this.data = data;
	}
}
var getOptions = {
	method: 'GET',
	redirect: 'follow'
};


async function getStudentInfo(rfcCode){ //takes an rfcCode and returns the node associated with that student
	let data;
	const requestOptions = getOptions; 
	let student_json; 
	const geta = await fetch(baseURL.concat(studentNode.concat(access)), requestOptions)
	.catch(error => console.log('error', error));
	data = await geta.json()
	
	for(const i in data){ 
		// let name = JSON.stringify(data[i]['StudentName']);
		let id = JSON.stringify(data[i]['rfcCode']);
		if(id === rfcCode){
			student_json = JSON.stringify(i);  //returns the student firesbase node code
			student_json = "/".concat(student_json.substring(1, student_json.length-1));
			
		}
	}
	let url = baseURL.concat(studentNode.concat(student_json.concat(access)));

	const final = await fetch(url, requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));

	// let retval =  await final.json(); if you want to return a json object rather than text output, then comment out the .then statments on lines 48 and 49
	// return retval;
}

getStudentInfo('1234567890');