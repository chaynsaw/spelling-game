function drawLetters() {
  var canvas = document.getElementById("board");
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  var i = 65; // ASCII code for "A"
  var j = 91; // ASCII code for "Z"
  var letterContainerWidth = 25;
  var letterContainerHeight = 22;
  var rect = canvas.getBoundingClientRect();
  var xOffSet = 12;
  var yOffSet = 35;
  var letters = new Object();

  for (k = i; k < j; k++) {
    var letter = String.fromCharCode(k);
    drawLetter(letter, xOffSet, yOffSet, "black");

    letters[letter] = {
      point: {
        x: xOffSet,
        y: yOffSet,
      },
    };
    xOffSet += 30;
  }

  //onclick handler
  for (const letter in letters) {
    canvas.addEventListener("click", function (e) {
      e.preventDefault();
      var clickedX = e.clientX - rect.x;
      var clickedY = e.clientY - rect.y;
      handleOnClick(clickedX, clickedY, letter);
    });
  }

  function handleOnClick(clickedX, clickedY, letter) {
    var letterX = letters[letter].point.x;
    var letterY = letters[letter].point.y;

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

    var isValidLetter = letterValidation(letter.toLowerCase());

    if (isValidLetter) {
      drawLetter(letter, letterX, letterY, "green");
    } else {
      drawLetter(letter, letterX, letterY, "red");
    }
  }

  function drawLetter(letter, letterX, letterY, strokeColor) {
    ctx.fillStyle = strokeColor;
    letter === "A" ? letterXOffset = letterX  + 3: letterXOffset = letterX + 13;
    ctx.fillText(letter, letterXOffset, letterY);
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(
      letterX + ctx.lineWidth / 2,
      letterY - letterContainerHeight + ctx.lineWidth / 2,
      letterContainerWidth,
      letterContainerHeight
    );
    ctx.textAlign = "center";

  }
}
