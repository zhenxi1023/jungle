
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'start') {
    start_listen();
    console.log('starting....');
    sendResponse("start, done");
  } else if (request.message === 'stop') {
    stop_ops();
    console.log('stopping....');
    sendResponse("stop, done");
  } else if (request.message === 'restart') {
    start_listen();
    console.log("restarting....");
    sendResponse("restart, done");
  }
});



function stop_ops() {

  document.removeEventListener('mousedown', mousedown, true);

  window.removeEventListener('mousemove', mousemove, true);


}


function start_listen() {

  document.addEventListener('mousedown', mousedown, true);

}


const mousedown = (evt) => {

  if (!this.box) {
    var box = document.createElement('span');
    box.style.margin = '0px auto';
    box.style.border = '2px dotted red';
    box.style.position = 'absolute';
    box.style.zIndex = 2147483647;
    box.style.visibility = 'visible';
    box.x1 = box.x = evt.pageX;
    box.y1 = box.y = evt.pageY;

    this.box = box;

    document.body.appendChild(box);
  } else {
    this.box.style.visibility = 'visible';
    this.box.x1 = this.box.x = evt.pageX;
    this.box.y1 = this.box.y = evt.pageY;
  }

  if (this.links_allowed && this.links_allowed.length) {
    for (let i = 0; i < this.links_allowed.length; i++) {
      this.links_allowed[i].style.border = '';
    }
  }


  // this.box.x = evt.pageX;
  // this.box.y = evt.pageY;

  update_box(evt.pageX, evt.pageY);

  // console.log(this.box.x2)

  window.addEventListener('mousemove', mousemove, true);
  window.addEventListener('mouseup', mouseup, true);

};


function a_collect(x, y) {
  let x1 = parseInt(this.box.style.left.slice(0, this.box.style.left.length-2));
  let y1 = parseInt(this.box.style.top.slice(0, this.box.style.top.length-2));
  let startX, startY, endX, endY;
  let links_allowed = [];

  if (x > x1) {
    startX = x1;
    endX = x1 + parseInt(this.box.style.width.slice(0, this.box.style.width.length-2));
  } else {
    // startX = x1 - parseInt(this.box.style.width.slice(0, this.box.style.width.length-2));
    // endX = x1;
    startX = x1;
    endX = x1 + parseInt(this.box.style.width.slice(0, this.box.style.width.length-2));
  }

  if (y > y1) {
    startY = y1;
    endY = y1 + parseInt(this.box.style.height.slice(0, this.box.style.height.length-2));
  } else {
    // startY = y1 - parseInt(this.box.style.height.slice(0, this.box.style.height.length-2));
    // endY = y1;
    startY = y1;
    endY = y1 + parseInt(this.box.style.height.slice(0, this.box.style.height.length-2));
  }

  for (let it of document.links) {
    let midY = it.offsetHeight / 2 + it.offsetTop;
    let midX = it.offsetWidth / 2 + it.offsetLeft;
    let isAdd = midX > startX && midX <= endX && midY > startY && midY <= endY;
    // console.log({midX, midY, startX, endX}, isAdd);
    if (isAdd) {
      // it.setAttribute("style", "border:1px dotted lightred;");
      it.style.border = '1px dotted red';
      links_allowed.push(it);
      // console.log(it)
    }
  }
  this.links_allowed = links_allowed;
  // console.log(links_allowed)
  open_achors();
}


function open_achors() {
  for (let i = 0; i < this.links_allowed.length; i++) {
    window.open(this.links_allowed[i].href);
  }
}


const mouseup = (e) => {

  prevent_escalation(e);
  window.removeEventListener('mousemove', mousemove, true);
  // window.removeEventListener('mouseup', mouseup, true);
  update_box(e.pageX, e.pageY);
  // let width = Math.abs(e.pageX - this.box.x2);
  // let height = Math.abs(e.pageY - this.box.y2);
  // this.box.style.width = width + "px";
  // this.box.style.height = height + "px";
  // console.log(this.box);
  this.box.style.visibility = 'hidden';
  a_collect(e.pageX, e.pageY);
};


const mousemove = (e) => {
  prevent_escalation(e);
  update_box(e.pageX, e.pageY);
};


function prevent_escalation(event) {
  event.stopPropagation();
  event.preventDefault();
}


function update_box(x, y) {

  var width = Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]); // taken from jquery
  var height = Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]); // taken from jquery
  x = Math.min(x, width - 7);
  y = Math.min(y, height - 7);

  if (x > this.box.x) {
    this.box.x1 = this.box.x;
    this.box.x2 = x;
  } else {
    this.box.x1 = x;
    this.box.x2 = this.box.x;
  }
  if (y > this.box.y) {
    this.box.y1 = this.box.y;
    this.box.y2 = y;
  } else {
    this.box.y1 = y;
    this.box.y2 = this.box.y;
  }

  this.box.style.left = this.box.x1 + "px";
  this.box.style.width = this.box.x2 - this.box.x1 + "px";
  this.box.style.top = this.box.y1 + "px";
  this.box.style.height = this.box.y2 - this.box.y1 + "px";


}