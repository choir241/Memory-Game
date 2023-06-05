//hidden cards

/* Public API for cards to fetch "https://memory-game-backend-pizi.onrender.com/api/cards" */

const shuffleGameBoard = (data) => {
    //shuffle the cards on the board game without repeats each game

    const shuffleCards = (minRange, maxRange) => Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);

    let newSet = new Set();

    //an array that contains each card
    while (newSet.size < 16) {
        newSet.add(shuffleCards(0, 15));
    }
    const randomizedIndices = [...newSet];
    const arrayOfCards = Object.values(data);

    const randomizedCards = randomizedIndices.map(index => arrayOfCards[index]);
    // console.log(randomizedCards)

    for (let i = 0; i < randomizedCards.length; i++) {
        console.log(randomizedCards[i].color)
        document.querySelector(`.card${i}`).classList.add(`${randomizedCards[i].color}`);
    }
}

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

let color1 = "";
let color2 = "";
let cardsUnveiled = 0;
let winCondition = 0;


function checkVictoryConditions(color1, color2) {
    if (color1 === color2) {
        winCondition++;
    }
    if (winCondition === 8) {
        alert("You won, congratulations!!");
        //shows start button to retry
        document.querySelector("#start").classList.remove("hidden");
    }
}

const startGame = () => {
    fetchCardData();

    for (let cardNumber = 0; cardNumber < 16; cardNumber++) {
        document.querySelector(`.card${cardNumber}`).addEventListener("click", () => {
            const card = document.querySelector(`.card${cardNumber}`);
            card.classList.add("selected")
            const arrayOfCardClasses = card.classList.value.split(" ");
            const color = arrayOfCardClasses[arrayOfCardClasses.length - 1];
            cardsUnveiled++;
            if (cardsUnveiled === 1) {
                color1 = color;
            } else if (cardsUnveiled === 2) {
                color2 = color;
                cardsUnveiled = 0;

                checkVictoryConditions(color1, color2);
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
    let timer = 60 * .5;

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
        }
        //logic for timer reaching below zero
        if (--timer < 0 && winCondition < 8) {
            //stops timer
            clearInterval(intervalId);
            //shows start button to retry
            document.querySelector("#start").classList.remove("hidden");
            //notifies user they lost since timer ran out before win condition was met
            alert("You Lost!");
        }
    }, 1000);
}

const display = document.querySelector('#time');

//starts timer
document.getElementById('start').addEventListener('click', () => {
    startTimer(display);
});
