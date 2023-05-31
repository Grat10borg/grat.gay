"use strict";
const $ = document;
const $$ = {
    dom: document,
    id: $.getElementById.bind($),
    class: $.getElementsByClassName.bind($),
    make: $.createElement.bind($),
    query: $.querySelector.bind($),
    query_all: $.querySelectorAll.bind($),
    log: console.log,
};
