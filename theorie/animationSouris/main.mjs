import MainLoop from "/lib/MainLoop.js";
import Cercle from "/Classes/Cercle.js";
import Tweens, { easingsFct } from "/Classes/Tweens.js";
import { getRandomInt } from "/lib/math/random.js";
import domOn from "../../lib/domManipulator.js";

const tweens = new Tweens();
//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');

ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;



//pour cercle from 100 to 300
// const c1 = new Cercle({x:100,y:100, r:30});
// const tween1 = tweens.create({yoyo:true, loop:true, from:0, to: 100, duration:1000, animate: progress=>{
//     c1.x = progress;
//     if(progress == 100) {
//         console.log("DOOOOOOOOOOOOOOOOOOOOONE!");
//     }
// }});


//création de particules
// const nbParticules = easingsFct.length;
// const particules = new Array(nbParticules);
const c = new Cercle({
    x:0,
    y:0,
    r:20,
    color:'red'
})

let tweenX = null;
let tweenY
let mouse = {x:-100, y:-100};
domOn('canvas', 'mousemove', evt=>{
    //console.log(evt)
    const rect = ctx.canvas.getBoundingClientRect();
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
    tweens.delete(tweenX);
    tweenX = tweens.create({
        from: c.x,
        to: mouse.x,
        ease: 'linear',
        duration: 100,
        animate: progress =>{
            c.x= progress;
        }
    })

});




MainLoop.setSimulationTimestep(1000 / 60);
MainLoop.setUpdate((dt) => {
    tweens.update(dt);
    c.x= mouse.x;
    c.y = mouse.y;
})

MainLoop.setDraw(() => {
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    c.draw(ctx);
    //c1.draw(ctx);
    // particules.forEach(p =>
    //     p.draw(ctx));
        
})

MainLoop.start();