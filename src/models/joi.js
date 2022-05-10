/*该模块用于验证用户注册信息是否符合标准*/

const Joi = require("joi");//引入用于用户信息的第三方库

//定义对象的验证规则
const schema = Joi.object({
    username:Joi.string().min(2).max(5).required().error(new Error("username属性没有通过验证")),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error("email没有通过验证")),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error("密码没有通过验证")),
});


//验证对象是否符合规则
async function validate(userInfo){
    try{
        //如果验证成功，返回验证对象
        await schema.validateAsync({username:userInfo.username,
                                    email:userInfo.email,
                                    password:userInfo.password,
        });
    }catch(ex){
        //如果验证失败，执行catch内的代码，抛出异常
        return ex.message;
    }
}

module.exports = {
    validate,
};