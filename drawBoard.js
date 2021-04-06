const drawBoard = () => {
  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  
  let y = 40;

  const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (y < canvas.height) {
        y += 1;
      } else {
        y = 40;
      }
      drawLetters(12, y)
      console.log(y);
      window.requestAnimationFrame(draw)
    }

  window.requestAnimationFrame(draw);
  

}
