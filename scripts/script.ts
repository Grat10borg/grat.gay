//#region Random title selector 
// array for document titles
let DocTitlenames = Array(
  "Website of Mother1Brain",
  "Data Central: Brain Mother",
  "Mother-Data: Brain Central",
  "Brain Central: Data Mother",
  "undefined-Brain: undefined Data",
  "Mom-brain: Integer Control",
  "Mother-brain: Data Central",
  "Are you reloading the page?",
  "Data Mother: Central Brain",
  "Central: Data Brain Mother",
  "Brain Data: Mother Central",
  "YT: 'watch?v=DLzxn1SgKds' Watch..",
);

// picks a random title from DocTitlenames and sets it as the Title of the document
document.title = DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
//#endregion

//#region Random Favicon Selector
let faviconSrcs = Array("MotherBrainIconGrat.png",
"MotherBrainIconChar.png",
"MotherBrainIconCRT.png",
"MotherBrainIconIllu.png",
"MotherBrainIconTessa.png");

let favicon = document.getElementById("Favicon") as HTMLElement;
// lets us select where the start of the filepath should be inside the HTML files
let P_path = document.getElementById("path") as HTMLElement;
favicon.setAttribute("href", `${P_path.textContent}${faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)]}?v=${Math.random()*10}`);
//#endregion


