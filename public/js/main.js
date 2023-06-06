const display = document.querySelector('#time');

//starts timer
document.getElementById('start').addEventListener('click', () => { 
	startTimer(display);
});     


const fetchData = async() => {
    try {
    //fetches the color data from the backend API
        fetch("https://memory-game-backend-pizi.onrender.com/api/cards")
            .then(res => res.json())
            .then(data =>shuffleGameBoard(data));
    } catch (err) {
        console.error(err);
    }
}

const shuffleGameBoard = (data) => {

    //changes the object of colors into an array of objects
    const arrayOfCards = Object.values(data);

        for(let i = 0; i < arrayOfCards.length; i++){
            //check if color string exists in the html element first before removing it (resetting the board of color classes)
            const classesOfCards = document.querySelector(`.card${i}`).classList.value.split(" ");
            const colors = ["blue", "red", "yellow", "violet", "green", "orange", "pink", "skyblue"];

            if(colors.includes(classesOfCards[classesOfCards.length-1])){
                document.querySelector(`.card${i}`).classList.remove(classesOfCards[classesOfCards.length-1]);
            };
        };

    //shuffle the cards on the board game without repeats each game
    const shuffleCards = (minRange, maxRange) => Math.floor(Math.random() * (maxRange-minRange +1) + minRange);

    let newSet = new Set();

    //an array that contains each randomized index of a card
    while (newSet.size < 16) {
        newSet.add(shuffleCards(0, 15));
    }

    //changes set of randomized indices into an array
    const randomizedIndices = [...newSet];

    //takes the randomized index and creates an array consisting of color objects whose index in arrayOfCards variable matched
    const randomizedCards = randomizedIndices.map(index => arrayOfCards[index]);

    for (let i = 0; i < randomizedCards.length; i++) {
        document.querySelector(`.card${i}`).style.opacity = 0
        document.querySelector(`.card${i}`).classList.add(`${randomizedCards[i].color}`);
    }
}

let winCondition = 0;


const startTimer = (display) => {

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

        if(winCondition < 8){
            timer--
        }

         //logic for timer reaching below zero
         if (timer < 0 && winCondition < 8) {
            winCondition = 0;
            //stops timer
            clearInterval(intervalId);
            //shows start button to retry
            document.querySelector("#start").classList.remove("hidden");
            //notifies user they lost since timer ran out before win condition was met
            alert("You Lost!");
        } 

    },1000);
    
}


