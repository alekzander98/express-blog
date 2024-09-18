const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class User extends Model {};

User.init({
  username: {
    comment: '用户名',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    comment: '密码',
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    comment: '昵称',
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  sequelize,
  modelName: "User",
});

module.exports = User;