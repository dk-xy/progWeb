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

//création de cercles

// for (let i = 0; i < 200; i++) {
// let randOne = Math.floor(Math.random() * 1000);
// let randTwo = Math.floor(Math.random()*1000);
// let randRad = Math.floor(Math.random()*20);
// let oneCercle = new Cercle();
// oneCercle.setX(randOne);
// oneCercle.setY(randTwo);
// oneCercle.setRadius(randRad);
// oneCercle.setColor(oneCercle.getRandomColor())
// oneCercle.draw(ctx);

// }

//const c1 = new Cercle({y: 200, x: 100, r: 20, color: 'red'})
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
    // let oneCercle = new Cercle(posX,posY,rayonMax, vitesse, newColor, newColor);
    let oneCercle = new Cercle({ x: posX, y: posY, r: getRandomInt(rayonMin, rayonMax), color: newColor, colorborder: newColor });
    console.log(oneCercle)
    tabCercle.push(oneCercle);
    //onstructor({ x = 0, y = 0, r = 100,speed = 20, color = 'red', colorborder = 'red' } = {})
}

//console.log(tabCercle);
//interpollation


let leClavier = new Keyboard();

// MainLoop.setUpdate(dt=>{
//     console.log(dt)
//     //c1.setX(c1.x+0.1*dt)
// })
// MainLoop.setDraw(dt=>{
//     //c1.draw(dt);
// })
// MainLoop.start()
let lastTime = 0;
let animationTime = 0;
// //estimation de 2 sec d'interval de temps
// if(animationTime>=2000){
//     console.log(animationTime);
//     animationTime-=2000
// }



// MainLoop.setUpdate(dt => {
//     tabCercle.forEach(elm => {
//         elm.setX(elm.x+0.1*dt)
//     })
// })
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




window.addEventListener('keydown', evt => {
    console.log(evt.code)
    MainLoop.start()
    switch (true) {
        //added infinity here
        case leClavier.keys.has('KeyD') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    if (elm.x >= ctx.canvas.width) {
                        elm.setX(0);
                    } else {
                        elm.setX(elm.x + elm.speed * dt)
                    }

                })
            })

            break;
            //added inifinity here too but it's wonky
        case leClavier.keys.has('KeyA') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    if (elm.x <= 0) {
                        elm.setX(ctx.canvas.width)
                    }
                })
            })
            break;
        case leClavier.keys.has('KeyS') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setY(elm.y + elm.speed * dt)
                })
            })
            break;
        case leClavier.keys.has('KeyW') && leClavier.keys.size == 1:
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setY(elm.y - elm.speed * dt)
                })
            })
            break;
        case leClavier.keys.has('KeyD') && leClavier.keys.has('KeyW'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x + elm.speed * dt)
                    elm.setY(elm.y - elm.speed * dt)
                })
            })
            break;
        case leClavier.keys.has('KeyD') && leClavier.keys.has('KeyS'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x + elm.speed * dt)
                    elm.setY(elm.y + elm.speed * dt)
                })
            })
            break;

        case leClavier.keys.has('KeyA') && leClavier.keys.has('KeyW'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    elm.setY(elm.y - elm.speed * dt)
                })
            })
            break;


        case leClavier.keys.has('KeyA') && leClavier.keys.has('KeyS'):
            MainLoop.setUpdate(dt => {
                tabCercle.forEach(elm => {
                    elm.setX(elm.x - elm.speed * dt)
                    elm.setY(elm.y + elm.speed * dt)
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