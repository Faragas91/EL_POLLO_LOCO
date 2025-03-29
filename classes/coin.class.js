/**
 * Represents the coins in the game.
 * Extends the MovableObject class to inherit animation functionality.
 * 
 */
class Coin extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
    }

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Initializes the coins, loads images and starts animations.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.positionX = Math.random() * 2000;
        this.positionY = 200 + Math.random() * 100;
        this.animateCoins(this.IMAGES_COIN);
    }
}