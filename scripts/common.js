/* this document is for code ran to add functionability to custom tags
 * or to to add more functionability to favicons and such*/




/* run through this code every so often,
 * change from inactive mode to active code */
// can also be used to update a clock

refresh();
function refresh() {

	if(radio.audio.paused != true) {
		// change favicon to a dancing version if nyaaradio is playing
		$$.id("favicon").setAttribute("href",	
		"/images/sprites/favicons/webicon_dance.gif");
	}
	else if(document.hidden == true) {
		// stop animated favicon and replace with inactive ver
		if($$.id("favicon").getAttribute("href")
		.includes("_inactive") == false) {
			$$.id("favicon").setAttribute("href",	
			"/images/sprites/favicons/webicon_inactive.png");
		}
	}	
	else {
		// restart the animated favicon
		$$.id("favicon").setAttribute("href",	
		"/images/sprites/favicons/webicon.gif");
	}
	setTimeout("refresh()", 800);	
}

/* get image sizes, useful for pixelart handling*/
function get_image_size(url) {
    let img = document.createElement("img");

    img.style.opacity = "0.0";
    img.style.display = "none";
    img.style.pointerEvents = "none";

    document.body.append(img);

    return new Promise((resolve, reject) => {
        img.onload = () => {
            img.remove();

            resolve({
                width: img.clientWidth,
                height: img.clientHeight
            })
        }

        img.onerror = () => {
            img.remove();
            reject();
        }

        img.src = url;
    })
}

/*
 *		Custom element code
 * */

/* check for special elements */
(async () => {
    // searches for <svg-img> and uses src="" to fetch and fill it with
    // the requested img (hopefully an actual SVG file)
    let svgs = $$.query_all("svg-img");
    for (let i = 0; i < svgs.length; i++) {
        // nobody specified a src="" attribute :c
        if (! svgs[i].getAttribute("src")) {
            continue;
        }

        // get and set the svg data in the background
        (async () => {
            let res = await (await fetch(svgs[i].getAttribute("src"))).text();
            svgs[i].innerHTML = res;
        })()
    }

    let txtpres = $$.query_all("txt-pre");
    for (let i = 0; i < txtpres.length; i++) {
        // nobody specified a src="" attribute :c
        if (! txtpres[i].getAttribute("src")) {
            continue;
        }

        // get the text data
        // get and set the text data in the background
        (async () => {
            let res = await (await fetch(txtpres[i].getAttribute("src"))).text();
            txtpres[i].innerHTML = res;
        })()
    }
})()

// returns a random number between `0` and `1` using `seed`
// returns a random number between `0` and `1` using `seed`
function seeded_random(seed, min, max) {
    let a = 1103515245; // multiplier
    let m = 0x80000000; // modulus
    let c = 12345; // increment

    let random_int = ((a * seed + c) % m) / m;

    return random_int * (max - min) + min;
}

let date = new Date();
date.setHours(0, 0, 0, 0);

let arrays = [lowpoly, hamabead, pixelart, sketches];
let arrays_s = ["lowpoly", "hamabead", "pixelart", "sketches"];

let random_int = seeded_random(date.getTime(), 0, arrays.length - 1);
random_int = Math.round(random_int);

let random_int2 = seeded_random(date.getTime() + 1, 0,
    arrays[random_int]["files"].length - 1);
random_int2 = Math.round(random_int2);

// get array name from arrays that are named after directories

let dir = arrays_s[random_int];
let tartwork = $$.id("t-artwork");
let tfanart = $$.id("t-fanart");

if(tartwork != null) {
    tartwork.setAttribute("style", "--background: url('images/media/"+dir+"/"+
    arrays[random_int]["files"][random_int2]+"'");

    let res = arrays[random_int]["files"][random_int2].split(".");
    let title = res[0].replaceAll("-", " ");
    
    $$.id("art-title").innerText = title;
    $$.id("art-form").innerText = "pixelart";
}

if(tfanart != null) {
    tfanart.setAttribute("style", "--background: url('images/media/fanart/"+
    fanart["files"][random_int]+"'");

    let res = fanart["files"][random_int].split(".");
    res = res[0].split("_");

    let credit = res[0];
    let title = res[1].replaceAll("-", " ");
    

    
    $$.id("fart-title").innerText = title;
    $$.id("fart-form").innerText = credit;

    $$.id("artist-name").innerText = credit.replace("@", "");
}

/* add blog titles & short descriptions */
if($$.id("blog-post-1") != null) {

    async function updateinfo(elm, i) {
        
        $$.log(blog, i);
    
        /* fetching markdown files */
        let markdown = await $$.txt("images/media/blog/"+blog["files"][i]);
        let header = "";

        /* parsing */
        if (markdown.startsWith("---\n")) {
            // split into lines
            let lines = markdown.split("\n");

            lines.shift(); // remove initial "---"

            // run through Markdown lines
            for (let line of [...lines]) {
                lines.shift();

                // if we found an end to the header, stop here, else simply add
                // to `header`
                if (line.startsWith("---")) {
                    break;
                } else {
                    header += line + "\n";
                }
            }

            markdown = lines.join("\n");
        }

        $$.log(header,markdown);

        /* updating site infomation*/

        $$.log(elm.children[0]);
        elm.children[0].setAttribute("style",
            "--background: url('images/assets/background2.jpg')");

        elm.children[1].children[0].innerText = blog["files"][i];
        elm.children[1].children[1].innerText = markdown;
    }


    for (let i = 0; i < 4; i++) {
        updateinfo($$.id(`blog-post-${i + 1}`), i);
    }
}



