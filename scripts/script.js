"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let DocTitlenames = Array("Website of Mother1Brain", "Data Central: Brain Mother", "Mother-Data: Brain Central", "Brain Central: Data Mother", "undefined-Brain: undefined Data", "Mom-brain: Integer Control", "Mother-brain: Data Central", "Are you reloading the page?", "Data Mother: Central Brain", "Central: Data Brain Mother", "Brain Data: Mother Central", "YT: 'watch?v=DLzxn1SgKds' Watch..");
document.title = DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
let faviconSrcs = Array("MotherBrainIconGrat", "MotherBrainIconChar", "MotherBrainIconCRT", "MotherBrainIconIllu", "MotherBrainIconTessa");
$$.id("Favicon").setAttribute("href", `${$$.id("path").textContent}${faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)] + ".png"}?v=${Math.random() * 10}`);
let ArtworkInfo = Array("GratFumo.png; Fumo Grat; 27. 9 2022", "Butt.gif; Icon of the Motherbrain Discord; 27. 9 2022", "Butt2.gif; Prototype Icon; 27. 9 2022", "IlluProfile.png; Illu Winks!; 27. 9 2022", "Lampreyhole.png; Lampreyhole; 27. 9 2022", "OfflineScreenGratVer1.png; OfflineScreen i use for Twitch!; 27. 9 2022", "Sprite-0001.png; Jerma roblox horror stream thumbnail; 27. 9 2022", "Skærmbillede 2022-08-04 230758.png; Mascot for H.O.T!; 27. 9 2022", "GratMebo.gif; Please place on a Skylanders™ portal; 29. 9 2022", "RotatePanties.gif; Rotating underwear; 29. 9 2022", "Skærmbillede 2022-09-10 173921.png; A N G E R Y; 29. 9 2022", "SpinGifHOT.gif; Full view of H.O.T's Mascot!; 29. 9 2022");
let FanartInfo = Array("Fanart\\GratAndPudding_@HaybleneVT.png; Grat And Some Pudding!; @HaybleneVT on Twitter; https://twitter.com/HaybleneVT; Hayblene bestie drew this Grat awhile back! its actually my first fanart ever!!; Grat_Grottenberg", "GratMebo.gif; Grat Amibo i made in Crocotile3D; @Grat_Grottenberg on Twitter; https://twitter.com/GratGrottenberg; Please place on a skylanders portal to continue; Grat_Grottenberg");
let ArtworkImages = $$.id("ArtworkImages");
if (ArtworkImages != null) {
    for (let index = 0; index < ArtworkInfo.length; index++) {
        const element = ArtworkInfo[index].split(";");
        PrintArtwork(element[0], element[1], element[2]);
    }
}
let FanartArt = $$.id("fanartslide");
if (FanartArt != null)
    PrintFanartSlide();
function PrintFanartSlide() {
    for (let index = 0; index < FanartInfo.length; index++) {
        const element = FanartInfo[index].split(";");
        let CauselItemDiv = $$.make("div");
        let Slideimg = $$.make("img");
        let captionCauselDiv = $$.make("div");
        let spacingDiv = $$.make("div");
        let SlideshowCaptionDiv = $$.make("div");
        let SlideshowH3 = $$.make("h3");
        let SlideshowP = $$.make("p");
        if (index == 0) {
            CauselItemDiv.classList.add("active", "carousel-item");
        }
        else {
            CauselItemDiv.classList.add("carousel-item");
        }
        CauselItemDiv.setAttribute("data-bs-interval", "25000");
        Slideimg.setAttribute("src", `Artwork\\${element[0]}`);
        Slideimg.classList.add("d-block", "carouselImg");
        Slideimg.title = `${element[0]} by ${element[2]}`;
        Slideimg.alt = `${element[0]} by ${element[2]}`;
        captionCauselDiv.classList.add("mx-5", "carousel-caption", "text-start", "d-block");
        spacingDiv.classList.add("mt-5", "pt-5", "spacingdiv");
        SlideshowCaptionDiv.classList.add("py-3", "my-3", "slideshowcaption");
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
function PrintArtwork(ArtworkSrc, Alt, Date) {
    var _a;
    let ArtPath = (_a = $$.id("ArtPath")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    let ArtworkImages = $$.id("ArtworkImages");
    let OverDiv = $$.make("div");
    let UnderDiv = $$.make("div");
    let imgA = $$.make("a");
    let ImgThumbnail = $$.make("img");
    let CaptionP = $$.make("p");
    OverDiv.classList.add("d-flex", "align-items-center", "justify-content-center", "col", "m-2");
    UnderDiv.classList.add("UnderArtDiv");
    CaptionP.classList.add("text-center", "mx-3");
    CaptionP.innerHTML = Alt;
    imgA.setAttribute("href", `${ArtPath}${ArtworkSrc}`);
    ImgThumbnail.classList.add("img-thumb", "imgpix", "rounded", "alt", "hover-shadow", "m-auto", "d-block");
    ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
    ImgThumbnail.setAttribute("alt", Alt);
    imgA.append(ImgThumbnail);
    UnderDiv.append(imgA);
    UnderDiv.append(CaptionP);
    OverDiv.append(UnderDiv);
    ArtworkImages.append(OverDiv);
}
function IframeBuilder(IframeId) {
    var options;
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
    var player = new Twitch.Embed("twitch-stream", options);
}
function RSSBlogBuilder(Url) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let VTSocialRss = yield $$.api(Url);
        let Toots = VTSocialRss.getElementsByTagName("channel")[0].getElementsByTagName("item");
        for (let index = 0; index < Toots.length; index++) {
            const element = Toots[index];
            let ContentDiv = $$.make("div");
            ContentDiv.classList.add("vttoot");
            ContentDiv.insertAdjacentHTML("beforeend", element.getElementsByTagName("description")[0].textContent);
            let link = $$.make("a");
            link.href = element.getElementsByTagName("link")[0].innerHTML;
            link.innerHTML = "Orginal post -> " + element.getElementsByTagName("link")[0].innerHTML;
            link.classList.add("rsslink");
            ContentDiv.append(link);
            (_a = $$.id("rssblog_import")) === null || _a === void 0 ? void 0 : _a.append(ContentDiv);
            if (index == 9)
                return;
        }
    });
}
