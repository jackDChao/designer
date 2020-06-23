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
        var x = e.pageX - disX ;
        var y = e.pageY - disY ;
        var width = this.offsetWidth;
        var height = this.offsetHeight;
        var dv = null;
        dv = this.cloneNode(true)
        $(dv).css('left', disX + offex).css('top', disY + offey).css('position', 'absolute').css('cursor', 'move')
        .css('width','90px').css('height','90px')

        document.body.appendChild(dv);
        let that = this

        $(dv).mousemove(function (e) {
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
            this.style.left = left + "px";
            this.style.top = top + "px";
        })
        $(dv).mouseup(function (e) {
            var e = e || window.event;
            var left = e.pageX - x + offex;
            var top = e.pageY - y + offey;
            console.log(left,top)
            if (left < 346 || top < 78) {
                $(this).remove()
            }
            if (left > 346 && top > 78) {
                $(this).addClass('moveItem')
                var newDv = this.cloneNode(true);
                $(this).remove()
                let nowid = setOwnId(),nleft = left-offeox,ntop = top-offeoy
                $(newDv).css('left', nleft).css('top', ntop).attr('id',nowid).attr("data-startt",'0').removeClass('dragItem')
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
/*!
 * 设置元素id 
 */
function setOwnId(){
    allItemNum++
    return 'item_'+allItemNum
}
