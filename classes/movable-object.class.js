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
    
    isColliding(obj) {
        return  this.positionX + this.width - this.offset.right > obj.positionX + obj.offset.left && 
                this.positionX + this.offset.left < (obj.positionX + obj.width) + obj.offset.right && 
                this.positionY + this.height - this.offset.bottom > obj.positionY + obj.offset.top &&
                this.positionY + this.offset.top < (obj.positionY + obj.height) + obj.offset.bottom
    }

    isCollidingFromAbove(obj) {
        return  this.positionX + this.width / 2 > obj.positionX &&
                this.positionX + this.width / 2 < obj.positionX + obj.width &&
                this.positionY + this.height > obj.positionY &&
                this.positionY + this.height < obj.positionY + obj.height / 2
    }
    
    isCollidingFromSideOrBelow(obj) {
        return this.isColliding(obj) && !this.isCollidingFromAbove(obj);
    }
    
    hit() {
        this.energy -= 2;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    moveRight() {
        this.positionX += this.speed;
    }

    moveLeft() {
        this.positionX -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration; 
            } 
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.positionY < this.groundLevel;
        }
    }

    jump() {
        if (this.positionY >= this.groundLevel) {
            this.speedY = 15;
        }
    }

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

    animateCoins(images) {
        setInterval(() => {
            this.playAnimation(images);
        }, 300);
    }

}