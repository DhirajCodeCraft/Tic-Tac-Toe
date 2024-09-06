const Game = (() => {
    const board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let player1Score = 0;
    let player2Score = 0;
    let ties = 0;

    const getBoard = () => board;

    const handleClick = (index) => {
        if (gameActive && !board[index]) {
            board[index] = currentPlayer;
            renderBoard();
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombos) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                updateScore(board[a]);
                document.getElementById('status').textContent = `${getCurrentPlayerName()} Wins!`;
                gameActive = false;
                return;
            }
        }

        if (board.every(cell => cell)) {
            ties++;
            document.getElementById('status').textContent = 'It\'s a Tie!';
            gameActive = false;
        }
    };

    const getCurrentPlayerName = () => {
        return currentPlayer === 'X' ? player1Name : player2Name;
    };

    const updateScore = (winner) => {
        if (winner === 'X') {
            player1Score++;
        } else if (winner === 'O') {
            player2Score++;
        }
        updateScoreboard();
    };

    const updateScoreboard = () => {
        document.getElementById('player1-score').textContent = `${player1Name} (X): ${player1Score}`;
        document.getElementById('player2-score').textContent = `${player2Name} (O): ${player2Score}`;
        document.getElementById('ties').textContent = `Ties: ${ties}`;
    };

    const renderBoard = () => {
        const cells = document.querySelectorAll('#gameboard div');
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const restartGame = () => {
        board.fill(null);
        currentPlayer = 'X';
        gameActive = true;
        renderBoard();
        document.getElementById('status').textContent = '';
    };

    const setPlayerNames = () => {
        player1Name = document.getElementById('player1-name').value || 'Player 1';
        player2Name = document.getElementById('player2-name').value || 'Player 2';
        updateScoreboard();
    };

    return { handleClick, restartGame, renderBoard, setPlayerNames };
})();

document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.getElementById('gameboard');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => Game.handleClick(i));
        gameboard.appendChild(cell);
    }

    document.getElementById('restart-game').addEventListener('click', Game.restartGame);
    document.getElementById('player1-name').addEventListener('input', Game.setPlayerNames);
    document.getElementById('player2-name').addEventListener('input', Game.setPlayerNames);

    Game.renderBoard();
});
