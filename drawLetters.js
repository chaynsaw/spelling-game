const drawLetters = (xOffSet, yOffSet) => {
  // xOffSet = 12; // initialize left padding
  // yOffSet = 40; // initialize top padding

  const canvas = document.getElementById("board");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";

  const asciiA = 65; // ASCII code for "A" (min range)
  const asciiZ = 91; // ASCII code for "Z" (max range)
  const letterContainerWidth = 25;
  const letterContainerHeight = 22;
  const letterContainerSpace = 30; // space between letter containers
  const rect = canvas.getBoundingClientRect();
  const letters = new Object(); // storage of x,y coordinates for each letter

  // HELPER METHODS
  const drawLetter = (letter, letterX, letterY, strokeColor) => {
    ctx.fillStyle = strokeColor;
    letterXOffset = letterX + 13;
    ctx.fillText(letter, letterXOffset, letterY);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(
      letterX + ctx.lineWidth / 2,
      letterY - letterContainerHeight + ctx.lineWidth / 2,
      letterContainerWidth,
      letterContainerHeight
    );
    ctx.textAlign = "center";
  };

  const handleOnClick = (clickedX, clickedY, letter) => {
    const letterX = letters[letter].point.x;
    const letterY = letters[letter].point.y;

    if (
      // return if out of bounds
      clickedX < letterX ||
      clickedX > letterX + letterContainerWidth ||
      clickedY > letterY ||
      clickedY < letterY - letterContainerHeight
    ) {
      return;
    }

    // clear existing letter
    ctx.clearRect(
      letterX + ctx.lineWidth / 2,
      letterY - letterContainerHeight + ctx.lineWidth / 2,
      letterContainerWidth,
      letterContainerHeight
    );

    const isValidLetter = isValidWordBankLetter(letter.toLowerCase());

    if (isValidLetter) {
      drawLetter(letter, letterX, letterY, "green");
    } else {
      drawLetter(letter, letterX, letterY, "red");
    }
  };

  // INITIAL DRAWING OF LETTERS
  for (let k = asciiA; k < asciiZ; k++) {
    const letter = String.fromCharCode(k);

    drawLetter(letter, xOffSet, yOffSet, "black");
    // store coordinates for each letter
    letters[letter] = {
      point: {
        x: xOffSet,
        y: yOffSet,
      },
    };
    // next letter placement +letterContainerSpace on x-axis to display letters in a row
    xOffSet += letterContainerSpace;
  }

  // onclick handler
  for (const letter in letters) {
    canvas.addEventListener("click", (e) => {
      e.preventDefault();
      if (isFinishedSpelling()) return;
      const clickedX = e.clientX - rect.x;
      const clickedY = e.clientY - rect.y;
      handleOnClick(clickedX, clickedY, letter);
    });
  }
};
