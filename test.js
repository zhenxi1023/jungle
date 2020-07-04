

document.addEventListener('DOMContentLoaded', function () {
  let $start = document.getElementById('start');
  let $stop = document.getElementById('stop');
  let $selectAll = document.getElementById("amz-select-all");


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


  // $selectAll.removeEventListener('click', click, true);

  $selectAll.addEventListener('click', click, {once: true});



});


let click = ()=> {
  select_orders_all_in_page();
};


function select_orders_all_in_page() {

  let is_main_has = chrome.extension.getBackgroundPage();

  if (is_main_has.x_tabs_records) {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {


      // let port = chrome.extension.connect({name: 'Jungle'});
      //
      // port.postMessage({id: tabs[0].id});
      // port.onMessage.addListener(message=>{
      //   // do nothing
      //   console.log("get message: ", message);
      // });


      tabs.forEach(function (item) {
        chrome.tabs.sendMessage(item.id, {message: 'select_all', index: item.index}, function (response) {
          // do nothing
          if (!response) {
            chrome.tabs.executeScript(item.id, {file: 'main.js'}, function (array) {
              chrome.tabs.query({active: true, currentWindow: true}, function (tabs1) {
                let port = chrome.extension.connect({name: 'Jungle'});

                port.postMessage({id: tabs[0].id});
                port.onMessage.addListener(message=>{
                  // do nothing
                  console.log("get message: ", message);
                });

                tabs1.forEach(function (it) {
                  chrome.tabs.sendMessage(it.id, {message: 'select_all', index: it.index}, function (response) {
                    // do nothing
                    console.log(response)
                  })
                });
              })
            })
          }
        })
      });


    });


  } else {

    chrome.tabs.executeScript(null, {
      file: 'main.js'
    }, function (array) {

      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {


        let port = chrome.extension.connect({name: 'Jungle'});

        port.postMessage({id: tabs[0].id});
        port.onMessage.addListener(message=>{
          // do nothing
          console.log("get message: ", message);
        });


        tabs.forEach(function (item) {
          chrome.tabs.sendMessage(item.id, {message: 'select_all', index: item.index}, function (response) {
            // do nothing
            console.log(response)
          })
        });


      });


    });

  }


}


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
    file: 'pre.js'
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
