class DrawableObject{
    positionX = 80;
    positionY = 100;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

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
        try {
            ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image,' , this.img.src);
        }
        
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
}