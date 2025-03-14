class LittleChicken extends MovableObject {
    positionY = 370;
    height = 50;
    width = 50;
    positionX = 200;
    speedY = 1;
    acceleration = 1;

    IMAGES_LITTLE_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_LITTLE_CHICKEN_WALKING[0]);
        this.loadImages(this.IMAGES_LITTLE_CHICKEN_WALKING);
        this.groundLevel = 370;
        this.positionX = 1000 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animateChicken(this.IMAGES_LITTLE_CHICKEN_WALKING);
        this.applyGravity();
        this.littleJump();
    }

    littleJump() {
        setInterval(() => {
            if (Math.random() < 0.001) {
                this.jump();
            }
        }, 10);
    }
}
