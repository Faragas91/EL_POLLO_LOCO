/////////////////////////////////
//////// Keyboard Section ///////
/////////////////////////////////

function setKeyState(key, state) {
    keyboard[key] = state;
}

// Game control keys
window.addEventListener("keydown", (event) => {
    handleKeyEvent(event.key, true);
});

window.addEventListener("keyup", (event) => {
    handleKeyEvent(event.key, false);
});

function handleKeyEvent(key, state) {
    const keyMap = {
        'a': 'LEFT',
        's': 'DOWN',
        'd': 'RIGHT',
        'w': 'UP',
        ' ': 'JUMP',
        'e': 'THROW'
    };

    if (keyMap[key]) {
        setKeyState(keyMap[key], state);
    }
}

/////////////////////////////////
//////// Touch Controls /////////
/////////////////////////////////

function addTouchControls(buttonId, key) {
    const button = document.getElementById(buttonId);
    
    if (!button) return;

    button.addEventListener('contextmenu', (event) => event.preventDefault());

    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        setKeyState(key, true);
    });

    button.addEventListener('touchend', (event) => {
        event.preventDefault();
        setKeyState(key, false);
    });
}

// Touch buttons zuweisen
addTouchControls('btnLeft', 'LEFT');
addTouchControls('btnRight', 'RIGHT');
addTouchControls('btnJump', 'UP');
addTouchControls('btnThrow', 'THROW');