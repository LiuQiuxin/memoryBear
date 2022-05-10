/*本文件用于实现展示博客登录页面功能 */

module.exports = function(req,res){
    //当浏览器访问到login路径时，渲染登录模板
    res.render("admin/login");
}

