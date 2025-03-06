class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    positionX = 0.5;
    
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.animate(this.positionX);
    }
}