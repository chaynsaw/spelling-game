function drawLetters() {
  var canvas = document.getElementById("board");
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  var i = 65;
  var j = 91;

  var xOffSet = canvas.offsetLeft;
  var yOffSet = canvas.offsetTop + 20;
  var letters = new Object();
  /* Example:
  letters = {
     "A":
       "point": {
         "x": 40,
         "y": 40
       }
  }
  */

  for (k = i; k < j; k++) {
    var str = String.fromCharCode(k);
    ctx.fillText(str, xOffSet, yOffSet);
    letters[str] = {
      point: {
        x: xOffSet + 10,
        y: yOffSet + 50,
      },
    };
    xOffSet += 30;
  }

  //onclick handler
  for (const letter in letters) {
    canvas.addEventListener("click", function (e) {
      handleOnClick(e, letter);
    });
  }

  function handleOnClick(e, letter) {
    e.preventDefault();
    var x = letters[letter].point.x;
    var y = letters[letter].point.y;
    if (
      e.clientX <= x + 10 &&
      e.clientX >= x - 10 &&
      e.clientY <= y + 10 &&
      e.clientY >= y - 10
    ) {
      letterValidation(letter.toLowerCase());
    }
  }
}
