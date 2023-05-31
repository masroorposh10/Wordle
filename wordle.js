var height = 4;
var width = 4;

var row = 0;
var col = 0;

var gameOver = false;
var word = "";

window.onload = function () {
  intialize();
}
function intialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }
}
var getWord = { word: '', hint: '' };

const listOfWords = async () => {
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  let json = await res.json();
  let { dictionary } = json;
  getWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  getWord.word = getWord.word.toUpperCase()
  getWord.hint = getWord.hint
  return getWord.word
}

listOfWords().then((words) => {
  console.log(words);
  console.log(getWord.hint);
  word = words;
});

document.addEventListener("keyup", (e) => {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    if (col < width) {
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      if (currTile.innerText == "") {
        currTile.innerText = e.code[3];
        col += 1;
      }
    }
  }
  else if (e.code == "Backspace") {
    if (0 < col && col <= width) {
      col -= 1;
    }
    let currTile = document.getElementById(row.toString() + '-' + col.toString());
    currTile.innerText = "";
  }

  else if (e.code == "Enter") {
    update();
    row += 1;
    col = 0;
  }

})

function update() {
  let correct = 0;
  let enteredWord = "";
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    if (letter.trim() === "") {
      alert("Enter a full 4 letter word, You've lost one chance");
      return;
    }
    enteredWord += letter;
    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    }
    else if (word.includes(letter)) {
      currTile.classList.add("present");
    }
    else {
      currTile.classList.add("absent");
    }

    if (correct == width) {
      gameOver = true;
      if (enteredWord === word) {
        let congratsImg = document.getElementById("congrats-img");
        congratsImg.src = "https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif";
        congratsImg.style.display = "block";
      } 
      else{
        alert("Try again");
      }
    }

  }
}


document.querySelector(".btn").addEventListener("click", function () {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerText = "";
    tiles[i].classList.remove("correct");
    tiles[i].classList.remove("present");
    tiles[i].classList.remove("absent");
  }
  row = 0;
  col = 0;
  gameOver = false;
  const myImage = document.getElementById("congrats-img");
  myImage.style.display = "none";
  let hintElem = document.getElementById("hint");
  hintElem.innerHTML = "";
  listOfWords().then((words) => {
    console.log(words);
    word = words;
    this.blur();
  });
});
const toggleSwitch = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');

toggleSwitch.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

document.getElementById('instructions-button').addEventListener('click', function () {
  var instructionsList = document.getElementById('instructions-list');
  instructionsList.style.display = (instructionsList.style.display === 'none') ? 'block' : 'none';
});

function displayhint() {
  var outputElement = document.getElementById("hint");
  outputElement.innerHTML = getWord.hint;
}
