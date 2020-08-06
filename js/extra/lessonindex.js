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

})