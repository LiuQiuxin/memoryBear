/*本模块用于实现跟今日营业版块相关的路由*/

const express = require("express");

let homeWork = express.Router();

homeWork.get("/",require("./todayWork/homeShow"));//实现展示今日营业板块功能

homeWork.get("/addarticle",require("./todayWork/addArticleShow"));//实现展示添加笔记页面功能
homeWork.post("/addarticle",require("./todayWork/addArticle"));//实现添加笔记功能

homeWork.get("/article",require("./todayWork/articleShow"));//实现展示文章内容和评论功能
homeWork.post("/addcomment",require("./todayWork/addComment"));//实现添加用户评论功能


homeWork.get("/resume",require("./todayWork/resumeShow"));//实现用户个人简历展示

module.exports = homeWork;