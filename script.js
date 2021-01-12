let userWins = 0;
let computerWins = 0;
game();

function game() { 
    while(true) {
        playRound(prompt('Choose Rock, Paper or Scissors'), computerPlay());
        if(userWins === 5 || computerWins === 5) {
            break;
        }
    }
    console.log((userWins > computerWins) ? 'You beat the computer!' : 'You lost to the computer!');     
}
               
function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}
               
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    switch(true) {
        case (playerSelection === computerSelection): 
            console.log(`Tie Game! You and the Computer both chose ${capitalize(playerSelection)}.`);
            break;
        case (playerSelection === 'rock' && computerSelection === 'scissors'): 
        case (playerSelection === 'paper' && computerSelection === 'rock'):
        case (playerSelection === 'scissors' && computerSelection === 'paper'): 
            console.log(`You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`);
            userWins++;
            break;
        default:
            console.log(`You lost! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`);
            computerWins++;
            break;
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}