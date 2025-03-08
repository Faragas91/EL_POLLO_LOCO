class Coin extends MovableObject {
    positionY = 250;
    width = 250;
    height = 250;

    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
    }
}