const display = document.querySelector('#time');

//starts timer
document.getElementById('start').addEventListener('click', () => {
    startTimer(display);
});


let color1 = "";
let color2 = "";
let card1 = "";
let card2 = "";
let cardsUnveiled = 0;
let winCondition = 0;

//fetches color objects
const fetchCardData = async () => {
    try {
        fetch("https://memory-game-backend-pizi.onrender.com/api/cards")
            .then(res => res.json())
            .then(data => {
                shuffleGameBoard(data);
            });
    } catch (err) {
        console.error(err);
    }
}



function checkVictoryConditions(color1, color2, card1, card2) {
    let firstCard = document.querySelector(`.card${card1}`).classList
    let secondCard = document.querySelector(`.card${card2}`).classList

    //increases amount of cards matched by one, as long as they are not already matched
    if (color1 === color2 && !firstCard.contains("matched") && !secondCard.contains("matched")) {
        winCondition++;

        //since cards match, add different border to indicate cards are matched
        firstCard.add("matched");
        secondCard.add("matched");

    }
    //if 8 cards have been matched, you win
    if (winCondition === 8) {
        alert("You won, congratulations!!");
        winCondition = 0;
        //shows start button to retry
        document.querySelector("#start").classList.remove("hidden");
        //refreshes page
        location.reload(true);
    }

    else if (winCondition < 8 && color1 !== color2) {
        setTimeout(() => {
            //since cards don't match, hide both cards
            firstCard.remove("selected");
            secondCard.remove("selected");
        }, 500)
    }
}


const startGame = () => {
    //clear css classes added in any prior games
    document.querySelectorAll(".selected").forEach((elem) => {
        elem.classList.remove("selected")
    })
    document.querySelectorAll(".matched").forEach((elem) => {
        elem.classList.remove("matched")
    })

    fetchCardData();

    for (let cardNumber = 0; cardNumber < 16; cardNumber++) {

        document.querySelector(`.card${cardNumber}`).addEventListener("click", () => {

            const card = document.querySelector(`.card${cardNumber}`);
            const arrayOfCardClasses = card.classList.value.split(" ");
            const color = arrayOfCardClasses[arrayOfCardClasses.length - 1];

            cardsUnveiled++;
            if (cardsUnveiled === 1) {
                card1 = cardNumber;
                document.querySelector(`.card${card1}`).classList.add("selected")
                color1 = color;
            } else if (cardsUnveiled === 2) {
                card2 = cardNumber;
                document.querySelector(`.card${card2}`).classList.add("selected")
                color2 = color;
                cardsUnveiled = 0;

                checkVictoryConditions(color1, color2, card1, card2);
            }

        });
    }
}



//timer
function startTimer(display) {
    startGame();

    //hide start button to prevent restarting timer
    document.querySelector("#start").classList.add("hidden");

    //set timer to desired start time
    let timer = 60 * 3;

    //delays following function by one machine time millisecond
    const intervalId = setInterval(() => {

        //parseInt is to account for logic that combines minutes with 0 into string
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        //accounts for minutes/seconds specific format
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //updates the timer display
        display.textContent = minutes + ":" + seconds;

        if (winCondition === 8) {
            clearInterval(intervalId);
            return;
        }

        //logic for timer reaching below zero
        if (--timer < 0 && winCondition < 8) {
            winCondition = 0;
            //stops timer
            clearInterval(intervalId);
            //shows start button to retry
            document.querySelector("#start").classList.remove("hidden");
            //notifies user they lost since timer ran out before win condition was met
            alert("You Lost!");
            //refreshes page
            location.reload(true);
        }
    }, 1000);

}


const shuffleGameBoard = (data) => {
    const arrayOfCards = Object.values(data);

    for (let i = 0; i < arrayOfCards.length; i++) {
        const classesOfCards = document.querySelector(`.card${i}`).classList.value.split(" ");
        const colors = ["blue", "red", "yellow", "violet", "green", "orange", "pink", "skyblue"]
        if (colors.includes(classesOfCards[classesOfCards.length - 1])) {
            document.querySelector(`.card${i}`).classList.remove(classesOfCards[classesOfCards.length - 1]);
        };
    };

    //shuffle the cards on the board game without repeats each game
    const shuffleCards = (minRange, maxRange) => Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);


    let newSet = new Set();

    //an array that contains each card
    while (newSet.size < 16) {
        newSet.add(shuffleCards(0, 15));
    }
    const randomizedIndices = [...newSet];

    const randomizedCards = randomizedIndices.map(index => arrayOfCards[index]);

    for (let i = 0; i < randomizedCards.length; i++) {
        document.querySelector(`.card${i}`).classList.add("hide");
        document.querySelector(`.card${i}`).classList.add(`${randomizedCards[i].color}`);
    }
}






