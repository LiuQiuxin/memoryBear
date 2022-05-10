/*引入第三方库 */
const express = require("express");//引用express包
const path = require("path");//引入路径处理包
const bodyParser = require('body-parser');//该插件用于读取post请求方式获取的表单数据
const template = require("art-template");//导入art-template模板引擎
const session = require("express-session");//导入express-session库，用于处理session对象，该库会返回一个函数
const dateFormat = require("dateformat");//引入日期处理模块


/*创建express服务对象*/
const app = express();

/*使用app.use拦截所有的请求，并将请求交给session方法调用 */
app.use(session({
    secret:"secret",
    saveUninitialized:false,
    resave: true,
    cookie:{
        maxAge:24*60*60*1000,
    }
}));

/*全局配置body-parser模块，使得req中多了一个body属性，用于存储post方式提交的表单数据 */
app.use(bodyParser.urlencoded({extended:false}))



/*拦截请求，判断用户的登陆状态和登陆权限*/
app.use("/",require("./middleWare/loginGuard"));

/*开放静态资源文件,不然网页找不到样式和行为文件*/
app.use(express.static(path.join(__dirname,"public")));

/*配置模板渲染*/
app.set("views",path.join(__dirname,"/views"));//开放模板文件位置
app.set("view engine","art");//设置默认的模板后缀
app.engine("art",require("express-art-template"));//设置模板引擎用于渲染后缀为art的模板文件

/*引入自定义路由模块*/
const admin = require("./routers/admin");//引入博客管理页面路由
const home = require("./routers/home");//引入博客主页路由
const todaywork = require("./routers/todayWork");//引入今日营业板块主页路由

/*为路由匹配请求路径*/
app.use("/admin",admin);
app.use("/",home);
app.use("/todaywork",todaywork);


//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

module.exports = app;