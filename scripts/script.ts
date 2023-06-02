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

let favicon = $$.id("Favicon") as HTMLElement;
// lets us select where the start of the filepath should be inside the HTML files
let P_path = $$.id("path") as HTMLElement;
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

// filename, Artname, LinkInnerhtml, Link, Description, Writer
let FanartInfo = Array(
  "Fanart\\GratAndPudding_@HaybleneVT.png; Grat And Some Pudding!; @HaybleneVT on Twitter; https://twitter.com/HaybleneVT; Hayblene bestie drew this Grat awhile back! its actually my first fanart ever!!; Grat_Grottenberg",
  "GratMebo.gif; Grat Amibo i made in Crocotile3D; @Grat_Grottenberg on Twitter; https://twitter.com/GratGrottenberg; Please place on a skylanders portal to continue; Grat_Grottenberg"
) as Array<string>;

// test if its an Art Display
let ArtworkImages = $$.id("ArtworkImages") as HTMLElement;
if (ArtworkImages != null) {
  // if ArtWork Models is on the page.
  for (let index = 0; index < ArtworkInfo.length; index++) {
    const element = ArtworkInfo[index].split(";");
    PrintArtwork(element[0], element[1], element[2]);
  }
}

// test if its a Fanart Slideshow
let FanartArt = $$.id("FanartSlide") as HTMLElement;
if (FanartArt != null) {
  PrintFanartSlide();
}

function PrintFanartSlide() {
  for (let index = 0; index < FanartInfo.length; index++) {
    const element = FanartInfo[index].split(";");

    let CauselItemDiv = $$.make("div") as HTMLDivElement;
    let Slideimg = $$.make("img") as HTMLImageElement;
    let captionCauselDiv = $$.make("div") as HTMLDivElement;
    let spacingDiv = $$.make("div") as HTMLDivElement;
    let SlideshowCaptionDiv = $$.make("div") as HTMLDivElement;
    let SlideshowH3 = $$.make("h3") as HTMLHeadingElement;
    let SlideshowP = $$.make("p") as HTMLParagraphElement;
    if (index == 0) {
      // first item needs active for it to have a starting image.
      CauselItemDiv.classList.add("active", "carousel-item");
    } else {
      CauselItemDiv.classList.add("carousel-item");
    }
    CauselItemDiv.setAttribute("data-bs-interval", "25000");
    Slideimg.setAttribute("src", `Artwork\\${element[0]}`);
    Slideimg.classList.add("d-block", "carouselImg");
    Slideimg.title = `${element[0]} by ${element[2]}`;
    Slideimg.alt = `${element[0]} by ${element[2]}`;
    captionCauselDiv.classList.add(
      "mx-5",
      "carousel-caption",
      "text-start",
      "d-block"
    );
    spacingDiv.classList.add("mt-5", "pt-5", "SpacingDiv");
    SlideshowCaptionDiv.classList.add("py-3", "my-3", "SlideshowCaption");
    SlideshowH3.classList.add("mx-5");
    SlideshowH3.innerHTML = `${element[1]} by <a href="${element[3]}">${element[2]}</a>`;
    SlideshowP.classList.add("mx-5", "fs-5");
    SlideshowP.innerHTML = `"" ${element[4]} "" -${element[5]}`;

    SlideshowCaptionDiv.append(SlideshowH3);
    SlideshowCaptionDiv.append(SlideshowP);
    spacingDiv.append(SlideshowCaptionDiv);
    captionCauselDiv.append(spacingDiv);

    CauselItemDiv.append(Slideimg);
    CauselItemDiv.append(captionCauselDiv);
    FanartArt.append(CauselItemDiv);
  }
}

function PrintArtwork(ArtworkSrc: string, Alt: string, Date: string) {
  let ArtPath = $$.id("ArtPath")?.innerHTML as string;
  // Setting up Images on Page
  let ArtworkImages = $$.id("ArtworkImages") as HTMLElement;
  let OverDiv = $$.make("div") as HTMLElement;
  let UnderDiv = $$.make("div") as HTMLElement;
  let imgA = $$.make("a") as HTMLAnchorElement;
  let ImgThumbnail = $$.make("img") as HTMLElement;
  let CaptionP = $$.make("p") as HTMLElement;
  OverDiv.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-center",
    "col",
    "m-2"
  );
  UnderDiv.classList.add("UnderArtDiv"); // for styling.
  CaptionP.classList.add("text-center", "mx-3");
  CaptionP.innerHTML = Alt;
  imgA.setAttribute("href", `${ArtPath}${ArtworkSrc}`);
  ImgThumbnail.classList.add(
    "img-thumb",
    "imgpix",
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


//#region Anti-theft inspect element stopper 

// stops right click inspect element.
// document.addEventListener("contextmenu", function (e){
//   e.preventDefault();
// }, false);
// // Note: Not needed, prints a message when people right click
// let Html = document.querySelector("html") as HTMLElement;
// Html.oncontextmenu = function() {
//   alert("Hui! :3");
// }

//#endregion

function IframeBuilder(IframeId: string) {
  // if ID is a channel: login_name or a video Id: id
  var options;
  // channel: 'marinemammalrescue',
  let channel = IframeId;
  options = {
    height: 420,
    width: 780,
    channel,
    allowfullscreen: true,
    layout: "video",
    muted: false,
    parent: ["mother1brain.neocities.org", "localhost"],
  };
  $$.log(options);
  //@ts-ignore
  var player = new Twitch.Embed("twitch-stream", options);
}

async function RSSBlogBuilder(Url: string) {
  $$.log(await $$.api(Url));
}