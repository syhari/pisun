const player = document.querySelector('.player');
const gameArea = document.getElementById('gameArea');
const start = document.getElementById('start');
const end = document.getElementById('end');

let playerPosition = { x: 0, y: 0 };

// Set initial player position
function setPlayerPosition() {
    player.style.transform = `translate(${playerPosition.x * 40}px, ${playerPosition.y * 40}px)`;
}

// Move player based on key press
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Calculate new position
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (key === 'ArrowUp') newY--;
    if (key === 'ArrowDown') newY++;
    if (key === 'ArrowLeft') newX--;
    if (key === 'ArrowRight') newX++;

    // Check for walls and boundaries
    if (isValidMove(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        setPlayerPosition();
        checkWin();
    }
});

// Check if the move is valid
function isValidMove(x, y) {
    // Check boundaries
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

    // Check for walls
    const walls = document.querySelectorAll('.wall');
    for (let wall of walls) {
        const wallX = wall.style.transform.split('(')[1].split('px')[0] / 40;
        const wallY = wall.style.transform.split(',')[1].split('px')[0] / 40;
        if (wallX === x && wallY === y) return false;
    }

    return true;
}

// Check if player reached the end
function checkWin() {
    if (playerPosition.x === 9 && playerPosition.y === 9) {
        alert('You reached the end!');
        resetGame();
    }
}

// Reset game
function resetGame() {
    playerPosition = { x: 0, y: 0 };
    setPlayerPosition();
}

// Initialize player position
setPlayerPosition();