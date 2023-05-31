
//

Cassidy - cards as divs 

//
Css;
flexbox -4*4 grid



If user clicks on card, card "flips" over
    one side will be universal
    other side will be color
    flip is change to display: hidden to display: block, and vice versa
user clicks another card
    if color is equal values, the cards stay shown (display: block) (===)
    if color is not equal values, the cards go back to hidden (display: hidden) (!==)
This keeps going until the user unveils all the cards, or the timer runs out 
    if timer runs out, cards are unclickable/all hidden and show message for game over
        give user option to start new game
    if all cards are unvieled, a message is shown "you win!"
        give user option to start new game
The new game button will reset board
    Randomize the array containing the cards each time this button is clicked
