/*本模块用用于实现展示博客注册页面 */

module.exports = function(req,res){
    //当浏览器访问到login路径时，渲染登录模板
    res.render("admin/register");

}