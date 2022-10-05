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

let ArtworkSrcs = Array(
  "GratFumo.png",
  "Butt.gif",
  "Butt2.gif",
  "IlluProfile.png",
  "Lampreyhole.png",
  "OfflineScreenGratVer1.png",
  "Sprite-0001.png",
  "Skærmbillede 2022-08-04 230758.png",
  "GratMebo.gif",
  "RotatePanties.gif",
  "Skærmbillede 2022-09-10 173921.png",
  "SpinGifHOT.gif"
);
let ArtworkAlt = Array(
  "Fumo Grat",
  "Icon of the Motherbrain Discord",
  "Prototype Icon",
  "Illu Winks!",
  "Lampreyhole",
  "OfflineScreen",
  "Sprite-0001",
  "H.O.T's Mascot!",
  "Please Place on a Skylanders™ portal",
  "Around The World",
  "A N G E R Y",
  "H.O.T's Model!"
);

let ArtworkModels = document.getElementById("ArtworkModels") as HTMLElement;
if(ArtworkModels != null) { // if ArtWork Models is on the page.

let ArtworkModels = document.getElementById("ArtworkModels") as HTMLElement;
let CloseBtn = document.createElement("span") as HTMLElement;
CloseBtn.classList.add("close", "cursor");
CloseBtn.setAttribute("onclick", "closeModal()&times;");
ArtworkModels.append(CloseBtn);
let ModalContentDiv = document.createElement("div") as HTMLElement;
ModalContentDiv.classList.add("modal-content");
ModalContentDiv.setAttribute("id", "modal-content");
ArtworkModels.append(ModalContentDiv);
for (let index = 0; index < ArtworkSrcs.length; index++) {
  // print all images
  printArtModals(ArtworkSrcs[index], ArtworkAlt[index], index);
}
let prev = document.createElement("a") as HTMLElement;
prev.classList.add("prev");
prev.setAttribute("onclick", "plusSlides(-1)");
prev.innerHTML = "&#10094;";

let next = document.createElement("a") as HTMLElement;
next.classList.add("next");
next.setAttribute("onclick", "plusSlides(1)");
next.innerHTML = "&#10095;";

let captionContainer = document.createElement("div") as HTMLElement;
let captionP = document.createElement("p") as HTMLElement;
captionContainer.classList.add("caption-container");
captionP.setAttribute("id", "caption");

ModalContentDiv.append(prev);
ModalContentDiv.append(next);
captionContainer.append(captionP);
ModalContentDiv.append(captionContainer);
}
// Modal Import.

function printArtModals(ArtworkSrc: string, Alt: string, index: number) {
  let ArtPath = document.getElementById("ArtPath")?.innerHTML as string;

  // Setting up Images on Page
  let ArtworkImages = document.getElementById("ArtworkImages") as HTMLElement;
  let OverDiv = document.createElement("div") as HTMLElement;
  let UnderDiv = document.createElement("div") as HTMLElement;
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
  ImgThumbnail.classList.add("img-thumb", "rounded", "alt", "hover-shadow", "m-auto","d-block");
  ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
  ImgThumbnail.setAttribute("alt", Alt);
  ImgThumbnail.setAttribute("onclick", `openModal();currentSlide(${index+1})`);

  UnderDiv.append(ImgThumbnail);
  UnderDiv.append(CaptionP);
  OverDiv.append(UnderDiv);
  ArtworkImages.append(OverDiv);

  // Setting up Lightboxes
  let ModalContentDiv = document.getElementById("modal-content") as HTMLElement;
  let DivSlideImage = document.createElement("div") as HTMLElement;
  let DivNumber = document.createElement("div") as HTMLElement;
  let FullImage = document.createElement("img") as HTMLElement;
  DivSlideImage.classList.add("SlideImage", "justify-content-center");
  DivNumber.classList.add("numbertext");
  DivNumber.innerHTML = `${index+1} / ${ArtworkSrcs.length}`;
  FullImage.classList.add("fullimg");
  FullImage.setAttribute("src", `${ArtPath}${ArtworkSrc}`);

  DivSlideImage.append(DivNumber);
  DivSlideImage.append(FullImage);
  ModalContentDiv.append(DivSlideImage);
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
    slides[slideIndex - 1].style.display = "flex";
    
    captionText.innerHTML = imgs[slideIndex - 1].alt;
  }
  // else you arent on the correct page
}

//#endregion
