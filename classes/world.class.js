class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    healthStatusBar = new Statusbar('health', 20, 0);
    coinStatusBar = new Statusbar('coin', 20, 50);
    bottleStatusBar = new Statusbar('bottle', 20, 100);
    throwableObjects = [];
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthStatusBar.setPercantage(this.character.energy);
            }
        });
    }

    checkCoinCollisions(){
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)){
                this.character.collectCoin();
                this.coinStatusBar.setPercantage(this.character.foundCoin);
            }
        });
    }

    checkBottleCollisions(){
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)){
                this.character.collectBottle();
                console.log(this.character.collectBottle())
                this.bottleStatusBar.setPercantage(this.character.foundBottle);
                console.log(this.bottleStatusBar.setPercantage(this.character.foundBottle))
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.positionX + 100, this.character.positionY + 100)
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.positionX = mo.positionX * -1;
    }

    flipImageBack(mo) {
        mo.positionX = mo.positionX * -1;
        this.ctx.restore();
    }


}