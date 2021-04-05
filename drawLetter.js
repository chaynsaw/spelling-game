function drawLetter() {
  var canvas = document.getElementById("board");
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  var i = 65;
  var j = 91;

  for (k = i; k < j; k++) {
    var str = String.fromCharCode(k);
    ctx.fillText(str, getRandomPositionX(), getRandomPositionY());
  }
}

function getRandomPositionX() {
  return Math.floor(Math.random() * 750) + 10;
}

function getRandomPositionY() {
  return Math.floor(Math.random() * 600) + 200;
}
