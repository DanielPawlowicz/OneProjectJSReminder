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

const prompt = require("prompt-sync")();

// Step 4

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = { // if user get a line of A he will get multiplied by 5
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// Step 1

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

// Step 3

const getBet = (balance, lines) => {
    while (true) { 
        const bet = prompt(`Enter the bet per line (max is ${balance / lines}): `); 
        const numberBet = parseFloat(bet); 

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)){
            console.log("Invalid bet, try again");
        }
        else {
            return numberBet;
        }
    }
}

// Step 4 cd
const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++){
            reels.push([]);
        const reelSymbols = [...symbols]; // it copiers symbols array
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const reels = spin();

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);



// Step 5


