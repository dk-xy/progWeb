// const easing = new Map();
// easing.set('linear', timefraction=>timefraction)
// easing.set('bounce', timeFraction=>{
//     for (let a = 0, b = 1; 1; a += b, b /= 2) {
//         if (timeFraction >= (7 - 4 * a) / 11) {
//           return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
//         }
//       }
// } );
// easing.set('bow', timeFraction=>{
//     return Math.pow(timeFraction, 2) * ((1.5 + 1) * timeFraction - 1.5)
//   });

// export const easingsFct = [...easing.keys()];
const makeEaseOut = (timing) => (timeFraction) => 1 - timing(1 - timeFraction);

const makeEaseInOut = (timing) => (timeFraction) => {
  if (timeFraction < .5) return timing(2 * timeFraction) / 2;
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
const easing = new Map();

easing.set('linear', timeFraction => timeFraction);
easing.set('quad', timeFraction => timeFraction ** 2);
easing.set('cubic', timeFraction => timeFraction ** 3);
easing.set('circ', timeFraction => 1 - Math.sin(Math.acos(timeFraction)));
easing.set('back', timeFraction => {
  return Math.pow(timeFraction, 2) * (2.5 * timeFraction - 1.5);
});
easing.set('bounce', timeFraction => {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
});
easing.set('elastic', timeFraction => {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(31.415926535 * timeFraction)
});

easing.set('quadOut', makeEaseOut(easing.get('quad')));
easing.set('cubicOut', makeEaseOut(easing.get('cubic')));
easing.set('circOut', makeEaseOut(easing.get('circ')));
easing.set('backOut', makeEaseOut(easing.get('back')));
easing.set('bounceOut', makeEaseOut(easing.get('bounce')));
easing.set('elasticOut', makeEaseOut(easing.get('elastic')));

easing.set('quadInOut', makeEaseInOut(easing.get('quad')));
easing.set('cubicInOut', makeEaseInOut(easing.get('cubic')));
easing.set('circInOut', makeEaseInOut(easing.get('circ')));
easing.set('backInOut', makeEaseInOut(easing.get('back')));
easing.set('bounceInOut', makeEaseInOut(easing.get('bounce')));
easing.set('elasticInOut', makeEaseInOut(easing.get('elastic')));

export const easingsFct = [...easing.keys()];

export default class Tweens {
    constructor() {
        this.tweens = new Set();
        this.tweensAfter = new Map();
    }

    //contient toute les anim qui tournent
    isRunning(tween){
        return this.tweens.has(tween);
    }

        //contient toute les anim qui tournent
        delete(tween){
             this.tweens.delete(tween);
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
