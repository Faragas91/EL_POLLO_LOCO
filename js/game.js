let canvas;
let world;
let keyboard = new Keybord();

let introMusic = new Audio('audio/intro-music.mp3');
let gameMusic = new Audio('audio/background-music.mp3');

soundReference.addSoundToList(introMusic);
soundReference.addSoundToList(gameMusic);
soundReference.updateButtonIcon();


//////////////////////////////////////
//////// Start Screen Section ////////
//////////////////////////////////////

function showGameInfo() {
    let offScreenMenu = document.getElementById('game-info');
    offScreenMenu.classList.toggle('active');
}

function showStartScreen() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");
    
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
}

//////////////////////////////////////
//////// Game Screen Section ////////
//////////////////////////////////////

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function startGame() {
    const startScreen = document.querySelector(".start_screen");
    const gameScreen = document.querySelector(".game_container");

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    initObjects();
    init();
    playGameMusic();
}

//////////////////////////////////////
///////// End Screen Section /////////
//////////////////////////////////////

function showEndScreen() {
    const loseOrWin = document.getElementById('end-screen');
    const endScreen = document.querySelector(".end_screen");
    const gameScreen = document.querySelector(".game_container");
    
    if (world.gameWin) {
        gameMusic.pause();
        loseOrWin.innerHTML = `
            <img src="img/You won, you lost/You Win A.png" alt="You Win" width=720px height=480px>
            ${templateEndScreen()}
        `
        endScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    } else {
        gameMusic.pause();
        loseOrWin.innerHTML = `
            <img src="/img/You won, you lost/Game Over.png" alt="You Lose" width=720px height=480px>
            ${templateEndScreen()}
        `
        endScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    }
}

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

/////////////////////////////
/////// Sound Section ///////
/////////////////////////////

function toggleSoundButton() {
    if (typeof soundReference !== "undefined" && soundReference.toggleMute) {
        soundReference.toggleMute();
    }
}

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


function playGameMusic() {
    introMusic.pause();
    introMusic.currentTime = 0;
    gameMusic.loop = true;
    gameMusic.volume = 0.1;
    gameMusic.play();
}


////////////////////////////////////
///////// FullScreen Section ///////
////////////////////////////////////

function toggleFullscreenButton() {
    let gameContainer = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        enterFullscreen(gameContainer);
    } else {
        exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    let fullscreenIcon = document.querySelectorAll('.fullscreen-icon');

    if (document.fullscreenElement) {
        fullscreenIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
            <path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/>
        </svg>
        `;
    } else {
        fullscreenIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
            <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
        </svg>
        `;
    }
});

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

////////////////////////////////////////
//////// Screen Rotation Section ///////
////////////////////////////////////////

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

