class Endboss extends MovableObject {
    
    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ENDBOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    
    world;
    positionY = 50;
    height = 400;
    width = 250;
    positionX = 200;
    energy = 100;
    levelCapForBoss = 1700;
    level_end_x = 2200;
    speed = 10;
    isMovingRight = false;
    isMovingLeft = false;
    alert = true;
    isDeadAnimationPlayed = false;
    offset = {
        top: 70,
        left: 40,
        right: 40,
        bottom: 0,
    }

    constructor() {
        super();
        this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.positionX = 2200;
        this.animateEndboss();
    }

    animateEndboss() {
        setInterval(() => {
            if (this.isDeadAnimationPlayed) return;

            if (this.positionX > this.levelCapForBoss && this.isMovingLeft && !this.isMovingRight && !this.alert) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
            } 
            
            if (this.positionX < this.level_end_x && !this.isMovingLeft && this.isMovingRight && !this.alert) {
                this.moveRight();
                this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
            }
    
            if (this.positionX >= this.level_end_x || this.positionX <= this.levelCapForBoss) {
                this.toggleDirection();
            }
        }, 150);

        setInterval(() => { 
            if (this.isDeadAnimationPlayed) return;
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            }
        }, 300);
        
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
                this.isDeadAnimationPlayed = true;
            } 
        }, 300);
    }


    toggleDirection() {
        if (this.isDeadAnimationPlayed) return;
    
        if (this.positionX <= this.levelCapForBoss) {
            this.isMovingLeft = false;
            this.isMovingRight = false;
            this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
            setTimeout(() => {
                this.isMovingRight = true;
            }, 1000); 
        } else if (this.positionX >= this.level_end_x) {
            this.isMovingRight = false;
            this.isMovingLeft = false;
            if (this.alert) { 
                this.playAnimation(this.IMAGES_ENDBOSS_ALERT);
                setTimeout(() => {
                    this.isMovingLeft = true;
                    this.alert = false; 
                }, 10000);  
            } else { 
                this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
                setTimeout(() => {
                    this.isMovingLeft = true;
                }, 1000); 
            }
        }
    }
    
}
