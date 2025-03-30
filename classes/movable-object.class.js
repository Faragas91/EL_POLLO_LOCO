class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    groundLevel = 130;
    foundCoin = 0;
    foundBottle = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    
    /**
     * Checks if this object is colliding with another object.
     * Uses bounding box collision detection with offsets for more precise collision handling.
     * 
     * @param {Object} obj - The object to check collision against.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(obj) {
        return  this.positionX + this.width - this.offset.right > obj.positionX + obj.offset.left && 
                this.positionX + this.offset.left < (obj.positionX + obj.width) + obj.offset.right && 
                this.positionY + this.height - this.offset.bottom > obj.positionY + obj.offset.top &&
                this.positionY + this.offset.top < (obj.positionY + obj.height) + obj.offset.bottom;
    }

    /**
     * Checks if this object is colliding with another object from above.
     * Used to determine if the character is landing on an object.
     * 
     * @param {Object} obj - The object to check collision against.
     * @returns {boolean} True if colliding from above, otherwise false.
     */
    isCollidingFromAbove(obj) {
        return  this.positionX + this.width / 2 > obj.positionX &&
                this.positionX + this.width / 2 < obj.positionX + obj.width &&
                this.positionY + this.height > obj.positionY &&
                this.positionY + this.height < obj.positionY + obj.height / 2;
    }
    
    /**
     * Checks if this object is colliding from the side or below.
     * Uses `isColliding` but excludes collisions from above.
     * 
     * @param {Object} obj - The object to check collision against.
     * @returns {boolean} True if colliding from the side or below, otherwise false.
     */
    isCollidingFromSideOrBelow(obj) {
        return this.isColliding(obj) && !this.isCollidingFromAbove(obj);
    }
    
    /**
     * Reduces the object's energy when hit by an attack.
     * Ensures energy does not drop below zero.
     * 
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.energy -= damage;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead (i.e., energy is zero).
     * 
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Determines if the object has been recently hurt.
     * Uses a 500ms threshold since the last hit.
     * 
     * @returns {boolean} True if recently hurt, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.positionX += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.positionX -= this.speed;
    }

    /**
     * Plays an animation by cycling through a set of images.
     * 
     * @param {string[]} images - The array of image paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity to the object, making it fall when above ground.
     * Uses acceleration to simulate physics.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration; 
            } 
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.positionY < this.groundLevel;
        }
    }

    /**
     * Makes the object jump by setting its vertical speed.
     * Only allows jumping if the object is on the ground.
     */
    jump() {
        if (this.positionY >= this.groundLevel) {
            this.speedY = 15;
        }
    }

    /**
     * Animates a chicken object by cycling through walking or dead images.
     * Stops movement when the chicken dies.
     * 
     * @param {string[]} images - Array of image paths for walking animation.
     * @param {string} deadImages - Image path for the dead animation.
     */
    animateChicken(images, deadImages) {
        setInterval(() => { 
            if (this.isDead()) {
                this.loadImage(deadImages);
                this.speed = 0;
            } else {
                this.playAnimation(images);
            }
        }, 100);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Animates a coin object by cycling through different images.
     * 
     * @param {string[]} images - Array of image paths for the coin animation.
     */
    animateCoins(images) {
        setInterval(() => {
            this.playAnimation(images);
        }, 300);
    }

}