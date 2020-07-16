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
                $(".botline").append(`<span data-t="${obj.targets}" style="left:${obj.startt * onespx}px;width:${obj.duration * onespx}px;" title="${title}">${title}</span>`)
            }else{
                $(this.$el).append(`<span data-t="${obj.targets}" style="left:${obj.startt * onespx}px;width:${obj.duration * onespx}px;" title="${title}">${title}</span>`)
            }
            this.list.push({
                startt:obj.startt,
                duration:obj.duration
            })
        }else{
            let nt = $(this.$el).find('span').eq(this.checkIn(obj))
            let ntitle =  $(nt).text() + ` ${title}`
            $(nt).text(ntitle).attr('title',ntitle).attr('data-t',$(nt).data('t')+obj.targets)
        }
    }
    deleteTimeDom(obj){
        console.log(obj,this.checkIn(obj))
        if(this.checkIn(obj) === false){
            if(obj.targetType && obj.targetType == '3'){
                $(".botline span").toArray().forEach((item,idx)=>{
                    if($(item).data('t') == obj.targets){
                        $(".botline span").eq(idx).remove()
                    }
                })
            }else{
                $(this.$el).children('span').toArray().forEach((item,idx)=>{
                    console.log(item,$(item).data('t'),obj.targets)
                    if($(item).data('t') == obj.targets){
                        $(this.$el).children(span).eq(idx).remove()
                    }
                })
            }
            // this.list.push({
            //     startt:obj.startt,
            //     duration:obj.duration
            // })
        }else{
            if(obj.targetType && obj.targetType == '3'){
                $(".botline span").toArray().forEach((item,idx)=>{
                    if($(item).data('t') == obj.targets){
                        $(".botline span").eq(idx).remove()
                    }
                })
            }else{
                $(this.$el).children('span').toArray().forEach((item,idx)=>{
                    console.log(item,$(item).data('t'),obj.targets)
                    if($(item).data('t') == obj.targets){
                        $(this.$el).children('span').eq(idx).remove()
                    }
                })
            }
            // let nt = $(this.$el).find('span').eq(this.checkIn(obj))
            // let ntitle =  $(nt).text() + ` ${title}`
            // $(nt).text(ntitle).attr('title',ntitle).attr('data-t',$(nt).data('t')+obj.targets)
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