let canvas;
let world;
let keyboard = new Keybord();

// let introMusic = new Audio('audio/intro-music.mp3');
// let gameMusic = new Audio('audio/bg-music.mp3');

// // Configure background music
// introMusic.loop = true;
// gameMusic.loop = true;
// soundManager.addSound(introMusic);
// soundManager.addSound(gameMusic);
// soundManager.updateButtonUI();

function toggleSoundButton() {
    if (typeof soundReference !== "undefined" && soundReference.toggleMute) {
        soundReference.toggleMute();
    }
}

// document.addEventListener('click', (event) => {
//     let playButton = document.getElementById('playButton');
//     if (!playButton.contains(event.target) && introMusic.paused) {
//         introMusic.volume = 0.1;
//         introMusic.play();
//     }
// }, { once: true });

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function showStartScreen() {
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    init();

    // introMusic.pause();
    // introMusic.currentTime = 0;
    // gameMusic.volume = 0.1;
    // gameMusic.play();
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

