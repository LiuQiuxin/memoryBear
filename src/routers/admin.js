/*本文件用于设置博客管理页面路由*/

/*引入第三方模块*/
const express = require("express");

/*创建一级路由对象*/
const admin = express.Router();

/*在一级路由对象admin下搭建二级路由，创建服务*/


admin.get("/login",require("./admin/loginShow"));//1、创建博客登录页面展示路由
admin.post("/login",require("./admin/login"));//2、创建博客登录页面路由

admin.get("/register",require("./admin/registerShow"));//1、创建博客注册页面展示路由
admin.post("/register",require("./admin/register"));//2、创建博客注册页面路由

admin.get("/logout",require("./admin/logout"));//1、实现用户退出登录

admin.get("/error",require("./admin/error"));//1、实现报错页面展示

module.exports = admin;


