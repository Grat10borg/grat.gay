// Shorthand Dom versions
const $ = document;
const $$ = {
dom: document,

// document methods
id: $.getElementById.bind($),
class: $.getElementsByClassName.bind($),
make: $.createElement.bind($),
query: $.querySelector.bind($),
query_all: $.querySelectorAll.bind($),

// custome methods bellow this
api: ApiCall.bind($),
tag: tag.bind($),

// just here to help me out when working.
log: console.log,
}

function tag(element: any, find:string) {
return element.getElementsByTagName(find);
}

// Calls Twitch API or another API if turned on
async function ApiCall(HttpCall: string) {
    const respon = await fetch(`${HttpCall}`, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    })
  .then((respon) => respon.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
      // Return Response on Success
      return data;
    })
    .catch((err) => {
      // Print Error if any. And return 0
      $$.log(err);
      return err;
    });
  return respon;
  }
