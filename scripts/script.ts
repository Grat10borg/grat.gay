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
  "YT: 'watch?v=DLzxn1SgKds' Watch.."
);

// picks a random title from DocTitlenames and sets it as the Title of the document
document.title =
  DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
//#endregion

//#region Random Favicon Selector
let faviconSrcs = Array(
  "MotherBrainIconGrat.png",
  "MotherBrainIconChar.png",
  "MotherBrainIconCRT.png",
  "MotherBrainIconIllu.png",
  "MotherBrainIconTessa.png"
);

let favicon = document.getElementById("Favicon") as HTMLElement;
// lets us select where the start of the filepath should be inside the HTML files
let P_path = document.getElementById("path") as HTMLElement;
favicon.setAttribute(
  "href",
  `${P_path.textContent}${
    faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)]
  }?v=${Math.random() * 10}`
);
//#endregion

//#region Artwork Page Modal Import & Handling

// Filename, Description, Date you want displayed
// USING A ; in the description will break it!
let ArtworkInfo = Array(
  "GratFumo.png; Fumo Grat; 27. 9 2022",
  "Butt.gif; Icon of the Motherbrain Discord; 27. 9 2022",
  "Butt2.gif; Prototype Icon; 27. 9 2022",
  "IlluProfile.png; Illu Winks!; 27. 9 2022",
  "Lampreyhole.png; Lampreyhole; 27. 9 2022",
  "OfflineScreenGratVer1.png; OfflineScreen i use for Twitch!; 27. 9 2022",
  "Sprite-0001.png; Jerma roblox horror stream thumbnail; 27. 9 2022",
  "Skærmbillede 2022-08-04 230758.png; Mascot for H.O.T!; 27. 9 2022",
  "GratMebo.gif; Please place on a Skylanders™ portal; 29. 9 2022",
  "RotatePanties.gif; Rotating underwear; 29. 9 2022",
  "Skærmbillede 2022-09-10 173921.png; A N G E R Y; 29. 9 2022",
  "SpinGifHOT.gif; Full view of H.O.T's Mascot!; 29. 9 2022"
) as Array<string>;

// splits big array into smaller arrays
let ArtworkSrcs = Array() as Array<string>;
let ArtworkAlt = Array() as Array<string>;
let ArtworkDate = Array() as Array<string>;
for (let index = 0; index < ArtworkInfo.length; index++) {
  const element = ArtworkInfo[index].split(";");
  ArtworkSrcs.push(element[0]);
  ArtworkAlt.push(element[1]);
  ArtworkDate.push(element[2]);
}

let ArtworkModels = document.getElementById("ArtworkModels") as HTMLElement;
if (ArtworkModels != null) {
  // if ArtWork Models is on the page.
  for (let index = 0; index < ArtworkSrcs.length; index++) {
    // print all images
    PrintArtwork(ArtworkSrcs[index], ArtworkAlt[index]);
  }
}
// Modal Import.

function PrintArtwork(ArtworkSrc: string, Alt: string) {
  let ArtPath = document.getElementById("ArtPath")?.innerHTML as string;

  // Setting up Images on Page
  let ArtworkImages = document.getElementById("ArtworkImages") as HTMLElement;
  let OverDiv = document.createElement("div") as HTMLElement;
  let UnderDiv = document.createElement("div") as HTMLElement;
  let imgA = document.createElement("a") as HTMLAnchorElement;
  let ImgThumbnail = document.createElement("img") as HTMLElement;
  let CaptionP = document.createElement("p") as HTMLElement;
  OverDiv.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-center",
    "col",
    "m-2"
  );
  CaptionP.classList.add("text-center", "mx-3");
  CaptionP.innerHTML = Alt;
  imgA.setAttribute("href", `${ArtPath}${ArtworkSrc}`);
  ImgThumbnail.classList.add(
    "img-thumb",
    "rounded",
    "alt",
    "hover-shadow",
    "m-auto",
    "d-block"
  );
  ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
  ImgThumbnail.setAttribute("alt", Alt);
  imgA.append(ImgThumbnail);
  UnderDiv.append(imgA);
  UnderDiv.append(CaptionP);
  OverDiv.append(UnderDiv);
  ArtworkImages.append(OverDiv);
}

//#endregion
