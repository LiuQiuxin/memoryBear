/*该模块用于退出登录状态 */

module.exports = function(req,res){
    //用户退出登录，删除cookie
    res.clearCookie("connect.sid");//该语句没有用
    //清除模板中的用户信息
    req.app.locals.userInfo = null;
    //重定向到登陆页面
    res.redirect("/admin/login");
}