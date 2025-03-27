function templateEndScreen() {
    return `
        <div class="end_buttons-container">        
            <button class="restart_button end_screen_buttons" id="restart-game-button" onclick="restartGame()">
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#000000">
                    <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 
                    155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 
                    56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
                    />
                </svg>
                <span>Restart</span>
            </button>
            <button class="homescreen_button end_screen_buttons" id="homescreen-button" onclick="backHome()">
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#000000">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
                    />
                </svg>
                <span>Homescreen</span>
            </button>
        </div>
    `
}