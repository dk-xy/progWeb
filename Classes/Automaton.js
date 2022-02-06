import { randomWithSeed } from "../lib/math/randomWithSeed.js";
import { generate } from "./matrice.js";


export default class Automaton {
    constructor({
        rows = 20,
        cols = rows,
        sizePx = 10,
        colorAlive = "white",
        colorDead = "black",
        tileSize = 200 } = {}) { //pas d option au controleur = valeur par défaut

        this.rows = rows
        this.cols = cols
        this.sizePx = sizePx
        this.colorAlive = colorAlive
        this.colorDead = colorDead
        this.tileSize = tileSize;


        this.matrix = generate(this.rows, this.cols, 0)

    }


    randomize(num) {
        const rnd = randomWithSeed(2736263);
    }

    // draw(ctx, posX, posY) {
    //     ctx.beginPath(); //cree ma forme
    //     ctx.fillStyle = this.colorAlive;
    //     ctx.rect((posX * this.rows), (posY * this.long), this.rows, this.cols,)//x,y,rayon,angle départ et angle de fin
    //     ctx.closePath();//fini ma forme
    //     ctx.fill();//puis on la rempli
    // }

    draw(ctx) {
        //lignes
        ctx.beginPath(); //cree ma forme

        for (let row = 0; row < this.rows; row++) {
            //colonnes
            for (let col = 0; col< this.cols; col++) {
                if (this.matrix[row][col] > 0 ) {
                    ctx.fillStyle = this.colorAlive;
                } else { 
                ctx.fillStyle = this.colorDead;
            }
            ctx.fillRect(col * this.tileSize + 1, row * this.tileSize + 1, 9, 9)
            }
        }
        

        ctx.closePath();//fini ma forme
        ctx.fill();//puis on la rempli
    }
}