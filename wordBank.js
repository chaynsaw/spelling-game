"use strict";

const wordBank = ["abcdefghijklmnopqrstuvwxyz", "dad", "brother"];
const mySection = document.getElementById("word-bank");

const renderWord = () => {
  let currentWord = wordBank[0]; // test for whole alphabet
  let currentWordWithSpan = "";
  for (let i in currentWord) {
    currentWordWithSpan += `<span id="${i}">${currentWord[i]}</span>`;
  }
  mySection.innerHTML = currentWordWithSpan;
};

const isValidWordBankLetter = (letter) => {
  let currentWord = wordBank[0];
  for (let i in currentWord) {
    if (currentWord[i] === letter) {
      document.getElementById(`${i}`).style.color = "green";
      return true;
    }
  }
  return false;
};

const handleSubmit = (e) => {
  e.preventDefault();
  wordBank.unshift(e.target.word.value);
  renderWord();
};

renderWord();

document.getElementById("add-word").addEventListener("submit", handleSubmit);

// letterValidation('o'); // use this in the event handler
