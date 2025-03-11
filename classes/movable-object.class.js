class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    isColliding (obj) {
        return  this.positionX + this.width > obj.positionX && 
                this.positionX < (obj.positionX + obj.width) && 
                this.positionY + this.height > obj.positionY &&
                this.positionY < (obj.positionY + obj.height);
    }

    hit() {
        this.energy -= 0.5;
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
        return timepassed < 1;
    }

    moveRight() {
        this.positionX += this.speed;
    }

    moveLeft() {
        this.positionX -= this.speed;
    }

    playAnimation(images) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.positionY < 130
    }

    jump() {
        this.speedY = 20;
    }
}
