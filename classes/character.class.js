class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',

    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

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
        left: 0,
        right: 40,
        bottom: 0,
    }

    jumpSound = new Audio('audio/jump.mp3');
    snoreSound = new Audio('audio/snoring.mp3');
    
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

    loadCharacterSounds() {
        soundReference.addSoundToList(this.jumpSound);
        soundReference.addSoundToList(this.snoreSound);
    }

    animateCharacter(){
        setInterval(() => {
            if (this.isDead()) {
                return
            }

            if (this.world.keyboard.RIGHT && this.positionX < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.positionX > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.positionX + 100;

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.world.playSound(this.jumpSound, 0.1);
                this.world.stopSound(this.snoreSound);
                this.resetIdleTimer();
            }

            if (this.isMoving){
                this.resetIdleTimer();
            } 
            
            if (this.world.gameWin || !this.world.gameWin) {
                this.world.stopSound(this.snoreSound);
            }
        }, 1000 / 60);

        setInterval(() => { 
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            } else if (this.isHurt()) {
                this.world.stopSound(this.snoreSound);
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.isMoving = true;
                    this.world.stopSound(this.snoreSound);
                } else {
                    this.isMoving = false;
                    this.setIdleAnimations();
                }
            }
        }, 150);
    }

    setIdleAnimations() {
        if (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.isAboveGround() &&
            !this.isHurt() &&
            !this.isDead()
        ) {
            this.idleTime += 80;
    
            if (this.idleTime >= 15000) {
                if (!this.isLongIdle) {
                    this.isLongIdle = true;
                    this.world.playSound(this.snoreSound, 0.1, true);
                }
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                if (this.isLongIdle) {
                    this.isLongIdle = false;
                    this.currentImage = 0;
                }
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }
    
    
    resetIdleTimer() {
        this.idleTime = 0;
        if (this.isLongIdle) {
            this.isLongIdle = false;
            this.world.playSound(this.snoreSound, 0.1, true);
        }
    }
}