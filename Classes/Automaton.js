import { randomWithSeed } from "../lib/math/randomWithSeed.js";



export default class Automaton {
    constructor({ larg = 20, haut = 20, sizePx = 10, colorAlive = "#FF0000", colorDead = "000000" }= {}) {
        this.larg = larg
        this.haut = haut
        this.sizePx = sizePx
        this.colorAlive = colorAlive
        this.colorDead = colorDead

    }

    randomize(num) {
        const rnd = randomWithSeed(2736263);
    }

    draw(ctx, posX, posY) {
        ctx.beginPath(); //cree ma forme
        ctx.fillStyle = this.colorAlive;
        ctx.rect((posX*this.larg), (posY*this.long), this.larg, this.haut,)//x,y,rayon,angle départ et angle de fin
        ctx.closePath();//fini ma forme
        ctx.fill();//puis on la rempli
    }
}