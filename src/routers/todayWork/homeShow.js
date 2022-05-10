
const {findArticlesPage} = require("../../models/Article");
module.exports = async function(req,res){
    //获取当前页
    const currentPage = req.query.currentPage || 1;
    const pageNumber = 2;
    //查询数据库中的数据
    const goodsItemLists = await findArticlesPage({currentPage,pageNumber:2});
    const {goodsItemList,total} = goodsItemLists;//获取查询到的数据条数和查询到的数据

    const totalPage = Math.ceil(total/pageNumber);//获取总页面数
    //将页面的总页面数变成数组
    const totalPages = [];
    for(let i=1; i<=totalPage; i++){
        totalPages.push(i);
    }
    res.render("todayWork/home.art",{Articles:goodsItemList,totalPages:totalPages,currentPage:currentPage});
    
}