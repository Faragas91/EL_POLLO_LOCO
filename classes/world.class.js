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
    gameWin;
    endScreenSoundPlayed = false;

    coinFindSound = new Audio('audio/coin.mp3');
    bottleFindSound = new Audio('audio/bottle.mp3');
    bottleSplashSound = new Audio('audio/splash.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    normalChickenDeadSound = new Audio('audio/chicken.mp3');
    littleChickenDeadSound = new Audio('audio/little-chicken.mp3');
    endbossAlertSound = new Audio('audio/endboss.mp3');
    gameWinSound = new Audio('audio/game-win.mp3');
    gameLoseSound = new Audio('audio/game-lose.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.loadSounds();
    }

    setWorld() {
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
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
            this.checkGameWin();
            this.checkGameOver();
            
            // Nur aufrufen, wenn Game Over oder Sieg passiert ist
            if (this.character.energy <= 0 || this.gameWin) {
                this.playEndScreenSound();
            }
        }, 200);
    }
    
    
    loadSounds() {
        soundReference.addSoundToList(this.coinFindSound);
        soundReference.addSoundToList(this.bottleFindSound);
        soundReference.addSoundToList(this.bottleSplashSound);
        soundReference.addSoundToList(this.hurtSound);
        soundReference.addSoundToList(this.normalChickenDeadSound);
        soundReference.addSoundToList(this.littleChickenDeadSound);
        soundReference.addSoundToList(this.endbossAlertSound);
        soundReference.addSoundToList(this.gameWinSound);
        soundReference.addSoundToList(this.gameLoseSound);
    }

    playSound(sound, volume, loop = false) {
        sound.loop = loop;
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play();
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    checkGameOver() {
        if (this.character.energy <= 0) {
            this.gameWin = false;
            setTimeout(() => {
                showEndScreen();
            }, 1000);
        }
    }
    
    checkGameWin() {
        this.level.enemies.forEach((enemy) => { 
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                this.gameWin = true;
                setTimeout(() => {
                    showEndScreen();
                }, 1000);
            }
        });
    }

    playEndScreenSound() {
        if (this.endScreenSoundPlayed) return;

        this.stopSound(this.endbossAlertSound);
        this.playGameWinSound();
        this.playGameOverSound();

    }
    
    playGameWinSound() {
        if (this.gameWin) {
            console.log('Spiel gewonnen! Sound wird abgespielt.');
            this.endScreenSoundPlayed = true;
            setTimeout(() => {
                this.playSound(this.gameWinSound, 0.1);
            }, 1000);
        }
    }

    playGameOverSound() {
        if (this.character.energy <= 0) {
            console.log('Spiel verloren! Sound wird abgespielt.');
            this.endScreenSoundPlayed = true;
            setTimeout(() => {
                this.playSound(this.gameLoseSound, 0.1);
            }, 1000);
        }
    }

    checkCharacterToEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromAbove(enemy) && this.character.speedY < 0 ){
                this.character.speedY = 20;
                enemy.energy = 0;
                if (enemy instanceof NormalChicken) {
                    this.playSound(this.normalChickenDeadSound, 0.1);
                } 
                if (enemy instanceof LittleChicken) {
                    this.playSound(this.littleChickenDeadSound, 0.1);
                }
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000);
            } else if (this.character.isCollidingFromSideOrBelow(enemy)) {
                if (this.character.energy <= 0) return;
                this.character.hit(2);
                this.playSound(this.hurtSound, 0.1);
                this.healthStatusBar.setPercantage(this.character.energy);
            }
        });
    }

    checkCharacterToCoinCollisions(){
        this.level.coin = this.level.coin.filter(coin => {
            if (this.character.isColliding(coin)){
                this.character.collectCoin();
                this.playSound(this.coinFindSound, 0.1);
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
                this.playSound(this.bottleFindSound, 0.1);
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
                    this.playSound(this.bottleSplashSound, 0.1);
                    if (enemy instanceof Endboss) {
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
            this.playSound(this.endbossAlertSound, 0.1);
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