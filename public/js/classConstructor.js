class MemoryGame {
    constructor() {
      this.color1 = "";
      this.color2 = "";
      this.card1 = "";
      this.card2 = "";
      this.cardsUnveiled = 0;
      this.winCondition = 0;
      this.timer = 60 * 3;
    }
  
    async fetchCardData() {
      try {
        const response = await fetch("https://memory-game-backend-pizi.onrender.com/api/cards");
        const data = await response.json();
        this.shuffleGameBoard(data);
      } catch (err) {
        console.error(err);
      }
    }
  
    shuffleGameBoard(data) {
      const arrayOfCards = Object.values(data);
      const colors = ["blue", "red", "yellow", "violet", "green", "orange", "pink", "skyblue"];
  
      for (let i = 0; i < arrayOfCards.length; i++) {
        const cardElement = document.querySelector(`.card${i}`);
        const classesOfCards = cardElement.classList.value.split(" ");
  
        if (colors.includes(classesOfCards[classesOfCards.length - 1])) {
          cardElement.classList.remove(classesOfCards[classesOfCards.length - 1]);
        }
      }
  
      const shuffleCards = (minRange, maxRange) => Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
      const newSet = new Set();
  
      while (newSet.size < 16) {
        newSet.add(shuffleCards(0, 15));
      }
  
      const randomizedIndices = [...newSet];
      const randomizedCards = randomizedIndices.map(index => arrayOfCards[index]);
  
      for (let i = 0; i < randomizedCards.length; i++) {
        const cardElement = document.querySelector(`.card${i}`);
        cardElement.classList.add("hide");
        cardElement.classList.add(`${randomizedCards[i].color}`);
      }
    }
  
    startTimer(display) {
      this.startGame();
  
      const startButton = document.querySelector("#start");
      startButton.classList.add("hidden");

  
      const intervalId = setInterval(() => {
        let minutes = parseInt(this.timer / 60, 10);
        let seconds = parseInt(this.timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
  
        if (this.winCondition === 8) {
          clearInterval(intervalId);
          return;
        }
  
        if (--this.timer < 0 && this.winCondition < 8) {
          this.winCondition = 0;
          clearInterval(intervalId);
          startButton.classList.remove("hidden");
          alert("You Lost!");
          location.reload(true);
        }
      }, 1000);
    }
  
    startGame() {
      document.querySelectorAll(".selected").forEach((elem) => {
        elem.classList.remove("selected");
      });
  
      document.querySelectorAll(".matched").forEach((elem) => {
        elem.classList.remove("matched");
      });
  
      this.fetchCardData();
  
      for (let cardNumber = 0; cardNumber < 16; cardNumber++) {
        document.querySelector(`.card${cardNumber}`).addEventListener("click", () => {
          const cardElement = document.querySelector(`.card${cardNumber}`);
          const arrayOfCardClasses = cardElement.classList.value.split(" ");
          const color = arrayOfCardClasses[arrayOfCardClasses.length - 1];
  
          this.cardsUnveiled++;
          if (this.cardsUnveiled === 1) {
            this.card1 = cardNumber;
            document.querySelector(`.card${this.card1}`).classList.add("selected");
            this.color1 = color;
          } else if (this.cardsUnveiled === 2) {
            this.card2 = cardNumber;
            document.querySelector(`.card${this.card2}`).classList.add("selected");
            this.color2 = color;
            this.cardsUnveiled = 0;
  
            this.checkVictoryConditions();
          }
        });
      }
    }
  
    checkVictoryConditions() {
      const firstCard = document.querySelector(`.card${this.card1}`).classList;
      const secondCard = document.querySelector(`.card${this.card2}`).classList;
  
      if (
        this.color1 === this.color2 &&
        !firstCard.contains("matched") &&
        !secondCard.contains("matched")
      ) {
        this.winCondition++;
        firstCard.add("matched");
        secondCard.add("matched");
      }
  
      if (this.winCondition === 8) {
        alert("You won, congratulations!!");
        this.winCondition = 0;
        document.querySelector("#start").classList.remove("hidden");
        location.reload(true);
      } else if (this.winCondition < 8 && this.color1 !== this.color2) {
        setTimeout(() => {
          firstCard.remove("selected");
          secondCard.remove("selected");
        }, 500);
      }
    }
  }
  
  const cardGame = new MemoryGame();
  const display = document.querySelector("#time");
  
  document.getElementById("start").addEventListener("click", () => {
    cardGame.startTimer(display);
  });
  