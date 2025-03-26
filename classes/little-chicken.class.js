class LittleChicken extends MovableObject {
    positionY = 365;
    height = 60;
    width = 60;
    positionX = 200;
    speedY = 1;
    acceleration = 1;
    energy = 25;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    IMAGES_LITTLE_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_LITTLE_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGES_LITTLE_CHICKEN_WALKING[0]);
        this.loadImages(this.IMAGES_LITTLE_CHICKEN_WALKING);
        this.groundLevel = 365;
        this.positionX = 1000 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animateChicken(this.IMAGES_LITTLE_CHICKEN_WALKING, this.IMAGES_LITTLE_CHICKEN_DEAD);
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
