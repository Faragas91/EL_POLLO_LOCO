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
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
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
        if (
          this instanceof Character ||
          this instanceof Endboss || 
          this instanceof NormalChicken || 
          this instanceof LittleChicken || 
          this instanceof Bottle || 
          this instanceof Coin
        ) {
          ctx.beginPath();
          ctx.lineWidth = "5";
          ctx.strokeStyle = "blue";
          ctx.rect(this.positionX, this.positionY, this.width, this.height);
          ctx.stroke();
        }
      }

    drawOffsetFrame(ctx) {
        if (this instanceof Character || 
            this instanceof NormalChicken || 
            this instanceof LittleChicken || 
            this instanceof Bottle || 
            this instanceof Coin || 
            this instanceof ThrowableObject ||
            this instanceof Endboss) {
                ctx.beginPath();
                ctx.lineWidth = '3';
                ctx.strokeStyle = 'red';
                ctx.rect(this.positionX + this.offset.left, this.positionY + this.offset.top, this.width - this.offset.right -this.offset.left, this.height - this.offset.top - this.offset.bottom)
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