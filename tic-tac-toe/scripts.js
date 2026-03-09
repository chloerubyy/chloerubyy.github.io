// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

// track whos turn it is
let currentTurn = "x";

// set up a blank variable for current DOM element
let currentPlayer;

// function to handle clicks
function clickSquare() {


    // only proceed if space is empty
    if (this.innerHTML == "") {
        // set space
        this.innerHTML = currentTurn;


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
    let currentPlayer = document.querySelector("#currentPlayer span");
    currentPlayer.innerHTML = currentTurn;
});


/* COMMENT OUT EVERYTHING BELOW THIS


// get a handle on the DOM element to be updated with the outcome
let gameOutputMsg = document.querySelector("#gameResult span");


// call your function checkGameboard() with the 3 rows
let winState = checkGameboard(rowA, rowB, rowC);

// test the returned value of the function
if (winState == "x") { 
  gameOutputMsg.innerHTML = "X wins";
  
} else if (winState == "o") {
  gameOutputMsg.innerHTML = "O wins";
  
} else if (winState == "d") {
  gameOutputMsg.innerHTML = "draw";
  
} else {
  gameOutputMsg.innerHTML = "unknown";
}

*/
