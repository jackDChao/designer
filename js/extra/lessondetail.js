$(function(){
    getlessonbyid()
    
    // 课程指向
    $(document).on('click','.toslesson',function(){
        let lessonid = getQueryString('lessonid')
        let courseid = getQueryString('courseid')
        location.href = `./designer.html?courseid=${courseid}&lessonid=${lessonid}`
        return false
    });
    function getlessonbyid(){
        let lessonid = getQueryString('lessonid')
        let courseid = getQueryString('courseid')
        // $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getlessonbyid?lessonid=${lessonid}`,success:function(result){
        //     console.log(result)
        //     if(result){
                
        //     }
        // }});
        $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getlessons?username=admin&courseid=${courseid}`,success:function(result){
            console.log(result)
            if(result){
                let html = ''
                result.forEach(element => {
                    if(element._id == lessonid){
                        console.log(element)
                        if(element.data){
                            let animation = JSON.parse(element.data)
                            if(animation.animationObj){
                                for(let x in animation.animationObj){
                                    html += `<div class="moveItem"
                                    style="opacity: 0;background-image: url('${animation.animationObj[x].imgurl}');"
                                    id="${x.substring(1,x.length)}" >
                                  </div>`
                                }
                                $('.play_main').html($('.play_main'))

                            }
                        }
                        
                    }
                });
            }
        }});
    }

    function getQueryString(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})