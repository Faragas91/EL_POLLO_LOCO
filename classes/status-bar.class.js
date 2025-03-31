/**
 * Represents the statusbars in the game.
 * Extends the DrawableObject class to inherit visual and update functionality.
 */
class Statusbar extends DrawableObject {

    /**
     * Array of images for the character health bar.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    
    /**
     * Array of images for the character coin bar.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Array of images for the character bottle bar.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Array of image for the endboss symbol.
     * @type {string[]}
     */
    IMAGES_ENDBOSS_SYMBOL = ['img/7_statusbars/3_icons/icon_health_endboss.png'];

    /**
     * Array of images for the endboss health bar.
     * @type {string[]}
     */
    IMAGES_ENDBOSS_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;
    width = 200;
    height = 60;

    /**
     * Creates an instance of the Statusbar class.
     * Initializes the position, type, and loads the appropriate images.
     * 
     * @param {string} type - The type of the statusbar (e.g., 'health', 'coin', 'bottle', 'endbossHealth', 'endbossSymbol').
     * @param {number} x - The x-coordinate of the statusbar.
     * @param {number} y - The y-coordinate of the statusbar.
     * @param {number} width - The width of the statusbar.
     * @param {number} height - The height of the statusbar.
     */
    constructor(type, x, y, width, height) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.loadImages(this.setImageType());
        this.setPercentage(this.setStartPercentage());
    }

    /**
     * Sets the image type based on the current type of the object.
     * When the this.type matches one of the predefined types, the corresponding images will be selected.
     * @returns {Array} An array of image paths corresponding to the current type.
     */
    setImageType() {
        if (this.type === 'health') {
            return this.IMAGES_HEALTH;
        } else if (this.type === 'coin') {
            return this.IMAGES_COIN;
        } else if (this.type === 'bottle') {
            return this.IMAGES_BOTTLE;
        } else if (this.type === 'endbossHealth') {
            return this.IMAGES_ENDBOSS_HEALTH;
        } else if (this.type === 'endbossSymbol') {
            return this.IMAGES_ENDBOSS_SYMBOL;
        }
    }

    /**
     * Sets the starting percentage based on the current type of the object.
     * For 'health' and 'endbossHealth', it returns 100; otherwise, it returns 0.
     * @returns {number} The starting percentage value.
     */
    setStartPercentage() {
        if (this.type === 'health' || this.type === 'endbossHealth') {
            return 100;
        } else {
            return 0;
        }
    }

    /**
     * Sets the percentage of the object, ensuring it does not exceed 100.
     * It also updates the image based on the current percentage.
     * @param {number} percentage - The percentage value to set, which will be clamped to a maximum of 100.
     */
    setPercentage(percentage) {
        this.percentage = Math.min(percentage, 100);
        let path = this.setImageType()[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * The index corresponds to different ranges of percentage values.
     * @returns {number} The index of the image based on the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1; 
        } else {
            return 0; 
        }
    }
}