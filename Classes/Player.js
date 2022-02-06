import Cercle from "../Classes/Cercle.js";
export default class Player extends Cercle{
    constructor({ x = 0, y = 0, r = 50, speed = 0, color = 'red', colorborder = 'red', dir = 0 } = {}){
        super({x,y,r,color});
        this.speed = speed;
        this.dir = dir;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath(); //cree ma forme
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, this.y); //levé de crayon
        //on rend le canon droit avec cos et sin)
        const distX = 3*this.r * Math.cos(this.dir);
        const distY = 3*this.r * Math.sin(this.dir);
        ctx.lineTo(this.x + distX, this.y + distY);
        ctx.closePath();//fini ma forme
        ctx.stroke();//puis on la rempli
    }

    turn(dt, rotation){
        this.dir += dt*rotation;
    }

    thrust(dt, factor){
        this.speed += dt*factor;
    }

    move(dt){
        const distX = this.speed * dt * Math.cos(this.dir);
        const distY = this.speed *dt * Math.sin(this.dir);
        this.x += distX;
        this.y += distY;
    }

    friction(dt, factor){
        this.speed*= 1-(dt/1000) * factor;
    }
}