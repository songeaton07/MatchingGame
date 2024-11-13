document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreDisplay = document.getElementById('score');
    const commentDisplay = document.getElementById('comment');
    let score = 0;
    let tilesRevealed = [];
    let matchesFound = 0;

    function initializeGame() {
        let tileImages = [
            'burrito.jfif', 'burrito.jfif',
            'donut.jfif', 'donut.jfif',
            'french_fries.png', 'french_fries.png',
            'hamburger.png', 'hamburger.png',
            'popcorn.jpg', 'popcorn.jpg',
            'pretzel.jfif', 'pretzel.jfif',
            'ramen.jfif', 'ramen.jfif',
            'taco.jfif', 'taco.jfif'
        ];
        tileImages.sort(() => 0.5 - Math.random()); // Randomize tiles

        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.classList.add('gameTile');
            const img = document.createElement('img');
            img.src = 'pictures/' + tileImages[i]; // Set the image source
            img.style.visibility = 'hidden'; // Hide the image initially
            tile.appendChild(img);
            tile.addEventListener('click', revealTile);
            gameBoard.appendChild(tile);
        }
    }

    function revealTile() {
        if (tilesRevealed.length == 2) {
            return;
        }

        let img = this.firstChild;
        img.style.visibility = 'visible'; // Show the image
        this.style.pointerEvents = 'none';
        tilesRevealed.push(this);

        if (tilesRevealed.length == 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [tile1, tile2] = tilesRevealed;
        if (tile1.firstChild.src === tile2.firstChild.src) {
            matchesFound += 2;
            tilesRevealed = [];
            if (matchesFound == 16) {
                commentDisplay.textContent = 'Great job!';
            }
        } else {
            setTimeout(() => {
                tile1.firstChild.style.visibility = 'hidden';
                tile2.firstChild.style.visibility = 'hidden';
                tile1.style.pointerEvents = 'auto';
                tile2.style.pointerEvents = 'auto';
                tilesRevealed = [];
            }, 1000);
        }
        score++;
        scoreDisplay.textContent = score;
        updateComments();
    }

    function updateComments() {
        if (score < 20) {
            commentDisplay.textContent = 'Amazing memory!';
        } else if (score < 30) {
            commentDisplay.textContent = 'Doing well!';
        } else {
            commentDisplay.textContent = 'Keep trying!';
        }
    }

    document.getElementById('resetButton').addEventListener('click', () => {
        gameBoard.innerHTML = '';
        score = 0;
        matchesFound = 0;
        scoreDisplay.textContent = '0';
        commentDisplay.textContent = 'Good luck!';
        initializeGame();
    });

    initializeGame();
});
