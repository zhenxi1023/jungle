

document.addEventListener('DOMContentLoaded', function () {
  let $start = document.getElementById('start');
  let $stop = document.getElementById('stop');


  $start.addEventListener('click', function (event) {
    // if (!is_clicked) {
    //
    //   window.sessionStorage.setItem("x_amz_jungle_is_clicked", "true");
    // } else {
    //   restart_listen();
    // }
    start_listen();
  }, true);


  $stop.addEventListener('click', function (event) {
    stop_ops();
  }, true);

});


function stop_ops() {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    tabs.forEach(function (item) {
      chrome.tabs.sendMessage(item.id, {message: 'stop'}, function (response) {
        // do nothing
        console.log(response);
      })
    });
  });

}


function start_listen() {

  chrome.tabs.executeScript(null, {
    file: 'main.js'
  }, function (array) {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      tabs.forEach(function (item) {
        chrome.tabs.sendMessage(item.id, {message: 'start'}, function (response) {
          // do nothing
          console.log(response)
        })
      })
    });

  });

}


function restart_listen() {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    tabs.forEach(function (item) {
      chrome.tabs.sendMessage(item.id, {message: 'restart'}, function (response) {
        // do nothing
        console.log(response)
      })
    })
  })
}
