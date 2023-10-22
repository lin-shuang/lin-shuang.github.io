// puzzle.js
// Class: CSE 264 - Fall 2022
// Author: Shuang Lin
// Usage: node puzzle.js <number of rows and columns in puzzle> <file with list of words>
// The program will read in the words from the file and uppercase them. It will then create a square
// grid of the specified dimensions and place each word in the grid at a random starting point and
// one of eight random directions. It will print the list of words, followed by an answer key with
// just the placed words in the grid and finally the actual puzzle with random letters filled in.

// Modified to fit in portfolio 09/2023

//Loads the node file system module
const fs = require("fs");
const { exit } = require("process");
const { parseArgs, getSystemErrorMap } = require("util");

//Returns the contents of the file filename as a single string
function readTextFile(filename) {
  return fs.readFileSync(filename, "utf-8");
}

//randomNum(1,10) will return a random integer from 1 to 10 inclusive
const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//8 Directions (indexes for 5674*0321)
const deltaRow = [0, 1, 1, 1, 0, -1, -1, -1];
const deltaColumn = [1, 1, 0, -1, -1, -1, 0, 1];

//Start of program ////////////////////////////////////////////////////////////
//take user input
let size = 0;
let fileName = 0;
if (process.argv.length === 4) {
  size = parseInt(process.argv[2]);
  fileName = process.argv[3];
}
else {
  console.log("Error, invalid input. Quitting...")
  exit();
}

//split input by new line and sort by length descending
let fileWord = readTextFile(fileName);
let fileLines = fileWord.split("\n").sort((a, b) => b.length - a.length);

//check if word can fit on board, at least the size
if(fileLines[0].length-1 > size){
  console.log("Error, word length exceeding board size. Quitting...");
  exit();
}

//capitalize words, remove lineb breaks, map and replace original
fileLines = fileLines.map(fileLines => fileLines.toUpperCase().replace(/(\r\n|\n|\r)/gm,""));

//create puzzle board with size
let board = [];
for (let i = 0; i < size; i++) {
  board[i] = [];

  for(let j = 0; j < size; j++){
    board[i][j] = "*";
  }
}

//Inserting Words /////////////////////////////////////////////////////
  let direction = 0;
  let coordRow = 0;
  let coordCol = 0;
  let checkingLength = 0;
  let checkCoordRow = 0;
  let checkCoordCol = 0;
  let wordIndex = 0;
  let wordFit = false;
  let tries = 0;

  //increment through words list
  for(wordIndex = 0; wordIndex < fileLines.length; wordIndex++){
    wordFit = false;
    tries = 0;
    while(!wordFit){
      coordRow = randomNum(0, size-1);
      coordCol = randomNum(0, size-1);
      checkCoordRow = coordRow;
      checkCoordCol = coordCol;
      
      while(!wordFit){

        direction = randomNum(0, 7);

        //pretending to place words
        for(let i = 0; i < fileLines[wordIndex].length; i){

          //check if coordinates exceeds board size, -1 to size because coordiante index start at 0
          if((checkCoordRow > size-1) || (checkCoordRow < 0)){
            //choose new direction and reset coordinates
            direction++;
            checkCoordRow = coordRow;
            checkCoordCol = coordCol;
            i = 0;
          }
          if((checkCoordCol > size-1) || (checkCoordCol < 0)){
            //choose new direction and reset coordinates
            direction++;
            checkCoordRow = coordRow;
            checkCoordCol = coordCol;
            i = 0;
          }

          //if all directions tried, choose new starting point
          if(direction > 7){
            direction = 0;
            coordRow = randomNum(0, size-1);
            coordCol = randomNum(0, size-1);
            checkCoordRow = coordRow;
            checkCoordCol = coordCol;
            tries++;

            //if all coordinates tried, quit and print error
            if(tries == Math.pow(size, 3)){
              console.log("Error, all coordinates failed. Try again, or choose a bigger size.");
              console.log("Quitting...");
              exit();
            }
          }
          //continue to next char if empty space or common interception
          if((board[checkCoordRow][checkCoordCol] == "*") ||
          (fileLines[wordIndex][i] == board[checkCoordRow][checkCoordCol])){
            i++;
            //pretend to place letters on the board
            checkCoordRow += deltaRow[direction];
            checkCoordCol += deltaColumn[direction];
          }
          //if uncommon interception or space taken, change direction and reset coordinates
          else{
            direction++;
            checkCoordRow = coordRow;
            checkCoordCol = coordCol;
            i = 0;
          }
        }
        wordFit = true;
      }
    }
  
    //placing word, increment through word, one char at a time
    for(let i = 0; i < fileLines[wordIndex].length; i++){

      board[coordRow][coordCol] = fileLines[wordIndex][i];
      
      //use delta directions to decide whether to add or subtract from original coordinate
      coordRow += deltaRow[direction];
      coordCol += deltaColumn[direction];
    }
}

//fill in empty stars, *, with random letters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for(let i = 0; i < size; i++) {
  for(let j = 0; j < size; j++){
    if(board[i][j] == "*"){
      board[i][j] = alphabet[randomNum(0, alphabet.length-1)];
    }
  }
}

/*
// finally, print puzzle board with comma separators replaced by spaces
console.log("Puzzle Board:\n");
for(let i = 0; i < size; i++) {
  console.log(board[i].join(" "), "\n");
}
*/

// 09/2023 Function to display the puzzle board in the specified div
const boardContainer = document.getElementById("word-search-board");

function displayBoard() {
    let boardHTML = "Puzzle Board:<br><br>";
  
    for (let i = 0; i < size; i++) {
      boardHTML += board[i].join(" ") + "<br>";
    }
  
    boardContainer.innerHTML = boardHTML;
  }

displayBoard();