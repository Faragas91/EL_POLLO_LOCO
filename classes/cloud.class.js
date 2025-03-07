class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.animateClouds();
    }

    animateClouds() {
        this.moveLeft();
    }
}