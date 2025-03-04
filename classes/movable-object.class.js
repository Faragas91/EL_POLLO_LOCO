class MovableObject {
    positionX = 120;
    positionY = 250;
    img;
    width = 100;
    height = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("Moving right");
    }

    
    moveLeft() {
        
    }
}