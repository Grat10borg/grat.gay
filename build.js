"use strict";

const fs = require('fs');

	/* which folders are affected */
let artFolders = 
[ "./images/art/art3d",
"./images/art/fanart",
"./images/art/pixelart",
"./images/art/hamabead",
"./images/art/sketches"];

	/* Generate JSON files from files inside art folders	*/
function GenerateJSFile(artFolders) {

	let file = "";

	artFolders.map((folder) => {

		// get folder name from filepath
		let foldername = folder.split("/");
		let obj = {
			files: [],
			dates: [],
		};
		var files = fs.readdirSync(folder);
	    var dates = [];	

			/* sorts files by oldest to newest*/
		files.sort((a, b) => {
			return fs.statSync(folder +"/"+ a).mtime.getTime() -
				fs.statSync(folder +"/"+ b).mtime.getTime();
		});
			/* reverse sorting, newest to oldest. */
		files = files.reverse();

		files.map((file) => {
			dates.push(fs.statSync(folder+"/"+file).birthtime)
		})
			
		obj.files = files;
		obj.dates = dates;

		console.info("exported new image.js+("+foldername[3]+") file");

		// create JS arrays with folders images
		file += "let "+foldername[3]+" = "
		+JSON.stringify(obj)+"; \n";
	});
	
	// export art JS file to the art folder
	fs.writeFile("images/art/images.js", file,
		function(err){if(err){console.error(err)}});

}

GenerateJSFile(artFolders);
