// Shorthand Dom versions
const $ = document;
const $$ = {
dom: document,

// document methods
id: $.getElementById.bind($),
class: $.getElementsByClassName.bind($),
make: $.createElement.bind($),
query: $.querySelector.bind($),
query_all: $.querySelectorAll.bind($),

// custom methods below this
	// unused
api: ApiCall.bind($),
tag: tag.bind($),
	// shorthand code
txt: fetchTXT.bind($), //async
drag: makeDraggable.bind($),
click: click.bind($),

// just here to help me out when working.
log: console.log,
}

function tag(element, find) {
return element.getElementsByTagName(find);
}

// a little wonky but the response promise did not want to play along..
async function fetchTXT(Url) {
  await fetch(Url)
  .then(response => response.text())
  .then((txt) => {    
    //return txt;
    let textarea = $$.make("textarea");
    textarea.textContent = txt;
    textarea.id = Url;
    textarea.hidden = true;
    $.body.append(textarea);
  })
  let text = $$.id(Url).innerHTML;
  $$.id(Url).outerHTML = ""; // remove textarea again
  return text;
}



// Calls Twitch API or another API if turned on
async function ApiCall(HttpCall) {
    const respon = await fetch(`${HttpCall}`, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    })
  .then((respon) => respon.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
      // Return Response on Success
      return data;
    })
    .catch((err) => {
      // Print Error if any. And return 0
      $$.log(err);
      return err;
    });
  return respon;
  }

/* when element1 is clicked display option element 2*/
function click(element, style, element2) {
	let eventelem = $$.id(element); 
	eventelem.addEventListener("click", function() {
		let changelem = $$.id(element2);
		changelem.style = style;
	});
}

// make element with position: absolute draggable
function makeDraggable(id) {
// Make the DIV element draggable:

	// test if screen size is big enough for dragging
    dragElement(document.getElementById(id));

  function dragElement(elmnt) {
  	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  	if (document.getElementById(elmnt.id + "header")) {
   		// if present, the header is where you move the DIV from:
   		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  	} else {
   		// otherwise, move the DIV from anywhere inside the DIV:
   		elmnt.onmousedown = dragMouseDown;
  	}

  function dragMouseDown(e) {
   	e = e || window.event;
   	e.preventDefault();
   	// get the mouse cursor position at startup:
   	pos3 = e.clientX;
   	pos4 = e.clientY;
   	document.onmouseup = closeDragElement;
   	// call a function whenever the cursor moves:
   	document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
	if (innerWidth <= 500) {
		return;
	}
   	e = e || window.event;
   	e.preventDefault();
   	// calculate the new cursor position:
   	pos1 = pos3 - e.clientX;
   	pos2 = pos4 - e.clientY;
   	pos3 = e.clientX;
   	pos4 = e.clientY;
   	// set the element's new position:
   	elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
   	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  	}
  }
}
