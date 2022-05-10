$("#passwordAgain").focusin(function(){
    //密码框选中，用户登录页面向上举
    $(".login-box").addClass("up");
}).focusout(function(){
    //密码框非选中，用户登录页面恢复
    $(".login-box").removeClass("up");
})
