const resetBoard = () => {
  // clone board and replace with clone to remove all active listeners
  const oldCanvas = document.getElementById("board");
  const canvas = oldCanvas.cloneNode(true);
  oldCanvas.parentNode.replaceChild(canvas, oldCanvas);

  canvas.style.display = "inline-block";
  const ctx = canvas.getContext("2d");
  var id = window.requestAnimationFrame(function () {});

  // remove all existing frames
  while (id--) {
    window.cancelAnimationFrame(id);
  }

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // re-draw board from scratch
  drawBoard();
};
