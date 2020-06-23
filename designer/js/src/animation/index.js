/*!
 * DATE: 2020.5.17
 * 
 * @author: jackchao, ujjack@sina.com
 * 动画的属性处理
 * 时间轴处理
 */
/* 动画动作对象 animation  */



import {
    TweenLite,
    TimelineMax,
    TimelineLite
} from '/js/lib/greensock-js/src/esm/index.js'
import waterDrop from '/js/src//animation/waterDrop.js'

class animation {
    constructor(cb) {
        this.animateTL = new TimelineLite({
            paused: true,
            onComplete: cb
        })
        this.animationAction = null // 记录现有动画动作队列
        this.animationObj = {} // 记录舞台已有动画对象
        this.waterDrop = null  // 记录小水滴对象
        this.waterObjList = [] // 记录小水滴动作状态
    }
    initAnimate(obj) {
        if (Object.prototype.toString.call(obj) === '[object Object]') {
            Object.keys(obj).forEach((item,idx) => {
                if(idx == 0 && obj[item][0].targetType == '1'){
                    this.waterDrop = new waterDrop()
                    this.waterDrop.initAnimate('demoCanvas')
                    this.waterObjList = obj[item]
                }
                obj[item].forEach(els => {
                    this.addAnimate(els)
                })
            })
        }
    }
    addAction(obj) {
        let nelObj = JSON.parse(JSON.stringify(obj))
        let tr = nelObj.targets.substring(1, nelObj.targets.length)
        if (this.animationAction.hasOwnProperty(tr)) {
            this.animationAction[tr].push(nelObj)
        } else {
            this.animationAction[tr] = [nelObj]
        }
    }
    addAnimate(obj) {
        let nelObj = JSON.parse(JSON.stringify(obj))
        if(nelObj.targetType && nelObj.targetType === '1' && nelObj.hasOwnProperty('dropActType')){
            console.log(nelObj)
            this.animateTL.add(
                ()=>{
                    this.waterDrop.play()
                    this.waterDrop.gotoAndPlay(nelObj.dropActType)
                }, nelObj.startt,'sequence')
            this.animateTL.add(()=>{
                this.waterDrop.pause()
            },nelObj.startt+nelObj.duration,'sequence')
        }
        this.animateTL.add(
                TweenLite.to(nelObj.targets, nelObj.duration, nelObj), nelObj.startt,'sequence')
    }
    // 开始播放
    play(time) {
        this.animateTL.play(time || 0)
        // this.waterDrop.play()
    }
    // 跳转到某时间节点
    seek(time) {
        this.animateTL.seek(time)
        console.log(this.waterDrop)
        this.waterDrop ? this.waterDrop.pause() : ''
    }
    // 暂停
    pause() {
        this.animateTL.pause()
        this.waterDrop ? this.waterDrop.pause() : ''
    }
    // 重新播放
    restart() {
        this.animateTL.restart()
        // this.waterDrop.play()
    }
    // 恢复播放 与pause搭配使用
    resume() {
        this.animateTL.resume()
        this.waterDrop ? this.waterDrop.play() : ''
    }
    clearAnimate() {
        this.animateTL = null
        this.animationAction = null
    }
}
export default animation;