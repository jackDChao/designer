/*!
 * 
 * @author: jackchao, ujjack@sina.com
 * 引用工具方法
 */
/*!
 * 拖拽 
 @params el 对象元素
 */
var allItemNum = 0, // 记录舞台元素队列
nowSelectItem=null  // 记录当前选择元素


function dragBotItem(el,cb) {
    const offex = 90 // 移动x偏移量
    const offey = 56 // 移动y偏移量
    const offeox = document.getElementById('stageBg').getBoundingClientRect().left // 移动x偏移量
    const offeoy = document.getElementById('stageBg').getBoundingClientRect().top // 移动y偏移量
    var tag = document.getElementsByClassName(el);
    var clientW = document.body.clientWidth;
    var clientH = document.body.clientHeight;


    $("." + el).mousedown(function (e) {
        var e = e || window.event;
        var disX = this.offsetLeft;
        var disY = this.offsetTop - $('.dragList').scrollTop();
        console.log(this.getBoundingClientRect())
        var x = e.pageX - disX ;
        var y = e.pageY - disY ;
        var width = this.offsetWidth;
        var height = this.offsetHeight;
        var dv = null;
        dv = this.cloneNode(true)
        $(dv).css('left', this.getBoundingClientRect().left).css('top', this.getBoundingClientRect().top).css('position', 'absolute').css('cursor', 'move')
        .css('width',width).css('height',height)

        document.body.appendChild(dv);

        let callback = (e)=>{
            var e = e || window.event;
            var left = e.pageX - x + offex ;
            var top = e.pageY - y + offey;

            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            if (left >= clientW - width) {
                left = clientW - width;
            }
            if (top >= clientH - height) {
                top = clientH - height;
            }
            dv.style.left = left + "px";
            dv.style.top = top + "px";
        }
        document.addEventListener('mousemove',callback)

        $(dv).mouseup(function (e) {
            var e = e || window.event;
            var left = e.pageX - x + offex;
            var top = e.pageY - y + offey;
            if (left < 346 || top < 78) {
                $(this).remove()
            }
            if (left > 346 && top > 78) {
                $(this).addClass('moveItem')
                var newDv = this.cloneNode(true);
                $(this).remove()
                let nowid = setOwnId(),nleft = left-offeox,ntop = top-offeoy
                $(newDv).css('left', nleft).css('top', ntop).attr('id',nowid).attr("data-startt",'0').removeClass('dragItem').css('opacity', 0)
                console.log($(newDv))
                let ntarget = {
                    targets:'#'+nowid,
                    left:nleft,
                    top:ntop,
                    opacity:1,
                    startt:0.01,
                    duration:0.01
                }
                if($(newDv).hasClass('deSvg')){
                    ntarget.targetType = '1'
                    ntarget.dropActType = 'stand'
                    $(newDv).css('width', '200px').css('height', '150px').css('background-image', 'none').append('<canvas id="demoCanvas" </canvas>')
                }
                $("#stageBg").append($(newDv))
                nowSelectItem = $(newDv)
                cb&&cb(ntarget)
                
            }
        })
    })
}
/**
 * 拖拽舞台元素 生成动效
 * @param
 */
function dragStageItem(el,cb) {
    const offex = 90 // 移动x偏移量
    const offey = 56 // 移动y偏移量
    const offeox = document.getElementById('stageBg').getBoundingClientRect().left // 移动x偏移量
    const offeoy = document.getElementById('stageBg').getBoundingClientRect().top // 移动y偏移量
    var tag = document.getElementsByClassName(el);
    var clientW = document.body.clientWidth;
    var clientH = document.body.clientHeight;
    var nowid = '',nleft = 0,ntop=0;
    console.log(offeox,offeoy)
    $(document).on('mousedown', "." + el, (e) => {
    // $("." + el).mousedown(function (e) {\
        
        var e = e || window.event;
        console.log(e.target, e.currentTarget)
        if(e.target != e.currentTarget){
            return
        }
        let that = e.currentTarget
        var disX = that.offsetLeft;
        var disY = that.offsetTop - $('.dragList').scrollTop();
        var x = e.pageX - disX ;
        var y = e.pageY - disY ;
        var width = that.offsetWidth;
        var height = that.offsetHeight;
        let oleft = that.getBoundingClientRect().left
        let otop = that.getBoundingClientRect().top
        var dv = null;
        nowid = $(that).attr('id')
        dv = that.cloneNode(true)
        $(dv).css('left', oleft).css('top', otop).css('position', 'absolute').css('cursor', 'move')
        .css('width',width).css('height',height)

        document.body.appendChild(dv);

        let callback = (e)=>{
            var e = e || window.event;
            var left = e.pageX - x + offeox ;
            var top = e.pageY - y + offeoy;

            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            if (left >= clientW - width) {
                left = clientW - width;
            }
            if (top >= clientH - height) {
                top = clientH - height;
            }
            dv.style.left = left + "px";
            dv.style.top = top + "px";
            
        }
        document.addEventListener('mousemove',callback)

        $(dv).mouseup(function (e) {
            var e = e || window.event;
            var left = e.pageX - x + offeox;
            var top = e.pageY - y + offeoy;
            if (left < offeox || top < offeoy) {
                $(this).remove()
            }
            var newDv = this;
            let thisc = this.getBoundingClientRect()
            nleft = thisc.left - offeox
            ntop = thisc.top - offeoy
            if(Math.abs(left - oleft) < 10 && Math.abs(top - otop) < 10){
                $(this).remove()
                return 
            }
            console.log(left,nleft,top,ntop,oleft,otop)
            if (left > offeox && top > offeoy) {
                let ntarget = {
                    targets:'#'+nowid,
                    left:nleft,
                    top:ntop,
                    opacity:1,
                    startt:0.01,
                    duration:0.01
                }
                if($(newDv).hasClass('deSvg')){
                    ntarget.targetType = '1'
                    ntarget.dropActType = 'stand'
                    $(newDv).css('width', '200px').css('height', '150px').css('background-image', 'none').append('<canvas id="demoCanvas" </canvas>')
                }
                console.log(ntarget)
                cb&&cb(ntarget,that)
                $(this).remove()
            }
        })
    })
}

/*!
 * 设置元素id 
 */
function setOwnId(){
    allItemNum++
    return 'item_'+allItemNum
}
