/*本文件用于实现用户登录博客功能*/

const {findUser} = require("../../models/User");//引入数据库查询函数，用于查询用户信息
var bcrypt = require('bcryptjs');//引入哈希加密模块，用于验证用户提交的密码是否正确
/*向外暴露登录验证函数*/
module.exports = async function(req,res){
    const {email,password} = req.body;//接收用户的请求参数，进行服务端验证
    //若邮箱地址和密码为空，则报错
    if(email.trim().length === 0 && password.trim().length === 0){
        return console.log("邮件地址或者密码错误");
    }

    //若邮箱地址和密码不为空，则查询用户是否存在于数据库中
    user = await findUser({email:email});
    user = user[0];
    if(user){
        //查询到了用户，检查登录密码是否正确
        if(bcrypt.compareSync(password,user.password)){//比较函数中两个参数不能互换
            //密码一致，登陆成功，将用户名存储到请求对象req中,会在浏览器的cookie中存入用户信息
            req.session.username = user.username;
            //将用户信息存入req.app对象下的locals属性中，就可以在模板对象中直接使用该用户信息
            req.app.locals.userInfo = user;
            //将页面重定向到博客首页
            return res.redirect("/");
        }else{
            //将页面重定向到错误页面，并提示错误信息
            req.app.locals.errorMsg = "邮件地址或密码错误";
            return res.redirect("/admin/error");
        }
    }else{
        req.app.locals.errorMsg = "邮件地址或密码错误";
        return res.redirect("/admin/error");
    }  
}


