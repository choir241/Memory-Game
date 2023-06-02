//hidden cards

/* Public API for cards to fetch "https://memory-game-backend-pizi.onrender.com/api/cards" */

const shuffleGameBoard = (data) => {
    //have all the cards be included
//no repeats
//randomized each time

const shuffleCards = (minRange, maxRange) => Math.floor(Math.random() * (maxRange-minRange +1) + minRange);

let newSet = new Set();

//this is 15 because Object.values transforms card data object into an array, and since array start at 0, the newSet.size needs to match the length of new array, aka 16
while (newSet.size < 16){
    newSet.add(shuffleCards(0, 15));
}
const randomizedIndices = [...newSet];
const arrayOfCards = Object.values(data);

const randomizedCards = randomizedIndices.map(index=>arrayOfCards[index]);

for(let i = 0; i < randomizedCards.length; i++){
    document.querySelector(`.card${i}`).classList.add(`${randomizedCards[i].color}`);
}   
}
 
const fetchCardData = async() => {
    try{
        fetch("https://memory-game-backend-pizi.onrender.com/api/cards")
            .then(res=>res.json())
            .then(data=>{
                shuffleGameBoard(data);

});
    }catch(err){
        console.error(err);
    }
}

fetchCardData();

const startGame = () => {
    localStorage.setItem("play", true);

    const check1 = localStorage.getItem("play");
    if(check1){

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

        //logic for timer reaching below zero
        if (--timer < 0) {
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