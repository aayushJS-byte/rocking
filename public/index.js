let score = {
    wins: 0,
    losses: 0,
    ties: 0
};

// Load score on page load
window.onload = async function() {
    await fetchScore();
    updateScoreDisplay();
    document.querySelector("#message").textContent = "Make Your Move!";
};

async function fetchScore() {
    const response = await fetch('/api/score');
    const data = await response.json();
    score.wins = data.wins;
    score.losses = data.losses;
    score.ties = data.ties;
}

function updateScoreDisplay() {
    document.querySelector("#player-score").textContent = score.wins;
    document.querySelector("#computer-score").textContent = score.losses;
    document.querySelector("#message").textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function computerMove() {
    const random = Math.random();
    if (random < 1 / 3) return 'rock';
    else if (random < 2 / 3) return 'scissors';
    else return 'paper';
}

async function playGame(playerMove) {
    const compMove = computerMove();
    let result = '';

    if (playerMove === compMove) result = 'Tie.';
    else if (
        (playerMove === 'rock' && compMove === 'scissors') ||
        (playerMove === 'scissors' && compMove === 'paper') ||
        (playerMove === 'paper' && compMove === 'rock')
    ) result = 'You win.';
    else result = 'You lose.';

    if (result === 'You win.') score.wins++;
    else if (result === 'You lose.') score.losses++;
    else score.ties++;

    document.querySelector("#message").textContent = `Computer: ${compMove} | You: ${playerMove} | ${result}`;
    updateScoreDisplay();

    await updateScore();
}

async function updateScore() {
    await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score)
    });
}

async function resetGame() {
    score = { wins: 0, losses: 0, ties: 0 };
    await fetch('/api/reset', { method: 'POST' });
    updateScoreDisplay();
    document.querySelector("#message").textContent = "Game Reset. Make Your Move!";
}