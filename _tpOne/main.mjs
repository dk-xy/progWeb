import Cercle from "../Classes/Cercle.js";

//creation du canvas
const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.height = ctx.canvas.clientHeight; //on met le canvas a la taille du DOM
ctx.canvas.width = ctx.canvas.clientWidth;

// création de cercles

for (let i = 0; i < 200; i++) {
let randOne = Math.floor(Math.random() * 1000);
let randTwo = Math.floor(Math.random()*1000);
let randRad = Math.floor(Math.random()*20);
let oneCercle = new Cercle();
oneCercle.setX(randOne);
oneCercle.setY(randTwo);
oneCercle.setRadius(randRad);
oneCercle.setColor(oneCercle.getRandomColor())
oneCercle.draw(ctx);
    
}

const c1 = new Cercle({y: 200, x: 100, r: 20, color: 'red'})

let lastTime = 0;
function tick(time){
    let deltaT = time - lastTime;
    lastTime = time;
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    c1.setX(c1.x+0.1*deltaT);
    c1.draw(ctx)
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);