let canvas;
let world;
let keyboard = new Keybord();

function showStartScreen() {
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    init();
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

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

