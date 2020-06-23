/*!
 * DATE: 2020.5.15
 * 
 * @author: jackchao, ujjack@sina.com
 */
/* 时间轴元素 */
import {onespx} from '../../config.js'
let rectRuler = document.getElementById('timeRuler').getBoundingClientRect()

 class timelineDom  {
    constructor(el) {
        this.tlInterval = null;
        this.$el = $(el)  // 挂载dom
    }
    getTime(){
        return (parseInt($(this.$el).css('left'))-100)/onespx
    }
    tlmove(){
        $(this.$el).animate({left:`+=${onespx}px`},1000,'linear')
        this.tlInterval = setInterval(()=>{
            if((parseInt($(this.$el).css('left'))-100)/onespx>=200){
                this.tlStop()
            }else{
                $(this.$el).animate({left:`+=${onespx}px` },1000,'linear')
            }
        }, 1000)
    }
    tlStop(){
        clearInterval(this.tlInterval)
        $(this.$el).stop(true)
    }
    tlRestart(){
        $(this.$el).css('left','100px')
        this.tlStop()
        this.tlmove()
    }
    tlLeft(left){
        $(this.$el).css('left',left+'px')
    }
    tlSeek(){
        this.tlStop()
        let time = ((parseInt($(this.$el).css('left'))-100)/onespx)
        return time
    }
}
export default timelineDom;