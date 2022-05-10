/*该模块用来实现文章的内容渲染*/

const {findArticle} = require("../../models/Article");
const {findComments} = require("../../models/Comment");

module.exports = async function(req,res){
    //获取文章的id
    const {id} = req.query;
    //根据文章id查询文章信息
    const articleInfo = await findArticle({id:id});
    //查询评论信息
    const commentsInfo = await findComments({passageId:id});
    res.render("todayWork/article.art",{articleInfo:articleInfo[0],commentsInfo});
}