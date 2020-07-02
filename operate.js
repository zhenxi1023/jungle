

document.addEventListener('readystatechange', function (event) {
  console.log('...in');
  if(event.target.readyState === 'complete') {
    console.log(event.target.readyState);
    operate();
  }
});

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    operate();
  }
};



function operate() {

  let buttons = document.getElementById("ayb-reviews").querySelectorAll("button");
  if (buttons && buttons > 1) {
    let yes = buttons[1].click();
    window.close();
  }

}

