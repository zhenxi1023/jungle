// chrome.tabs.query({currentWindow: true}, function (tabs) {
//   console.log('aaaaaa');
//   console.log(tabs)
// });



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.type === 'main') {
    let arr = request.message;
    for (let i = 0; i < arr.length; i++) {
      chrome.tabs.query({currentWindow: true, url: (request.url + arr[i])}, function (tab) {
        // console.log(tab)
        let f_tab = tab.find(it=>it.index > request.index && it.index <= request.index + arr.length);
        chrome.tabs.executeScript(f_tab.id, {file: 'operate.js'}, function (array) {
          // do nothing
          console.log("it's ok", f_tab.id);
          sendResponse("yes...");
        })
      })
    }
  } else if (request.type === 'account') {
    let r4 = /&marketplaceId=(.+)/;
    chrome.tabs.query({currentWindow: true, url: (request.url + "/orders-v3/order/"+request.message)},
        function (tab) {
      chrome.tabs.executeScript(tab[0].id, {file: 'ex.js'}, function (array) {
        // do nothing
        sendResponse("yes...")
      })
    })
  } else if (request.type === 'ex') {
    window.marketplaceId = request.message;
    // sendResponse("yes...")
  } else if (request.type === 'mar') {
    sendResponse(window.marketplaceId);
  }

});


chrome.extension.onConnect.addListener(port => {
  // console.log("connecting.....");
  port.onMessage.addListener(message => {
    let arr=[];
    if (window.x_tabs_records) {
      arr = window.x_tabs_records;
      let record = arr.find(it=>it.id === message.id);
      if (!record) {
        arr.push(message);
        window.x_tabs_records = arr;
      }
    } else {
      arr = [];
      arr.push(message);
      window.x_tabs_records = arr;
    }
    // console.log("get: ", message);


    port.postMessage("Already got....");
  })
});


function get_all() {
  const views = chrome.extension.getViews({type: 'popup'});

}