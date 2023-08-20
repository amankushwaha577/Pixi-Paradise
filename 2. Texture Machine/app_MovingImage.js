const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);


/* 1: Moving Picture */
app.ticker.add(delta => loop(delta));

function loop(delta) {
    char1Sprite.x += 1;
    char1Sprite.rotation += 0.01;
}

// // const char1Texture = PIXI.Texture.from('./images/char1.png');
// // const char1Sprite = new PIXI.Sprite(char1Texture);

// const char1Sprite = PIXI.Sprite.from('./images/char1.png');
// app.stage.addChild(char1Sprite);

const char1Sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/eggHead.png');
app.stage.addChild(char1Sprite);

char1Sprite.width = 100;
char1Sprite.height = 100;

// char1Sprite.scale.x = 1.5;
// char1Sprite.scale.y = 2;
char1Sprite.scale.set(3, 3);

// char1Sprite.x = 200;
// char1Sprite.y = 400;
char1Sprite.position.set(100, 300);

// char1Sprite.anchor.x = 0.5;
// char1Sprite.anchor.y = 0.5;
char1Sprite.anchor.set(0.5, 0.5);

char1Sprite.interactive = true;
char1Sprite.buttonMode = true;

char1Sprite.on('pointerdown', function() {
    char1Sprite.scale.x += 0.1;
    char1Sprite.scale.y += 0.1;
});

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight')
        char1Sprite.x += 10;
    if(e.key === 'ArrowLeft')
        char1Sprite.x -= 10;
});

