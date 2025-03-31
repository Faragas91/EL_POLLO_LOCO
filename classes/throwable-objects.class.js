/**
 * Represents the throwable objects in the game.
 * Extends the MovableObject class to inherit visual and animation functionality.
 */
class ThrowableObject extends MovableObject {
    
    /**
     * Array of images for the bottle rotation.
     * @type {string[]}
     */
    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of images for the bottle splashes.
     * @type {string[]}
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.positionX = x;
        this.positionY = y;
        this.height = 80;
        this.width = 80;
        this.hasBeenHit = false;
        this.throw();
    }

    /**
     * Initiates the throwing action of the object.
     * The object moves horizontally and applies gravity.
     */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.positionX += 10; 
            this.playAnimation(this.IMAGES_THROW);
        }, 50);
    }

    /**
     * Triggers the splash effect when the object hits a target.
     * Stops the throwing motion and starts the splash animation.
     */
    splash() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.startedSplashInterval();
    }

    /**
     * Starts the splash animation interval and removes the object from the world after a timeout.
     */
    startedSplashInterval() {
        let splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 100);
    
        setTimeout(() => {
            clearInterval(splashInterval);
            let index = world.throwableObjects.indexOf(this);
            if (index > -1) {
                world.throwableObjects.splice(index, 1);
            }
        }, 600);
    }
}