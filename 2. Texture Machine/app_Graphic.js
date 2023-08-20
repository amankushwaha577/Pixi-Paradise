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

/* 1 : Rectangle Graphic */
const Graphics = PIXI.Graphics;
const rectangle = new Graphics();
rectangle.beginFill(0xFF99FF)
.lineStyle(10, 0xFFEA00, 0.7)
.drawRect(100, 500, 50, 150)
.endFill();
app.stage.addChild(rectangle);

/* 2 : Poly Graphic */
const poly = new Graphics();
poly.beginFill(0xFF66FF)
.lineStyle(5, 0xFFEA00, 1)
.drawPolygon([
    600, 50,
    800, 150,
    900, 300,
    400, 400
])
.endFill();
app.stage.addChild(poly);

/* 3 : Circle Graphic */
const circle = new Graphics();
circle.beginFill(0x22AACC)
.drawCircle(300, 570, 80)
.endFill();
app.stage.addChild(circle);

/* 4 : line Graphic */
const line = new Graphics();
line.lineStyle(5, 0xFFEA00, 1)
.moveTo(1500, 200)
.lineTo(1500, 500);
app.stage.addChild(line);

/* 5 : torus Graphic */
const torus = new Graphics();
torus.beginFill(0xFFFDDD)
.drawTorus(450, 530, 80, 100, 0, Math.PI / 2)
.endFill();
app.stage.addChild(torus);

/* 5 : torus Graphic */
const star = new Graphics();
star.beginFill(0xADADAD)
.drawStar(700, 570, 500, 80)
.endFill();
app.stage.addChild(star);

