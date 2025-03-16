class ThrowableObject extends MovableObject {



    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

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

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.positionX += 20; 
            this.playAnimation(this.IMAGES_THROW);
        }, 50);
    }

    splash() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);

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