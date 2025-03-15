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
        this.img.onload = () => console.log("Bild geladen:", path);
        this.img.onerror = (e) => console.error("Bild konnte nicht geladen werden:", path, e);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.onload = () => console.log("Bild geladen:", path);
            img.onerror = (e) => console.error("Bild konnte nicht geladen werden:", path, e);
            this.imageCache[path] = img;
        });
    }
    
    
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image,' , this.img);
        }
        
    }

    drawFrame(ctx) {
        if (this instanceof Character || 
            this instanceof NormalChicken || 
            this instanceof LittleChicken || 
            this instanceof Bottle || 
            this instanceof Coin || 
            this instanceof ThrowableObject ||
            this instanceof Endboss) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.positionX, this.positionY, this.width, this.height);
                ctx.stroke();
            }
    }
    collectCoin(){
        this.foundCoin += 20;
    }

    collectBottle(){
        this.foundBottle += 20;
    }
}