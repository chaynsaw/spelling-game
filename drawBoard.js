const drawBoard = () => {
  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  
  let y = 40;
  
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    if (y < canvas.height) {
      y += 10;
    } else {
      y = 40;
    }
    drawLetters(12, y)
  }, 500);

};
