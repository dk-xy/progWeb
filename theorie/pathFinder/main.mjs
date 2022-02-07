import Pathfinding from "/Classes/Pathfinding.js";
import MainLoop from "/lib/mainloop.js";
import conf from "./conf.js";
import KeyboardEvo from "../../Classes/keyboardEvo.js";
import Cercle from "/Classes/Cercle.js";
import Tweens from "/Classes/Tweens.js";

//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;
const tweens = new Tweens();


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
let automaton1 = new Pathfinding({ ...conf.automaton, rows, cols });

//cration cercle et calcul taille
const coord = automaton1.convertRowColToCoord(2,2);
let c1 = new Cercle({...coord, r: conf.automaton.tileSize/2, color:'red'});
const dest = automaton1.convertRowColToCoord(10,2);
const dest2 = automaton1.convertRowColToCoord(10,10);
const move1 = tweens.create({
    from:c1.y,
    to: dest.y, 
    animate: y=>{
    c1.y = y
    }
})

const move2 = tweens.create({
    after: move1,
    from:c1.x,
    to: dest2.x, 
    animate: x=>{
    c1.x = x
    }
})


//exemple de rotation
ctx.rotate(Math.PI/3);
//on l update en dehors du update pour pas que l'user voit la génération
automaton1.update();
automaton1.flowFieldTo(2,2);


MainLoop.setSimulationTimestep(100);
MainLoop.setUpdate((dt) => {
    if(pause)return;
    tweens.update(dt);
})


MainLoop.setDraw(() => {
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    automaton1.draw(ctx);
    c1.draw(ctx) 
})


MainLoop.start();