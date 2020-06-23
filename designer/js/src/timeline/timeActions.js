/*!
 * DATE: 2020.5.15
 * 
 * @author: jackchao, ujjack@sina.com
 */
/* 时间轴素材轨 */
import {timeInterval} from '../../config.js'
const onespx = 50 / timeInterval
class timeActions  {
    constructor(el) {
        this.$el = $(el)  // 挂载dom
        this.list = []
    }
    addToTimeline(title,obj){
        if(this.checkIn(obj) === false){
            if(obj.targetType && obj.targetType == '3'){
                $(".botline").append(`<span style="left:${obj.startt * onespx}px;width:${obj.duration * onespx}px;" title="${title}">${title}</span>`)
            }else{
                $(this.$el).append(`<span style="left:${obj.startt * onespx}px;width:${obj.duration * onespx}px;" title="${title}">${title}</span>`)
            }
            this.list.push({
                startt:obj.startt,
                duration:obj.duration
            })
        }else{
            let nt = $(this.$el).find('span').eq(this.checkIn(obj))
            let ntitle =  $(nt).text() + ` ${title}`
            $(nt).text(ntitle).attr('title',ntitle)
        }
    }
    checkIn(obj){
        let flag = false
        this.list.forEach((item,idx)=>{
            if(item.startt<= obj.startt && (item.startt+item.duration)>= (obj.startt+obj.duration)){
                flag = idx
            }
        })
        return flag
    }
}
export default timeActions;