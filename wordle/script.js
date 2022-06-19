import { words } from './words.js';
const gameContainer = document.querySelector('.game');
const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', restartFunc);

let shouldHandle = true;
let column = 0;
let row = 0;
let boxes = [
    [],
    [],
    [],
    [],
    [],
    []
];

let maxBoxes = 30;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let chosenWord = words[Math.floor(Math.random() * words.length)]

chosenWord = chosenWord.split('');
alert('(Use your keyboard)')

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        let box = document.createElement('span');
        box.innerText = '';
        boxes[i][j] = box;
        gameContainer.appendChild(box)
    }
}

function deleteLastChar() {
    if (row > 0) {
        row -= 1;
        boxes[column][row].innerHTML = '';
    }
}

function guessedFunction() {
    restartBtn.classList.remove('invis');
    shouldHandle = false;
}

function restartFunc() {
    shouldHandle = true;
    column = 0;
    restartBtn.classList.add('invis');
    chosenWord = words[Math.floor(Math.random() * words.length)]
    chosenWord = chosenWord.split('');
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            boxes[i][j].innerHTML = '';
            boxes[i][j].style.backgroundColor = 'transparent';
        }
    }
}

addEventListener('keydown', (e) => {
    if (!shouldHandle) return;
    if (e.key == 'Backspace') {
        e.preventDefault();
        deleteLastChar();
    }
})

addEventListener('keypress', (e) => {
    if (!shouldHandle) return;
    if (alphabet.includes(e.key) || e.key == 'Enter') {
        clickHandler(e.key)
    }
})

function clickHandler(key) {
    if (row >= 4 && key == 'Enter') {
        let word;
        for (let i = 0; i < Math.floor(Math.sqrt(maxBoxes)); i++) {
            word += boxes[column][i].innerText;
        }
        word = word.substr(9, 12).toLowerCase();
        if (words.includes(word)) {
            word = word.split('');
            for (let i = 0; i < Math.floor(Math.sqrt(maxBoxes)); i++) {

                if (chosenWord[i] == word[i]) {
                    boxes[column][i].style.backgroundColor = 'rgb(100, 175, 100)';
                } else if (!chosenWord.includes(word[i])) {
                    boxes[column][i].style.backgroundColor = 'rgb(100, 100, 100)';
                }
            }
            for (let j = 0; j < Math.sqrt(maxBoxes); j++) {
                if (chosenWord.includes(word[j]) && boxes[column][j].style.backgroundColor != 'rgb(100, 175, 100)') {
                    boxes[column][j].style.backgroundColor = '#f7c200';
                }
            }
            let greenTaken = 0;
            boxes[column].forEach(item => {
                if (item.style.backgroundColor == 'rgb(100, 175, 100)') {
                    greenTaken += 1;
                }
            })
            if (greenTaken == 5) {
                guessedFunction();
            }
            column += 1;
            row = 0;
            return;
        } else {
            alert(`Not in word list!`)
            boxes[column].forEach(item => {
                item.innerHTML = '';
            })
            row = 0;
        }
    } else if (key != 'Enter' && row < 5) {
        let text = document.createElement('p');
        text.innerText = key.toUpperCase();
        boxes[column][row].appendChild(text);
        row += 1;
    }

}