/*!
 * DATE: 2020.5.18
 * 
 * @author: jackchao, ujjack@sina.com
 * 素材库集合
 */
/* 素材库 animation  */
import {scene,transport,graph,sprite} from '../../config.js'
let textArr = [{
    type:2,
    text:'默认字'
}]
class sources{
    constructor(el,type) {
        this.source = []
        this.init(el,type)
    }
    init(el,type){
        $(el).html('')
        if(type == 2){
            scene.forEach(item=>{
                $(el).append(`<div class="dragItem" style="background-image: url(./images/scene/${item});" data-name="${item}" data-type="2"></div>`)
            })
            transport.forEach(item=>{
                $(el).append(`<div class="dragItem" style="background-image: url(./images/transportation/${item});" data-type="2" data-name="${item}"></div>`)
            })
            sprite.forEach(item=>{
                $(el).append(`<div class="dragItem" style="background-image: url(./images/sprite/${item});" data-type="2" data-name="${item}"></div>`)
            })
        }else if(type == 3){
            textArr.forEach(item=>{
                $(el).append(`<div class="dragItem" data-name="${item.text}" data-type="3"><span class='texti'>${item.text}</span></div>`)
            })
        }else if(type == 4){
            graph.forEach(item=>{
                $(el).append(`<div class="creatSvg" style="background-image: url(./images/graph/${item});" data-type="${item.split('.')[0]}" data-name="${item}"></div>`)
            })
        }else if(type == 1){
            $(el).append(`<div class="deSvg" style="background-image: url(./images/sprite/zhileft.png);" data-type="1" data-name="小水滴"></div>`)
        }
    }
}
export default sources;