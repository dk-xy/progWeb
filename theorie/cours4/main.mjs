import MainLoop from "/lib/MainLoop.js";
import Cercle from "/Classes/Cercle.js";
import Tweens from "/Classes/Tweens.js";
import { getRandomInt } from "/lib/math/random.js";

const tweens = new Tweens();
//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;

const text ="I could be the rain in your desert sky"

//pour cercle from 100 to 300
// const c1 = new Cercle({x:100,y:100, r:30});
// const tween1 = tweens.create({yoyo:true, loop:true, from:0, to: 100, duration:1000, animate: progress=>{
//     c1.x = progress;
//     if(progress == 100) {
//         console.log("DOOOOOOOOOOOOOOOOOOOOONE!");
//     }
// }});


//création de particules
const nbParticules = 3//easingsFct.length;
const particules = new Array(nbParticules);

for (let i = 0; i < particules.length; i++) {
    particules[i] = new Cercle({
        x:30 + i * 60,
        y:20,
        r:20,
        color: 'blue'});
    
}
// const tween2 = tweens.create({after: tween1, from:100, to: 0, duration:1000, animate: progress=>{
//     c1.x = progress;
//     if(progress == 100) {
//         console.log("DOOOOOOOOOOOOOOOOOOOOONE!");
//     }
// }});

// tweens.create({from: 0, to: text.length, duration: 2000, animate: progress=>{
//     console.log(text.substring(0, Math.ceil(progress)));
// }});


MainLoop.setSimulationTimestep(1000/60);
MainLoop.setUpdate((dt) => {
    tweens.update(dt);
})

MainLoop.setDraw(() => {
    
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    //c1.draw(ctx);
    particules.forEach(p=>
        p.draw(ctx));
})

MainLoop.start();