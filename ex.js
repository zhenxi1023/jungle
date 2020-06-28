let request = document
    .querySelector(".a-column.a-span6.a-text-right.a-span-last")
    .querySelectorAll('span')[6].children[0];
let href = request.href;
let r4 = /&marketplaceId=(.+)/;
let marketplaceId = href.match(r4)[1];

chrome.runtime.sendMessage({
  message: marketplaceId,
  type: 'ex'
}, function (response) {
  // do nothing
});