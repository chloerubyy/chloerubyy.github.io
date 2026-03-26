// javascript for interactivity in the concentration game for 1 player

// track number of turns
let playerClicks = 0;
let timeDelay = 1000; // delay in milliseconds before cards flip back or disappear after a match

// clear clicked classes
function clearClicks() {

    // get all clicked cards and remove the clicked class
    let allClickedCards = document.querySelectorAll(".clicked");
    for (let eachCard of allClickedCards) {
        eachCard.classList.remove("clicked");
    }

    // increase player turns by 1
    playerClicks++;
    document.querySelector("#turnCount span").innerHTML = playerClicks;

    // check for winning
    let allCards = document.querySelectorAll(".card");
    let allMatchedCards = document.querySelectorAll(".matched");
    if (allCards.length === allMatchedCards.length) {
        // player has matched all cards
        console.log("You win!");
        document.querySelector("#winOverlay").classList.remove("hidden");
        document.querySelector("#finalTurns").innerHTML =
            "You finished in " + playerClicks + " turns!";
    }
}

// new function to flip cards when clicked
function flipCard() {

    if (!this.classList.contains("clicked")) {

        // get all clicked cards
        let allClickedCards = document.querySelectorAll(".clicked");

        // only proceed if there are less than 2 clicked cards
        if (allClickedCards.length < 2) {

            // add clicked class to the card that was clicked
            this.classList.add("clicked");
        }

        // get a fresh list of clicked cards
        allClickedCards = document.querySelectorAll(".clicked");

        // if its a pair, compare them
        if (allClickedCards.length === 2) {

            // get class list of each card as a string
            let card1 = allClickedCards[0].classList.toString();
            let card2 = allClickedCards[1].classList.toString();

            // if the class lists are the same, its a match
            if (card1 === card2) {
                console.log("It's a match!");
                allClickedCards[0].classList.add("matched");
                allClickedCards[1].classList.add("matched");

            } else {
                console.log("Not a match, try again.");
            }

            window.setTimeout(clearClicks, timeDelay);

        }

    }
}

// run this code when the DOM content has loaded
document.addEventListener('DOMContentLoaded', function (e) {

    // get handles to game elements
    let allCards = document.querySelectorAll(".card");
    let gameboard = document.querySelector("#gameBoard");

    // loop through all cards and add click event listeners
    for (let x = 0; x < allCards.length; x++) {
        // randomize cards by reinserting them in random order in the gameboard
        let randNum = Math.floor(Math.random() * allCards.length);
        gameboard.insertBefore(allCards[x], gameboard.children[randNum]);

        // call flipCard() when a card is clicked
        allCards[x].addEventListener("click", flipCard);
    }

});