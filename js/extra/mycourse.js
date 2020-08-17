$(function(){
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'))
        $(".login_resigst").addClass('noborder')
        $(".login_resigst").text(user.name)
    }
    $('.dropdown-toggle').dropdown()
    // 获取系列课
    getcourse()
    // 添加系列课
    $(document).on('click','.addcourse',function(){
        layer.open({
            type: 1,
            title:'新建系列课',
            area: ['360px', '300px'],
            content: $('#course_tag') 
        });
        return false
    });
    // 系列课指向
    $(document).on('click','.lesson_item',function(){
        console.log($(this).data('id'))
        location.href = `./mylesson.html?courseid=${$(this).data('id')}`
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
    $(document).on('click','.tocourse',function(){
        if(!$(".coursename").val()){
            layer.msg('请输入系列课名称')
            return
        }
        let postdata = {
            "username": "admin",
            "name":$(".coursename").val()
        }
        $.ajax({
            url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/createcourse`,
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
                if(result == 'success'){
                    layer.msg('保存成功')
                    setTimeout(() => {
                        layer.closeAll()
                        getcourse()
                    }, 1500);
                }
            }
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
    function getcourse(){
        $(".courselist").html('')
        $(".lessons_list").html('')
        $.ajax({url:`https://service-0w9ndseb-1251270507.sh.apigw.tencentcs.com/getcourse?username=admin`,success:function(result){
            console.log(result)
            if(result){
                let html = ''
                let selecthtml = ''
                result.forEach((element,idx) => {
                    html+= `<div class="lesson_item" data-id="${element._id}">
                        <p>
                            <img class="lesson_img" src="./images/lesson/${idx % 2 == 0 ? 'ty1' : 'ty2'}.png">
                        </p>
                        <p>
                            ${element.coursename}
                        </p>
                    </div>`
                    selecthtml+=`<option value="${element._id}">${element.coursename}</option>`
                });
                $(".courselist").html(selecthtml)
                $(".lessons_list").html(html)
            }
            
        }});
    }
})