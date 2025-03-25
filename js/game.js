let canvas;
let world;
let keyboard = new Keybord();

let introMusic = new Audio('audio/intro-music.mp3');
let gameMusic = new Audio('audio/background-music.mp3');

// Configure background music
soundReference.addSoundToList(introMusic);
soundReference.addSoundToList(gameMusic);
soundReference.updateButtonIcon();

function toggleSoundButton() {
    if (typeof soundReference !== "undefined" && soundReference.toggleMute) {
        soundReference.toggleMute();
    }
}

// Play intro music on first click or after a delay
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

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function showStartScreen() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");
    
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
}

function startGame() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    init();

    introMusic.pause();
    introMusic.currentTime = 0;
    gameMusic.volume = 0.1;
    gameMusic.play();
}

function fullscreenButton() {
    // Fullscreen-Modus hinzufügen
}

// Game control keys
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'a': 
            keyboard.LEFT = true;
            break;
        case 's': 
            keyboard.DOWN = true;
            break;
        case 'd': 
            keyboard.RIGHT = true;
            break;
        case 'w': 
            keyboard.UP = true;
            break;
        case ' ': 
            keyboard.JUMP = true;
            break;
        case 'e': 
            keyboard.THROW = true;
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'a': 
            keyboard.LEFT = false;
            break;
        case 's': 
            keyboard.DOWN = false;
            break;
        case 'd': 
            keyboard.RIGHT = false;
            break;
        case 'w': 
            keyboard.UP = false;
            break;
        case ' ': 
            keyboard.JUMP = false;
            break;
        case 'e': 
            keyboard.THROW = false;
            break;
        default:
            break;
    }
});

