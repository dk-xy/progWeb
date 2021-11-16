export default class Keyboard{
constructor(){
    this.keys = new Set();
    window.addEventListener('keydown', evt => this.onKeyDown(evt));
    window.addEventListener('keyup', evt => this.onKeyUp(evt));

}
onKeyDown(evt){
    console.log(evt.key)
    this.keys.add(evt.code)
    //console.log(this.key)
}

onKeyUp(evt){
    this.key.delete(evt.code)
}

isKeyDown(){
    return this.key
}
}