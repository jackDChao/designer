$(function(){
    $('.layui-input').bind('input propertychange', function() {
        if($(this).val()){
            $(this).parent().find('.leftLabel').hide()
        }else{
            $(this).parent().find('.leftLabel').show()
        }
    })
    $('.login_btn').click(function(){
        console.log()
        let uname = $('.login_username').val()
        let upwd = $('.login_password').val()
        if(uname == 'admin' && upwd == 'p@ssword9870'){
            layer.msg('登陆成功')
            let user = {
                name:'admin'
            }
            localStorage.setItem('user',JSON.stringify(user))
            console.log(localStorage.getItem('user'))
            setTimeout(() => {
                location.href = './index.html'
            }, 1500);
        }else{
            layer.msg('登陆失败，请重试')
        }
    })
})