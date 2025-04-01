/**
 * Represents the main character in the game.
 * Extends the MovableObject class to inherit movement and animation functionality.
 */
class Character extends MovableObject {

    /**
     * Array of images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of images for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
    ];

    /**
     * Array of images for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of images for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of images for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of images for the long idle animation.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    
    world;
    idleTime = 0;
    isLongIdle = false;
    isMoving;
    positionY = 130;
    width = 150;
    height = 300;
    speed = 5;
    offset = {
        top: 200,
        left: 40,
        right: 40,
        bottom: 0,
    };

    jumpSound = new Audio('audio/jump.mp3');
    snoreSound = new Audio('audio/snoring.mp3');

    /**
     * Initializes the character, loads images and sounds, and starts animations.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.groundLevel = 130;
        this.applyGravity();
        this.animateCharacter();
        this.loadCharacterSounds();
    }

    /**
     * Loads character-specific sounds into the global sound reference.
     */
    loadCharacterSounds() {
        soundReference.addSoundToList(this.jumpSound);
        soundReference.addSoundToList(this.snoreSound);
    }

    /**
     * Handles the character's animations and movements based on user input and game state.
     */
    animateCharacter() {
        setInterval(() => {
            if (this.isDead()) return;
            this.characterMovesRight();
            this.characterMovesLeft();
            this.setCameraPosition();
            this.characterJumps();
            this.returnToIdleWhenMoving();
        }, 1000 / 60);

        this.updateAnimations();
    }

    /**
     * Started to move the character to the right side
     * 
     */

    characterMovesRight() {
        if (this.world.keyboard.RIGHT && this.positionX < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * Started to move the character to the left side
     * 
     */
    characterMovesLeft() {
        if (this.world.keyboard.LEFT && this.positionX > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * Set the camera to the right position
     */

    setCameraPosition() {
        this.world.camera_x = -this.positionX + 100;
    }

    /**
     * Let jump the Character from the bottom
     */
    characterJumps() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.world.playSound(this.jumpSound, 0.1);
            this.world.stopSound(this.snoreSound);
            this.resetIdleTimer();
        }
    }

    /**
     * When the Character moves the snore animation will be stopped 
     * and it turns the idle animation again
     */
    
    returnToIdleWhenMoving() {
        if (this.isMoving) {
            this.resetIdleTimer();
        }
    }

    /**
     * Stops the snore sound when the game was finished
     */
    stopSnoreSoundWhenGameEnds() {
        if (this.world.gameWin || !this.world.gameWin) {
            this.world.stopSound(this.snoreSound);
        }
    }

    /**
     * Updates the animation from each condition
     */
    updateAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playCharacterDeadAnimation();
            } else if (this.isHurt()) {
                this.playCharacterHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.handleIdleAnimations();
            }
        }, 150);
    }

    /**
     * Play dead animation from the character
     * @returns 
     */
    playCharacterDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        return;
    }  

    /**
     * Play hurt animation from the character
     */
    playCharacterHurtAnimation() {
        this.world.stopSound(this.snoreSound);
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Handle idle animation when the character is moving.
     * When the character don't move the setIdleAnimation will be activated
     */

    handleIdleAnimations() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.isMoving = true;
            this.world.stopSound(this.snoreSound);
        } else {
            this.isMoving = false;
            this.setIdleAnimations();
        }
    }

    /**
     * Handles idle animations, including transitioning to long idle after a certain time.
     */
    setIdleAnimations() {
        if (this.isIdle()) {
            this.increaseIdleTime();
            this.updateIdleAnimation();
        }
    }

    /**
     * Checks if the character is idle (not moving, jumping, or hurt).
     * @returns {boolean} True if the character is idle, false otherwise.
     */
    isIdle() {
        return (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.isAboveGround() &&
            !this.isHurt() &&
            !this.isDead()
        );
    }

    /**
     * Increases the idle time counter.
     */
    increaseIdleTime() {
        this.idleTime += 80;
    }

    /**
     * Updates the character's animation based on idle time.
     * Plays long idle animation if enough time has passed.
     */
    updateIdleAnimation() {
        if (this.idleTime >= 10000) {
            this.startLongIdleAnimation();
        } else {
            this.startNormalIdleAnimation();
        }
    }

    /**
     * Starts the long idle animation and plays the snore sound safely.
     */
    startLongIdleAnimation() {
        if (!this.isLongIdle) {
            this.isLongIdle = true;
            this.stopSnoreSound();
            this.world.playSound(this.snoreSound, 0.1, true);
        }
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    /**
     * Starts the normal idle animation and resets long idle state.
     */
    startNormalIdleAnimation() {
        if (this.isLongIdle) {
            this.isLongIdle = false;
            this.currentImage = 0;
            this.stopSnoreSound();
        }
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Stops the snore sound safely to avoid play/pause conflicts.
     */
    stopSnoreSound() {
        this.snoreSound.pause();
        this.snoreSound.currentTime = 0;
    }

    /**
     * Resets the idle timer and stops the long idle state if active.
     */
    resetIdleTimer() {
        this.idleTime = 0;
        if (this.isLongIdle) {
            this.isLongIdle = false;
        }
    }
}