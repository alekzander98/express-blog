// 入口文件
const express = require("express");
const sequelize = require("./models");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth')

const app = express();

// 中间件
app.use(bodyParser.urlencoded({ extended: false })); //解析 post body x-www-form-urlencoded 格式数据
app.use(bodyParser.json()); //解析 post body json 格式数据

// 路由
app.use("/auth", authRoutes); //验证相关

// 数据库同步
sequelize
  .sync()
  .then(() => {
    console.log("Database synced"); //连接成功
  })
  .catch((error) => {
    console.error("Error syncing database:", error); //连接失败
  });


// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
