let start = document.getElementById("start");

let stop = document.getElementById("stop");

let score = document.getElementById("score");

start.addEventListener("click", animate);
let count = 0;
let count1 = 0;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let stopgame;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomColor = () =>
  `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

stop.addEventListener("click", function() {
  cancelAnimationFrame(stopgame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score.innerHTML = 0;
});

let rectangles = [];

function animate() {
  class Rectangle {
    constructor() {
      (this.x = Math.random() * 610), (this.y = 0);
      this.color = getRandomColor();
      (this.dx = 0), (this.dy = Math.random() * 2);
    }

    draw() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, 80, 80);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;
    }
  }

  let rectangles = [];

  //create new ball and push it to array

  let timer = Math.floor(Math.random() * 1500);
  setInterval(() => {
    // let randomNumber = getRandom();
    rectangles.push(new Rectangle());
    // count++;
  }, timer);

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0, rect; (rect = rectangles[i]); i++) {
      rect.draw(); // this will draw current ball
      rect.update(); // this will update its position
    }
    stopgame = requestAnimationFrame(update);
  }
  //RUN
  update();

  // var isCursorInSquares = function(x, y, squares) {
  //   return (
  //     x > squares.x && x < squares.x + 80 && y > squares.y && y < squares.y + 80
  //   );
  // };

  // canvas.onclick = function(e) {
  //   var x = e.pageX - canvas.offsetLeft;
  //   y = e.pageY - canvas.offsetTop;

  //   for (var i = rectangles.length - 1; i >= 0; --i) {
  //     if (isCursorInSquares(x, y, rectangles[i])) {
  //       delete rectangles.splice(i, 1);
  //       score.innerHTML = Number(score.innerHTML) + 1;
  //     }
  //   }
  // };
}
