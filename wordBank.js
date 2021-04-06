"use strict";

const wordBank = ["abcdefghijklmnopqrstuvwxyz", "dad", "brother"];
const mySection = document.getElementById("word-bank");
let currentWord = wordBank[0]; // test for whole alphabet
let currentWordIndex = 0;

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
  currentWord = e.target.word.value;
  wordBank.unshift(currentWord);
  renderWord();
};

renderWord();

document.getElementById("add-word").addEventListener("submit", handleSubmit);
