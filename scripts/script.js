"use strict";
let slideIndex = 1;
showSlides(slideIndex);
let DocTitlenames = Array("Website of Mother1Brain", "Data Central: Brain Mother", "Mother-Data: Brain Central", "Brain Central: Data Mother", "undefined-Brain: undefined Data", "Mom-brain: Integer Control", "Mother-brain: Data Central", "Are you reloading the page?", "Data Mother: Central Brain", "Central: Data Brain Mother", "Brain Data: Mother Central", "YT: 'watch?v=DLzxn1SgKds' Watch..");
document.title =
    DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
let faviconSrcs = Array("MotherBrainIconGrat.png", "MotherBrainIconChar.png", "MotherBrainIconCRT.png", "MotherBrainIconIllu.png", "MotherBrainIconTessa.png");
let favicon = document.getElementById("Favicon");
let P_path = document.getElementById("path");
favicon.setAttribute("href", `${P_path.textContent}${faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)]}?v=${Math.random() * 10}`);
let ArtworkSrcs = Array("GratFumo.png", "Butt.gif", "Butt2.gif", "illuProfile.png", "Lampreyhole.png", "OfflineScreenGratVer1.png", "Sprite-0001.png", "Skærmbillede 2022-08-04 230758.png");
let ArtworkAlt = Array("Fumo Grat", "Icon of the Motherbrain Discord", "Prototype Icon", "Illu Winks!", "Lampreyhole", "OfflineScreen", "Sprite-0001", "H.O.T's Mascot!");
let ArtworkModels = document.getElementById("ArtworkModels");
if (ArtworkModels != null) {
    let ArtworkModels = document.getElementById("ArtworkModels");
    let CloseBtn = document.createElement("span");
    CloseBtn.classList.add("close", "cursor");
    CloseBtn.setAttribute("onclick", "closeModal()&times;");
    ArtworkModels.append(CloseBtn);
    let ModalContentDiv = document.createElement("div");
    ModalContentDiv.classList.add("modal-content");
    ModalContentDiv.setAttribute("id", "modal-content");
    ArtworkModels.append(ModalContentDiv);
    for (let index = 0; index < ArtworkSrcs.length; index++) {
        printArtModals(ArtworkSrcs[index], ArtworkAlt[index], index);
    }
    let prev = document.createElement("a");
    prev.classList.add("prev");
    prev.setAttribute("onclick", "plusSlides(-1)");
    prev.innerHTML = "&#10094;";
    let next = document.createElement("a");
    next.classList.add("next");
    next.setAttribute("onclick", "plusSlides(1)");
    next.innerHTML = "&#10095;";
    let captionContainer = document.createElement("div");
    let captionP = document.createElement("p");
    captionContainer.classList.add("caption-container");
    captionP.setAttribute("id", "caption");
    ModalContentDiv.append(prev);
    ModalContentDiv.append(next);
    captionContainer.append(captionP);
    ModalContentDiv.append(captionContainer);
}
function printArtModals(ArtworkSrc, Alt, index) {
    var _a;
    let ArtPath = (_a = document.getElementById("ArtPath")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    let ArtworkImages = document.getElementById("ArtworkImages");
    let OverDiv = document.createElement("div");
    let UnderDiv = document.createElement("div");
    let ImgThumbnail = document.createElement("img");
    let CaptionP = document.createElement("p");
    OverDiv.classList.add("d-flex", "align-items-center", "justify-content-center", "col", "m-2");
    CaptionP.classList.add("text-center", "mx-3");
    CaptionP.innerHTML = Alt;
    ImgThumbnail.classList.add("img-thumb", "rounded", "alt", "hover-shadow", "m-auto", "d-block");
    ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
    ImgThumbnail.setAttribute("alt", Alt);
    ImgThumbnail.setAttribute("onclick", `openModal();currentSlide(${index + 1})`);
    UnderDiv.append(ImgThumbnail);
    UnderDiv.append(CaptionP);
    OverDiv.append(UnderDiv);
    ArtworkImages.append(OverDiv);
    let ModalContentDiv = document.getElementById("modal-content");
    let DivSlideImage = document.createElement("div");
    let DivNumber = document.createElement("div");
    let FullImage = document.createElement("img");
    DivSlideImage.classList.add("SlideImage");
    DivNumber.classList.add("numbertext");
    DivNumber.innerHTML = `${index + 1} / ${ArtworkSrcs.length}`;
    FullImage.classList.add("fullimg");
    FullImage.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
    DivSlideImage.append(DivNumber);
    DivSlideImage.append(FullImage);
    ModalContentDiv.append(DivSlideImage);
}
function openModal() {
    let ArtModal = document.getElementById("ArtworkModels");
    ArtModal.style.display = "block";
}
function closeModal() {
    let ArtModal = document.getElementById("ArtworkModels");
    ArtModal.style.display = "none";
}
function plusSlides(number) {
    showSlides((slideIndex += number));
}
function currentSlide(number) {
    showSlides((slideIndex = number));
}
function showSlides(number) {
    var i;
    var slides = document.getElementsByClassName("SlideImage");
    if (slides.length != 0) {
        var imgs = document.getElementsByClassName("alt");
        var captionText = document.getElementById("caption");
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
}
