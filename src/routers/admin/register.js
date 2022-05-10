/*本模块用于实现用户注册功能 */

const {addUser,findUser} = require("../../models/User");
const {validate} = require("../../models/joi");//引入用于用户注册信息合法性验证函数

module.exports = async function(req,res){
    const userRegister = validate(req.body);//验证注册信息是否合法，若不合法，则会返回一个字符串错误，若合法，返回原注册对象
    if(typeof userRegister !== "string"){
        //用户注册信息合法，
        const {email,password,passwordAgain} = req.body;//获取注册使用的用户邮箱,密码和验证密码
        let user = await findUser({email:email});//查询当前邮箱是否已经注册
        if(user.length===0){
            //邮箱没有被占用，可以注册，判断验证密码跟设置密码是否相同，相同则将用户添加到数据库，并重定向到登陆页面
            if(password===passwordAgain){
                addUser(req.body);
                res.redirect("/admin/login");
            }else{
                req.app.locals.errorMsg = "确认密码与用户密码不一致";
                res.redirect("/admin/error");
                //res.render("admin/error.art",{path:location.href});
            }

        }else{
            //邮箱已经注册，报错
            req.app.locals.errorMsg = "邮箱已经被占用，请重新注册";
            res.redirect("/admin/error");
        }
    }else{
        //用户注册信息不合法
        req.app.locals.errorMsg = userRegister;
        res.redirect("/admin/error");
    }

    
}