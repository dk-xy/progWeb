import { randomWithSeed } from "../lib/math/randomWithSeed.js";
import generate from "./matrice.js";


export default class Automaton {
    constructor({
        larg = 20,
        haut = larg,
        sizePx = 10,
        colorAlive = "white",
        colorDead = "black",
        tileSize = 100 } = {}) {
        this.larg = larg
        this.haut = haut
        this.sizePx = sizePx
        this.colorAlive = colorAlive
        this.colorDead = colorDead
        this.tileSize = sizePx;


        this.matrice = generate(this.larg, this.haut, 1)

    }


    randomize(num) {
        const rnd = randomWithSeed(2736263);
    }

    // draw(ctx, posX, posY) {
    //     ctx.beginPath(); //cree ma forme
    //     ctx.fillStyle = this.colorAlive;
    //     ctx.rect((posX * this.larg), (posY * this.long), this.larg, this.haut,)//x,y,rayon,angle départ et angle de fin
    //     ctx.closePath();//fini ma forme
    //     ctx.fill();//puis on la rempli
    // }

    draw(ctx) {
        //lignes
        ctx.beginPath(); //cree ma forme

        for (let largeur = 0; largeur < this.larg; largeur++) {
            //colonnes
            for (let hauteur = 0; hauteur < this.haut; hauteur++) {
                if (this.matrice[largeur][hauteur] >0 ) {
                    ctx.fillStyle = this.colorAlive;
                } else { 
                ctx.fillStyle = this.colorDead;
            }
            ctx.fillRect(hauteur * this.tileSize, largeur * this.tileSize, 9, 9)
            }
        }
        

        ctx.closePath();//fini ma forme
        ctx.fill();//puis on la rempli
    }
}