

refreshing();

let tab1 = $$.id("tabs1");
let tab2 = $$.id("tabs2");
let tab3 = $$.id("tabs3");
let tab4 = $$.id("tabs4");

let panel1 = $$.id("panel1");
let panel2 = $$.id("panel2");
let panel3 = $$.id("panel3");
let panel4 = $$.id("panel4");

if(tab1 != null && tab1 != undefined) {
tab1.addEventListener("click", function(){
	if(panel1.hidden == true){
		panel1.hidden=false;
		panel2.hidden=true;
	}	
}) 

tab2.addEventListener("click", function(){
	if(panel1.hidden == false){
		panel1.hidden=true;
		panel2.hidden=false;
	}	
}) 
tab3.addEventListener("click", function(){
	if(panel3.hidden == true){
		panel3.hidden=false;
		panel4.hidden=true;
	}	
}) 
tab4.addEventListener("click", function(){
	if(panel3.hidden == false){
		panel3.hidden=true;
		panel4.hidden=false;
	}	
})

// only run on homepage
mastofeed("https://vt.social/@Grat10berg.rss");	
}

	/*very refreshing, also refreshes anything and stops if not shown*/
function refreshing() {

	clockRefresh(); // update clock	
	 
	
	if(document.hidden == false) {
		// restart the animated favicon
	$$.id("favicon").setAttribute("href",
		"./images/webicon.gif");

	setTimeout("refreshing()", 500);
	}
	else {
		// stop animated favicon and replace with inactive ver
	$$.id("favicon").setAttribute("href",
		"./images/webicon_inactive.png");
		
	setTimeout("refreshing()", 900);	
	}
	
}


/* clock for homepage */
function clockRefresh(){
	let clock = $$.id("clocktext");
	/*seems largely ineffective..*/
	if(clock != null && clock != undefined) {
	const dateNow = new Date().toLocaleString();
		// 6:14:46 PM
	let timeres = dateNow.split(",")[1];
		// 6:16 PM
	let time = timeres.split(":")[0]+":"+timeres.split(":")[1]+
		" "+timeres.split(":")[2].split(" ")[1];
	
	clock.innerHTML = time;	
	}
}

	// gets a Mastodon feed
async function mastofeed(url) {
  let vtfeedDiv = $$.id("VTfeed");
  let vtSocialRss = await $$.api(url);
  $$.log(vtSocialRss);
  let Toots = $$.tag($$.tag(vtSocialRss,"channel")[0], "item");
 	
  for (let index = 0; index < Toots.length; index++) {
 	$$.log(Toots[index]);	
	  
    let ContentDiv = $$.make("div");
    ContentDiv.classList.add("vttoot");
    ContentDiv.insertAdjacentHTML("beforeend", 
    $$.tag(Toots[index],"description")[0].textContent);
    $$.log(ContentDiv);


    let link = $$.make("a");
    link.href = $$.tag(Toots[index], "link")[0].innerHTML
    link.innerHTML = "Origin";
    //link.innerHTML = "Orginal post -> "+ 
    //$$.tag(Toots[index], "link")[0].innerHTML as string
    link.classList.add("rsslink");
    if($$.tag(Toots[index], "media:content").length > 0){
    let imgdata = $$.tag(Toots[index], "media:content");
    
    if(imgdata[0]["attributes"][1].textContent == "video/mp4") {
	let vid = $$.make("video");
	vid.controls=true;
	vid.autoplay=true;
	vid.loop=true; // !! should be checked if its a Gif or Video!!
	let source = $$.make("source");
    	source.src = imgdata[0]["attributes"][0].textContent;
    	source.type = imgdata[0]["attributes"][1].textContent;
    	vid.append(source);
	ContentDiv.append(vid);
    }
    else{
    	let img = $$.make("img");
    	img.src = imgdata[0]["attributes"][0].textContent;
    	img.alt = imgdata[0].children[1].textContent;	
	img.title = imgdata[0].children[1].textContent;
    	ContentDiv.append(img);
    }
    }
    
    ContentDiv.append(link);
    $$.id("VTfeed")?.append(ContentDiv);
    if (index == 9) return;   
  }
}
	/*if a siteUpdates textarea is on this page*/
if($$.id("siteUpdate") != undefined) {
	async function siteUpdate() {
		let textarea = $$.id("siteUpdate");
		textarea.innerHTML = await $$.txt
		("../txt/siteUpdates.txt");		
	}
	siteUpdate();
}

	/*this is used on commisions.html*/
if($$.id("agrred") != undefined) {
	$.addEventListener("click", function(e){
		let slideAnimation = $$.query_all(".slide");
		console.log(slideAnimation);
		slideAnimation.forEach((slide) => 
		slide.classList.add("slidemove"));

	});
}
