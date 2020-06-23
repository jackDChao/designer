import sources from "../js/src/source/index.js";
import stage from "../js/src/stage/index.js";
import waterDrop from '../js/src//animation/waterDrop.js'

// 创建左侧素材库
let source = new sources($(".dragList"), 2)
// 创建 主舞台
let mainStage = new stage($("#stageBg"))
//创建小水滴动画

// let waterdrop = new waterDrop()
// waterdrop.initAnimate('demoCanvas')
// setTimeout(() => {
//     waterdrop.pause()
// }, 10000);

// 初始化拖拽实例
dragBotItem('dragItem', res => {
    mainStage.addAction(res)
})


// 左侧导航选择
$(document).on('click', '.leftMain div', (e) => {
    let parent = $(e.target)

    if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'IMG') {
        parent = $(e.target).parent()
    }
    $('.leftMain').find('.active').removeClass('active')
    $(parent).addClass('active')
    source.init($(".dragList"), $(parent).data('type'))
    if($(".dragList"), $(parent).data('type') === 1){
        dragBotItem('deSvg', res => {
            mainStage.addAction(res)
        })
    }else{
        dragBotItem('dragItem', res => {
            mainStage.addAction(res)
        })
    }
    
})
// 图形tab 点击创建可画图对象
$(document).on('click', '.creatSvg', (e) => {
    var drawing = new SVG('stageBg').size('100%', '100%').attr({
        fill: '#fff',
        'fill-opacity': 0,
        stroke: '#000',
        'stroke-width': 1
    })
    let finaObj = {
        arrow: 'arrow',
        arrowdot: 'arrowdot',
        circle: 'circle',
        triangle: 'polygon',
        square: 'rect',
        polyg: 'polyg',
    }
    let ntype = $(e.target).data('type')
    var rect = drawing[finaObj[ntype]]().draw()

    if (ntype == 'triangle') {
        rect.on('drawstart', function (e) {
            document.addEventListener('keydown', function (e) {
                if (e.keyCode == 13) {
                    rect.draw('done');
                    rect.off('drawstart');
                }
            });
        });
    }

    rect.on('drawstop', function (event) {
        console.log(event)
        let react = $(event.target)
        let parentsvg = $(drawing.node)

        let nwidth = parseInt($(react).css('width')) + 2 + 'px'
        let nheight = parseInt($(react).css('height')) + 2 + 'px'
        let nleft = $(react).attr('x') - 1 + 'px'
        let ntop = $(react).attr('y') - 1 + 'px'
        let pointList = null
        switch (ntype) {
            case 'arrow':

                break;
            case 'arrowdot':

                break;
            case 'circle':
                nwidth = nheight = $(react).attr('r') * 2 + 2 + 'px'
                nleft = parseInt($(react).attr('cx')) - parseInt($(react).attr('r')) - 1 + 'px'
                ntop = parseInt($(react).attr('cy')) - parseInt($(react).attr('r')) - 1 + 'px'
                break;
            case 'triangle':
                pointList = $(react).attr('points').split(' ')
                nleft = 0, ntop = 0
                let mx = 0,
                    my = 0
                pointList.forEach(element => {
                    console.log(element)
                    let str = element.split(',')
                    let nx = str[0]
                    let ny = str[1]
                    if (nx < nleft || nleft == 0) {
                        nleft = nx
                    }
                    if (ny < ntop || ntop == 0) {
                        ntop = ny
                    }
                    mx = nx > mx ? nx : mx
                    my = ny > my ? ny : my
                })
                nwidth = mx - nleft + 2 + 'px'
                nheight = my - ntop + 2 + 'px'
                nleft = nleft - 1 + 'px'
                ntop = ntop - 1 + 'px'
                console.log(nleft, ntop, mx, my)
                break;
            case 'square':
                break;
            case 'polyg':
                break;
            default:
                break;
        }

        $(parentsvg).css('width', nwidth).css('position', 'absolute')
            .css('height', nheight)
            .css('left', 0)
            .css('top', 0)

        let newd = $('<div class="moveItem"></div>').css('width', nwidth).css('position', 'absolute')
            .css('height', nheight)
            .css('left', nleft)
            .css('top', ntop).attr('data-name', ntype + '.svg')
        $(react).attr('x', '1').attr('y', '1')
        if (ntype == 'circle') {
            $(react).attr('cx', parseInt(nwidth) / 2).attr('cy', parseInt(nwidth) / 2)
        } else if (ntype == 'triangle') {
            let newPoints = []
            pointList.forEach(element => {
                let a = element.split(',')[0] - parseInt(nleft)
                let b = element.split(',')[1] - parseInt(ntop)
                newPoints.push(`${a},${b}`)
            })
            console.log(newPoints)
            newPoints = newPoints.join(' ')
            console.log(newPoints)
            $(react).attr('points', newPoints)
        }
        let nowid = setOwnId()
        $(newd).attr('id', nowid).html($(parentsvg).clone())
        $("#stageBg").append($(newd))

        mainStage.addAction({
            targets: '#' + nowid,
            left: nleft,
            top: ntop,
            opacity: 1,
            startt: 0.01,
            duration: 0
        })
        // mainStage.initEvents()
        $(parentsvg).remove()
        console.log($(parentsvg))
    })
})

