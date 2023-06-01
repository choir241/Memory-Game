//hidden cards

/* Public API for cards to fetch "https://memory-game-backend-pizi.onrender.com/api/cards" */

const fetchCardData = async() => {
    try{
        const data = await fetch("https://memory-game-backend-pizi.onrender.com/api/cards");
            data.then(res=>res.json());
            data.then(data=>console.log(data));
    }catch(err){
        console.error(err);
    }
}


function startTimer(display) {
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