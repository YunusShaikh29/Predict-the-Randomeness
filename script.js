'use strict';

const randomNumberEl = document.getElementById('random_number');
const messageEl = document.querySelector('.message');
const remainingAttemptsEl = document.getElementById('remaining_attempts');
const highScoreEl = document.getElementById('high_score');

const restartBtnEl = document.querySelector('.btn_restart');

const numberElements = document.querySelectorAll('.number');

const section2El = document.querySelector('.section-2');
const inputRedeemEl = document.querySelector('.input_redeem');


const generateRandomNumber = (min, max) => Math.trunc(Math.random() * (max - min) + min ) + 1;


// application data: 
const gameWinCount = 2;
let remainingAttempts = 50, correctGuessesCount = 0, gameOver = false, highScore = 0, correctGuesses = '';

const init = function(){
    correctGuessesCount = 0;
    remainingAttempts = 50; 

    remainingAttemptsEl.textContent = remainingAttempts;

    messageEl.textContent = 'Start the game by clicking a number...'
    randomNumberEl.textContent = '?'

    section2El.style.backgroundColor = ''
    inputRedeemEl.style.opacity = '0'

    gameOver = false;

    inputRedeemEl.value = correctGuesses = '';
}


const wonTheGame = function() {
    messageEl.textContent = 'You won the game! :)'
    gameOver = true

    section2El.style.backgroundColor = 'lime'
    inputRedeemEl.style.opacity = '1'

    // updating highscore
    if(remainingAttempts > highScore){
        highScoreEl.textContent = remainingAttempts //updating UI
        highScore = remainingAttempts  // updating application data
    }
}

const lostTheGame = function(){
    messageEl.textContent = 'You lost the Game :(, Restart'
    gameOver = true

    section2El.style.backgroundColor = 'red'
}

init();

// adding event listeners on number buttons
for(let i = 0; i < numberElements.length; i++){
    const numberEl = numberElements[i]
    numberEl.addEventListener('click', () => {

        // gaurd clause
        if(gameOver) return;
        
        const randomlyGeneratedNumber = generateRandomNumber(0, 10);
        randomNumberEl.textContent = randomlyGeneratedNumber;

        remainingAttempts-- //data update
        remainingAttemptsEl.textContent = remainingAttempts // ui update

        if(remainingAttempts === 0){
            lostTheGame()
            return;
        }
        const userSelectedNumber = +numberEl.textContent;

        if(userSelectedNumber === randomlyGeneratedNumber){
            messageEl.textContent = 'Correct Prediction :)'
            correctGuessesCount++;
            correctGuesses += randomlyGeneratedNumber + ','

            if(correctGuessesCount === gameWinCount){
                wonTheGame()
            }
        }else{
            messageEl.textContent = 'Wrong Prediction'
        }
    })
}

restartBtnEl.addEventListener('click' , () => {
    if(inputRedeemEl.value + ',' === correctGuesses){
        highScore++
        highScoreEl.textContent = highScore
    }
    init()
})