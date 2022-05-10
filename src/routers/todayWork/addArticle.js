/*本模块用于实现添加笔记功能*/

const{addArticle} = require("../../models/Article");//引入文章添加函数
const formidable = require("formidable");//引入formidable库用于处理post提交的二进制类型数据
const path = require("path");//引入路径处理模块，用于处理路径信息

module.exports = function(req,res){
    //创建表单解析对象
    const from = new formidable.IncomingForm();
    //2、配置文件上传到服务器的路径
    from.uploadDir = path.join(__dirname,"../../"+"/public"+"/uploadCover");
    //3、保留文件上传的后缀
    from.keepExtensions = true;
    //解析表单
    from.parse(req,(err,fields,files)=>{
        addArticle({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.filepath.split("public")[1],//将文件上传到服务器的文件系统并返回url地址
            content:fields.content,
        });
    });
    //添加笔记成功，返回笔记列表页面
    res.redirect("/todaywork");
}