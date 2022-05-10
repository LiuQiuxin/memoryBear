/*该模块用来向数据库中存入用户评论和读取用户评论信息*/

const inspirecloud = require('@byteinspire/api');//引用字节轻服务的数据库资源
const InspireCloud = require('@byteinspire/js-sdk');


//评论信息添加
async function addComment(params, context) {
    const Comments = inspirecloud.db.table('Comments');// 使用 inspirecloud.db.table 获取数据表
    // 使用 save 方法将用户数据存入数据库
    const result = await Comments.save({username:params.username, email:params.email,comment:params.comment,passageId:params.id});
  }

  //评论信息查询
  async function findComments(params, context){
    //let ObjectId = inspirecloud.db.ObjectId;
    // 使用 inspirecloud.db.table 获取数据表
    const Comments = inspirecloud.db.table('Comments');
    // 使用 where指定查询条件为 item 字段值等于 'iphone 6'
    const CommentsInfo = await Comments.where({passageId:params.passageId}).find();
    return CommentsInfo;
  }

  module.exports = {
    addComment,
    findComments,
  }