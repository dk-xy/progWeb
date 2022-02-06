import MainLoop from "/lib/MainLoop.js";
import Cercle from "/Classes/Cercle.js";
import Tweens from "/Classes/Tweens.js";

const tweens = new Tweens();
//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');
const c1 = new Cercle({x:100,y:100, r:30});

const text ="I could be the rain in your desert sky"

//pour cercle from 100 to 300
const tween1 = tweens.create({from:0, to: 100, duration:1000, animate: progress=>{
    c1.x = progress;
    if(progress == 100) {
        console.log("DOOOOOOOOOOOOOOOOOOOOONE!");
    }
}});
const tween2 = tweens.create({after: tween1, from:110, to: 300, duration:1000, animate: progress=>{
    c1.y = progress;
    if(progress == 100) {
        console.log("DOOOOOOOOOOOOOOOOOOOOONE!");
    }
}});

tweens.create({from: 0, to: text.length, duration: 2000, animate: progress=>{
    console.log(text.substring(0, Math.ceil(progress)));
}});


MainLoop.setSimulationTimestep(1000/60);
MainLoop.setUpdate((dt) => {
    tweens.update(dt);
})

MainLoop.setDraw(() => {
    
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    c1.draw(ctx);
})

MainLoop.start();