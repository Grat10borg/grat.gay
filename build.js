const fs = require("fs");

// Generate JSON files from files inside art folders
async function build() {
	let file = "";

    image_list = {};
    // get all directories within ./art and loops it with current directory
	fs.readdirSync("images/media").map((folder) => {
        folder = "images/media/" + folder;

        if (! fs.statSync(folder).isDirectory()) {
            return;
        }

        let metadata = require("./images/metadata.json");

        let images = {}; 
        let files = fs.readdirSync(folder);
        for (file of files) {
            
            images[file] = {
                source: file,
                alt: "",
                link: "",
                credit: "",
                date: "",
                ...(metadata[file] || {}),
            }
        } 

        // get the folder name
        let dirName = require("path").basename(folder);

        image_list[dirName] = images;

	});

    file += `\nlet images = ${JSON.stringify(image_list, null, "\t")}\n`;

    // twitch api key
    // qg6jglxietj80siyhlxqjz6ihjo9ii
    //
    // twitch client id
    // gp762nuuoqcoxypju8c569th9wz7q5
    //
    // seal place id
    // 538506717
    //
    // grat10 id
    // 485848067
    //
    //TWITCH_TOKEN=qg6jglxietj80siyhlxqjz6ihjo9ii TWITCH_CLIENT_ID=gp762nuuoqcoxypju8c569th9wz7q5 node build.js


    let user_id = "538506717"

    let res_streams = await (await fetch("https://api.twitch.tv/helix/streams?user_id="+user_id+"&type=live",
        {
            headers: {
                authorization: `Bearer ${process.env["TWITCH_TOKEN"]}`,
                "client-id": process.env["TWITCH_CLIENT_ID"]
            }
        }
    )).json()
    
    let res_schdule = await (await fetch("https://api.twitch.tv/helix/schedule?broadcast_id="+user_id,
        {
            headers: {
                authorization: `Bearer ${process.env["TWITCH_TOKEN"]}`,
                "client-id": process.env["TWITCH_CLIENT_ID"]
            }
        }
    )).json()
    
    // unneeded for simple live checker
    delete res_streams.pagination;

    // save to file string
    file += "let twitch_streams = "
    +JSON.stringify(res_streams)+"; \n";

    file += "let twitch_schdule = "
    +JSON.stringify(res_schdule)+"; \n";

    console.log(process.env["TWITCH_TOKEN"]);
    console.log(res_streams);

	// export art JS file to the art folder
	fs.writeFile("info.js", file,
		function(err){if(err){console.error(err)}});

	console.info("file written");
}

build();
