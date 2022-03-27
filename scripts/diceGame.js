/*
    author:		Alexandre S Ito
    date:		12-Mar-2022
    notes:		Project Dice Game
*/

//const
const fadeInDelay = 1000;

//Element by id/class
const $popup = $('#pop-up');
const closePopUp = document.getElementById('close-pop-up');
const btnPopUpOk = document.getElementById('pop-up-ok-button');
const $popupMessage = $('#pop-up-message');

const $round = $('#game-round');

const $imageYouDice1 = $('#you-dice1-image');
const $imageYouDice2 = $('#you-dice2-image');
const $imageOpponentDice1 = $('#opponent-dice1-image');
const $imageOpponentDice2 = $('#opponent-dice2-image');
const $imageDice = $('.dice-image');

const $scoreYouRound = $('#you-round-score');
const $scoreYouTotal = $('#you-total-score');
const $scoreOpponentRound = $('#opponent-round-score');
const $scoreOpponentTotal = $('#opponent-total-score');
const $score = $('.score');

const $btnRollDice = $('#btn-roll-dice');
const $btnNewGame = $('#btn-new-game');

/*
Dice Object
*/
class Dice {
    constructor(newValue) {
        this.face = newValue;
    }

}

Dice.prototype.rollDice = function () {
    this.face = randomIntFromInterval(1, 6);
}
/*
End Dice Object
*/

//Helpers
//From https://stackoverflow.com/questions/30517725/sharing-javascript-variables-between-function
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function hideDiceImagesScoreRound() {
    $imageDice.hide();
    $score.hide();
    $round.css('opacity', 0);
}

function showDiceImagesScoreRound() {
    $imageDice.show();
    $score.show();
    $round.css('opacity', 1);
}

function rollDiceAndChangeImage(dice, element) {
    dice.rollDice();
    element.attr('src', element.attr('src').replace(/\d+/, dice.face));
}

function updateText(score, element) {
    element.text(score);
}

const doubleDiceScore = 2;
function computeScore(dice1, dice2, score) {
    if (1 == dice1.face || 1 == dice2.face) {
        score = 0;
    }
    else if (dice1.face == dice2.face) {
        score = (dice1.face + dice2.face) * doubleDiceScore;
    }
    else {
        score = dice1.face + dice2.face;
    }
    return score;
}

function hidePopUp() {
    $popup.hide();
}

function fadeInPopUp() {
    $popup.fadeIn(fadeInDelay);
}

function closePopUpWindow() {
    hidePopUp();
    $btnNewGame.click();
}

//POP-UP
hidePopUp();

closePopUp.addEventListener('click', function () {
    closePopUpWindow();
});

btnPopUpOk.addEventListener('click', function () {
    closePopUpWindow();
});

//Initial status
hideDiceImagesScoreRound();

//Instantiate objects
const youDice1 = new Dice(1);
const youDice2 = new Dice(1);
const opponentDice1 = new Dice(1);
const opponentDice2 = new Dice(1);

//Business Rules
/*
The scoring for the game works as follows:
- If any of the players two dice comes up as a 1 then the score for that round for the player is 0. eg: if the player rolls a 6 and 1, they get a score of 0
- If the player rolls a pair of the same numbers then the players score is the total of the two dice times 2. eg: if he player rolls 5 and 5, they get a score of (5+5)*2=20
- If the player rolls any other combination of dice other than the ones mentioned above then the players score is the total value of the two dice, eg: player rolls a 3 and 2, player gets a score of 3+2=5
*/
let youRoundScore = 0, youTotalScore = 0;
let opponentRoundScore = 0, opponentTotalScore = 0;

const maxRounds = 3;
let countRound = 0;

$btnRollDice.click(function () {
    if ($imageDice.is(":hidden")) {//Just need to check for one element
        showDiceImagesScoreRound();
    }

    rollDiceAndChangeImage(youDice1, $imageYouDice1);
    rollDiceAndChangeImage(youDice2, $imageYouDice2);
    rollDiceAndChangeImage(opponentDice1, $imageOpponentDice1);
    rollDiceAndChangeImage(opponentDice2, $imageOpponentDice2);

    youRoundScore = computeScore(youDice1, youDice2, youRoundScore);
    opponentRoundScore = computeScore(opponentDice1, opponentDice2, opponentRoundScore);

    youTotalScore += youRoundScore;
    opponentTotalScore += opponentRoundScore;

    updateText(youRoundScore, $scoreYouRound);
    updateText(youTotalScore, $scoreYouTotal);
    updateText(opponentRoundScore, $scoreOpponentRound);
    updateText(opponentTotalScore, $scoreOpponentTotal);
    updateText(`Round #${++countRound}`, $round);

    if (countRound == maxRounds) {
        if (youTotalScore >= opponentTotalScore) {
            $popupMessage.text("Congratulations! YOU WON!!!!");
        }
        else {
            $popupMessage.text("Though luck! YOU LOST!!!!");
        }
        fadeInPopUp();
    }
});

$btnNewGame.click(function () {
    hideDiceImagesScoreRound();
    countRound = 0; //Reset round
    youRoundScore = youTotalScore = opponentRoundScore = opponentTotalScore = 0;//Reset score

});
