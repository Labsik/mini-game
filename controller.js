class Controller {
  constructor (canvas) {
    this.canvas  = canvas.link;
    this.context = this.canvas.getContext('2d');
  }

  start () {
    this.animate.call(this);
  }

  stop () {

  }

  animate () {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);

    requestAnimationFrame(this.animate.bind(this));
  }
}

let controller = new Controller(_canvas);