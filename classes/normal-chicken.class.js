/**
 * Represents the normal chickens in the game.
 * Extends the MovableObject class to inherit movement and animation functionality.
 */
class NormalChicken extends MovableObject {
    positionY = 330;
    height = 100;
    width = 100;
    positionX = 200;
    energy = 25;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    /**
     * Array of images for the dead animation.
     * @type {string[]}
     */
    IMAGES_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Array of images for the dead animation.
     * @type {string[]}
     */
    IMAGES_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Initializes the normal chicken, loads images and starts animations.
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_WALKING);
        this.positionX = 1200 + Math.random() * 1700;
        this.speed = 0.5 + Math.random() * 2;
        this.animateChicken(this.IMAGES_CHICKEN_WALKING, this.IMAGES_CHICKEN_DEAD);
    }

}