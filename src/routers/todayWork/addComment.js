/*该模块用于完成用户评论的添加*/

const {addComment} = require("../../models/Comment");
module.exports = function(req,res){
    //获取正在参与评论的用户信息
    const {username,email,id} = req.query;
    //获取评论信息
    const {comment} = req.body;

    //将评论信息存入数据库
    addComment({username,email,comment,id});
    return res.redirect("/todaywork/article?id="+id);
}
