let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rectangles = [];
let score = document.getElementById("score").innerText;
let game = "";

class Rectangle {
  constructor(x, y, width, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.width);
    ctx.fillStyle = this.color;
    ctx.closePath();
    if (this.y >= canvas.clientHeight) {
      this.y = 0;
    }
  }

  update() {
    this.y = this.y + this.speed;
  }
}

function animate() {
  if (game) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    for (let i in rectangles) {
      rectangles[i].draw();
      rectangles[i].update();
    }
    requestAnimationFrame(animate);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

start = () => {
  game = true;
  let rect = Math.floor(Math.random() * (50 - 20) + 20);
  for (let i = 0; i < rect; i++) {
    let x = Math.floor(Math.random() * 590);
    let y = 0;
    let width = 50;
    let color =
      "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")";
    let speed = Math.random() * 2;
    rectangles.push(new Rectangle(x, y, width, color, speed));
  }
  animate();
};

stop = () => {
  game = false;
  rectangles = [];
  score = 0;
};

canvas.onclick = e => {
  if (game) {
    let xx = e.pageX - canvas.offsetLeft;
    let yy = e.pageY - canvas.offsetTop;
    for (let i = rectangles.length - 1; i >= 0; i--) {
      if (
        xx > rectangles[i].x &&
        xx < rectangles[i].x + 50 &&
        yy > rectangles[i].y &&
        yy < rectangles[i].y + 50
      ) {
        rectangles.splice(i, 1);
        document.getElementById("score").innerText = ++score;
      }
    }
  }
};
