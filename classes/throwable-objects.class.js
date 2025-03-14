class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.positionX = x;
        this.positionY = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
           this.positionX += 20; 
           this.playAnimation(this.IMAGES_THROW);
        }, 50);
    }

}