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
