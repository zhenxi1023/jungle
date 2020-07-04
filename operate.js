



document.addEventListener('readystatechange', function (event) {
  console.log('...in');
  if(event.target.readyState === 'complete') {
    console.log(event.target.readyState);
    operate();
  }
});


document.body.addEventListener("DOMNodeRemoved", function (event) {
  if (event.target.id === "ayb-reviews") {
    console.log("ayb-reviews")
  }
});


function operate() {

  let ex_buttons = document.getElementById("ayb-reviews").querySelectorAll("button");

  if (!ex_buttons || ex_buttons.length !== 2) {
    window.close();
  } else {
    let buttons = [...ex_buttons];
    console.log(buttons);
    let yes = buttons[1].click();

  }


}

