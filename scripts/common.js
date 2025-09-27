/* this document is for code ran to add functionability to custom tags
 * or to to add more functionability to favicons and such*/

let params = Object.fromEntries(
    new URLSearchParams(location.search)
)

// example custom settings!
let keymotes_settings = {
	instance: "https://social.grat.gay"
}

nyaallery_settings = {
    buttons: {
        prev: "<img src='images/icons/chevron-back.svg'>",
        next: "<img src='images/icons/chevron-forward.svg'>",
        close: "<img src='images/icons/close.svg'>",
    }
}

/* code from stack overflow, uhh double check if theres an easier way... */
Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    $$.id("loading").classList.remove("shown");
    $$.id("loading").classList.add("hidden");
});

document.addEventListener("click", (e) => {
    let target = e.target.closest("a");

    // don't intercept default behavior if no link element was found, or
    // there is no link on the element
    if (! target || ! target.href 
        || target.target || target.href.includes("#")
    ) {return}

    e.preventDefault();

    $$.id("loading").classList.remove("hidden");
    $$.id("loading").classList.add("shown");

    setTimeout(() => {
        // go to the actual page
        location.replace(target.href);
    }, 300)
})

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
			"/images/sprites/favicons/webicon_inactive.gif");
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
    let url, file, dir, title, info;

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
        
        // place fanartist's name & link on page
        let artist = $$.id("artist-name");
        artist.innerText = info.credit;
        artist.href = info.link;

        if (! info.link) {
            artist.removeAttribute("target");
            artist.removeAttribute("href");
        }
    }

    //$$.log(info);
    elem.closest("a").href=url;
    if(info.link) { elem.closest("a").href = info.link }
    else {
        elem.closest("a").href = url.split("'")[1];
    }

    elem.querySelector(".art-title").innerText = title;
    elem.querySelector(".art-form").innerText = dir;

    elem.style.setProperty("--background", url);
    elem.setAttribute("alt", info["alt"]);
    elem.setAttribute("title", info["alt"]);
    
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
    
        let markdowntxt = lines.join("\n");


        markdown = markdowntxt;
        if($$.id("blog-clear")) {
            markdown_parsed = marked.parse(markdowntxt);
        }
        else { markdown_parsed = ""; }

        return {markdown, markdown_parsed,  header}
    }
}
/* add blog titles & short descriptions */
if($$.id("blog-post-1") != null) {
    (async () => {
    let posts = [...document.querySelectorAll(".blog-post")];

    //$$.log(posts);
    for(let i = 0; i < posts.length; i++) {


        let keys = Object.keys(images["blog"]);
        let blog = images["blog"][keys[i]]    

        // stop if there isn't enough blog entries for post previews
        if(blog == undefined) { continue; }

        /* fetching markdown files */
        let markdown = await $$.txt("images/media/blog/"+blog["source"]);
        let header = {};

        // parse markdown
        let post = parse_md(markdown);

        /* updating site infomation*/

        //$$.log(posts[i]);
        //$$.log(post);

        if(post.header["image"]) {
            posts[i].children[0].setAttribute("style",
                "background-image: url('images/assets/thumb/"+post.header["image"]+"')");
            posts[i].children[0].setAttribute("alt", post.header["alt"] || "");
            posts[i].children[0].setAttribute("title", post.header["alt"] || "");
        }



        posts[i].setAttribute("href", "blog.html#"+blog["source"]
        .substring(0, blog["source"].length-3));
        
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

        elem.append(anchor);
    } 

    // print out self made stamps / badges
    for(creation in mine) { 
        
        if(images.friends[creation]) {
            placeStamp(mine[creation], $$.id("selfmade-div"), "friends", "badge-img"); 
        }
        if(images.badges[creation]) {
            placeStamp(mine[creation], $$.id("selfmade-div"), "badges", "badge-img"); 
        }
        if(images.stamps[creation]) {
            placeStamp(mine[creation], $$.id("selfmade-div"), "stamps", "stamp-img"); 
        }
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


// for blog page
// for loading blog pages from hashtag
if($$.id("manga")) { blogPlace(); }
window.addEventListener("hashchange", () => { blogPlace(); } );

async function blogPlace() {
    for(post in images["blog"]) {
        let post_obj = images.blog[post];

        let hash = window.location.hash.substring(1,
        window.location.hash.length)+".md";
        if(hash == post_obj["source"]){
            
            $$.id("blog-banner").children[0].innerText = 
            hash.substring(0, hash.length-3);

            // clear default blog content
            $$.id("blog-clear").innerHTML = "";
            $$.id("bg-gear-2").innerHTML = "";

            let blog = images["blog"][hash];   

            /* fetching markdown files */
            let markdown = await $$.txt("images/media/blog/"+post_obj["source"]);
            let header = {};


            // parse markdown
            let post = parse_md(markdown);

            /* updating site infomation*/

            //$$.log(posts[i]);
            //$$.log(post);

            if(post.header["image"]) {
                let banner = $$.id("blog-banner");
                // change banner image to the thumbnail image & custom styling
                banner.setAttribute("style",
                        `background:        
                        linear-gradient(
                            rgba(0, 0, 0, 0.4), 
                            rgba(0, 0, 0, 0.4)
                            ),
                        url('images/assets/thumb/${post.header["image"]}');
                         background-position: center;
                         background-size: cover;`);
                banner.setAttribute("alt", post.header["alt"] || "");
                banner.setAttribute("title", post.header["alt"] || "");
            }

            $$.id("blog-clear").innerHTML = post.markdown_parsed;
            keymotes.format($$.id("blog-clear"));

            $$.query_all(".buttons")[0].children[4].href = "blog.html";
            $$.query_all(".buttons")[0].children[4].innerText = "go back";
        }
    }
}

// manga importing
if($$.id("manga")) { 
    
    for(manga in images["manga"]) {
        let manga_obj = images.manga[manga];
        let rows = $$.id("manga").children;
        let manga_row;

        if (rows[0].children.length <= rows[1].children.length) {
            manga_row = rows[0];
        } else { manga_row = rows[1]; }

        manga_row.innerHTML += `
            <a id="manga-link" href="${manga_obj.link}">
                <img class="manga-img" 
                src="images/media/manga/${manga}" alt="${manga_obj.alt}" 
                title="${manga_obj.alt}">
            </a>
        `
    }
}
