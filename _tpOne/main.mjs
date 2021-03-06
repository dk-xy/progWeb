import Cercle from "../Classes/Cercle.js";
import MainLoop from "../lib/MainLoop.js";
import Keyboard from "../Classes/keyboard.js";
import randomColor from "../lib/colorGenerator.mjs";
import { getRandomInt } from "../lib/math/getRandomInt.js";
import domManipulator from "../lib/domManipulator.js";
import domOn from "../lib/domManipulator.js";

//creation du canvas
const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.height = ctx.canvas.clientHeight; //on met le canvas a la taille du DOM
ctx.canvas.width = ctx.canvas.clientWidth;


let tabCercle = new Array();
//Creation des cercles
console.log(ctx.canvas.height)
for (let i = 0; i < 300; i++) {
    let newColor = randomColor();
    let rayonMin = 5;
    let chance = getRandomInt(3, 0);
    console.log(chance)
    let rayonMax;
    if (chance >= 2) {
        rayonMax = 20;
    } else {
        rayonMax = 50;
    }
    let posX = getRandomInt(0, ctx.canvas.width);
    let posY = getRandomInt(0, ctx.canvas.height);
    console.log(posX)
    let oneCercle = new Cercle({ x: posX, y: posY, r: getRandomInt(rayonMin, rayonMax), color: newColor, colorborder: newColor });
    console.log(oneCercle)
    tabCercle.push(oneCercle);
}

//console.log(tabCercle);
//interpollation


let leClavier = new Keyboard();

let lastTime = 0;
let animationTime = 0;
// //estimation de 2 sec d'interval de temps
// if(animationTime>=2000){
//     console.log(animationTime);
//     animationTime-=2000
// }




//c1.setX(c1.x+0.1*deltaT);
//c1.draw(dt)

MainLoop.start()
MainLoop.setDraw(dt => {
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;
    tabCercle.forEach(elm => {
        elm.draw(ctx)
    })
})



//Listener pour keydown
window.addEventListener('keydown', evt => {
    //console.log(evt.code)
    //Start du Mainloop
    MainLoop.start()
    switch (true) {
        //added infinity here
        case leClavier.keys.has('KeyD') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x + elm.speed * dt)
                    if (elm.x >= ctx.canvas.width+elm.r) {
                        elm.setX(0-elm.r);
                    } 

                })
            })

            break;
            //added inifinity here too but it's wonky
        case leClavier.keys.has('KeyA') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    if (elm.x <= 0-elm.r) {
                        elm.setX(ctx.canvas.width+elm.r)
                    }
                })
            })
            break;
        case leClavier.keys.has('KeyS') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setY(elm.y + elm.speed * dt)
                    if (elm.y >= ctx.canvas.height+elm.r) {
                        elm.setY(0-elm.r)
                    }
                })
            })
            break;
        case leClavier.keys.has('KeyW') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setY(elm.y - elm.speed * dt)
                    if (elm.y <= 0-elm.r) {
                        elm.setY(ctx.canvas.height+elm.r)
                    }
                })
            })
            break;
        case leClavier.keys.has('KeyD') && leClavier.keys.has('KeyW'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x + elm.speed * dt)
                    elm.setY(elm.y - elm.speed * dt)
                    if (elm.x >= ctx.canvas.width+elm.r) {
                        elm.setX(0-elm.r);
                    } 
                    if (elm.y <= 0-elm.r) {
                        elm.setY(ctx.canvas.height+elm.r)
                    }
                })
            })
            break;
        case leClavier.keys.has('KeyD') && leClavier.keys.has('KeyS'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x + elm.speed * dt)
                    elm.setY(elm.y + elm.speed * dt)
                    if (elm.x >= ctx.canvas.width+elm.r) {
                        elm.setX(0-elm.r);
                    } 
                    if (elm.y >= ctx.canvas.height+elm.r) {
                        elm.setY(0-elm.r)
                    }
                })
            })
            break;

        case leClavier.keys.has('KeyA') && leClavier.keys.has('KeyW'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    elm.setY(elm.y - elm.speed * dt)
                    if (elm.x <= 0-elm.r) {
                        elm.setX(ctx.canvas.width+elm.r)
                    }
                    if (elm.y <= 0-elm.r) {
                        elm.setY(ctx.canvas.height+elm.r)
                    }
                })
            })
            break;


        case leClavier.keys.has('KeyA') && leClavier.keys.has('KeyS'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    elm.setY(elm.y + elm.speed * dt)
                    if (elm.x <= 0-elm.r) {
                        elm.setX(ctx.canvas.width+elm.r)
                    }
                    if (elm.y >= ctx.canvas.height+elm.r) {
                        elm.setY(0-elm.r)
                    }
                })
            })
            break;
        default:
            MainLoop.stop();
            break;
    }
})


window.addEventListener('keyup', evt => {
    if (leClavier.keys.size == 0) {
        MainLoop.stop()
    }

})


//OTHER FUNCTION FOR EXAMINATION

// function tick(time){
//     let deltaT = time - lastTime;
//     lastTime = time;
//     animationTime+=deltaT;
//     //estimation de 2 sec d'interval de temps
//     if(animationTime>=2000){
//         console.log(animationTime);
//         animationTime-=2000
//     }
//     ctx.canvas.height = ctx.canvas.clientHeight;
//     ctx.canvas.width = ctx.canvas.clientWidth;
//     //c1.setX(c1.x+0.1*deltaT);
//     //c1.draw(ctx)
//     tabCercle.forEach(elm => {
//     MainLoop.setUpdate(dt=>{
//         elm.setX(elm.x+0.1*dt)
//     })
//     MainLoop.setDraw(dt=>{
//         elm.draw(ctx);
//     })

//     MainLoop.start()
// });

//     requestAnimationFrame(tick);


//  requestAnimationFrame(tick)