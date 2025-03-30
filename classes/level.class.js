/**
 * Represents a level in the game.
 */
class Level {
    
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    level_end_x = 2200;
    levelCapForBoss = 1700;

    /**
     * Creates a new Level instance.
     * 
     * @param {MovableObject[]} enemies - Array of enemy objects in the level
     * @param {MovableObject[]} clouds - Array of cloud objects in the level
     * @param {MovableObject[]} backgroundObjects - Array of background objects in the level
     * @param {Collectible} coin - Coin collectible in the level
     * @param {Collectible} bottle - Bottle collectible in the level
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
    }
}
