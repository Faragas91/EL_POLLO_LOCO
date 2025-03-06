class Character extends MovableObject {
    positionY = 135;
    width = 150;
    height = 300;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    currentImage = 0;
    
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animateCharacter()
    }

    animateCharacter(){

        setInterval(() => { 
        let path = this.IMAGES_WALKING[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= this.IMAGES_WALKING.length) {
            this.currentImage = 0;
        }
    }, 100);
    }


    jump() {
    }
}