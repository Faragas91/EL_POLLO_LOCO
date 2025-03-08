class MovableObject {
    positionX = 80;
    positionY = 100;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    speed = 0.15;
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

    moveLeft() {
        setInterval(() => {
            this.positionX -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= this.IMAGES_WALKING.length) {
            this.currentImage = 0;
        }
    }
}
