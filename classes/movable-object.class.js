class MovableObject {
    positionX = 80;
    positionY = 100;
    img;
    width = 100;
    height = 150;
    imageCache = {};

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

    animate(positionX) {
        setInterval(() => {
            this.positionX -= positionX;
        }, 1000 / 60);
    }


















    moveRight() {
        document.addEventListener("keydown", function(event) {
            if (event.key === "d" || event.key === "D") {
                this.positionX += 10;
            }
        });
    }

    
    moveLeft() {
        document.addEventListener("keydown", function(event) {
            if (event.key === "a" || event.key === "A") {
                this.positionX -= 10;
            }
        });
    }
}