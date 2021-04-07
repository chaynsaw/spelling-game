"use strict";

const wordBank = ["abcdefghijklmnopqrstuvwxyz", "dad", "brother"];
const mySection = document.getElementById("word-bank");
let currentWordIndex = 0;

const reset = () => {
  currentWordIndex = 0;
  resetBoard();
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
  if (currentWord[currentWordIndex].toLowerCase() === letter) {
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
  console.log(currentWord);
  renderWord();
  reset();
};

const renderNewButton = (word) => {
  const button = document.createElement("button");
  button.addEventListener("click", (e) => {
    displayWord(e);
    reset();
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

const successMessageSection = document.getElementById("success-message");
const wordBankSection = document.getElementById("word-bank");
const wordPickerSection = document.getElementById("word-picker");
let currentWord = wordBank[generateRandomIndex()]; // randomly pick a word from word bank
renderWord();
renderWordPicker();

document.getElementById("add-word").addEventListener("submit", (e) => {
  handleSubmit(e);
  reset();
});

document.getElementById("next-word").addEventListener("click", handleNextWord);
