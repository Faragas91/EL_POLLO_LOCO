const soundReference = new Sound();

/**
 * Represents the sounds in the game.
 * This class manages sound playback and mute functionality.
 */
class Sound {
    /**
     * Creates an instance of the Sound class.
     * Initializes the mute state based on local storage and prepares an empty sound list.
     */
    constructor() {
        this.isMuted = localStorage.getItem("mute") === "true";
        this.sounds = [];
    }

    /**
     * Adds a sound to the list of sounds.
     * If the sound is muted, it sets the muted property of the sound.
     * 
     * @param {string} audio - The path for the sound file to be added.
     */
    addSoundToList(audio) {
        this.sounds.push(audio);
        if (this.isMuted) {
            audio.muted = true;
        }
    }

    /**
     * Toggles the mute state of the sound.
     * Updates the local storage and the muted property of all sounds.
     * Calls the method to update the button icon.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("mute", this.isMuted.toString());
        this.sounds.forEach(sound => (sound.muted = this.isMuted));
        this.updateButtonIcon();
    }
    

    /**
     * Updates the icon of the sound buttons based on the mute state.
     * Changes the inner HTML of each button to reflect the current mute status.
     */
    updateButtonIcon() {
        const soundButtons = document.querySelectorAll(".sound-btn");
        soundButtons.forEach(button => {
            button.innerHTML = this.isMuted
                ? `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
                    <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 
                    25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 
                    376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/>
                </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#1f1f1f">
                    <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 
                    40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
                </svg>`;
        });
    }
}