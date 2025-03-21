let canvas;
let world;
let keyboard = new Keybord();
let allSounds = [];

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
    // Initialisiere alle Sounds
    initSounds();
}

function initSounds() {
    // Beispielhafte Sounds
    let coinFindSound = new Sound('audio/coin.mp3');
    let bottleFindSound = new Sound('audio/bottle.mp3');
    let hurtSound = new Sound('audio/hurt.mp3');
    let normalChickenDeadSound = new Sound('audio/chicken.mp3');
    let littleChickenDeadSound = new Sound('audio/little-chicken.mp3');
    let endbossHurtSound = new Sound('audio/endboss-hurt.mp3');
    let endbossAlertSound = new Sound('audio/endboss.mp3');
    let backgroundMusic = new Sound('audio/background-music.mp3');
    let bottleSplashSound = new Sound('audio/splash.mp3');

    
    // Alle Sounds in das Array hinzufügen
    allSounds.push(coinFindSound, bottleFindSound, hurtSound, normalChickenDeadSound, littleChickenDeadSound, endbossHurtSound, endbossAlertSound, backgroundMusic, bottleSplashSound);
}

function showStartScreen() {
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    init();
}

function soundButton() {
    // Alle Sounds stoppen
    allSounds.forEach(sound => {
        sound.stopSound();
    });
}

function fullscreenButton() {
    // Hier kannst du den Code für den Fullscreen-Modus hinzufügen
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

