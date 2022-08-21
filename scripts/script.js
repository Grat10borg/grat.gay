"use strict";
let DocTitlenames = Array("Website of Mother1Brain", "Data Central: Brain Mother", "Mother-Data: Brain Central", "Brain Central: Data Mother", "undefined-Brain: undefined Data", "Mom-brain: Integer Control", "Mother-brain: Data Central", "Are you reloading the page?", "Data Mother: Central Brain", "Central: Data Brain Mother", "Brain Data: Mother Central", "YT: 'watch?v=DLzxn1SgKds' Watch..");
document.title = DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
let faviconSrcs = Array("MotherBrainIconGrat.png", "MotherBrainIconChar.png", "MotherBrainIconCRT.png", "MotherBrainIconIllu.png", "MotherBrainIconTessa.png");
let favicon = document.getElementById("Favicon");
let P_path = document.getElementById("path");
favicon.setAttribute("href", `${P_path.textContent}${faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)]}`);
