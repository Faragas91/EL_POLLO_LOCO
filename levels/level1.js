let level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 720),
        new Cloud('img/5_background/layers/4_clouds/1.png', 720*2),
        new Cloud('img/5_background/layers/4_clouds/2.png', 720*3),
    ],
    [
        // new BackgroundObject('img/5_background/layers/air.png', 0),
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
        new Coin('img/8_coin/coin_1.png', 200 + Math.random() * 1000),
        new Coin('img/8_coin/coin_1.png', 400 + Math.random() * 1000),
    ]
);

