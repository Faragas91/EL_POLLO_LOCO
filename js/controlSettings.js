/**
 * Sets the state of a specified key in the keyboard object.
 * 
 * @param {string} key - The key to set the state for.
 * @param {boolean} state - The state of the key (true for pressed, false for released).
 */
function setKeyState(key, state) {
    keyboard[key] = state;
}

window.addEventListener("keydown", (event) => {
    handleKeyEvent(event.key, true);
});

window.addEventListener("keyup", (event) => {
    handleKeyEvent(event.key, false);
});


/**
 * Handles keyboard events and updates the corresponding key state.
 * 
 * @param {string} key - The key that was pressed or released.
 * @param {boolean} state - The state of the key (true for pressed, false for released).
 */
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

/**
 * Adds touch controls for a specific button, mapping it to a key action.
 * 
 * @param {string} buttonId - The ID of the button element.
 * @param {string} key - The key action to be triggered (e.g., 'LEFT', 'RIGHT').
 */
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

addTouchControls('btnLeft', 'LEFT');
addTouchControls('btnRight', 'RIGHT');
addTouchControls('btnJump', 'UP');
addTouchControls('btnThrow', 'THROW');