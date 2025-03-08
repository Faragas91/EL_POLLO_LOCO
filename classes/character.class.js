class Character extends MovableObject {
    positionY = 135;
    width = 150;
    height = 300;
    speed = 10;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    world;
    
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animateCharacter()
    }

    animateCharacter(){

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.positionX < this.world.level.level_end_x) {
                this.positionX += this.speed;
                this.otherDirection = false;
                
            }

            if (this.world.keyboard.LEFT && this.positionX > 0) {
                this.positionX -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.positionX + 100;
        }, 1000 / 60);

        setInterval(() => { 
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }


    jump() {
    }
}