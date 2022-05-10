/*本文件用于编写函数使用轻服务的数据库实现用户信息的添加、查询、删除、修改功能*/

var bcrypt = require('bcryptjs');//引入第三方库bcryptjs用于实现用户登录密码加密
const inspirecloud = require('@byteinspire/api');//引用字节轻服务的数据库资源


//用户信息添加
async function addUser(params, context) {
    const Users = inspirecloud.db.table('Users');// 使用 inspirecloud.db.table 获取数据表
    var salt = bcrypt.genSaltSync(10);//生成随机字符串，用于对密码进行加密
    //对用户设置的密码进行加密
    params.password = bcrypt.hashSync(params.password, salt);
    // 使用 save 方法将用户数据存入数据库
    const result = await Users.save({username: params.username, email:params.email,password:params.password});
  }

  //用户信息查询
  async function findUser(params, context){
    // 使用 inspirecloud.db.table 获取数据表
    const Users = inspirecloud.db.table('Users');
    // 使用 where指定查询条件为 item 字段值等于 'iphone 6'
    const userInfo = await Users.where({email: params.email}).find();
    return userInfo;
  }

  module.exports = {
    addUser,
    findUser,
  }