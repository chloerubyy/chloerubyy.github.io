// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

// track whos turn it is
let currentTurn = "x";

// track number of turns left
let remainingTurns = 9;

// track if game is over
let gameOver = false;

// set up a blank variable for current DOM element
let currentPlayer;

// function to handle clicks
function clickSquare() {


  // only proceed if space is empty
  if ( (this.innerHTML == "") && (!gameOver) ) {

    // set space
    this.innerHTML = currentTurn;

    // subtract 1 from remaining turns
    remainingTurns = remainingTurns - 1;
    console.log("Remaining turns: " + remainingTurns);

    this.className = "gameSpace " + currentTurn;

    // update the array of boards with player value
    if (this.id == "a1") rowA[0] = currentTurn;
    if (this.id == "a2") rowA[1] = currentTurn;
    if (this.id == "a3") rowA[2] = currentTurn;
    if (this.id == "b1") rowB[0] = currentTurn;
    if (this.id == "b2") rowB[1] = currentTurn;
    if (this.id == "b3") rowB[2] = currentTurn;
    if (this.id == "c1") rowC[0] = currentTurn;
    if (this.id == "c2") rowC[1] = currentTurn;
    if (this.id == "c3") rowC[2] = currentTurn;

    // output arrays to console
    console.log("Rows:");
    console.log(rowA);
    console.log(rowB);
    console.log(rowC);


    // get a handle on the DOM element to be updated with the outcome
    let gameOutputMsg = document.querySelector("#gameResult");


    // call your function checkGameboard() with the 3 rows
    let winState = checkGameboard(rowA, rowB, rowC);

    // test the returned value of the function
    if (winState == "x") {
      gameOutputMsg.innerHTML = "X wins";
      gameOver = true;

    } else if (winState == "o") {
      gameOutputMsg.innerHTML = "O wins";
      gameOver = true;

    } else if ((winState == "d") && (remainingTurns == 0)) {
      gameOutputMsg.innerHTML = "draw";
      gameOver = true;
    }

    // flip turn back and forth
    if (currentTurn == "x") currentTurn = "o";
    else currentTurn = "x";


    // update next player DOM element
    currentPlayer.innerHTML = currentTurn;
  }
}


// return Boolean true if all 3 submitted values match, otherwise return Boolean false
function spaceMatch(spaceA, spaceB, spaceC) {
}

// function to accept the 3 arrays and compare them
function checkGameboard(a, b, c) {
}



// wait for the DOM to load before running the code
document.addEventListener("DOMContentLoaded", function () {

  // find all clickable spaces
  let allSpaces = document.querySelectorAll(".gameSpace");

  // loop with a "for-of" through all the clickable spaces
  for (let eachSpace of allSpaces) {
    eachSpace.addEventListener("click", clickSquare);
  }

  // update current DOM element with first player
  currentPlayer = document.querySelector("#currentPlayer span");
  currentPlayer.innerHTML = currentTurn;
});

