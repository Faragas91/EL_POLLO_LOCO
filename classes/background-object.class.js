/**
 * Represents a background object in the game.
 * Extends the MovableObject class to inherit movement behavior.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The initial x-position of the background.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.positionX = x;
        this.positionY = 480 - this.height;
    }
}