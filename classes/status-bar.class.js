class Statusbar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]
    percentage = 100;

    constructor(type, x, y) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = 200;
        this.height = 60;
        this.type = type;

        if (this.type === 'endBossHealth') {
            console.log('Boss');
        } else {
            this.loadImages(this.setImageType());
            this.setPercantage(this.setStartPerentage());
        }
    }

    setImageType(){
        if (this.type === 'health') {
            return this.IMAGES_HEALTH;
        } else if (this.type === 'coin') {
            return this.IMAGES_COIN;
        } else if (this.type === 'bottle') {
            return this.IMAGES_BOTTLE;
        }
    }

    setStartPerentage(){
        if (this.type === 'health') {
            return 100;
        } else {
            return 0;
        }
    }

    setPercantage(percentage){
        this.percentage = Math.min(percentage, 100);
        let path = this.setImageType()[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80){
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1; 
        } else {
            return 0; 
        }
    }
}