class Letter {
  constructor(name, x, y, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

const drawBoard = () => {
  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const letters = [];

  const asciiA = 65; // ASCII code for "A" (min range)
  const asciiZ = 91; // ASCII code for "Z" (max range)
  const letterContainerWidth = 25;
  const letterContainerHeight = 22;
  const letterContainerSpace = 30; // space between letter containers
  let x = 12; // initialize left padding

  // initial state of letters
  for (let k = asciiA; k < asciiZ; k++) {
    // initial random starting position hidden above the board
    const y = Math.floor(Math.random() * 100) + -100;
    const name = String.fromCharCode(k);
    const letter = new Letter(name, x, y, "black");
    letters.push(letter);
    // next letter placement +letterContainerSpace on x-axis to display letters in a row
    x += letterContainerSpace;
  }
  // drawLetters(letters);
  const draw = () => {
    letters.forEach((letter) => {
      // random fall speed between 1-3 inclusive
      const ySpeed = Math.random() * 1.5 + 0.1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      letter.y += ySpeed;

      if (letter.y > canvas.height) {
        // initial random starting position hidden above the board
        letter.y = Math.floor(Math.random() * 100) + -100;
      }
    });
    drawLetters(letters);
    window.requestAnimationFrame(draw);
  };
  draw();

  const resetLetters = () => {
    letters.forEach((letter) => {
      letter.color = "black";
    });
  };

  const handleOnClick = (clickedX, clickedY, letter) => {
    if (
      // return if out of bounds
      clickedX < letter.x ||
      clickedX > letter.x + letterContainerWidth ||
      clickedY > letter.y ||
      clickedY < letter.y - letterContainerHeight
    ) {
      return;
    }
    const isValidLetter = isValidWordBankLetter(letter.name.toLowerCase());
    resetLetters();
    letter.color = isValidLetter ? "green" : "red";
  };

  canvas.addEventListener("click", (e) => {
    e.preventDefault();
    if (isFinishedSpelling()) return;
    const clickedX = e.clientX - rect.x;
    const clickedY = e.clientY - rect.y + window.scrollY;
    letters.forEach((letter) => {
      handleOnClick(clickedX, clickedY, letter);
    });
  });
};
