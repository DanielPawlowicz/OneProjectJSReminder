/*
STEPS

1. Deposit some money
2. Determine number of lines to bet on
3. Collect a bet amount
4. Spin machine
5. Check if user won
6. give user winnings, or take his money
7. play again

*/

// Step 1

const prompt = require("prompt-sync")();

// function deposit() {
//     return 1;
// };
// It is the same as the "const deposit = () => {return 1;};"  <- newer 

const deposit = () => {
    while (true) { // The loop will loop until the numberDepositAmount is good, then return statement breaks the loop automaticly, if not the loop goes infinitely
        const depositAmount = prompt("Enter a deposit amount: "); // Asking for deposit value
        const numberDepositAmount = parseFloat(depositAmount); // Converting string to numeric value

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again");
        }
        else {
            return numberDepositAmount;
        }
    }
    
};

// Step 2

const getNumberOfLines = () => {
    while (true) { 
        const lines = prompt("Enter the number of lines to bet on (1-3): "); 
        const numberOfLines = parseFloat(lines); 

        if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3){
            console.log("Invalid number of lines, try again");
        }
        else {
            return numberOfLines;
        }
    }
}



let balance = deposit();
const numberOfLines = getNumberOfLines();


