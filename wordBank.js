"use strict";

const wordBank = ["abcdefghijklmnopqrstuvwxyz", "dad", "brother"];
const mySection = document.getElementById("word-bank");
let currentWord = wordBank[0]; // test for whole alphabet

const renderWord = () => {
  let currentWordWithSpan = "";
  for (let i in currentWord) {
    currentWordWithSpan += `<span id="${i}">${currentWord[i]}</span>`;
  }
  mySection.innerHTML = currentWordWithSpan;
};

const isValidWordBankLetter = (letter) => {
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
  currentWord = e.target.word.value;
  wordBank.unshift(currentWord);
  renderWord();
};

renderWord();

document.getElementById("add-word").addEventListener("submit", handleSubmit);
