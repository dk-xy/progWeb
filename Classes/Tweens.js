const easing = new Map();
easing.set('linear', timefraction=>timefraction)
easing.set('bounce', timeFraction=>{
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
} );
easing.set('bow', timeFraction=>{
    return Math.pow(timeFraction, 2) * ((1.5 + 1) * timeFraction - x)
  });

export const easingsFct = [...easing.keys()];

export default class Tweens {
    constructor() {
        this.tweens = new Set();
        this.tweensAfter = new Map();
    }
    create({
        duration = 1000,
        from = 0,
        to = 1,
        loop = false,
        ease = 'linear',
        yoyo = false,
        after = null,
        animate
    } = {}) {
        ease = easing.get(ease)
        //cree un objet duration avec la val de duration wtf?
        const tween = {duration,loop, yoyo, ease, from, to, time: 0, animate }
        if (after) {
            this.tweensAfter.set(after, tween);
        } else {
            this.tweens.add(tween);
        }
        return tween;
    }

    update(dt) {
        for (const tween of this.tweens) {
            tween.time += dt;
            let timeFraction = tween.time / tween.duration;
            if (timeFraction >= 1) timeFraction = 1;
            const progress = (tween.to - tween.from) * tween.ease(timeFraction) + tween.from;
            tween.animate(progress);
            if (timeFraction == 1) {
                if(tween.loop || tween.yoyo){
                    if (tween.yoyo) {
                        [tween.to, tween.from] = [tween.from,tween.to]; //inversion de valeurs
                    }
                    if(!tween.loop) tween.yoyo = false;
                    tween.time=0;
                } else{
                    if (this.tweensAfter.has(tween)) {
                        const nextTween = this.tweensAfter.get(tween);
                        this.tweens.add(nextTween);
                    }

                    this.tweens.delete(tween)
                }
                }
            }
        }
    }
