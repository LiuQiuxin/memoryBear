/*该模块用于编写中间件设置路由守卫，判断用户可以访问的权限 */

module.exports = function(req,res,next){
    //将请求路径存入模板中,在模板中 可以直接使用url读取请求路径
    //判断用户的登陆状态
    //req.path对象会输出当前所有的请求路径,但是第一个请求是页面跳转请求，当判断第一个请求路径即可确定放行还是拦截
    if(req.session.username){
        //用户是登陆的，不管访问那个板块都放行
        next();
    }else{
        //用户未登录，判断用户访问的页面
        if(req.url.indexOf("todaywork") !== -1){
            //用户访问的是今日营业页面，不放行，需要进行登陆才行
            req.app.locals.errorMsg = "请登录后访问";
            return res.redirect("/admin/error");
        }else{
            next();
        }
    }
}