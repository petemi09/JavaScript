/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//pig game

var roundScore, scores, activePlayer, dice, dice2, gamePlaying, scoreLimit, doublesVal;
function alertFunction() {
    alert("Hello! If you do not set a score limit, the limit will be set to 100, set a score limit and hit new game! Have Fun!");
  }
// alertFunction();
init();

document.querySelector('#rules').addEventListener('click', function() {
    document.querySelector('.popUp').style.display = 'block';
    gamePlaying = false;
})

document.querySelector('#exitBtn').addEventListener('click', function() {
    document.querySelector('.popUp').style.display = 'none';
})

// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        
        var diceDom = document.querySelector('.dice');
        var diceDom2 = document.querySelector('.dice2');
        
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-' + dice2 + '.png';

        console.log(dice, dice2);
        console.log(dice + dice2);
        if (dice === 6 && dice2 === 6) {
            console.log("HOLY SHIT");
            nextplayer();
        } else {
            if (dice !== 1 && dice2 !== 1) {
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextplayer();
            }
        }
    }
});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //winner
        if (scores[activePlayer] >= scoreLimit) {
            console.log('you win');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextplayer();
        }
    }
});

function nextplayer() {
    console.log('this is ' + activePlayer + ' playing!');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    doublesVal = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.dice').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    doublesVal = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');    
    document.querySelector('.player-0-panel').classList.add('active');
    scoreLimit = document.getElementById('winningValue').value;
    
    if (scoreLimit === '') {
        scoreLimit = 100;
    }
    document.querySelector('.popUp').style.display = 'none';
    

}
