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
    this.classList.add("clicked");

    // subtract 1 from remaining turns
    remainingTurns = remainingTurns - 1;
    console.log("Remaining turns: " + remainingTurns);

    // adds hover effect after click
    this.classList.add(currentTurn);

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

    // reveals game output if game is over
    if (gameOver) {
      document.querySelector("#gameResult").style.display = "block";
    }

    // flip turn back and forth
    currentTurn = (currentTurn === "x") ? "o" : "x";


    // update next player DOM element AND color
    currentPlayer.innerHTML = currentTurn;
currentPlayer.style.color = (currentTurn === "x") ? "#F52798" : "#1E90FF";
  }
}


// returns true if all three spaces match and are not "-"
function spaceMatch(a, b, c) { 
  return a != "-" && a == b && b == c; 
}

// checks rows, columns, diagonals, and draw
function checkGameboard(a, b, c) {
  // check rows
  if (spaceMatch(a[0], a[1], a[2])) return a[0];
  if (spaceMatch(b[0], b[1], b[2])) return b[0];
  if (spaceMatch(c[0], c[1], c[2])) return c[0];

  // check columns
  if (spaceMatch(a[0], b[0], c[0])) return a[0];
  if (spaceMatch(a[1], b[1], c[1])) return a[1];
  if (spaceMatch(a[2], b[2], c[2])) return a[2];

  // check diagonals
  if (spaceMatch(a[0], b[1], c[2])) return a[0];
  if (spaceMatch(a[2], b[1], c[0])) return a[2];

  // check draw
  if (remainingTurns == 0) return "d";

  return null;
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
  currentPlayer.style.color = (currentTurn === "x") ? "#F52798" : "#1E90FF"; // added color to title to show whose turn it is
});



