/* this document is for code ran to add functionability to custom tags
 * or to to add more functionability to favicons and such*/

let params = Object.fromEntries(
    new URLSearchParams(location.search)
)

// remember to add a store link with redbubble
let redirects = {
    fedi: "https://social.grat.gay/@Grat10",
    discord: "https://discord.com/invite/x8jsdDswsC",
    bsky: "https://bsky.app/profile/grat10.bsky.social",
    twitch: "https://www.twitch.tv/grat_grot10_berg",
    live: "https://www.twitch.tv/grat_grot10_berg",
    rss: "https://social.grat.gay/@Grat10.rss",
    yt: "https://www.youtube.com/@gratgrot-10-berg",
    youtube: "https://www.youtube.com/@gratgrot-10-berg",
    kofi: "https://ko-fi.com/gratgrottenberg",
}

for (let i in redirects) {
    if (typeof params[i] != "undefined") {
        location.replace(redirects[i]);
    }
}



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

let objects = {
    lowpoly: images["lowpoly"],
    hamabead: images["hamabead"],
    pixelart: images["pixelart"],
    sketches: images["sketches"]
};

// get array name from objects that are named after directories
function random_img(obj, elem,  isList) {
    let url;
    let file;
    let dir;
    let title;
    let info;

    if(isList == true) {
        let random_int = seeded_random(date.getTime(), 0, Object.keys(obj).length - 1);
        random_int = Math.round(random_int);

        dir = Object.keys(obj)[random_int];

        let random_int2 = seeded_random(date.getTime() + 1, 0,
            Object.keys(obj[dir]).length - 1);
        random_int2 = Math.round(random_int2);
        
        file = Object.keys(obj[dir])[random_int2];
        info = obj[dir][file];
        url = "url('images/media/"+dir+"/"+file+"'";
        title = file.split(".")[0].replaceAll("-", " ");
    } else {
        let random_int = seeded_random(date.getTime() + 1, 0,
            Object.keys(obj).length - 1);
        random_int = Math.round(random_int);
            
        
        file = Object.keys(obj)[random_int];
        let res = file.split(".")[0].split("_");
        
        info = obj[file];
        dir = res[0];
        title = res[1].replaceAll("-", " ");
        url = "url('images/media/fanart/"+ file +"'";   
    }

    $$.log(info);

    elem.querySelector(".art-title").innerText = title;
    elem.querySelector(".art-form").innerText = dir;

    elem.style.setProperty("--background", url);
    elem.setAttribute("alt", info["alt"]);
    // elem.setAttribute("title", info["alt"]);
    
} 

if($$.id("t-artwork")) {
    random_img(objects, $$.id("t-artwork"), true);
    random_img(images["fanart"], $$.id("t-fanart"), false);
}

function parse_md(markdown) {
    /* parsing */
    let header = {}; 
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
                // split data strings, put values into obj then append to header obj
                let info = line.split(":");
                let obj = {};
                obj[info[0]] = info[1].replace(" ", "").replaceAll('"', "");
                header = {...header, ...obj};
            }
        }
    
        markdown = lines.join("\n");

        return {markdown, header}
    }
}
/* add blog titles & short descriptions */
if($$.id("blog-post-1") != null) {
    (async () => {
    let posts = [...document.querySelectorAll(".blog-post")];

    $$.log(posts);
    for(let i = 0; i < posts.length; i++) {
        
        let keys = Object.keys(images["blog"]);
        let blog = images["blog"][keys[i]]    

        $$.log(blog);
        /* fetching markdown files */
        let markdown = await $$.txt("images/media/blog/"+blog["source"]);
        let header = {};

        // parse markdown
        let post = parse_md(markdown);

        /* updating site infomation*/

        $$.log(posts[i]);
        $$.log(post);

        if(post.header["image"]) {
            posts[i].children[0].setAttribute("style",
                "background-image: url('images/assets/thumb/"+post.header["image"]+"')");
            posts[i].children[0].setAttribute("alt", post.header["alt"] || "");
            posts[i].children[0].setAttribute("title", post.header["alt"] || "");
        }



        posts[i].querySelector("h2:first-of-type").innerText = blog["source"];
        posts[i].querySelector("p:first-of-type").innerText = post.markdown
        .replaceAll(/^#.*/mg, "") // remove title
        .replaceAll(/!\[.*?\]\(.*?\)/g, "") // remove any image tags
        .replaceAll("\n", " ")  // remove newlines
        .slice(0, 124)+". . ." // cut of remainder & add eplipsis
        .replaceAll(/\s$/g, ""); // if last line is a space, remove it
    }
})()
}



// for links page
if($$.id("friends")) {

    // filter through contents and return items which match Grat10
    let mine = {
        ...images.badges,
        ...images.stamps,
    }

    for (let i in mine) {
        if (! mine[i].credit.match("@Grat10")) {
            delete mine[i];
        }
    }

    $$.log(mine);

    /* place stamps on page */

    function placeStamp(obj, elem, dir, clas) {
        let stamp = $$.make("img");
        let anchor = $$.make("a");

        stamp.src = "images/media/"+dir+"/"+obj.source;
        stamp.alt = obj.alt || "";
        stamp.title = obj.alt || "";
        stamp.setAttribute ("class", clas);

        if(obj.link != "") {
            anchor.href = obj.link;
        }
      
        anchor.append(stamp);

        $$.log(anchor);
        elem.append(anchor);
    } 

    for(friend in images.friends) { 
        placeStamp(images.friends[friend], $$.id("friends-div"), "friends", "badge-img"); 
    }
    for(badge in images.badges) { 
        placeStamp(images.badges[badge], $$.id("sites-div"), "badges", "badge-img"); 
    }
    for(stamp in images.stamps) { 
        placeStamp(images.stamps[stamp], $$.id("stamps-div"), "stamps", "stamp-img"); 
    }
}


