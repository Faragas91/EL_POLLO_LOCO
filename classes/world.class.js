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
    statusBars = {
        health: new Statusbar('health', 20, 0, 200, 60),
        coin: new Statusbar('coin', 20, 50, 200, 60),
        bottle: new Statusbar('bottle', 20, 100, 200, 60),
        endboss: new Statusbar('endbossHealth', 500, 50, 200, 40),
        endbossSymbol: new Statusbar('endbossSymbol', 655, 45, 50, 60),
    };
    throwableObjects = [];
    gameWin;
    endScreenSoundPlayed = false;
    endScreenShowed = false;

    sounds = {
        coin: new Audio('audio/coin.mp3'),
        bottle: new Audio('audio/bottle.mp3'),
        hurt: new Audio('audio/hurt.mp3'),
        normalChickenDead: new Audio('audio/chicken.mp3'),
        littleChickenDead: new Audio('audio/little-chicken.mp3'),
        endbossAlert: new Audio('audio/endboss.mp3'),
        gameWin: new Audio('audio/game-win.mp3'),
        gameLose: new Audio('audio/game-lose.mp3'),
    };

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
            this.checkCollisions();
            this.showEndScreen();
            this.checkEndScreenSound();
        }, 200);
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
     * Checks for all possible collisions in the game.
     */
    checkCollisions() {
        this.checkCharacterToEnemyCollisions();
        this.checkCharacterToCoinCollisions();
        this.checkCharacterToBottleCollisions();
        this.checkThrowObjects();
        this.checkBottleToEnemieCollisions();
    }

    /**
     * Checks if the game is over or won, and triggers the end screen.
     */
    showEndScreen() {
        if (!this.endScreenShowed) {
            this.checkGameWin();
            this.checkGameOver();
        }
    }

    /**
     * Checks which end screen sound should be played based on the game state.
     */
    checkEndScreenSound() {
        if (this.character.energy <= 0 || this.gameWin) {
            this.playEndScreenSound();
        }
    }

    /**
     * Loads all game sounds into the sound reference list.
     */
    loadSounds() {
        Object.values(this.sounds).forEach(sound => soundReference.addSoundToList(sound));
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
        if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy <= 0)) {
            this.gameWin = true;
            setTimeout(() => {
                showEndScreen();
                this.endScreenShowed = true;
            }, 1000);
        }
    }

    /**
     * Plays the appropriate end screen sound based on game outcome.
     */
    playEndScreenSound() {
        if (this.endScreenSoundPlayed) return;

        soundReference.stopSound(this.sounds.endbossAlert);
        soundReference.stopSound(this.character.snoreSound);

        this.endScreenSoundPlayed = true;
        const sound = this.gameWin ? this.sounds.gameWin : this.sounds.gameLose;
        setTimeout(() => soundReference.playSound(sound, 0.1), 1000);
    }

    /**
     * Handles collisions between the character and enemies.
     */
    checkCharacterToEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingFromAbove(enemy) && this.character.speedY < 0) {
                this.handleEnemyCollision(enemy);
            } else if (this.character.isCollidingFromSideOrBelow(enemy)) {
                this.handleCharacterHit();
            }
        });
    }

    /**
     * Handles the collision when the character jumps on an enemy.
     */
    handleEnemyCollision(enemy) {
        this.character.speedY = 12.5;
        enemy.energy = 0;
        this.playEnemyDeathSound(enemy);
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 500);
    }

    /**
     * Plays the appropriate death sound for the enemy.
     */
    playEnemyDeathSound(enemy) {
        const sound = enemy instanceof NormalChicken ? this.sounds.normalChickenDead :
            enemy instanceof LittleChicken ? this.sounds.littleChickenDead : null;
        if (sound) soundReference.playSound(sound, 0.1);
    }

    /**
     * Handles when the character is hit by an enemy.
     */
    handleCharacterHit() {
        if (this.character.energy > 0) {
            this.character.hit(10);
            if (!this.gameWin) soundReference.playSound(this.sounds.hurt, 0.1);
            this.statusBars.health.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCharacterToCoinCollisions() {
        this.level.coin = this.level.coin.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                soundReference.playSound(this.sounds.coin, 0.1);
                this.statusBars.coin.setPercentage(this.character.foundCoin);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkCharacterToBottleCollisions() {
        this.level.bottle = this.level.bottle.filter(bottle => {
            if (this.character.isColliding(bottle) && this.character.foundBottle !== 100) {
                this.character.collectBottle();
                soundReference.playSound(this.sounds.bottle, 0.1);
                this.statusBars.bottle.setPercentage(this.character.foundBottle);
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
            soundReference.stopSound(this.character.snoreSound);
            this.character.resetIdleTimer();
            const bottle = new ThrowableObject(this.character.positionX + 100, this.character.positionY + 100);
            this.throwableObjects.push(bottle);
            this.statusBars.bottle.setPercentage(this.character.foundBottle -= 20);
            this.checkBottleToEnemieCollisions(bottle);
        }
    }

    /**
     * Checks if a thrown bottle collides with an enemy.
     */
    checkBottleToEnemieCollisions() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy) && !bottle.hasBeenHit) {
                    this.handleBottleCollision(bottle, enemy);
                }
            });
        });
    }

    /**
     * Handles the collision between a bottle and an enemy.
     */
    handleBottleCollision(bottle, enemy) {
        bottle.hasBeenHit = true;
        bottle.splash();
        soundReference.playSound(this.sounds.bottle, 0.1);

        if (enemy instanceof Endboss) {
            enemy.hit(20);
            this.statusBars.endboss.setPercentage(enemy.energy);
        } else if (enemy instanceof NormalChicken || enemy instanceof LittleChicken) {
            this.handleChickenDeath(enemy);
        }
    }

    /**
     * Handles the death of a chicken enemy.
     */
    handleChickenDeath(enemy) {
        enemy.energy = 0;
        const sound = enemy instanceof NormalChicken ? this.sounds.normalChickenDead : this.sounds.littleChickenDead;
        soundReference.playSound(sound, 0.1);
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 1000);
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        if (this.stopDrawing) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addAllObjectsToMap();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds all objects like character, collectibles and enemies to the map.
     */
    addAllObjectsToMap() {
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
     * Adds status bars to the map.
     */
    addStatusbarsToMap() {
        Object.values(this.statusBars).forEach(bar => this.addToMap(bar));
    }

    /**
     * Adds the endboss health bar to the map.
     */
    addEndbossHealthBarToMap() {
        if (this.character.positionX >= this.level.levelCapForBoss && !this.setEndbossHealthbar) {
            this.setEndbossHealthbar = true;
            soundReference.playSound(this.sounds.endbossAlert, 0.1);
        }

        if (this.setEndbossHealthbar) {
            this.addToMap(this.statusBars.endboss);
            this.addToMap(this.statusBars.endbossSymbol);
        }
    }

    /**
     * Adds all collectible objects like coins, bottles, environment and clouds.
     */
    addAllCollectibleObjectsToMap() {
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds an array of game objects to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }

    /**
     * Adds a single game object to the map and handles image flipping if necessary.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally before rendering.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.positionX = mo.positionX * -1;
    }

    /**
     * Restores the original position of a flipped image.
     */
    flipImageBack(mo) {
        mo.positionX = mo.positionX * -1;
        this.ctx.restore();
    }
}
