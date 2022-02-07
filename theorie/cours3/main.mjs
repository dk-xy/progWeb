import { generate } from "./../../Classes/matrice.js";
import Automaton from "../../Classes/Sand.js";
import MainLoop from "/lib/MainLoop.js";
import Keyboard from "./../../Classes/keyboard.js";

//pas de tri en set, mais plus rapide de recup les data
const array = [0, 2, 3, 1, 0, 2];
console.log(array);
const setFromArray = new Set(array);
console.log(setFromArray);
//[...setFromArray].sort();


const clav = new Keyboard();


clav.onKeyDown('KeyP', () => { console.log("P pressé") });
const m = [[1, 2], [3, 4]]; //tableau de taille 0
console.log(JSON.stringify(m));
const m2 = m;
const m3 = m[0];
m3[0] = 7;
console.log(JSON.stringify(m2))
m[0][0] = 8;
console.log(JSON.stringify(m2))


//2 boucle pour créer le tableau
for (let row = 0; row < m.length; row++) {
    for (let col = 0; col < m[row].length; col++) {
        //console.log(m[row][col])
    }
}

//--------------------------------------------------

//generation matrice 4x6
const rows = 4;
const cols = 6;
// const mat = new Array(rows);
// for (let row = 0; row < rows; row++){
//     mat[row] = new Array(cols);
//     for (let col = 0; col < cols; col ++){
//         mat[row][col] = 0;

//     }
// }

//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');


let mat = generate(rows, cols);
//mat[3][1] = 6;
console.log(JSON.stringify(mat))

const automaton1 = new Automaton({ rows: 20, cols: 80, tileSize: 20 , sizePx:20});
automaton1.matrix[0][0] = 1;

console.log(automaton1.matrix);
//automaton1.matrix[2][1] = 1; test de verification
//automaton1.draw(ctx);
MainLoop.setSimulationTimestep(100);
MainLoop.setUpdate(() => {
    automaton1.update();
})

MainLoop.setDraw(() => {
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    automaton1.draw(ctx);
})

MainLoop.start();

