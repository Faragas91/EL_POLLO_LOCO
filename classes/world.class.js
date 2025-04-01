/**
 * Represents the world in the game.
 * This class manages sound playback and mute functionality.
 */
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
    endbossStatusBar = new Statusbar('endbossHealth', 500, 50, 200, 40);
    endbossSymbol = new Statusbar('endbossSymbol', 655, 45, 50, 60);
    throwableObjects = [];
    setEndbossHealthbar;
    gameWin;
    endScreenSoundPlayed = false;
    endScreenShowed = false;

    coinFindSound = new Audio('audio/coin.mp3');
    bottleFindSound = new Audio('audio/bottle.mp3');
    bottleSplashSound = new Audio('audio/splash.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    normalChickenDeadSound = new Audio('audio/chicken.mp3');
    littleChickenDeadSound = new Audio('audio/little-chicken.mp3');
    endbossAlertSound = new Audio('audio/endboss.mp3');
    gameWinSound = new Audio('audio/game-win.mp3');
    gameLoseSound = new Audio('audio/game-lose.mp3');

    /**
     * Initializes the game world.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.loadSounds();
    }

    /**
     * Sets references to the world for the character and the endboss.
     */
    setWorld() {
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.endboss.world = this;
        this.character.world = this;
    }

    /**
     * Runs the game loop, checking collisions and game state periodically.
     */
    run() {
        setInterval(() => {
            this.checkCharacterToEnemyCollisions();
            this.checkCharacterToCoinCollisions();
            this.checkCharacterToBottleCollisions();
            this.checkThrowObjects();
            this.checkBottleToEnemieCollisions();
            this.showEndScreen();
            this.checkWhichEndScreenSoundShouldPlayed();
        }, 200);
    }

    /**
     * Shows the endscreen only one time
     */
    showEndScreen() {
        if (!this.endScreenShowed) {
            this.checkGameWin();
            this.checkGameOver();
        };
    }

    /**
     * Checks whether the end screen sound should be played based on the character's energy
     * and the game win status. 
     */
    checkWhichEndScreenSoundShouldPlayed() {
        if (this.character.energy <= 0 || this.gameWin) {
            this.playEndScreenSound();
        }
    }
    
    /**
     * Loads all game sounds into the sound reference list.
     */
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

    /**
     * Plays a given sound.
     * 
     * @param {HTMLAudioElement} sound - The sound to be played.
     * @param {number} volume - The volume level (0.0 to 1.0).
     * @param {boolean} [loop=false] - Whether the sound should loop.
     */
    playSound(sound, volume, loop = false) {
        sound.loop = loop;
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play();
    }

    /**
     * Stops a given sound and resets its playback time.
     * 
     * @param {HTMLAudioElement} sound - The sound to be stopped.
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Checks if the game is over and triggers the end screen if necessary.
     */
    checkGameOver() {
        if (this.character.energy <= 0) {
            this.gameWin = false;
            setTimeout(() => {
                showEndScreen();
                this.endScreenShowed = true;
            }, 1000);
        }
    }
    
    /**
     * Checks if the game is won by defeating the Endboss.
     */
    checkGameWin() {
        this.level.enemies.forEach((enemy) => { 
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                this.gameWin = true;
                setTimeout(() => {
                    showEndScreen();
                    this.endScreenShowed = true;
                }, 1000);
            }
        });
    }

    /**
     * Plays the appropriate end screen sound based on game outcome.
     */
    playEndScreenSound() {
        if (this.endScreenSoundPlayed) return;

        this.stopSound(this.endbossAlertSound);
        this.stopSound(this.character.snoreSound);
        if (this.gameWin) {
            this.playGameWinSound();
        } 
        if (!this.gameWin) {
            this.playGameOverSound();
        }
    }
    
    /**
     * Plays the game win sound with a slight delay.
     */
    playGameWinSound() {
        this.endScreenSoundPlayed = true;
        setTimeout(() => {
            this.playSound(this.gameWinSound, 0.1);
        }, 1000);
    }

    /**
     * Plays the game over sound with a slight delay.
     */
    playGameOverSound() {
        this.endScreenSoundPlayed = true;
        setTimeout(() => {
            this.playSound(this.gameLoseSound, 0.1);
        }, 1000);
    }
    
    /**
     * Clears the game world, stopping all drawings and removing objects.
     */
    clearWorld() {
        this.stopDrawing = true;
        this.level.enemies = [];
        this.level.coins = [];
        this.level.bottles = [];
        this.throwableObjects = [];
        this.healthStatusbar = null;
        this.coinStatusBar = null;
        this.bottleStatusbar = null;
        this.endbossStatusBar = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCharacterToEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromAbove(enemy) && this.character.speedY < 0) {
                this.handleEnemyCollision(enemy);
            } else if (this.character.isCollidingFromSideOrBelow(enemy)) {
                this.handleCharacterHit();
            }
        });
    }

    /**
     * Handles the collision when the character jumps on an enemy.
     * @param {Object} enemy - The enemy object that the character collided with.
     */
    handleEnemyCollision(enemy) {
        this.character.speedY = 12.5;
        enemy.energy = 0;
        this.playEnemyDeathSound(enemy);
        this.removeEnemyAfterDelay(enemy, 500);
    }

    /**
     * Plays the appropriate death sound for the enemy based on its type.
     * @param {Object} enemy - The enemy object whose death sound should be played.
     */
    playEnemyDeathSound(enemy) {
        if (enemy instanceof NormalChicken) {
            this.playSound(this.normalChickenDeadSound, 0.1);
        } 
        if (enemy instanceof LittleChicken) {
            this.playSound(this.littleChickenDeadSound, 0.1);
        }
    }

    /**
     * Removes the enemy from the level after a specified delay.
     * @param {Object} enemy - The enemy object to be removed.
     * @param {number} delay - The delay in milliseconds before the enemy is removed.
     */
    removeEnemyAfterDelay(enemy, delay) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, delay);
    }

    /**
     * Handles the situation when the character is hit by an enemy.
     * If the character's energy is greater than 0, it reduces the energy and plays a sound.
     */
    handleCharacterHit() {
        if (this.character.energy <= 0) return;
        this.character.hit(2);
        if (!this.gameWin) {
            this.playSound(this.hurtSound, 0.1);
        }
        this.healthStatusBar.setPercentage(this.character.energy);
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCharacterToCoinCollisions(){
        this.level.coin = this.level.coin.filter(coin => {
            if (this.character.isColliding(coin)){
                this.character.collectCoin();
                this.playSound(this.coinFindSound, 0.1);
                this.coinStatusBar.setPercentage(this.character.foundCoin);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkCharacterToBottleCollisions(){
        this.level.bottle = this.level.bottle.filter(bottle => {
            if (this.character.isColliding(bottle) && this.character.foundBottle !== 100){
                this.character.collectBottle();
                this.playSound(this.bottleFindSound, 0.1);
                this.bottleStatusBar.setPercentage(this.character.foundBottle);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if the player has thrown a bottle.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW && this.character.foundBottle !== 0) {
            this.stopSound(this.character.snoreSound)
            this.character.resetIdleTimer();
            let bottle = new ThrowableObject(this.character.positionX + 100, this.character.positionY + 100)
            this.throwableObjects.push(bottle);
            this.bottleStatusBar.setPercentage(this.character.foundBottle -= 20);
            this.checkBottleToEnemieCollisions(bottle);
        }
    }

    /**
     * Checks if a thrown bottle collides with an enemy.
     */
    checkBottleToEnemieCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasBeenHit) {
                    this.handleBottleCollision(bottle, enemy);
                }
            });
        });
    }

    /**
     * Handles the collision between a bottle and an enemy.
     * @param {Object} bottle - The thrown bottle.
     * @param {Object} enemy - The enemy that the bottle collided with.
     */
    handleBottleCollision(bottle, enemy) {
        bottle.hasBeenHit = true;
        bottle.splash();
        this.playSound(this.bottleSplashSound, 0.1);

        if (enemy instanceof Endboss) {
            enemy.hit(20);
            this.endbossStatusBar.setPercentage(enemy.energy);
        } else if (enemy instanceof NormalChicken) {
            this.handleChickenDeath(enemy, this.normalChickenDeadSound);
        } else if (enemy instanceof LittleChicken) {
            this.handleChickenDeath(enemy, this.littleChickenDeadSound);
        }
    }

    /**
     * Handles the death of a chicken enemy.
     * @param {Object} enemy - The chicken enemy that died.
     * @param {string} sound - The sound to play when the chicken dies.
     */
    handleChickenDeath(enemy, sound) {
        enemy.energy = 0;
        this.playSound(sound, 0.1);
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 1000);
    }
    
    /**
     * Draws the game world on the canvas.
     * Continuously updates and renders objects, backgrounds, and UI elements.
     */
    draw() {
        if (this.stopDrawing) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addAllObjectsToMap();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Add all objects like character, collectibles and enemies to the map
     */
    addAllObjectsToMap(){
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusbarsToMap();
        this.addEndbossHealthBarToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addAllCollectibleObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds character statusbars to the map.
     */
    addStatusbarsToMap() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
    }

    /**
     * Adds the endboss healthbar to the map when the character reached a specific positon
     */
    addEndbossHealthBarToMap() {
        if (this.character.positionX >= this.level.levelCapForBoss && !this.setEndbossHealthbar) {
            this.setEndbossHealthbar = true;
            this.playSound(this.endbossAlertSound, 0.1);
        }

        if (this.setEndbossHealthbar) {
            this.addToMap(this.endbossStatusBar);
            this.addToMap(this.endbossSymbol);
        }
    }

    /**
     * Adds all collectible objects like coins, bottles, enviroment and clouds
     */
    addAllCollectibleObjectsToMap() {
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds an array of game objects to the map.
     * 
     * @param {Array} objects - Array of game objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    /**
     * Adds a single game object to the map and handles image flipping if necessary.
     * 
     * @param {Object} mo - The game object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally before rendering.
     * 
     * @param {Object} mo - The game object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.positionX = mo.positionX * -1;
    }

    /**
     * Restores the original position of a flipped image.
     * 
     * @param {Object} mo - The game object to be restored.
     */
    flipImageBack(mo) {
        mo.positionX = mo.positionX * -1;
        this.ctx.restore();
    }

}