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
    currentWordWithSpan += `<span id="${i}">${currentWord[i]}</span>`;
  }
  mySection.innerHTML = currentWordWithSpan;
};

const isFinishedSpelling = () => {
  return currentWordIndex === currentWord.length;
};

const isValidWordBankLetter = (letter) => {
  // check if clicked letter matches correct letter by index
  if (currentWord[currentWordIndex] === letter) {
    document.getElementById(`${currentWordIndex}`).style.color = "green";
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
  removeActiveClasses();
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

const generateMessage = () => {
  const wordBankSection = document.getElementById("word-bank");
  const p = document.createElement("p");
  p.textContent = "Congratulations!";
  wordBankSection.appendChild(p);
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
    displayWord(e);
    // remove active classes and set active class for clicked button
    removeActiveClasses();
    button.classList.add("active");
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

const wordPickerSection = document.getElementById("word-picker");
let currentWord = wordBank[generateRandomIndex()]; // randomly pick a word from word bank
renderWord();
renderWordPicker();

document.getElementById("add-word").addEventListener("submit", (e) => {
  handleSubmit(e);
  reset();
});
