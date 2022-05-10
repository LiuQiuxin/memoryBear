/*本文件用于使用字节轻服务的数据库资源添加笔记 */

const inspirecloud = require('@byteinspire/api');//引用字节轻服务的数据库资源
const path = require('path');
const InspireCloud = require('@byteinspire/js-sdk');
const FormData = require('form-data');
const { func } = require('joi');

//文章添加
async function addArticle(params, context) {
    const Articles = inspirecloud.db.table('Articles');// 使用 inspirecloud.db.table 获取数据表
    // 使用 save 方法将用户数据存入数据库
    const result = await Articles.save({title: params.title, author:params.author,publishDate:params.publishDate,cover:params.cover,content:params.content});
  }

  //添加文章对应的图片文件
async function addCover(filePath) {
    const serviceId = 'qcown2'; // 替换成你的 serviceId，可在后台「设置」页面获取
    const inspirecloud = new InspireCloud({ serviceId });
    // 构建 FormData 对象
    const formData = new FormData();
    
    // 添加文件
    formData.append('myFile', filePath);

    // 以 multipart/form-data 的类型调用云端的上传文件函数，实现上传
    inspirecloud.run('uploadFile', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  //查询特定的文章
  async function findArticle(params, context){
    let ObjectId = inspirecloud.db.ObjectId;
    // 使用 inspirecloud.db.table 获取数据表
    const Articles = inspirecloud.db.table('Articles');
    // 使用 where指定查询条件为 item 字段值等于 'iphone 6'
    const articleInfo = await Articles.where({ _id:ObjectId(params.id)}).find();
    return articleInfo;
  }

//查询数据库中所有的文章
  async function findArticles(params, context){
    // 使用 inspirecloud.db.table 获取数据表
    const Articles = inspirecloud.db.table('Articles');
    // 使用 where指定查询条件为 item 字段值等于 'iphone 6'
    const articleInfos = await Articles.where().find();
    return articleInfos;
  }

  //实现文章分页功能的查询
  async function findArticlesPage(params, context){
    //获取当前页和每页显示的条数
    const {currentPage,pageNumber} = params;
    //获取数据库
    const Articles = inspirecloud.db.table("Articles");
    //查询数据库，获取总的数据条数
    const total = await Articles.where().count();
    //指定查询的文章数目和从第几篇文章开始查询
    const goodsItemList = await Articles.where()
      .skip((currentPage-1)*pageNumber)// 使用skip跳过前currentPage*pageNumber项进行查询
      .limit(pageNumber)// 使用 limit 指定返回 pageNumber 项
      .find();
      return {
        total,
        goodsItemList,

      };
  }

  module.exports = {
    addArticle,
    findArticles,
    findArticle,
    addCover,
    findArticlesPage,
  }