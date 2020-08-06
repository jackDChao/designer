$(function(){
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'))
        $(".login_resigst").addClass('noborder')
        $(".login_resigst").text(user.name)
    }
    // 获取系列课
    getcoursebyid()
    // 课程指向
    $(document).on('click','.lesson_item',function(){
        console.log($(this).data('id'))
        location.href = `./designer.html?courseid=${$(this).data('courseid')}&lessonid=${$(this).data('id')}`
        return false
    });
    // 添加课程
    $(document).on('click','.addlesson',function(){
        layer.open({
            type: 1,
            title:'新建课程',
            area: ['360px', '400px'],
            content: $('#lesson_tag') 
        });
        return false
    });
    $(document).on('click','.tolesson',function(){
        if(!$(".lessonname").val()){
            layer.msg('请输入课程名称')
            return
        }
        let postdata = {
            "username": "admin",
            "name":$(".lessonname").val(),
            "courseid":$(".courselist").val()
        }
        $.ajax({
            url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/createlesson`,
            type:'post',
            contentType: 'application/json',
            data:JSON.stringify(postdata),
            dataType:'json',
            success:function(result){
                console.log(result)
                if(result == 'success'){
                    layer.msg('保存成功')
                }
            },
            dataFilter:function(result,b){
                console.log(result,b)
                if(result == 'success'){
                    layer.msg('保存成功')
                    setTimeout(() => {
                        layer.closeAll()
                        getcoursebyid()
                    }, 1500);
                }
            }
        });
        return false
    });
    
    
    // lessons_list
    // $('.login_btn').click(function(){    
    //     let uname = $('.login_username').val()
    //     let upwd = $('.login_password').val()
    //     if(uname == 'admin' && upwd == 'p@ssword9870'){
    //         layer.msg('登陆成功')
    //         let user = {
    //             name:'admin'
    //         }
    //         localStorage.setItem('user',JSON.stringify(user))
    //         setTimeout(() => {
    //             location.href = './mylesson.html'
    //         }, 1500);
    //     }else{
    //         layer.msg('登陆失败，请重试')
    //     }
    // })
    function getcoursebyid(){
        $(".lessons_list").html('')
        $(".lessons_list").html('')
        let courseid = getQueryString('courseid')
        $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getlessons?username=admin&courseid=${courseid}`,success:function(result){
            console.log(result)
            if(result){
                let html = ''
                result.forEach(element => {
                    html+= `<div class="lesson_item lessonit" data-id="${element._id}" data-courseid="${element.course}">
                        <p>
                            课程封面图
                        </p>
                        <p>
                            ${element.name}
                        </p>
                    </div>`
                });
                $(".lessons_list").html(html)
            }
        }});
        $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getcourse?username=admin&courseid=${courseid}`,success:function(result){
            console.log(result)
            if(result){
                $(".courselist").html('')
                let selecthtml = ''
                result.forEach(element => {
                    if(element._id === courseid){
                        $('.coursename').text(element.coursename)
                    }
                    selecthtml+=`<option value="${element._id}">${element.coursename}</option>`
                });
                $(".courselist").html(selecthtml)
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