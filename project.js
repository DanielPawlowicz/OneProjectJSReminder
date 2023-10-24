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
            console.log("Invalid deposit amoung, try again");
        }
        else {
            return numberDepositAmount;
        }
    }
    
};

const depositAmount = deposit();
console.log(depositAmount);


// 17:45
