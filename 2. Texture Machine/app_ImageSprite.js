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

/* 1 : Container one */
const container = new PIXI.Container();

// const char2Sprite = PIXI.Sprite.from('./images/char2.png');
const char2Sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/eggHead.png');
container.addChild(char2Sprite);

// const char3Sprite = PIXI.Sprite.from('./images/char3.png');
const char3Sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/flowerTop.png');
container.addChild(char3Sprite);

app.stage.addChild(container);

char2Sprite.position.set(1000, 500);

container.x = 200;

console.log(char3Sprite.x);
console.log(char3Sprite.getGlobalPosition());
console.log(container.children);

/* 2 : Container two */
const particleContainer = new PIXI.ParticleContainer(1000, {
    position: true,
    rotation: true,
    vertices: true,
    tint: true,
    uvs: true
});


const loader = PIXI.Loader.shared;

loader.add(['./images/char4.png', './images/chsdfsdf.png'])
//.add('char5Texture', './images/char5.png')
.load(setup);

function setup(loader, resources) {
    const char4Sprite = new PIXI.Sprite(
        resources['./images/char4.png'].texture
    );
    char4Sprite.y = 400;
    app.stage.addChild(char4Sprite);
}

loader.onLoad.add(function() {
    console.log('on load');
});

loader.onError.add(function() {
    console.log('on error');
});

loader.onProgress.add(function() {
    console.log('on progress');
});


// loader.add('tileset', './images/tileset.png')
// //.add('char5Texture', './images/char5.png')
// .load(setup);

// function setup(loader, resources) {
//     const texture1 = resources.tileset.texture;
//     const rect1 = new PIXI.Rectangle(176, 160, 76, 86);
//     texture1.frame = rect1;
//     const spr1 = new PIXI.Sprite(texture1);
//     spr1.scale.set(2, 2);
//     app.stage.addChild(spr1);

//     const texture2 = new PIXI.Texture(resources.tileset.texture);
//     const rect2 = new PIXI.Rectangle(190, 593, 77, 84);
//     texture2.frame = rect2;
//     const spr2 = new PIXI.Sprite(texture2);
//     spr2.scale.set(2, 2);
//     spr2.position.set(200, 200);
//     app.stage.addChild(spr2);
// }


// loader.add('tileset', './images/drags.json')
// //.add('char5Texture', './images/char5.png')
// .load(setup);

// function setup(loader, resources) {
//     const drag11Texture = PIXI.Texture.from('drag11.png');
//     const drag11Sprite = new PIXI.Sprite(drag11Texture);
//     drag11Sprite.position.set(800, 300);
//     drag11Sprite.scale.set(2, 2);
//     app.stage.addChild(drag11Sprite);
// }


loader.add('tileset', './images/drags.json')
//.add('char5Texture', './images/char5.png')
.load(setup);

function setup(loader, resources) {
    const textures = [];
    for(let i = 1; i < 13; i++) {
        const texture = PIXI.Texture.from(`drag${i}.png`);
        textures.push(texture);
    }
    const drag = new PIXI.AnimatedSprite(textures);
    drag.position.set(800, 300);
    drag.scale.set(2, 2);
    app.stage.addChild(drag);
    drag.play();
    drag.animationSpeed = 0.1;


    // const blurFilter = new PIXI.filters.BlurFilter(15);
    // drag.filters = [blurFilter];
    // blurFilter.blur = 2;
}


const cloudsTexture = PIXI.Texture.from('./images/clouds.png');
const cloudsSprite = new PIXI.TilingSprite(
    cloudsTexture,
    app.screen.width,
    app.screen.height
);

cloudsSprite.tileScale.set(0.5, 0.5);

app.ticker.add(function() {
    cloudsSprite.tilePosition.x += 1;
});

app.stage.addChild(cloudsSprite);

const sound = new Howl({
    src: ['./sound/pelimusaa.wav']
});

//sound.play();