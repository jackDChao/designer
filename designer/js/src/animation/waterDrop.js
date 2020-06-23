/*!
 * DATE: 2020.6.5
 * 
 * @author: jackchao, ujjack@sina.com
 * 小水滴动作创建
 */
/* 小水滴动作对象 waterDrop 依赖createjs  */

class waterDrop{
    constructor() {
        this.waterDropAction = null
        this.canvas = null // // 小水滴对象依赖dom
        this.stagec = null // 小水滴    对象stage
        this.container = null // 小水滴对象container
        this.spriteData = null // sprite属性对象
        this.sprite = null // sprite对象
    }
    initAnimate(el){
        this.canvas = document.getElementById(el);
        this.stagec = new createjs.Stage(this.canvas);
        createjs.Touch.enable(this.stagec);
        this.container = new createjs.Container();
        this.stagec.addChild(this.container);
        this.loadAction()
        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", (event)=>{
            if(!event.paused){
                this.stagec.update();
            }
        });
        this.loadAction()
    }
    loadAction(){
        this.spriteData = {
            images: ["images/sprite/flyIn.png"],
            frames: {width:300, height:225, regX: 0, regY:0},
            animations: {
                flyIn:{
                    frames: [1,2,3,4,5,6,7,8,9,10,11,12],
                    speed: 0.3
                },
                wave:{
                    frames: [38,39,40,41,42,43,44,45,46,47,48],
                    next: "wave",
                    speed: 0.3
                },
                stand:{
                    frames: [70],
                    next: "stand",
                    speed: 0.3
                }
            }
        };
        var spriteSheet = new createjs.SpriteSheet(this.spriteData);
        this.sprite = new createjs.Sprite(spriteSheet);
        this.container.addChild(this.sprite);
        this.sprite.x = 0;
        this.sprite.scaleY = 0.8
        this.sprite.y = -10;
        // this.gotoAndPlay('stand')
    }
    pause(){
        createjs.Ticker.paused  = true
    }
    play(){
        createjs.Ticker.paused  = false
    }
    gotoAndPlay(type){
        this.sprite.gotoAndPlay(type)
    }
}
export default waterDrop;