'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const diceElement = document.querySelector('.dice');

let scores, currentScore, playing, activePlayer;
const start = function () {
  scores = [0, 0]; //?These aren't real scores, we'll use positions only
  currentScore = 0;
  diceElement.classList.add('hidden'); //?adds hidden class to dice in order to hide it(hide: display: none)

  player0.classList.add('player--active'); //?first player will start in the beginning
  player1.classList.remove('player--active'); //?maybe active player was 2nd from the previous game
  player0.classList.remove('player--winner'); //?from previous games
  player1.classList.remove('player--winner');

  playing = true; //?when game has ended, this will be false so that buttons won't work when game finishes
  activePlayer = 0; //?active player will be 0 (first) or 1 (second)

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
};
start();

const switchPlayer = function () {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore; //?when switching player, set active player's current score to 0
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active'); //*toggle will check if it has player--active, if yes, removes if no, adds
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing === true) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`; //*dice pic will change according to the dice
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing === true) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //*adds current score to score
    currentScore = 0;
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false; //prevent us from pressing buttons in the end of the game
      diceElement.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', start); //*didn't add brackets because we'll wait js to call it. If we use brackets it'll call then the line of read comes.
