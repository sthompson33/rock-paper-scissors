let humanWins;
let computerWins;
let displayResult = document.querySelector('#displayResult');
let compScore = document.querySelector('#compScore');
let humanScore = document.querySelector('#humanScore');
let compChoice = document.querySelector('#compChoice');

const startButton = document.querySelector('#startbtn');
startButton.addEventListener('click', (e) => {
    humanWins = 0;
    computerWins = 0;
    compChoice.src = "";
    updateScore();
    enablePlayerButtons();
    playSound(e);
    displayResult.textContent = 'Make Your Choice Below';
    startButton.disabled = true;
});

const playerButtons = document.querySelectorAll('.playerbtn');
disablePlayerButtons();
playerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        playSound(e);
        let choice = e.target.id;
        //slice target id to get rid of btn on end
        playRound(choice.slice(0, choice.length - 3), computerPlay());
    });
});

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}
               
function playRound(playerSelection, computerSelection) {
    compChoice.src = `images/${computerSelection}.png`;
    switch(true) {
        case (playerSelection === computerSelection): 
            displayResult.textContent = `Tie Game! We both chose ${capitalize(playerSelection)}.`;
            break;
        case (playerSelection === 'rock' && computerSelection === 'scissors'): 
        case (playerSelection === 'paper' && computerSelection === 'rock'):
        case (playerSelection === 'scissors' && computerSelection === 'paper'): 
            displayResult.textContent = `Ughhh...you win, ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
            humanWins++;
            break;
        default:
            displayResult.textContent = `Hahaha...I win, ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
            computerWins++;
            break;
    }
    
    updateScore();
    checkScore();
}

function checkScore() { 
    if(humanWins !== 5 && computerWins !== 5){
        return;
    }

    let audio;
    if(humanWins === 5) {
        audio = document.querySelector('#lostGame');
        displayResult.textContent = 'You beat the Computer!';
    } else {
        audio = document.querySelector('#wonGame');
        displayResult.textContent = 'You lost to the Computer';
    }
    audio.play();
    disablePlayerButtons();
    startButton.disabled = false;
}

function updateScore() {
    humanScore.textContent = humanWins;
    compScore.textContent = computerWins;
}

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}

function playSound(e) {
    let audio;
    if(e.target.id == 'startbtn') {
        audio = document.querySelector('#startGame');
    } else {
        audio = document.querySelector('#clickSound');
    }
    audio.play();
}

function disablePlayerButtons() {
    playerButtons.forEach(button =>{
        button.disabled = true;
    });
}

function enablePlayerButtons() {
    playerButtons.forEach(button =>{
        button.disabled = false;
    });
}