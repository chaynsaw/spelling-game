'use strict';

const wordBank = ['mom', 'dad', 'brother'];

const mySection = document.getElementById('word-bank');
let currentWord = wordBank[0]; // test for mom
let currentWordWithSpan = '';
for (let i in currentWord) {
  currentWordWithSpan += `<span id="${i}">${currentWord[i]}</span>`;
}

mySection.innerHTML = currentWordWithSpan;

const letterValidation = (letter) => {
  for (let i in currentWord) {
    if (currentWord[i] === letter) {
      document.getElementById(`${i}`).style.color = 'green';
    }
  }
};

// letterValidation('o'); // use this in the event handler
