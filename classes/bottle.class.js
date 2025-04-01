/**
 * Represents a bottle in the game.
 * Extends the MovableObject class.
 */
class Bottle extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 0,
        left: 40,
        right: 40,
        bottom: 0,
    }

    /**
     * Creates a new bottle object.
     * @param {string} imagePath - The path to the bottle image.
     * @param {number} x - The x-coordinate position of the bottle.
     * @param {number} y - The y-coordinate position of the bottle.
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.positionY = y;
    }
}