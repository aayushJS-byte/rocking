let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

const choices = ['rock', 'paper', 'scissors'];

const updateScoreDisplay = () => {
    document.querySelector("#player-score").textContent = score.wins;
    document.querySelector("#computer-score").textContent = score.losses;
};

const updateMessageDisplay = () => {
    const lastMessage = localStorage.getItem('message') || 'Make Your Move!';
    document.querySelector("#message").textContent = lastMessage;
};

const computerMove = () => choices[Math.floor(Math.random() * 3)];

const playGame = (playerMove) => {
    const compMove = computerMove();
    let result = '';

    if (playerMove === compMove) {
        result = 'Tie.';
        score.ties++;
    } else if (
        (playerMove === 'rock' && compMove === 'scissors') ||
        (playerMove === 'scissors' && compMove === 'paper') ||
        (playerMove === 'paper' && compMove === 'rock')
    ) {
        result = 'You win.';
        score.wins++;
    } else {
        result = 'You lose.';
        score.losses++;
    }

    const finalMessage = `Computer: ${compMove} | You: ${playerMove} | ${result}`;
    document.querySelector("#message").textContent = finalMessage;
    localStorage.setItem('message', finalMessage);

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
};

const resetGame = () => {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    localStorage.removeItem('message');
    updateScoreDisplay();
    document.querySelector("#message").textContent = 'Make Your Move!';
};

window.onload = () => {
    updateScoreDisplay();
    updateMessageDisplay();
};
