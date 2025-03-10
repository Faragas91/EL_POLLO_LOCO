class MovableObject {
    positionX = 80;
    positionY = 100;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    currentImage = 0;
    otherDirection = false;
    energy = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.positionX, this.positionY, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding (obj) {
        return  this.positionX + this.width > obj.positionX && 
                this.positionX < (obj.positionX + obj.width) && 
                this.positionY + this.height > obj.positionY &&
                this.positionY < (obj.positionY + obj.height);
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
        if (this.currentImage >= this.IMAGES_WALKING.length) {
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
