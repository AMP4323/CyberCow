let divWidth = document.getElementById('severityMeter').offsetWidth;
let divHeight = document.getElementById('severityMeter').offsetHeight;

console.log(divWidth + " " + divHeight);

var arr = [];

function sliderRect(x, curr_col) {
  this.x = x;
  this.curr_col = curr_col;
}

function setup() {
  var cnv = createCanvas(divWidth, divHeight);
  frameRate(3);
  colorMode(HSL, 255);
  cnv.parent('severityMeter');
  cnv.style('display', 'block');
  background(110, 134, 255);
  noStroke();
  fill(100);
  rect(0, 0, 0.18 * divWidth, divHeight);
  for (let i = 0; i < 10; i++) {
    arr.push(new sliderRect(map(i, 0, 10, 0.15 * divWidth, divWidth), map(i, 0, 10, 55, 0)));
  }
  for (let i = 0; i < 10; i++) {
    fill(arr[i].curr_col, 255, 130);
    rect(arr[i].x, 0, 0.15 * divWidth + i * ((0.85 * divWidth) / 10), divHeight);
  }
}

function draw() {
  //value = myJSON1;
  fill(255);
  let s = "SEVERITY"
  textSize(divHeight / 3.2);
  text(s, 0.03 * divWidth, divHeight / 1.4);
  if (myJSON1) {
    let max = Math.round(map(myJSON1.confidence, 0, 1, 0, 10));
    console.log(max);

    for (let i = 0; i < max; i++) {
      fill(arr[i].curr_col, 255, 130);
      rect(arr[i].x, 0, 0.15 * divWidth + i * ((0.85 * divWidth) / 10), divHeight);
    }
    for (let i = max; i < 10; i++) {
      fill(255);
      rect(arr[i].x, 0, 0.15 * divWidth + i * ((0.85 * divWidth) / 10), divHeight);
    }
  }
}
