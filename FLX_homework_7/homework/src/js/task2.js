let play = confirm("Do you want to play a game?");
let userNumber, randomNumber, maxNumber = 5, attempts = 3, prize = 0, startMaxPrice = 10, maxPrize = 10;
if (play) {
    randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    while (attempts > 0) {
        userNumber = parseInt(prompt(`Enter a number from 0 to ${maxNumber}
Attempt left: ${attempts}
Total prize: ${prize}$
Possible prize on current attempt: ${maxPrize}$`));
        if (userNumber === randomNumber) {
            prize += maxPrize;
            if (confirm(`Congratulation! Your prize is:${prize}$ Do you want to continue?`)) {
                attempts = 3;
                maxPrize = startMaxPrice * 3;
                startMaxPrice = maxPrize;
                maxNumber *= 2;
                randomNumber = Math.floor(Math.random() * (maxNumber + 1));
            } else {
                break;
            }
        } else {
            maxPrize = Math.floor(maxPrize / 2);
            attempts--;
        }
    }
    alert(`Thank you for a game. Your prize is: ${prize}$`);
} else {
    alert("You did not become a millionaire, but can.");
}