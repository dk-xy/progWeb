import { randomWithSeed } from "../lib/math/randomWithSeed.js";
import { generateWithFn, clone } from "./matrice.js";


export default class Automaton {
    constructor({
        rows = 20,
        cols = rows,
        sizePx = 100,
        birthRule = new Set([3]),
        survivalRule = new Set([2,3]),
        colorAlive = "white",
        colorDead = "blue",
        isAliveProb = 0.2,
        tileSize = 20 } = {}) { //pas d option au controleur = valeur par défaut
        
        this.rows = rows
        this.cols = cols
        this.sizePx = sizePx
        this.colorAlive = colorAlive
        this.colorDead = colorDead
        this.tileSize = tileSize;
        this.birthRule = birthRule;
        this.survivalRule = survivalRule;


        this.matrix = generateWithFn(this.rows, this.cols, () => {
            return Math.random() > isAliveProb ? 0 : 1;
        })

    }

    convertRowColToCoord(row,col){
        return{
            x: col * this.tileSize + this.tileSize/2,
            y:row * this.tileSize + this.tileSize/2,
        }
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


    update() {
        const copy = clone(this.matrix);

        for (let row = 0; row < this.rows; row++) {
            //colonnes
            for (let col = 0; col < this.cols; col++) {
                const nbAliveNeighbours = this.countAliveNeighbours({ row, col });
                //check si vivante
                // nbAliveNeighbours - 1 == 2 || nbAliveNeighbours - 1 == 3 remplacé par un set
                if (this.matrix[row][col] && !(this.survivalRule.has(nbAliveNeighbours -1))) {
                    copy[row][col] = 0;
                } else if (!this.matrix[row][col] && this.birthRule.has(nbAliveNeighbours)) {
                    copy[row][col] = 1;
                }
            }
        }
        this.matrix = copy
    }


    countAliveNeighbours({ row, col, chebyshevDistance = 1 }) {
        const startRow = Math.max(0, row - 1);
        const endRow = Math.min(this.rows - 1, row + 1);
        const startCol = Math.max(0, col - 1);
        const endCol = Math.min(this.cols - 1, col + 1);

        let count = 0;
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (this.matrix[row][col]) {
                    count++
                }
            }
        }
        return count;
    }


    draw(ctx) {
        //lignes
        ctx.beginPath(); //cree ma forme

        for (let row = 0; row < this.rows; row++) {
            //colonnes
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix[row][col] > 0) {
                    ctx.fillStyle = this.colorAlive;
                } else {
                    ctx.fillStyle = this.colorDead;
                }
                ctx.fillRect(col * this.tileSize + 1, row * this.tileSize + 1, this.tileSize - 1, this.tileSize - 1);
            }
        }


        ctx.closePath();//fini ma forme
        ctx.fill();//puis on la rempli
    }
}