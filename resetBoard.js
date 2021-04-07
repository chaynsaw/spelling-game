const resetBoard = () => {
  const canvas = document.getElementById("board");
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
