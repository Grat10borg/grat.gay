let slideIndex = 1;
showSlides(slideIndex);

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

// Modal Import.
let ArtworkSrcs = Array(
  "GratFumo.png",
  "Butt.gif",
  "Butt2.gif",
  "illuProfile.png",
  "Lampreyhole.png",
  "OfflineScreenGratVer1.png",
  "Sprite-0001.png"
);
let ArtPath = document.getElementById("ArtPath")?.innerHTML as string;

function printArtModals(ArtworkSrc: string, Alt: string) {
  let ArtworkImages = document.getElementById("ArtworkImages") as HTMLElement;
  let OverDiv = document.createElement("div") as HTMLElement;
  let UnderDiv = document.createElement("div") as HTMLElement;
  let ImgThumbnail = document.createElement("img") as HTMLElement;
  let CaptionP = document.createElement("p") as HTMLElement;
  OverDiv.classList.add("d-flex", "align-items-center", "justify-content-center", "col", "m-2");
  CaptionP.classList.add("text-center", "mx-3");
  CaptionP.innerHTML=Alt;
  ImgThumbnail.classList.add("img-thumb", "rounded", "alt", "hover-shadow");
  ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
  ImgThumbnail.setAttribute("alt", Alt);
  ImgThumbnail.setAttribute("onclick", "1");

  UnderDiv.append(ImgThumbnail);
  UnderDiv.append(CaptionP);
  OverDiv.append(UnderDiv);
  ArtworkImages.append(OverDiv);
}

// Modal Handling

// Open the Modal
function openModal() {
  let ArtModal = document.getElementById("ArtworkModels") as HTMLElement;
  ArtModal.style.display = "block";
}

// Close the Modal
function closeModal() {
  let ArtModal = document.getElementById("ArtworkModels") as HTMLElement;
  ArtModal.style.display = "none";
}

// Next/previous controls
function plusSlides(number: number) {
  showSlides((slideIndex += number));
}

// Thumbnail image controls
function currentSlide(number: number) {
  showSlides((slideIndex = number));
}

function showSlides(number: number) {
  var i: number;
  var slides = document.getElementsByClassName("SlideImage") as any;
  // tests if there even is slides on this page. if not dont do anything
  if (slides.length != 0) {
    var imgs = document.getElementsByClassName("alt") as any;
    var captionText = document.getElementById("caption") as any;
    if (number > slides.length) {
      slideIndex = 1;
    }
    if (number < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    captionText.innerHTML = imgs[slideIndex - 1].alt;
  }
  // else you arent on the correct page
}
//#endregion
