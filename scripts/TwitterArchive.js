"use strict";
console.log(document.location.hash);
let TWAArray = new Array("16pxl / 8pxl^TwitterBackup/8pxl_TwitterAccount_PixelartRealLifeMediums.png", "16pxl / 8pxl^TwitterBackup/16pxl_CloudTutorial_BookmarkDump.png", "AngrSnail^TwitterBackup/AngrySnail_TreeTutorial_bookmarkDump.png", "BoJustBo1^TwitterBackup/BoJustBo1_AA_BookmarkDump.png", "BokiPixelart^TwitterBackup/BOKiBOKI_TwitterAccount_OBSPixelart.png", "curemoto_dot^TwitterBackup/Curemoto_dot_AnimeEyes_BookmarkDump.png", "Franrekk^TwitterBackup/Franek_AAVector_BookmarkDump.png", "Franrekk^TwitterBackup/Franek_SmallBushTutorial_BookmarkDump.png", "Franrekk^TwitterBackup/Franek_WaterColors_BookmarkDump.png", "Franrekk^TwitterBackup/Franek_WaterColors_BookmarkDump2.png", "iws_nbs_tmr^TwitterBackup/iws_nbs_tmr_PixelartRealLifeMediums_Account.png", "KupoGames^TwitterBackup/Matt_LegoMosiac_PixelartRealLifeMediums.png", "mysunnyrose^TwitterBackup/mysunnyrose_AAExamples_BookmarkDump.png", "poribaketu137^TwitterBackup/poribaketu137_X_ModelLive2D_BookmarkDump.png", "RhlPixels^TwitterBackup/RHLPixels_Pallettes_BookmarkDump.png", "_IAmSaKo_^TwitterBackup/Sako_CoolRGB_1_BookmarkDump.png", "_IAmSaKo_^TwitterBackup/Sako_CoolRGB_2_BookmarkDump.png", "_IAmSaKo_^TwitterBackup/Sako_CoolRGB_3_BookmarkDump.png", "_IAmSaKo_^TwitterBackup/Sako_CoolRGB_4_BookmarkDump");
switch (document.location.hash !== "") {
    case document.location.hash == "#16pxl":
        placeBackup(TWAArray[0]);
        break;
    case document.location.hash == "#16pxl/clouds":
        placeBackup(TWAArray[1]);
        break;
    case document.location.hash == "#AngrySnail/trees":
        placeBackup(TWAArray[2]);
        break;
    case document.location.hash == "#Bo/AA":
        placeBackup(TWAArray[3]);
        break;
    case document.location.hash == "#boki":
        placeBackup(TWAArray[4]);
        break;
    case document.location.hash == "#curemoto/eyes":
        placeBackup(TWAArray[5]);
        break;
    case document.location.hash == "#franrek/AAvector":
        placeBackup(TWAArray[6]);
        break;
    case document.location.hash == "#franrek/bushes":
        placeBackup(TWAArray[7]);
        break;
    case document.location.hash == "#franrek/watercolors":
        placeBackup(TWAArray[8]);
        break;
    case document.location.hash == "#iws_nbs_tmr/beads":
        placeBackup(TWAArray[10]);
        break;
    case document.location.hash == "#KupoGames/lego":
        placeBackup(TWAArray[11]);
        break;
    case document.location.hash == "#mysunnyrose/AA":
        placeBackup(TWAArray[12]);
        break;
    case document.location.hash == "#poribaketu137/XYModelRef":
        placeBackup(TWAArray[13]);
        break;
    case document.location.hash == "#RhlPixels/palettes":
        placeBackup(TWAArray[13]);
        break;
    case document.location.hash == "#_IAmSaKo_/RGBTrick":
        placeBackup(TWAArray[13]);
        break;
    default:
        break;
}
function placeBackup(string) {
    var _a;
    let res = string.split("^");
    let img = document.createElement("img");
    img.src = res[1];
    console.log(img);
    console.log(document.getElementById("TWA_img"));
    (_a = document.getElementById("TWA_img")) === null || _a === void 0 ? void 0 : _a.append(img);
}
