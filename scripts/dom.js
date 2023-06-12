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
const $ = document;
const $$ = {
    dom: document,
    id: $.getElementById.bind($),
    class: $.getElementsByClassName.bind($),
    make: $.createElement.bind($),
    query: $.querySelector.bind($),
    query_all: $.querySelectorAll.bind($),
    api: ApiCall.bind($),
    tag: tag.bind($),
    log: console.log,
};
function tag(element, find) {
    return element.getElementsByTagName(find);
}
function ApiCall(HttpCall) {
    return __awaiter(this, void 0, void 0, function* () {
        const respon = yield fetch(`${HttpCall}`, {
            headers: {
                "Content-Type": "application/rss+xml; charset=utf-8",
            },
        })
            .then((respon) => respon.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then((data) => {
            return data;
        })
            .catch((err) => {
            $$.log(err);
            return err;
        });
        return respon;
    });
}
