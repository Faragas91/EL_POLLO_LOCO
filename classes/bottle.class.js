class Bottle extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 0,
        left: 40,
        right: 40,
        bottom: 0,
    }

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.positionY = y;
    }
}