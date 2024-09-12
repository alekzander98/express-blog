// SQL模型
const basePath = require('process').cwd();
const path = require('path');
const fs = require('fs');
const { Sequelize } = require("sequelize");

// 获取环境变量
let ENV = process.env.NODE_ENV || 'pro';
// 获取对应配置文件
let configFile = path.resolve(basePath, `config/db-${ENV}.json`);
let envConfig = {};
// 读取配置信息
if (fs.existsSync(configFile)) {
    let data = fs.readFileSync(configFile);
    envConfig = JSON.parse(data);
} else {
    throw new Error("Can not find the config file!");
}

const dbConfig = envConfig.sequelize||{};

// 创建实例
const sequelize = new Sequelize(
  // 数据库名称
  dbConfig.dbname,
  // 数据库用户名
  dbConfig.username,
  // 数据库密码
  dbConfig.password,
  {
    // 如果是远程数据库，可以填写 ip 地址
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

module.exports = sequelize;