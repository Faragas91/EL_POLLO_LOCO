class NormalChicken extends MovableObject {
    positionY = 330;
    height = 100;
    width = 100;
    positionX = 200;

    IMAGES_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_WALKING);
        this.positionX = 500 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChicken(this.IMAGES_CHICKEN_WALKING);
    }
}