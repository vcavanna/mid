const fetch = require("node-fetch");
module.exports = {

	get: async function (url){ // returns a JSON object of whatever database url you request from: Example: get(base.)
		return get(url); 
	},

	base: function() {
		return base; 
	},

	put: async function (url, content){
		return put(url,content);
	},
	
	post: async function (url, content){
		return post(url,content);
	}

}

const access = { 
	acc0: "bg2q",
	acc1: "pfEVg4y6u7lRO",
	acc2: "gT1ByaU",
	acc3: "hozB6OioVvrN",
	all: function () { 
		return ".json?auth=cDfz"+this.acc3+this.acc0+this.acc2+this.acc1; 
	}
}; 

const base = { //basically much easier to build the urls for doing requests: for example, base.urlstudents() just sets up the string for requests having to do with that part of the structure
	baseURL: "https://middleware-6a409-default-rtdb.firebaseio.com", 
	students: "/students",
	professors: "/professors",
	classes: "/classes",
	class_days: "/classdays",
	urlstudents: function () {
		return this.baseURL+this.students+access.all(); 
	},
	urlprofessors: function () {
		return this.baseURL+this.professors+access.all(); 
	},
	urlclasses: function () {
		return this.baseURL+this.classes+access.all(); 
	},
	urlclass_days: function () {
		return this.baseURL+this.class_days+access.all(); 
	},//urlclass_days function returns "https://middleware-6a409-default-rtdb.firebaseio.com/classdays.json?auth=...
	append: function (node, subnode) {
		return this.baseURL + node + "/" + subnode + access.all(); 
	}// the append function returns: "https://middleware-6a409-default-rtdb.firebaseio.com/node/subnode.json?auth=...
	//for the node valuse, you can use the provided string base nodes: base.students, base.class_days, etc. 
}



function getOptions(){
	return {
		method: 'GET',
		redirect: 'follow'
	};
}

async function get(url){ // returns a JSON object of whatever database url you request from: Example: get(base.)
	const geta = await fetch(url, getOptions())
	.catch(error => console.log('error', error));

	let data = await geta.json();
	//console.log(data); // uncomment this to see the json object that is returned
	return data; 
}

async function post(url, content){ // this post function takes the url, and also a json object to post to that location
	function postOptions(json_string){ // give this a JSON object
		let myHeaders = {"Content-Type": "application/json"};
		let postOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(json_string),
			redirect: 'follow'
		};
		return postOptions;
	}
	const posta = await fetch(url, postOptions(content))
	.catch(error => console.log('error', error));
} 

async function put(url, content){

	function putOptions(json_string){ // give this a JSON object
		let myHeaders = {"Content-Type": "application/json"};
		let postOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify(json_string),
			redirect: 'follow'
		};
		return postOptions;
	}
	
	const puta = await fetch(url, putOptions(content))
	.catch(error => console.log('error', error));

}
// since firebase automatically creates a unique ID whenever post is used, it may not be the best to use post for now
// will be writing a put helper function in order to avoid using the unique IDs


