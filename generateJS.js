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
		let foldername = folder.split("/")
		let folderContent = [];
		let imageCreationDate = [];

		// read all files inside the art folders 
		fs.readdirSync(folder).forEach(file => {
			/* sort newest to oldest */

			fs.stat(folder+"/"+file, (err, stats) => {
				if(err) console.log(err);
				else {
					// logs 2024-04-10T19:40:19.661Z 
					console.log(stats.birthtimeMs);

					imageCreationDate.push(stats.birthtimeMs);
				}
			});
			folderContent.push(file);
		});
	
		/* outputs [] */
		console.log(imageCreationDate);
		
		// create JS arrays with folders images
		file += "let "+foldername[3]+" = "
		+JSON.stringify(folderContent)+"; \n";
	});
	
	// export art JS file to the art folder
	fs.writeFile("images/art/images.js", file,
		function(err){if(err){console.error(err)}});

}

GenerateJSFile(artFolders);
