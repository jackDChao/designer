$(function(){
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')){
        $('.my_lesson').show()
        let user = JSON.parse(localStorage.getItem('user'))
        $(".login_resigst").addClass('noborder').removeClass('login')
        $(".login_resigst").text(user.name)
    }else{
        $('.my_lesson').hide()
    }
    getcourse()
    // 登录
    $(document).on('click','.login',function(){
        location.href = `./login.html`
        return false
    });
    // 课程指向
    $(document).on('click','.my_lesson',function(){
        location.href = `./mycourse.html`
        return false
    });

    function getQueryString(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function getcourse(){
        $(".courselist").html('')
        $(".lessons_list").html('')
        $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getcourse?username=admin`,success:function(result){
            console.log(result)
            if(result){
                let html = ''
                result.forEach((element,idx) => {
                    if(idx < 6){
                        html+= `<div class="lesson_item" data-id="${element._id}">
                            <p>
                                <img class="lesson_img" src="./images/lesson/${idx % 2 == 0 ? 'ty1' : 'ty2'}.png">
                            </p>
                            <p>
                                ${element.coursename}
                            </p>
                        </div>`
                    }
                });
                $(".lessons_list").html(html)
            }
            
        }});
    }
})