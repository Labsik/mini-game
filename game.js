let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let score = document.getElementById("score");

let stopgame;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomColor = () =>
  `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

start.addEventListener("click", animate);

stop.addEventListener("click", function() {
  cancelAnimationFrame(stopgame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score.innerHTML = 0;
});

let rectangles = [];

function animate() {
  class Rectangle {
    constructor() {
      (this.x = Math.random() * 560), (this.y = 0);
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

  let timer = Math.floor(Math.random() * 1500);
  setInterval(() => {
    rectangles.push(new Rectangle());
  }, timer);

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0, rect; (rect = rectangles[i]); i++) {
      rect.draw();
      rect.update();
    }
    stopgame = requestAnimationFrame(update);
  }

  update();

  let isClick = function(x, y, rectangle) {
    return (
      x > rectangle.x &&
      x < rectangle.x + 80 &&
      y > rectangle.y &&
      y < rectangle.y + 80
    );
  };

  canvas.addEventListener(
    "click",
    function(event) {
      let x = event.pageX - canvas.offsetLeft;
      let y = event.pageY - canvas.offsetTop;

      for (var i = rectangles.length - 1; i >= 0; i--) {
        if (isClick(x, y, rectangles[i])) {
          rectangles.splice(i, 1);
          score.innerHTML = Number(score.innerHTML) + 1;
        }
      }
    },
    false
  );
}
