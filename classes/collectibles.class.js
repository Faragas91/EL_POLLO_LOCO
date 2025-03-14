class Collectibles extends MovableObject {

    
    width = 100;
    height = 100;

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.positionY = y;
    }
}