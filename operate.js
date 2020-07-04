



document.addEventListener('readystatechange', function (event) {
  console.log('...in');
  if(event.target.readyState === 'complete') {
    console.log(event.target.readyState);
    operate();
  }
});


document.body.addEventListener("DOMNodeRemoved", function (event) {
  // console.log(event.target)
  if (event.target.class === "ayb-reviews-buttons-container") {
    console.log("ayb-reviews")
    // window.close();
  }
});


function operate() {

  let ex_buttons = document.getElementById("ayb-reviews").querySelectorAll("button");
  let b = [...ex_buttons];

  if (!ex_buttons || b.length !== 2) {
    window.close();
  } else {
    let buttons = [...ex_buttons];
    console.log(buttons);
    let yes = buttons[1].click();

  }


}

