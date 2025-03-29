/**
 * Represents all drawable objects in the game.
 * 
 */
class DrawableObject{
    positionX = 80;
    positionY = 100;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Load Image from the path parameter
     * @param {string} path The path to the image 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load Images from the array
     * @param {Array} arr The path from the array that include images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * Draws the object's image onto the canvas.
     * If the object type is 'endbossHealth', the image is mirrored horizontally.
     * In case of an error loading the image, a warning is logged to the console.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which the image will be drawn.
     */
    draw(ctx) {
        if (this.type === 'endbossHealth') {
            ctx.save();
            ctx.translate(this.positionX + this.width, this.positionY);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, 0, 0, this.width, this.height);
            ctx.restore();
        } else {
            this.catchErrorDuringDrawing(ctx);
        }
    }

    /**
     * In case of an error loading the image, a warning is logged to the console.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which the image will be drawn.
     */
    catchErrorDuringDrawing(ctx) {
        try {
            ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image,' , this.img);
        }
    }

    /**
     * Increas coin status bar when coin was collected
     */
    collectCoin(){
        this.foundCoin += 20;
    }

    /**
     * Increas bottle status bar when bottle was collected
     */
    collectBottle(){
        this.foundBottle += 20;
    }

        // drawFrame(ctx) {
    //     if (
    //       this instanceof Character ||
    //       this instanceof Endboss || 
    //       this instanceof NormalChicken || 
    //       this instanceof LittleChicken || 
    //       this instanceof Bottle || 
    //       this instanceof Coin
    //     ) {
    //       ctx.beginPath();
    //       ctx.lineWidth = "5";
    //       ctx.strokeStyle = "blue";
    //       ctx.rect(this.positionX, this.positionY, this.width, this.height);
    //       ctx.stroke();
    //     }
    //   }

    // drawOffsetFrame(ctx) {
    //     if (this instanceof Character || 
    //         this instanceof NormalChicken || 
    //         this instanceof LittleChicken || 
    //         this instanceof Bottle || 
    //         this instanceof Coin || 
    //         this instanceof ThrowableObject ||
    //         this instanceof Endboss) {
    //             ctx.beginPath();
    //             ctx.lineWidth = '3';
    //             ctx.strokeStyle = 'red';
    //             ctx.rect(this.positionX + this.offset.left, this.positionY + this.offset.top, this.width - this.offset.right -this.offset.left, this.height - this.offset.top - this.offset.bottom)
    //             ctx.stroke();
    //         }
    // }
}