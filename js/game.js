let canvas;
let world;
let keyboard = new Keybord();

let introMusic = new Audio('audio/intro-music.mp3');
let gameMusic = new Audio('audio/background-music.mp3');

soundReference.addSoundToList(introMusic);
soundReference.addSoundToList(gameMusic);
soundReference.updateButtonIcon();

/**
 * Toggles the visibility of the game info menu.
 */
function showGameInfo() {
    let offScreenMenu = document.getElementById('game-info');
    offScreenMenu.classList.toggle('active');
}

/**
 * Displays the start screen and hides the game screen.
 */
function showStartScreen() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");
    
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
}

/**
 * Initializes the game world by setting up the canvas and the world object.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Starts the game by hiding the start screen, showing the game screen, 
 * initializing objects, and playing the game music.
 */
function startGame() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    initObjects();
    init();
    playGameMusic();
}

/**
 * Displays the end screen based on whether the player won or lost.
 */
function showEndScreen() {
    gameMusic.pause();
    updateEndScreen(world.gameWin);
}

/**
 * Updates the end screen content and visibility.
 * 
 * @param {boolean} gameWon - Indicates whether the player won or lost.
 */
function updateEndScreen(gameWon) {
    const loseOrWin = document.getElementById('end-screen');
    const endScreen = document.querySelector(".end_screen");
    const gameScreen = document.querySelector(".game_container");

    loseOrWin.innerHTML = getEndScreenHTML(gameWon);
    
    endScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
}

/**
 * Generates the appropriate HTML for the end screen.
 * 
 * @param {boolean} gameWon - Indicates whether the player won or lost.
 * @returns {string} - The HTML string for the end screen.
 */
function getEndScreenHTML(gameWon) {
    if (gameWon) {
        return `
            <img src="img/You won, you lost/You Win A.png" alt="You Win" width=720px height=480px>
            ${templateEndScreen()}
        `;
    } else {
        return `
            <img src="/img/You won, you lost/Game Over.png" alt="You Lose" width=720px height=480px>
            ${templateEndScreen()}
        `;
    }
}


/**
 * Restarts the game by resetting the world and keyboard, initializing objects,
 * and playing the game music.
 */
function restartGame() {
    const endScreen = document.querySelector(".end_screen");
    const gameScreen = document.querySelector(".game_container");

    world.clearWorld();
    world = null;

    keyboard = new Keybord();
    initObjects();
    init();
    playGameMusic();
    
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
}

/**
 * Returns to the home screen by clearing the game world and showing the start screen.
 */
function backHome() {
    const endScreen = document.querySelector(".end_screen");
    const gameScreen = document.querySelector(".game_container");

    world.clearWorld();
    world = null;

    keyboard = new Keybord();
    showStartScreen();
    playIntroMusic();

    endScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
}

/**
 * Toggles the mute state of the game sound.
 */
function toggleSoundButton() {
    if (typeof soundReference !== "undefined" && soundReference.toggleMute) {
        soundReference.toggleMute();
    }
}

/**
 * Plays the intro music in a loop at a low volume.
 */
function playIntroMusic() {
    introMusic.loop = true;
    introMusic.volume = 0.1;
    introMusic.play();
}

document.addEventListener('click', (event) => {
    let startGameButton = document.getElementById('start-game-button');
    if (!startGameButton.contains(event.target)) {
        playIntroMusic();
    }
}, { once: true });

/**
 * Plays the game music, stopping the intro music first.
 */
function playGameMusic() {
    introMusic.pause();
    introMusic.currentTime = 0;
    gameMusic.loop = true;
    gameMusic.volume = 0.1;
    gameMusic.play();
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreenButton() {
    let gameContainer = document.getElementById('main-container');
    if (!document.fullscreenElement) {
        enterFullscreen(gameContainer);
    } else {
        exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    let fullscreenIcons = document.querySelectorAll('.fullscreen-icon');

    fullscreenIcons.forEach(icon => {
        if (document.fullscreenElement) {
            icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
                <path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/>
            </svg>
            `;
        } else {
            icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
                <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
            </svg>
            `;
        }
    });
});


/**
 * Enters fullscreen mode for a given HTML element.
 * 
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox Support
        element.mozRequestFullScreen();
    }

    // Elemente in den Fullscreen-Modus versetzen
    const fullscreenElements = [
        '#start-screen',
        '#main-container',
        '#start-screen-img',
        '#end-screen',
        '#game-container',
        '#canvas'
    ];

    fullscreenElements.forEach(selector => {
        document.querySelector(selector)?.classList.add('fullscreen-mode');
    });

    // Spezielle Anpassungen für das Bild
    const gameImage = document.querySelector('#start-screen img');
    if (gameImage) {
        gameImage.style.maxHeight = 'none';
        gameImage.style.maxWidth = 'none';
    }

    // Titel ausblenden
    document.querySelector('.title')?.classList.add('hidden');
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox Support
        document.mozCancelFullScreen();
    }

    // Fullscreen-Klasse entfernen
    const fullscreenElements = [
        '#start-screen',
        '#main-container',
        '#start-screen-img',
        '#end-screen',
        '#game-container',
        '#canvas'
    ];

    fullscreenElements.forEach(selector => {
        document.querySelector(selector)?.classList.remove('fullscreen-mode');
    });

    // Bildgröße zurücksetzen
    const gameImage = document.querySelector('#start-screen img');
    if (gameImage) {
        gameImage.style.maxHeight = '480px';
        gameImage.style.width = '720px';
    }

    // Titel wieder einblenden
    document.querySelector('.title')?.classList.remove('hidden');
}

/**
 * Checks the screen width and displays an overlay if the width is below 720px.
 */
function checkScreenWidth() {
    const rotationOverlay = document.getElementById("screen-rotation");

    if (window.innerWidth <= 720) {
        rotationOverlay.classList.remove("hidden");
    } else {
        rotationOverlay.classList.add("hidden");
    }
}

window.addEventListener("resize", checkScreenWidth);
window.addEventListener("load", checkScreenWidth);


