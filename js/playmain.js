import stage from "../js/src/stage/index.js";

// 创建 主舞台
let mainStage = null

getlessonbyid()

// 课程指向
$(document).on('click', '.toslesson', function () {
    let lessonid = getQueryString('lessonid')
    let courseid = getQueryString('courseid')
    location.href = `./designer.html?courseid=${courseid}&lessonid=${lessonid}`
    return false
});

function getlessonbyid() {
    let lessonid = getQueryString('lessonid')
    let courseid = getQueryString('courseid')
    $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getlessonbyid?lessonid=${lessonid}`,success:function(result){
        console.log(result)
        if(result){
            let html = ''
            let animation = JSON.parse(result.data)
            if (animation.animationObj) {
                for (let x in animation.animationObj) {
                    html += `<div class="moveItem"
                    style="opacity: 0;position:absolute;background-image: url('${animation.animationObj[x].imgurl}');"
                    id="${x.substring(1,x.length)}" >
                    </div>`
                }
                console.log(html)
                $('.play_main').html(html)
                mainStage = new stage($("#stageBg"),animation.animationAction)
            }
        }
    }});
}

function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}