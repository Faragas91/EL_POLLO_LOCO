class Coin extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
    }

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.positionY = y;
    }
}