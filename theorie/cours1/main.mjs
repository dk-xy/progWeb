//importation des classes
import Cercle from "/Classes/Cercle.js";
import Player from "/Classes/Player.js";
import MainLoop from "/lib/MainLoop.js";
import domManipulator from "/lib/domManipulator.js";
import Keyboard from "/Classes/keyboard.js";


//récuperation context graphique canvas, svt appellée ctx
const ctx = document.querySelector('canvas').getContext('2d');


//diff trucs a sortir
console.log(ctx.canvas);
//taille de element dom
console.log(ctx.canvas.clientHeight);
//taille du canvas
console.log(ctx.canvas.height);

// //on agrandit la toile pour qu elle aie la bonne taille, effaçage d ecran
// ctx.canvas.height = ctx.canvas.clientHeight;
// ctx.canvas.width = ctx.canvas.clientWidth;

//créations de cercles
//const c1 = new Cercle({x:300, y: 500, color:"#fff"});
const c1 = new Player({x:700, y: 600, color:"#fff"});

let clav = new Keyboard();

// c1.draw(ctx);

//creations de carrés
    // ctx.fillRect(25, 25, 100, 100);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);


//Explication du temps mais on va utiliser Mainloop !

    //on cherche la vitesse de l'écran
    //var de récuperation du temps
    //let lastTime = 0;
    //function tick(time){
        //on check le temps d'une frame
        //let deltaT = time - lastTime;
        //lastTime = time;
    //exemple animation
        // c1.setRadius(c1.r + 1);
        // c1.draw(ctx)
//         console.log(deltaT)
//         requestAnimationFrame(tick)
// }
//     requestAnimationFrame(tick)

// Recreation de tick avec MainLoop

MainLoop.setUpdate(dt => {
    console.log(dt)
    //TROP LENT c1.setX(c1.x +0.1) on add dt qui est deltatime
    // c1.setX(c1.x +0.1*dt)
    //tourné de canon
    if (clav.isKeyDown('KeyA')) {
        c1.turn(dt, -Math.PI/3000);
    }
    if (clav.isKeyDown('KeyD')) {
        c1.turn(dt, Math.PI/3000);
    }
    if (clav.isKeyDown('KeyW')) {
        c1.thrust(dt, 0.001);//pixel par milisec
    }
    if (clav.isKeyDown('KeyS')) {
        c1.thrust(dt, -0.001);//pixel par milisec
    }
    c1.move(dt);
    c1.friction(dt, 0.93) //98%
    
})

MainLoop.setDraw(()=>{
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    c1.draw(ctx)
})
MainLoop.start();


