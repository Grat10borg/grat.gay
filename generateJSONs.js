"use strict";

const fs = require('fs');

	/* Generate JSON files from files inside art folders	*/
function GenerateJSONs(path) {

	let sources = [];

	// read all files inside the art folders 
	fs.readdirSync(path).forEach(file => {
		sources.push(file);
	});
	// add music array to JS object
	let obj = {sources};

	// make the JS object into a json object
	console.log(JSON.stringify(obj));

	// export art JSON file to the custom folder
	fs.writeFile(path+".json", JSON.stringify(obj),
		function(err){if(err){console.error(err)}});
}

	/* which folders are affected */
let artFolders = 
[ "./images/art/art3d",
"./images/art/fanart",
"./images/art/pixelart",
"./images/art/hamabead"];
	
	/* run through each path and generate a JSON file for each */
artFolders.map(GenerateJSONs);
