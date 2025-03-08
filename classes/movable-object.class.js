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
