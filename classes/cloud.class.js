/**
 * Represents a cloud in the game.
 * Extends the MovableObject class to inherit movement functionality.
 */
class Cloud extends MovableObject {
    /**
     * The vertical position of the cloud.
     * @type {number}
     */
    positionY = 20;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Creates a new Cloud instance.
     * @param {string} imagePath - The path to the image of the cloud.
     * @param {number} x - The initial horizontal position of the cloud.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.positionX = x;
        this.animateClouds();
    }

    /**
     * Handles the cloud's animation by moving it to the left.
     */
    animateClouds() {
        this.moveLeft();
    }
}