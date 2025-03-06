class BackgroundObject extends MovableObject {
    
    width = 720;
    height = 480;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.positionX = x;
        this.positionY = 480 - this.height;
    }
}