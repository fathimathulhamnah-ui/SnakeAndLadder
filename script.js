
const board = document.getElementById('board');
const ctx = board.getContext('2d');
const diceImg = document.getElementById('dice');
const rollBtn = document.getElementById('roll-btn');

const boardSize = 10;
const cellSize = board.width / boardSize;

const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

let playerPosition = 1;

function drawBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const x = j * cellSize;
            const y = i * cellSize;
            const num = (i * boardSize) + j + 1;
            ctx.strokeRect(x, y, cellSize, cellSize);
            ctx.fillText(num, x + 5, y + 15);
        }
    }
}

function drawPlayer() {
    const row = Math.floor((playerPosition - 1) / boardSize);
    const col = (playerPosition - 1) % boardSize;
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `https://www.random.org/dice/dice${diceValue}.png`;
    movePlayer(diceValue);
}

function movePlayer(steps) {
    playerPosition += steps;
    if (playerPosition > 100) {
        playerPosition = 100 - (playerPosition - 100);
    }

    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
    }

    ctx.clearRect(0, 0, board.width, board.height);
    drawBoard();
    drawPlayer();

    if (playerPosition === 100) {
        alert('You won!');
    }
}

drawBoard();
drawPlayer();
rollBtn.addEventListener('click', rollDice);
