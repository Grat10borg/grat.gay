"use strict";

let main = $$.id("main");

function makeImgdivs(paths, hash) {
		console.log(paths)
		/* run through each art display found */
		for(let i = 0; i < paths["files"].length; i++) {
		/* get title & author from filename	*/
		let imageText = paths["files"][i].split("_");

		/* build img div */

		let artwork = $$.make("div");
		artwork.classList.add("artwork");

		let link = $$.make("a");

		let imgDiv = $$.make("div");
		imgDiv.classList.add("img");
		/* set src for shown image	*/
		imgDiv.style.backgroundImage=
		"url('../images/art/"+hash+"/"+paths["files"][i]+"')";

		/* add title and alt */
		imgDiv.alt = alt.text[
		alt.img.indexOf(paths["files"][i])];
		imgDiv.title = alt.text[
		alt.img.indexOf(paths["files"][i])];

		let overlay = $$.make("div");
		overlay.classList.add("overlay");

		let title = $$.make("p");
		title.classList.add("title");
		title.innerHTML = imageText[0];

		let author = $$.make("p");
		author.classList.add("title");
		author.innerHTML = imageText[1];


		overlay.append(title);
		overlay.append(author);
		imgDiv.append(overlay);
		link.append(imgDiv);
		artwork.append(link);
		main.append(artwork);

			/* activate lightbox when clicked */
		imgDiv.addEventListener("click", (e) => {
			e.preventDefault();
				/* update lightbox image source */	

			let filepath = e.currentTarget.style.backgroundImage.split('"');
				
				/* update filepath to the clicked on image*/
			$$.id("lightbox-img").src = filepath[1];

			let filesplit = filepath[1].split("/");
			let filename = filesplit[filesplit.length - 1];

				/* add alt text and title */
			$$.id("lightbox-img").alt = alt.text[
			alt.img.indexOf(filename)];
			$$.id("lightbox-img").title = alt.text[
			alt.img.indexOf(filename)];

			/* fill credits panel with credits */
			let sourcesplit = filename.replace("@", ""
			).replace("-", "").split("_")
			let author = sourcesplit[0]; 
			$$.log(artists[author.toLowerCase()]);

			let artist = artists[author.toLowerCase()];

			$$.id("profile").src =
			"images/art/artists/"+ artist["pfp"];
			$$.id("profile").alt = artist["pfp_alt"];
			$$.id("profile").title = artist["pfp_alt"];

				/* profile text */
			$$.id("name").innerHTML = artist["name"];
			$$.id("pronouns").innerHTML = artist["pronouns"];
			$$.id("desc").innerHTML = artist["desc"];

			$$.id("pfp-artist").innerHTML = "pfp by: @"+artist["pfp_artist"];
			$$.id("pfp-artist").href = artist["pfp_artist_link"];

			/* empty socials with previous SoME links */
			$$.id("socials").innerHTML = "";
					
			$$.log(artist.links);
			artist.links.map((link) => {
				let split = link.split("_");

				let anchor = $$.make("a");
				anchor.href = split[1];
				anchor.innerHTML = split[0];

				$$.id("socials").append(anchor);
			});

			$$.id("lightbox").classList.remove("hide");
			$$.id("lightbox").classList.add("show");
		});
	}
}

	/* close lightbox eventhandler */
if($$.id("lightbox") != undefined)
	$$.id("lightbox").addEventListener("click", (e) => {
		$$.id("lightbox").classList.remove("show");
		$$.id("lightbox").classList.add("hide");
	});

	/* shortens code and removes starting # */
let hash = window.location.hash.replace("#", "");

if(window.location.hash) {
	switch(hash) {
		case "fanart":
		makeImgdivs(fanart, hash);
		break;
		case "art3d":
		makeImgdivs(art3d, hash);
		break;
		case "hamabead":
		makeImgdivs(hamabead, hash);
		break;
		case "pixelart":
		makeImgdivs(pixelart, hash);
		break;
		case "sketches":
		makeImgdivs(sketches, hash);
		break;
	}
}
else {
	makeImgdivs(pixelart, hash);
}

