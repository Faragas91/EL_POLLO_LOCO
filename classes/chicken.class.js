class Chicken extends MovableObject {
    positionY = 330;
    height = 100;
    width = 100;
    positionX = 200;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    currentImage = 0;

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.positionX = 200 + Math.random() * 500;
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => { 
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.positionX -= Math.random() * 10;
            if (this.currentImage >= this.IMAGES_WALKING.length) {
                this.currentImage = 0;
            }
        }, 100);
    }
}