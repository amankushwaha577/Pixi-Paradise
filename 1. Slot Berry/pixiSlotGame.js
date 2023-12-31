
/* Step 1: Crate Pixi JS Application */
const app = new PIXI.Application({ backgroundColor: 0x9910BB });

/* Step 2: Adding Application's View to DOM */
document.body.appendChild(app.view);

/* Step 3: app.loader is used to load the resources locally in device. */
app.loader
    .add('https://pixijs.io/examples/examples/assets/eggHead.png')
    .add('https://pixijs.io/examples/examples/assets/flowerTop.png')
    .add('https://pixijs.io/examples/examples/assets/helmlok.png')
    .add('https://pixijs.io/examples/examples/assets/skully.png')

    /* Step 3B: it will call the onAssetsLoaded() function while loading the assets. */
    .load(onAssetsLoaded);

const REEL_WIDTH = 160;
const SYMBOL_HEIGHT = 150;

/* Step 4: onAssetsLoaded build the game */
function onAssetsLoaded() {
    /* Step A: Create different slot symbols. */
    const slotTextures = [
        PIXI.Texture.from('https://pixijs.io/examples/examples/assets/eggHead.png'),
        PIXI.Texture.from('https://pixijs.io/examples/examples/assets/flowerTop.png'),
        PIXI.Texture.from('https://pixijs.io/examples/examples/assets/helmlok.png'),
        PIXI.Texture.from('https://pixijs.io/examples/examples/assets/skully.png'),
    ];

    /* Step B: Build the reels */
    const reels = [];                                   // All 5 Reels will be store in this array.
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();                // One single reel will contain 4 symbols.
        rc.x = i * REEL_WIDTH;                          // Difference between reels is i * REEL_WIDTH.
        reelContainer.addChild(rc);                     // Add all reels one by one to reelContainer.

        const reel = {                                  // Reel Object will have 4 properties.
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
        };

        // Build the symbols
        for (let j = 0; j < 4; j++) {                   // Every reel will have 4 symbols.
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);   // Symbols will be picked randomly[0-3]
            symbol.y = j * SYMBOL_HEIGHT;               
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_HEIGHT / symbol.width, SYMBOL_HEIGHT / symbol.height);   // Scale the symbol to fit symbol area.
            symbol.x = Math.round((SYMBOL_HEIGHT - symbol.width) / 2);
            reel.symbols.push(symbol);                  // All 4 symbols will be pushed to reel.
            rc.addChild(symbol);                        // All 4 symbols will be added to rc-container as child.
        }
        reels.push(reel);                               // All reels will be pushed to reels Array.
    }

    app.stage.addChild(reelContainer);                  // Now add the container at stage.



    /* Step C: Build top & bottom covers and position reelContainer */
    const margin = (app.screen.height - SYMBOL_HEIGHT * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);

    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);       // (X,Y,Width,Height)

    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, SYMBOL_HEIGHT * 3 + margin, app.screen.width, margin);

    /* Step D: Add play text */
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const playText = new PIXI.Text('SPIN', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new PIXI.Text('SLOT BERRY', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    /* Step E: Set the interactivity */
    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.addListener('pointerdown', () => {
        startPlay();
    });

    let running = false;

    /* Step F: Function to start playing. */
    function startPlay() {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete() {
        running = false;
    }

    // Listen for animate update.
    app.ticker.add((delta) => {
        // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];

            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_HEIGHT - SYMBOL_HEIGHT;
                if (s.y < 0 && prevy > SYMBOL_HEIGHT) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_HEIGHT / s.texture.width, SYMBOL_HEIGHT / s.texture.height);
                    s.x = Math.round((SYMBOL_HEIGHT - s.width) / 2);
                }
            }
        }
    });
}

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}
// Listen for animate update.
app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
function backout(amount) {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}

