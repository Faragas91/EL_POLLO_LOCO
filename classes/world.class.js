class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    healthStatusBar = new Statusbar('health', 20, 0, 200, 60);
    coinStatusBar = new Statusbar('coin', 20, 50, 200, 60);
    bottleStatusBar = new Statusbar('bottle', 20, 100, 200, 60);
    endbossStatusBar = new Statusbar('endbossHealth', 500, 10, 200, 40);
    endbossSymbol = new Statusbar('endbossSymbol', 655, 5, 50, 60);
    throwableObjects = [];
    setEndbossHealthbar;

    backgroundMusic = new Sound('audio/background-music.mp3');
    coinFindSound = new Sound('audio/coin.mp3');
    bottleFindSound = new Sound('audio/bottle.mp3');
    bottleSplashSound = new Sound('audio/splash.mp3');
    hurtSound = new Sound('audio/hurt.mp3');
    normalChickenDeadSound = new Sound('audio/chicken.mp3');
    littleChickenDeadSound = new Sound('audio/little-chicken.mp3');
    endbossHurtSound = new Sound('audio/endboss-hurt.mp3');
    endbossAlertSound = new Sound('audio/endboss.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss); // Endboss aus dem Level holen
        this.endboss.world = this;
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCharacterToEnemyCollisions();
            this.checkCharacterToCoinCollisions();
            this.checkCharacterToBottleCollisions();
            this.checkThrowObjects();
            this.checkBottleToEnemieCollisions();
            this.checkGameOver();
            this.backgroundMusic.playSound();
        }, 200);
    }

    checkGameOver() {
        this.level.enemies.forEach((enemy) => { 
            if (enemy instanceof Endboss) {
                if (enemy.energy <= 0){
                    console.log('Lost');
                }
            }
        })
        if (this.character.energy <= 0) {
            console.log('Lost');
        }
    }

    checkCharacterToEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromAbove(enemy) && this.character.speedY < 0 ){
                this.character.speedY = 20;
                enemy.energy = 0;
                if (enemy instanceof NormalChicken) {
                    this.normalChickenDeadSound.playSound();
                } 
                if (enemy instanceof LittleChicken) {
                    this.littleChickenDeadSound.playSound();
                }
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000);
            } else if (this.character.isCollidingFromSideOrBelow(enemy)) {
                this.hurtSound.playSound();
                this.character.hit(2);
                this.healthStatusBar.setPercantage(this.character.energy);
            }
        });
    }

    checkCharacterToCoinCollisions(){
        this.level.coin = this.level.coin.filter(coin => {
            if (this.character.isColliding(coin)){
                this.character.collectCoin();
                this.coinFindSound.playSound();
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
                this.bottleFindSound.playSound();
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
            this.checkBottleToEnemieCollisions(bottle);
        }
    }

    checkBottleToEnemieCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasBeenHit) {
                    bottle.hasBeenHit = true;
                    bottle.splash();
                    this.bottleSplashSound.playSound();
                    if (enemy instanceof Endboss) {
                        this.endbossHurtSound.playSound();
                        this.endbossStatusBar.setPercantage(enemy.energy)
                        enemy.hit(30);
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

        if (this.character.positionX >= this.level.levelCapForBoss && !this.setEndbossHealthbar) {
            this.setEndbossHealthbar = true;
            this.endbossAlertSound.playSound();
        }



        if (this.setEndbossHealthbar) {
            this.addToMap(this.endbossStatusBar);
            this.addToMap(this.endbossSymbol);

        }

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