export default class Cercle {
    //on envoit un objet dans le constructeur à l'aide des {}
    //les = dans les params sont des valeurs par défaut
    constructor({ x = 0, y = 0, r = 100, speed = 0.1, color = 'red', colorborder = 'red' } = {}) { // ={} pour apply valeurs à objet vide
        this.x = x
        this.y = y
        this.r = r;
        switch (true) {
            case (this.r >= 5 && this.r <= 10):
                this.speed = 0.09
                break;
            case (this.r > 10 && this.r <= 20):
                this.speed = 0.14
                break;
            case (this.r > 20 && this.r <= 30):
                this.speed = 0.3
                break;
            case (this.r > 30 && this.r <= 40):
                this.speed = 0.4
                break;
            case (this.r > 40):
                this.speed = 0.47
                break;
            default:
                break;
        }
        this.color = color;
        this.colorborder = color;
    }

    draw(ctx) {
        ctx.beginPath(); //cree ma forme
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI))//x,y,rayon,angle départ et angle de fin
        ctx.closePath();//fini ma forme
        ctx.fill();//puis on la rempli
    }

    setRadius(radius) {
        this.r = radius;
    }

    setColor(color) {
        this.color = color;
        this.colorborder = color;
    }

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getSpeed() {
        return this.speed;
    }








}