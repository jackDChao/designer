/*!
 * DATE: 2020.5.18
 * 
 * @author: jackchao, ujjack@sina.com
 * 主舞台功能
 * 动作状态及事件控制
 */
/* 主舞台 stage  */
import animation from '../animation/index.js'
import {timelineDom,timeActions} from "../timeline/index.js";
let rect = document.getElementById('stageBg').getBoundingClientRect()
let rectRuler = document.getElementById('timeRuler').getBoundingClientRect()



// 实物图课程编排
const defaultAni = {
    "item_1": [{
        "targets": "#item_1",
        "left": 370,
        targetType:'1',
        "top": 350,
        "opacity": 0,
        "startt": 0.02,
        "duration":  2
    },{
        "targets": "#item_1",
        "left": 370,
        targetType:'1',
        dropActType:'wave',
        "top": 350,
        "opacity": 1,
        "startt": 2,
        "duration":  2
    },{
        "targets": "#item_1",
        "left": 370,
        targetType:'1',
        dropActType:'flyIn',
        "top": 350,
        "opacity": 1,
        "startt": 5,
        "duration":  2
    },{
        "targets": "#item_1",
        "left": 370,
        targetType:'1',
        "top": 350,
        "opacity": 0,
        "startt": 7,
        "duration":  0.01
    }],
    "item_2": [{
        "targets": "#item_2",
        "left": 60,
        "top": 40,
        "opacity": 0,
        "startt":0.01,
        "duration":  0.001
    },{
        "targets": "#item_2",
        "left": 60,
        "top": 40,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 1,
        "duration":  0.001
    }],
    "item_3": [{
        "targets": "#item_3",
        "left": 60,
        "top": 100,
        "opacity": 0,
        "startt": 0.01,
        "duration":  0.001
    },{
        "targets": "#item_3",
        "left": 60,
        "top": 100,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 3,
        "duration":  0.001
    },
    {
        "targets": "#item_3",
        "left": 60,
        "top": 100,
        "opacity": 0,
        actionType:'2',
        targetType:'3',
        "startt": 6,
        "duration": 0.001
    }],
    "item_4": [{
        "targets": "#item_4",
        "left": 60,
        "top": 100,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_4",
        "left": 60,
        "top": 100,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 6.01,
        "duration":  0.001
    }],
    "item_5": [{
        "targets": "#item_5",
        "left": 60,
        "top": 160,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_5",
        "left": 60,
        "top": 160,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 8,
        "duration":  0.001
    }],
    "item_6": [{
        "targets": "#item_6",
        "right": 40,
        "bottom": -300,
        targetType:'1',
        dropActType:'stand',
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.01
    },{
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        actionType:'1',
        targetType:'1',
        "opacity": 1,
        "startt": 14,
        "duration":  2
    },{
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        targetType:'1',
        dropActType:'wave',
        "opacity": 1,
        "startt": 14,
        "duration": 1
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        actionType:'3',
        targetType:'1',
        dropActType:'wave',
        "opacity": 1,
        "startt": 15,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        "opacity": 1,
        actionType:'3',
        targetType:'1',
        dropActType:'wave',
        "startt": 15.5,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        "opacity": 1,
        actionType:'3',
        "startt": 16,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        actionType:'3',
        "opacity": 1,
        "startt": 16.5,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        "opacity": 1,
        actionType:'3',
        "startt": 18.5,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        "opacity": 1,
        actionType:'3',
        "startt": 19,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        "opacity": 1,
        actionType:'3',
        "startt": 22,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        "opacity": 1,
        "startt": 22.5,
        actionType:'3',
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        "opacity": 1,
        actionType:'3',
        "startt": 25,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        "opacity": 1,
        actionType:'3',
        "startt": 25.5,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 40,
        "opacity": 1,
        actionType:'3',
        "startt": 38,
        "duration":  0.5
    },
    {
        "targets": "#item_6",
        "right": 40,
        "bottom": 20,
        actionType:'3',
        "opacity": 1,
        "startt": 28.5,
        "duration":  0.5
    }],
    "item_7": [{
        "targets": "#item_7",
        "right": 180,
        "bottom": 30,
        "opacity": 0,
        "startt": 0.001,
        "duration": 0.001
    },{
        "targets": "#item_7",
        "right": 180,
        "bottom": 30,
        "opacity": 1,
        actionType:'1',
        "startt": 15,
        "duration": 0.001
    }],
    "item_8": [{
        "targets": "#item_8",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_8",
        "right": 260,
        "bottom": 80,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 16.5,
        "duration":  0.001
    },{
        "targets": "#item_8",
        "right": 260,
        "bottom": 80,
        actionType:'2',
        targetType:'3',
        "opacity": 0,
        "startt": 18,
        "duration":  0.001
    }],
    "item_9": [{
        "targets": "#item_9",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_9",
        "right": 260,
        "bottom": 80,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 18,
        "duration":  0.001
    },
    {
        "targets": "#item_9",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        actionType:'2',
        targetType:'3',
        "startt": 22,
        "duration":  0.001
    }
],
    "item_10": [{
        "targets": "#item_10",
        "left": 300,
        "top": 250,
        "opacity": 0,
        "startt": 0.01,
        "duration":  0.001
    },{
        "targets": "#item_10",
        "left": 300,
        "top": 250,
        "opacity": 1,
        "startt": 20,
        actionType:'1',
        "duration":  0.001
    }],
    "item_11": [{
        "targets": "#item_11",
        "left": 300,
        "top": 350,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_11",
        "left": 300,
        "top": 350,
        "opacity": 1,
        actionType:'1',
        "startt": 20.5,
        "duration":  0.001
    },{
        "targets": "#item_11",
        "left": 300,
        "top": 350,
        actionType:'2',
        "opacity": 0,
        "startt": 38,
        "duration":  0.001
    }],
    "item_12": [{
        "targets": "#item_12",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_12",
        "right": 260,
        "bottom": 80,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 22,
        "duration":  0.001
    },{
        "targets": "#item_12",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        actionType:'2',
        targetType:'3',
        "startt": 27.5,
        "duration":  0.001
    }],
    "item_13": [{
        "targets": "#item_13",
        "left": 240,
        "top": 250,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_13",
        "left": 240,
        "top": 250,
        "opacity": 1,
        actionType:'1',
        "startt": 23.5,
        "duration":  0.001
    }],
    "item_14": [{
        "targets": "#item_14",
        "left": 180,
        "top": 250,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_14",
        "left": 180,
        "top": 250,
        "opacity": 1,
        "startt": 24.5,
        actionType:'1',
        "duration":  0.001
    }],
    "item_15": [{
        "targets": "#item_15",
        "left": 180,
        "top": 330,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_15",
        "left": 180,
        "top": 330,
        "opacity": 1,
        "startt": 25.5,
        actionType:'1',
        "duration":  0.001
    },{
        "targets": "#item_15",
        "left": 180,
        "top": 330,
        actionType:'2',
        "opacity": 0,
        "startt": 38,
        "duration":  0.001
    }],
    "item_16": [{
        "targets": "#item_16",
        "left": 224,
        "top": 350,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_16",
        "left": 224,
        "top": 350,
        actionType:'1',
        "opacity": 1,
        "startt": 26,
        "duration":  0.001
    },{
        "targets": "#item_16",
        "left": 224,
        "top": 350,
        "opacity": 0,
        actionType:'2',
        "startt": 38,
        "duration":  0.001
    }],
    "item_17": [{
        "targets": "#item_17",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_17",
        "right": 260,
        "bottom": 80,
        "opacity": 1,
        actionType:'1',
        targetType:'3',
        "startt": 27.5,
        "duration":  0.001
    },{
        "targets": "#item_17",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 35,
        actionType:'2',
        targetType:'3',
        "duration":  0.001
    }],
    "item_18": [{
        "targets": "#item_18",
        "left": 360,
        "top": 250,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_18",
        "left": 360,
        "top": 250,
        "opacity": 1,
        actionType:'1',
        "startt": 29,
        "duration":  0.001
    }],
    "item_19": [{
        "targets": "#item_19",
        "left": 420,
        "top": 250,
        "opacity": 0,
        "startt": 0.01,
        "duration":  0.001
    },{
        "targets": "#item_19",
        "left": 420,
        "top": 250,
        "opacity": 1,
        actionType:'1',
        "startt": 30,
        "duration":  0.001
    }],
    "item_20": [{
        "targets": "#item_20",
        "left": 480,
        "top": 250,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_20",
        "left": 480,
        "top": 250,
        "opacity": 1,
        actionType:'1',
        "startt": 31,
        "duration":  0.001
    }],
    "item_21": [{
        "targets": "#item_21",
        "left": 540,
        "top": 250,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_21",
        "left": 540,
        "top": 250,
        "opacity": 1,
        actionType:'1',
        "startt": 32,
        "duration":  0.001
    }],
    "item_22": [{
        "targets": "#item_22",
        "left": 360,
        "top": 330,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_22",
        "left": 360,
        "top": 330,
        actionType:'1',
        "opacity": 1,
        "startt": 33,
        "duration":  0.001
    },{
        "targets": "#item_22",
        "left": 360,
        "top": 330,
        actionType:'2',
        "opacity": 0,
        "startt": 38,
        "duration":  0.001
    }],
    "item_23": [{
        "targets": "#item_23",
        "left": 454,
        "top": 350,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_23",
        "left": 454,
        "top": 350,
        "opacity": 1,
        actionType:'1',
        "startt": 33.5,
        "duration":  0.001
    },{
        "targets": "#item_23",
        "left": 454,
        "top": 350,
        actionType:'2',
        "opacity": 0,
        "startt": 38,
        "duration":  0.001
    }],
    "item_24": [{
        "targets": "#item_24",
        "right": 260,
        "bottom": 80,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_24",
        "right": 260,
        "bottom": 80,
        "opacity": 1,
        "startt": 35,
        actionType:'1',
        targetType:'3',
        "duration":  0.001
    }],
    "item_25": [{
        "targets": "#item_25",
        "left": 150,
        "top": 330,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_25",
        "left": 150,
        "top": 330,
        actionType:'1',
        "opacity": 1,
        "startt": 38,
        "duration":  0.001
    }],
    "item_26": [{
        "targets": "#item_26",
        "left": 370,
        "top": 350,
        "opacity": 0,
        "startt": 0.001,
        "duration":  0.001
    },{
        "targets": "#item_26",
        "left": 370,
        "top": 350,
        actionType:'1',
        "opacity": 1,
        "startt": 39,
        "duration":  0.001
    }],
}
const waterd = {
    "item_1": [{
        "targets": "#item_1",
        "left": 370,
        targetType:'2',
        "top": 350,
        "opacity": 1,
        "startt": 0.02,
        "duration":  0.01
    },{
        "targets": "#item_1",
        "left": 370,
        targetType:'2',
        "top": 350,
        "opacity": 0,
        "startt": 2,
        "duration":  2
    }]
}

// 记录全部动画动作
class stage{
    constructor(el) {
        this.timelineD = new timelineDom($(".timeLineS"))
        this.$el = $(el)
        this.nowElement = null
        this.animation = new animation()
        this.timeActionList = new timeActions('.topline')
        this.animation.animationAction = {}
        // this.animation.initAnimate(waterd)
        this.animation.seek(0.1)
        this.noActionSet = null
        // this.addtotl(waterd)
        let that = this

        //
        var acolor = Colorpicker.create({
            el: "color-picker",
            color: "#000",
            change: function (elem, hex) {
                elem.style.backgroundColor = hex;
            }
        })
        $(document).on('mouseover', '.moveItem', (e)=>  {
            let showArr = that.getShowItem()
            let parent = $(e.target)
            if(e.target.nodeName == 'svg' || e.target.nodeName == 'SPAN' || e.target.nodeName == 'CANVAS'){
                parent = $(e.target).parent()
            }else if(e.target.nodeName == 'rect' || e.target.nodeName == 'circle' || e.target.nodeName == 'polygon'){
                parent = $(e.target).parent().parent()
            }
            if(e.target.nodeName == 'BUTTON'){
                return 
            }
            let flag = this.checkCanInAct(this.timelineD.getTime(),$(parent).attr('id'))
            console.log(this.timelineD.getTime(),$(parent).attr('id'),this.animation.animationAction,)
            if($(parent).hasClass('moveItem') && showArr.some(ele=> $(ele).attr('id') === $(parent).attr('id'))){
                $(parent).addClass('activeM')
                $(parent).find('.buttons').remove()
                // <span class="magic"><b class="topNum">1</b></span>
                let buttonHtml = `<div class="buttons">
                    <span class="magic"> ${ !flag ? '<b class="topNum">1</b>' : ''} </span>
                    <span class="change"></span>
                </div>`
                $(parent).append(buttonHtml)
            }
        })

        dragStageItem('moveItem',(res,ele)=>{
            this.nowElement = ele
            this.noActionSet = res
            let startt = this.timelineD.getTime() < 0.02 ? 0.02 : this.timelineD.getTime()
            if(!this.checkCanInAct(startt,$(this.nowElement).attr('id'),this.animation.animationAction)){
                layer.msg('当前角色已经有一个动效了')
                return
            }
            this.noActionSet.startt = startt
            $(".acttimeDiv").show()
        })

        $(document).on('click', '.saveActTime', (e)=>  {
            console.log(this.noActionSet,$(".saveActTime").parent().find('.timeset').val())
            this.noActionSet.duration = Number($(".saveActTime").parent().find('.timeset').val())
            this.addAction(this.noActionSet)
            this.timeActionList.addToTimeline(this.nameRev()+'移动',this.noActionSet)
            $('.timeset').val('')
            $(".acttimeDiv").hide()
            this.noActionSet = null
        })

        $(document).on('mouseout', '.moveItem', (e)=>  {
            if(e.target.nodeName != 'BUTTON'){
                $('.activeM').removeClass('activeM')
            }
        })
        
        // 绑定事件
        $(document).on('click', '#playStage', ()=> {
            console.log(this.animation.animationAction)
            console.log(this.animation.animationObj)
            // this.animation.initAnimate(this.animation.animationAction)
            $("#pauseStage").css('display','inline-flex')
            $("#resumeStage").css('display','none')
            this.animation.pause()
            setTimeout(() => {
                this.animation.restart()
                this.timelineD.tlRestart()
            }, 100);
            
        })
        
        $(document).on('click', '#replayStage', ()=> {
            this.animation.restart()
            this.timelineD.tlRestart()
        })
        $(document).on('click', '#pauseStage', (e)=>  {
            this.animation.pause()
            this.timelineD.tlStop()
            $(e.target).css('display','none')
            $("#resumeStage").css('display','inline-flex')
        })
        $(document).on('click', '#resumeStage', (e)=>  {
            this.animation.resume()
            this.timelineD.tlmove()
            $(e.target).css('display','none')
            $("#pauseStage").css('display','inline-flex')
        })
       
        

        $(document).on('click', '.magic', (e)=>  {
            $('.modal').hide()
            let nele = $(e.target).parent().parent(),
            nleft = parseInt($(nele).css('left')) < parseInt($('#stageBg').css('width'))/2 ? parseInt($(nele).css('left')) + parseInt($(nele).css('width')) + 20 + rect.left :parseInt($(nele).css('left')) - 20 - parseInt($(nele).css('width')) + rect.left ,
            ntop = parseInt($(nele).css('top')) - 30
            this.nowElement = nele
            console.log(nele,this.timelineD.getTime(),$(nele).attr('id'))
            let nact = this.findInAct(this.timelineD.getTime(),$(nele).attr('id'))
            $('.actDiv .acts').removeClass('active')
            $('.actDiv .durat').val('')
            if(nact){
                $('.deleteAct').show()
                let acts = $('.actDiv .acts').toArray()
                acts.forEach(item=>{
                    if($(item).data('c') == nact.actionType){
                        $(item).addClass('active')
                    }
                })
                $('.actDiv .durat').val(nact.duration)
            }else{
                $('.deleteAct').hide()
            }
            if($(nele).hasClass('deSvg')){
                $('.disn').css('display','inline-flex')
            }else{
                $('.disn').css('display','none')
            }
            $('.actDiv').css('left',nleft+'px').show()
        })
        // 删除动效
        $(document).on('click', '.deleteAct', (e)=>  {
            let that = this
            layer.msg('确认删除该角色已经添加的动效吗？', {
                time: 20000, //20s后自动关闭
                btn: ['删除', '取消'],
                yes: function(){
                    that.deleteAct(that.timelineD.getTime(),$(that.nowElement).attr('id'))
                    $('.actDiv').hide()
                    layer.closeAll();
                }
                ,btn2: function(){
                    layer.closeAll();
                }
            });
        })

        $(document).on('click', '.change', (e)=>  {
            $('.modal').hide()
            let nele = $(e.target).parent().parent(),
            nleft = parseInt($(nele).css('left')) + parseInt($(nele).css('width')) + 20 + rect.left,
            ntop = parseInt($(nele).css('top')) - 30
            this.nowElement = nele
            if($(nele).data('type') == 2 || $(nele).data('type') == 1){
                $('.defnomDiv').css('left',nleft+'px').show()
                $('.defnomDiv').find('.sx').val(parseInt($(nele).css('left')))
                $('.defnomDiv').find('.sy').val(parseInt($(nele).css('top')))
                $('.defnomDiv').find('.sw').val(parseInt($(nele).css('width')))
                $('.defnomDiv').find('.sh').val(parseInt($(nele).css('height')))
            }else{
                
                $('.deftextDiv').css('left',nleft+'px').show()
                $('.deftextDiv').find('.textInfo').val($(nele).find('.texti').text())

                $('.deftextDiv').find('.textwidth').val(parseInt($(nele).css('width')))
                $('.deftextDiv').find('.textheight').val(parseInt($(nele).css('height')))
                // 设置字体颜色要通过创建颜色选取插件方法
                acolor.setColorByInput($(nele).css('color'))
                $('.deftextDiv').find('.textfonts').val(parseInt($(nele).css('font-size')))
            }
        })


        $(document).on('click', '.acts', (e)=>  {
            $('.active').removeClass('active')
            $(e.target).addClass('active')
            if($(e.target).data('c') == '3'){
                $('.type2').css('display','flex')
            }else{
                $('.type2').hide() 
            }
        })
        $(document).on('click', '.rightX', (e)=>  {
            $(e.target).parent().hide()
        })
        $(document).on('click', '#timeRuler', (e)=>  {
            let left = e.clientX - rectRuler.left + 100
            this.timelineD.tlLeft(left)
            this.animation.seek(this.timelineD.tlSeek())
        })

        $(document).on('click', '.savedeft', (e)=>  {
            let parent = $(e.target).parent()
            let val = $(parent).find('.textInfo').val()
            if(!val){
                layer.msg('请输入字符内容')
            }
            let text = $(this.nowElement).find('.texti')
            $(text).text(val)
            $(this.nowElement).css('width',$(parent).find('.textwidth').val()+'px')
            .css('height',$(parent).find('.textheight').val()+'px')
            .css('font-size',$(parent).find('.textfonts').val()+'px')
            .css('color',$(parent).find('.picker').css('background-color'))
            $(parent).hide()
        })
        $(document).on('click', '.savedefn', (e)=>  {
            let parent = $(e.target).parent()
            let sx = $(parent).find('.sx').val()
            let sy = $(parent).find('.sy').val()
            let sw = $(parent).find('.sw').val()
            let sh = $(parent).find('.sh').val()

            if(!sx || !sy || !sw || !sh){
                layer.msg('请输入完整')
            }
            $(this.nowElement).css('left',sx+'px')
            $(this.nowElement).css('top',sy+'px')
            $(this.nowElement).css('width',sw+'px')
            $(this.nowElement).css('height',sh+'px')
            $(parent).hide()
        })

        $(document).on('click', '.saveAct', (e)=>  {
            let parent = $(e.target).parent().parent()
            let fobj = {
                1:'show',
                2:'hide',
                3:'move',
                4:'twinkle'
            }
            let actargetType = $(parent).find('.active')
            let durat = $(parent).find('.durat').val() // 持续时间
            let finax = $(parent).find('.finax').val() // 终点x
            let finay = $(parent).find('.finay').val() // 终点y
            if(actargetType.length == 0 || !durat){
                layer.msg('请选择动效并填写完整内容！')
                return 
            }
            if($(actargetType).data('c') == 3 && (!finax || !finay)){
                layer.msg('请选择动效并填写完整内容！')
                return
            }
            let startt = this.timelineD.getTime()
            if(!this.checkCanInAct(startt,$(this.nowElement).attr('id'),this.animation.animationAction)){
                layer.msg('当前角色已经有一个动效了')
                return
            }
            let actobj = {
                targets:'#'+$(this.nowElement).attr('id'),
                duration: parseInt(durat),
                startt: startt
            }
            if($(this.nowElement).hasClass('deSvg')){
                actobj.targetType = '1'
            }
            actobj.actionType = $(actargetType).data('c')
            switch($(actargetType).data('c')) {
                case 2:
                    actobj.opacity = 0
                   break;
                case 3:
                    actobj.left = finax
                    actobj.top = finay
                   break;
                case 4:
                    actobj.opacity = 1
                    break;
                case 1:
                    actobj.opacity = 1
                    break;
                default:
                    actobj.dropActType = $(actargetType).data('c')
           }
           console.log(actobj)
           this.addAction(actobj)
           
           this.timeActionList.addToTimeline(this.nameRev()+$(actargetType).text(),actobj)
           $(parent).hide()
        })
    }
    addtotl(obj){
        let that = this
        for(let x in obj){
            obj[x].forEach(item=>{
                if(item.startt && item.startt > 0.01){
                    let type = item.actionType || ''
                    let targetType = item.targetType || ''
                    switch(type){
                        case '1':
                            type = '入场'
                            break;
                        case '2':
                            type = '出场'
                            break;  
                        case '3':
                            type = '移动'
                            break;  
                    }
                    switch(targetType){
                        case '1':
                            targetType = '小水滴'
                            break;
                        case '3':
                            targetType = '文字'
                            break;
                        default:
                            targetType = '素材'
                            break;
                    }
                    this.timeActionList.addToTimeline(targetType+type,item)
                }
            })
        }
    }
    nameRev(){
        let name = $(this.nowElement).data('name')
        name = name.split('.')[0]
        name = name.replace('scene','场景').replace('t','车辆').replace('circle','圆形').replace('triangle','三角形').replace('square','矩形')
        console.log(name)
        return name
    }
    getShowItem(){
        let items = $(this.$el).find('.moveItem').toArray()
        let filArr = items.filter(el=>{
            // console.log($(el).css('opacity'))
            return $(el).css('opacity') != '0'
        })
        // console.log(filArr)
        return filArr
        
    }
    checkCanInAct(time,target){
        let obj = this.animation.animationAction
        if(Object.prototype.toString.call(obj) === '[object Object]'){
            console.log(obj[target])
            if(obj[target] && obj[target].some(item=>{
                console.log(item.startt <= time && time <= item.startt + Number(item.duration))
                return item.startt <= time && time <= item.startt + Number(item.duration) && !item.hasOwnProperty('isInit')
            })){
                return false
            }
        }
        return true 
    }
    findInAct(time,target){
        let obj = this.animation.animationAction
        if(Object.prototype.toString.call(obj) === '[object Object]'){
            return obj[target].find(item=>{
                return item.startt <= time && time <= item.startt + Number(item.duration) && !item.hasOwnProperty('isInit')
            })
        }else{
            return false 
        }
    }
    deleteAct(time,target){
        let deact = this.animation.deleteAction(time,target)
        console.log(deact)
        this.timeActionList.deleteTimeDom(deact[0])
    }
    addAction(obj,flag){
        console.log(obj)
        let imgurl = $(obj.targets).css('backgroundImage').split('(')[1].split(')')[0]
        imgurl = imgurl.substring(1,imgurl.length-1)
        this.animation.animationObj[obj.targets] = {
            imgurl:imgurl
        }
        if(flag){
            obj.startt = this.timelineD.getTime()
        }
        this.animation.addAction(obj)
    }
}
export default stage;