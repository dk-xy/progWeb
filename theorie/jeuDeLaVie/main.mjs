import Automaton from "/Classes/Automaton.js";
import MainLoop from "/lib/mainloop.js";
import conf from "./conf.js";
import KeyboardEvo from "../../Classes/keyboardEvo.js";

//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;


let pause = false;


const clav = new KeyboardEvo(false, false);
clav.onKeyDown('p', () => {
    console.log('pose')
    if (!pause) {
        pause = true;
    } else { pause = false;}
    
})

let cols = Math.floor(ctx.canvas.width / conf.automaton.tileSize);
let rows = Math.floor(ctx.canvas.height / conf.automaton.tileSize);
let automaton1 = new Automaton({ ...conf.automaton, rows, cols });

console.log(automaton1.countAliveNeighbours({ row: 0, col: 0 }))
MainLoop.setSimulationTimestep(100);
MainLoop.setUpdate((dt) => {
    if(pause)return;
    automaton1.update();
})


MainLoop.setDraw(() => {

    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    automaton1.draw(ctx);
})


MainLoop.start();