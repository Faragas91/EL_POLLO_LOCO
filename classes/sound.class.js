class Sound {
    constructor(src, loop = false) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = 1.0;  
    }

    playSound() {
        if (this.audio.paused || this.audio.ended) {
            this.audio.currentTime = 0;
            this.audio.play();
        }
    }

    stopSound() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}
