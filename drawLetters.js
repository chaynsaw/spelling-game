const drawLetters = (letters) => {
  const canvas = document.getElementById("board");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";

  const letterContainerWidth = 25;
  const letterContainerHeight = 22;

  letters.forEach((letter) => {
    ctx.fillStyle = letter.color;
    letterXOffset = letter.x + 13;
    ctx.fillText(letter.name, letterXOffset, letter.y);
    ctx.strokeStyle = letter.color;
    ctx.strokeRect(
      letter.x + ctx.lineWidth / 2,
      letter.y - letterContainerHeight + ctx.lineWidth / 2,
      letterContainerWidth,
      letterContainerHeight
    );
    ctx.textAlign = "center";
  });
};
