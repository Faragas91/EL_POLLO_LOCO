class World {
    character = new Character();
    endBoss = new Endboss();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    healthStatusBar = new Statusbar('health', 20, 0);
    coinStatusBar = new Statusbar('coin', 20, 50);
    bottleStatusBar = new Statusbar('bottle', 20, 100);
    // endBossStatusBar = new Statusbar('endbossHealth', 600, 0);
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
        this.endBoss.world = this;
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCharacterToEnemyCollisions();
            this.checkCharacterToCoinCollisions();
            this.checkCharacterToBottleCollisions();
            this.checkThrowObjects();
            this.checkBottleToEnemieCollsions();
        }, 200);
    }

    checkCharacterToEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromAbove(enemy) && this.character.speedY < 0 ){
                this.character.speedY = 20;
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000);
            } else if (this.character.isCollidingFromSideOrBelow(enemy)) {
                this.character.hit();
                this.healthStatusBar.setPercantage(this.character.energy);
            }
        });
    }

    checkCharacterToCoinCollisions(){
        this.level.coin = this.level.coin.filter(coin => {
            if (this.character.isColliding(coin)){
                this.character.collectCoin();
                this.coinStatusBar.setPercantage(this.character.foundCoin);
                return false;
            }
            return true;
        });
    }

    checkCharacterToBottleCollisions(){
        this.level.bottle = this.level.bottle.filter(bottle => {
            if (this.character.isColliding(bottle) && this.character.foundBottle !== 100){
                this.character.collectBottle();
                this.bottleStatusBar.setPercantage(this.character.foundBottle);
                return false;
            }
            return true;
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW && this.character.foundBottle !== 0) {
            let bottle = new ThrowableObject(this.character.positionX + 100, this.character.positionY + 100)
            this.throwableObjects.push(bottle);
            this.bottleStatusBar.setPercantage(this.character.foundBottle -= 20);
            this.checkBottleToEnemieCollsions(bottle);
        }
    }

    checkBottleToEnemieCollsions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasBeenHit) {
                    bottle.hasBeenHit = true;
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        enemy.energy = Math.max(0, enemy.energy - 25);
                        enemy.hit();
                    } else {
                        enemy.energy = 0;
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                        }, 1000);
                    }
                }
            });
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        // this.addToMap(this.endBossStatusBar);
        this.ctx.translate(this.camera_x, 0);
        
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
        // mo.drawFrame(this.ctx);
        mo.drawOffsetFrame(this.ctx);

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