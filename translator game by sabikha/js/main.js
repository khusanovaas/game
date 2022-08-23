const inputs = document.querySelector(".inputs");
const resetButton = document.querySelector(".reset__button");
const hint = document.querySelector(".hint__span");
const maxGuess = document.querySelector(".max__guess span");
const typingInput = document.querySelector(".typing__input");
const wrongLetter = document.querySelector(".wrong__letters span");

let word; let incorrects = []; let corrects =[]; let maxGuesses;
function randomWord() {
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObject.word;
    maxGuesses = 5; incorrects = []; corrects =[];
    hint.innerText = randomObject.hint;
    maxGuess.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initialize(elem) {
    let key = elem.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
        console.log(key);
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(`${key}`);
        }
        wrongLetter.innerText = incorrects;
        maxGuess.innerText = maxGuesses;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length){
            alert(`you found the word ${word}`);
            randomWord();
        }else if(maxGuesses < 1){
            alert("game over!");
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key)
                }
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}

resetButton.addEventListener("click", randomWord);
typingInput.addEventListener("input", initialize);
document.addEventListener("keydown", () => typingInput.focus());