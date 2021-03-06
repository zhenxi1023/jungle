
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'start') {
    // start_listen();
    console.log('starting....');
    // sendResponse("start, done");
  } else if (request.message === 'stop') {
    // stop_ops();
    console.log('stopping....');
    // sendResponse("stop, done");
  } else if (request.message === 'restart') {
    // start_listen();
    console.log("restarting....");
    // sendResponse("restart, done");
  } else if (request.message === 'select_all') {
    select_all(request.index);
    console.log("select_all_orders_in_page");
    sendResponse("select all orders in page, done");
  }
});



function select_all(currentIndex) {
  // get_marketplace_id(select_step1(), currentIndex);
  let ex_ids = document.querySelectorAll("option.sc-mkt-picker-switcher-select-option[selected]");
  let ids = [...ex_ids];
  ids.forEach(function (item) {
    let value = item.value;
    let r5 = /mons_sel_mkid=(.+)/;
    let marketplaceId = value.match(r5)[1];
    select_step2(select_step1(), currentIndex, marketplaceId);
  })

  // let arr = ["/zhenxi1023/jungle", "/zhenxi1023", "/zhenxi1023/type"];
  //
  // console.log(arr);
  // for (let i = 0; i < arr.length; i++) {
  //   window.open(arr[i]);
    // window.location.href = arr[i];
  // }


}


function select_step1() {
  let ex_orders = document.getElementById("orders-table").querySelectorAll("tbody > tr");
  let orders = [...ex_orders];
  let da = orders.map(function (item, index) {
    let row = item; // dom tr
    let columns = row.children; // dom td
    let date = columns[5].innerText.split("\n");
    // if (is_allowed_to_send_request(date)) {
      let href = columns[2].querySelector(".cell-body-title").children[0].innerText;
      return {href};
    // }
  });
  return da.filter(it=>it);
}



function get_marketplace_id(array, currentIndex) {
  if (array.length) {
    let href = array[0];
    window.open(`/orders-v3/order/${href}`);
    let r3 = /(https?:\/\/[0-9a-zA-Z.]+)/;
    chrome.runtime.sendMessage({
      type: 'account',
      message: href,
      url: window.location.href.match(r3)[0]
    }, function (response) {
      chrome.runtime.sendMessage({
        type: 'mar',
      }, function (response) {
        select_step2(array, currentIndex, response)
      })
    })
  }
}


// document.querySelectorAll("option.sc-mkt-picker-switcher-select-option") return NodeList
// currnetSelect it.selected=true marketplaceId=it.value(with r2)
function select_step2(array, currentIndex, marketplaceId) {
  array.forEach(function (item) {
    window.open(`/messaging/reviews?orderId=${item.href}&marketplaceId=${marketplaceId}`);
  });
  let r3 = /(https?:\/\/[0-9a-zA-Z.]+)/;
  chrome.runtime.sendMessage({
    type: "main",
    message: array,
    url: window.location.href.match(r3)[0],
    index: currentIndex
  }, function (response) {
    // do nothing
    console.log(response)
  })
}



// input array
function is_allowed_to_send_request(date) {
  let date1 = date[1];
  let date2 = date[2];
  let first = new RegExp("to").test(date1) ||
      new RegExp("到").test(date1) ||
      new RegExp("to").test(date2) ||
      new RegExp("到").test(date2);
  if (first) {
    return false;
  }

  let r = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Dec|[0-9])(.+)/i; // b and a
  let r2 = /[\u4e00-\u9fa5]/g; // a or c
  let res = date2.match(r)[0];
  let n;
  if (r2.test(res)) {
    n = res.replace(r2, "/");
  } else {
    n = res;
  }

  let da = new Date(n).valueOf();
  let d_start = da + 5 * 24 * 60 * 60 * 1000;
  let d_end = da + 30 * 24 * 60 * 60 * 1000;

  let now = Date.now();

  return now >= d_start && now <= d_end;

}



