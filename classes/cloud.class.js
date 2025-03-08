class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.animateClouds();
    }

    animateClouds() {
        this.moveLeft();
    }
}