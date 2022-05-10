/*本模块用于搭建home页下的二级路由*/

const express = require("express");

let home = express.Router();

home.get("/",require("./home/homeShow"));

module.exports = home;