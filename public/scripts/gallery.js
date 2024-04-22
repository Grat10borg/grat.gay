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
			let filepath = e.currentTarget.style.backgroundImage.split('"');
				/* update lightbox image source */	
			$$.id("lightbox-img").src = filepath[1];

					/* add alt text and title */
			let filename = filepath[1].split("/");
			$$.id("lightbox-img").alt = alt.text[
			alt.img.indexOf(filename[filename.length - 1])];
			$$.id("lightbox-img").title = alt.text[
			alt.img.indexOf(filename[filename.length - 1])];

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

