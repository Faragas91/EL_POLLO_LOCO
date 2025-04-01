let level1;

/**
 * Initializes all game objects and creates the level.
 */
function initObjects() {
    level1 = new Level(
        generateEnemies(),
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 720),
            new Cloud('img/5_background/layers/4_clouds/1.png', 720*2),
            new Cloud('img/5_background/layers/4_clouds/2.png', 720*3),
        ],
        [
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720*3),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 500 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 600 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 700 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 800 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1000 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1100 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1300 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1600 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1900 + Math.random() * 100, 330),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2000 + Math.random() * 100, 330),
        ]
    );
}

/**
 * Generates the enemies for the level.
 * @returns {MovableObject[]} An array of enemy objects.
 */
function generateEnemies() {
    const enemies = [];
    
    for (let i = 0; i < 5; i++) {
        enemies.push(new NormalChicken());
    }
    
    for (let i = 0; i < 5; i++) {
        enemies.push(new LittleChicken());
    }
    
    enemies.push(new Endboss());
    return enemies;
}