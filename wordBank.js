"use strict";

const wordBank = ["abcdefghijklmnopqrstuvwxyz", "dad", "brother"];
const mySection = document.getElementById("word-bank");
let currentWordIndex = 0;

const reset = () => {
  currentWordIndex = 0;
  resetBoard();
  removeActiveClasses();
};

const renderWord = () => {
  let currentWordWithSpan = "";
  for (let i in currentWord) {
    currentWordWithSpan += `<span id="${i}">${currentWord[
      i
    ].toUpperCase()}</span>`;
  }
  mySection.innerHTML = currentWordWithSpan;
};

const isFinishedSpelling = () => {
  return currentWordIndex === currentWord.length;
};

const isValidWordBankLetter = (letter) => {
  // check if clicked letter matches correct letter by index
  if (
    currentWord[currentWordIndex] &&
    currentWord[currentWordIndex].toLowerCase() === letter
  ) {
    document.getElementById(`${currentWordIndex}`).style.backgroundColor =
      "azure";
    // increment index after validating correct letter
    currentWordIndex += 1;
    return true;
  }
  // handle edge case where all letters have been spelled correctly and
  // user clicks letter that has already passed validation
  if (isFinishedSpelling() && currentWord.includes(letter)) {
    return true;
  }

  return false;
};

const handleSubmit = (e) => {
  e.preventDefault();
  currentWord = e.target.word.value;
  wordBank.unshift(currentWord);
  renderWord();
  renderNewButton(currentWord);
  e.target.reset();
};

const displayWord = (e) => {
  currentWord = e.target.textContent;
  renderWord();
};

const generateRandomIndex = () => Math.floor(Math.random() * wordBank.length);

const handleNextWord = () => {
  document.getElementById("success-message").style.display = "none";
  let nextWord = wordBank[generateRandomIndex()];
  while (currentWord === nextWord) {
    nextWord = wordBank[generateRandomIndex()];
  }
  currentWord = nextWord;
  renderWord();
  reset();
  const button = document.getElementById(currentWord.toLowerCase());
  button.classList.add("active");
};

const removeActiveClasses = () => {
  const wordbankBtns = document.querySelectorAll(".wordbank-btn");
  for (let wordbankBtn of wordbankBtns) {
    wordbankBtn.classList.remove("active");
  }
};

const renderNewButton = (word) => {
  const button = document.createElement("button");
  button.id = word.toLowerCase();
  button.classList.add("wordbank-btn");

  // initial active button on page load
  if (word === currentWord) button.classList.add("active");

  button.addEventListener("click", (e) => {
    document.getElementById("success-message").style.display = "none";
    reset();
    displayWord(e);
    button.classList.add("active");
  });
  button.textContent = word;
  wordPickerSection.appendChild(button);
};

const renderWordPicker = () => {
  const p = document.createElement("p");
  p.textContent = "Pick a word: ";
  wordPickerSection.appendChild(p);
  for (let word of wordBank) {
    renderNewButton(word);
  }
};

const wordPickerSection = document.getElementById("word-picker");
let currentWord = wordBank[generateRandomIndex()]; // randomly pick a word from word bank

renderWord();
renderWordPicker();

document.getElementById("add-word").addEventListener("submit", (e) => {
  reset();
  handleSubmit(e);
});

document.getElementById("next-word").addEventListener("click", handleNextWord);
