/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frame = 0;
let starArray = [];

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

class Star {
  constructor() {
    this.x = Math.random() * 10 - 5 + centerX;
    this.y = Math.random() * 10 - 5 + centerY;
    this.size = Math.random() * 5 + 1;
    this.color = "white";
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }
  update() {
    if (frame % 10 === 0) {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
  draw() {
    const mainWidth = 218;
    const mainHeight = 206;
    let width = this.size * 2;
    let height = this.size * 2;
    let centerX = this.x;
    let centerY = this.y;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(108 / mainWidth * width + centerX, 0 + centerY);
    ctx.lineTo(141 / mainWidth * width + centerX, 70 / mainHeight * height + centerY);
    ctx.lineTo(218 / mainWidth * width + centerX, 78.3 / mainHeight * height + centerY);
    ctx.lineTo(162 / mainWidth * width + centerX, 131 / mainHeight * height + centerY);
    ctx.lineTo(175 / mainWidth * width + centerX, 205 / mainHeight * height + centerY);
    ctx.lineTo(108 / mainWidth * width + centerX, 170 / mainHeight * height + centerY);
    ctx.lineTo(41.2 / mainWidth * width + centerX, 205 / mainHeight * height + centerY);
    ctx.lineTo(55 / mainWidth * width + centerX, 131 / mainHeight * height + centerY);
    ctx.lineTo(1 / mainWidth * width + centerX, 78 / mainHeight * height + centerY);
    ctx.lineTo(75 / mainWidth * width + centerX, 68 / mainHeight * height + centerY);
    ctx.lineTo(108 / mainWidth * width + centerX, 0 + centerY);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  starArray = [];
  for (let i = 0; i < 100; i++) {
    starArray.push(new Star());
  }
}

function insertStar() {
  setTimeout(() => {
    starArray.push(new Star());
    insertStar();
  }, 50);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  for (let i = 0; i < starArray.length; i++) {
    const star = starArray[i];
    star.update();
    star.draw();
    if (
      star.x - star.size < 0 ||
      star.x + star.size > canvas.width ||
      star.y - star.size < 0 ||
      star.y + star.size > canvas.height
    ) {
      starArray.splice(i, 1);
      i--;
    }
  }
  frame++;
}
init();
insertStar();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
});
