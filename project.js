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


// Step 4.5

const transpose =(reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};


// Step 5

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for (const symbol of symbols){ // the loop where we go through the entire array "symbols" and the iterator is "symbol"
            if (symbol != symbols[0]){ // we need to have all symbols same in a row, so we can compare to the 0 index symbol from the row
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]; // again we can compare all to whatever index because all must be the same to win
        }

    }

    return winnings; 
}

// step 7 - Cashout

const cashOut = (balance) => {
    if (balance > 0){
        console.log("Your cashout is $" + balance + "\nHope to see you again :D");
    }else { // Step 8 - asking if user wants to deposit more or just leave
        const depositMore = prompt("You ran out of money :( Do you want to deposit more? :D (y/n)");
        if (depositMore != "y"){
            console.log("Hope to see you again :)");
        } else{
            game();
        }
    }
};

//                              executing

// Step 6
const game = () => {

    let balance = deposit();

    while (true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("you won, $" + winnings.toString());
      
        // if (balance <= 0){
        //     const depositMore = prompt("You ran out of money :( Do you want to deposit more? :D (y/n)");
        //     if (depositMore != "y"){
        //         game();
        //     } else {
        //         break;
        //     }
        // }

        if (balance <= 0) break;

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }

    cashOut(balance);
};

game();





    
    
