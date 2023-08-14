/*this is only used on the Homepage*/

let tab1 = $$.id("tabs1");
let tab2 = $$.id("tabs2");
let tab3 = $$.id("tabs3");
let tab4 = $$.id("tabs4");

let panel1 = $$.id("panel1");
let panel2 = $$.id("panel2");
let panel3 = $$.id("panel3");
let panel4 = $$.id("panel4");

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

/* clock for homepage */
let clock = $$.id("clocktext");
clockRefresh();

function clockRefresh(){

const date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	if(date.getMinutes.length == 1) {
		// makes 3 into 03
		minutes = "0" + minutes;
	}
	/*Tetenary Operator, Don't use these
	 * i'm just testing
	**/ 
	let ampm = (hours >= 12) ? "PM" : "AM";

	clock.innerHTML = hours +":"+minutes+" "+ampm;	
	setTimeout("clockRefresh()", 100);
}


/* web worker, work in progress
if (typeof(Worker) !== "undefined") {
	if(typeof(w) == "undefined") {
		w = new Worker("webworker.js");

		w.onmessage = function(event) {
			console.log(event.data);
			clock.innerHTML = event.data;	
		}

		w.onerror = function(event) {
			console.log(event.message);	
		}
	}
}
else {
	$$.log("your browser does not support Web Workers"+
		", the clock on this page won't work");
}
*/
