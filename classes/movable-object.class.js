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
        this.energy -= 5;
        console.log("HIT! Energy:", this.energy);
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            console.log("lastHit updated:", this.lastHit);
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    moveRight() {
        this.positionX += this.speed;
    }

    moveLeft() {
        this.positionX -= this.speed;
    }

    playAnimation(images) {
        if (!images || images.length === 0) {
            console.warn("Keine Bilder für die Animation gefunden.");
            return;
        }
    
        // Begrenze den Frame-Index auf gültige Werte
        if (this.currentImage >= images.length) {
            this.currentImage = 0; // Animation neu starten
        }
    
        let path = images[this.currentImage];
    
        if (!path) {
            console.warn("Kein gültiger Bildpfad gefunden für Frame:", this.currentImage);
            return;
        }
    
        if (!this.imageCache[path]) {
            console.warn("Bild nicht im Cache gefunden:", path);
            return;
        }
    
        this.img = this.imageCache[path];
        this.currentImage++;
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
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.positionY < 130
        }
    }

    jump() {
        this.speedY = 20;
    }
}
