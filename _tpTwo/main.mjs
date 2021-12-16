import Automaton from "../Classes/Automaton.js";
import { randomWithSeed } from "../lib/math/randomWithSeed.js";
import MainLoop from "../lib/MainLoop.js";
import generate from "../Classes/matrice.js";

const rnd = randomWithSeed(2736263);
console.log(rnd())
console.log(rnd())
console.log(rnd())
console.log(rnd())

//const arrayVie = [[]];
const autoMat = new Automaton();

//Generation matrice + rempli de 0 & 1
const rows = 2
const cols = 6
// const mat = new Array(rows)
const mat = new Automaton();

for (let row = 0; row < rows; row++) {
    mat[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
        mat[row][col] = Math.round(rnd());
    }
}

console.log(mat)


//creation du canvas
const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.height = ctx.canvas.clientHeight; //on met le canvas a la taille du DOM
ctx.canvas.width = ctx.canvas.clientWidth;

//console.log(mat)
// let automaton= new Automaton();
// console.log(automaton.matrice[0][1])
// console.log("hello")
// automaton.matrice[0][1]=1;
// console.log(automaton.matrice[0][1])

mat.draw(ctx)

//OLD CODE 

// for (let row = 0; row < rows; row++) {
//     mat[row].forEach(elm => {
//         console.log(elm)
//     });
//      for (let col = 0; col < cols; col++) {
//          console.log(mat[row][col])
//      }
// }
// //creation du canvas
// const ctx = document.querySelector('canvas').getContext('2d');
// ctx.canvas.height = ctx.canvas.clientHeight; //on met le canvas a la taille du DOM
// ctx.canvas.width = ctx.canvas.clientWidth;

// MainLoop.start()
// MainLoop.setDraw(dt => {
//     ctx.canvas.height = ctx.canvas.clientHeight;
//     ctx.canvas.width = ctx.canvas.clientWidth;

    



