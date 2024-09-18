const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET = "qweasdzxc"

// 注册
async function register(req, res) {
  const { username, password, nickname } = req.body;
  // console.log('register', username, password, nickname);

  // 注册相关
  try{

    const exist = await User.findOne({ where: { username } });
    // console.log('exist', exist);
    // 昵称是否存在
    if(exist){
      return res.status(400).json({ success: true, message: 'Exists' })
    }

    // 密码加密处理
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    await User.create({ username, password: hashedPassword, nickname });
    return res.status(200).json({ success: true, message: 'Created' })

  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ success: false, message: 'Failed' })
  }
}

// 登录
async function login(req, res) {

  const { username, password, nickname } = req.body;
  // 登陆相关
  try {

    // 检查用户是否注册
    const user = await User.findOne({ where: { username } });
    if(!user){
      return res.status(200).json({ success: false, message: 'Invalid username or password' });
    }

    // 密码匹配
    const isPwdMatch = await bcrypt.compare(password, user.password);
    if(!isPwdMatch){
      return res.status(200).json({ success: false, message: 'Invalid username or password' });
    }

    // 创建 token 访问令牌
    const token = jwt.sign({ userId: user.id }, SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      data: {
        token,
        userId: user.id,
        username: user.username,
        nickname: user.nickname,
      },
      message: '',
    })

  } catch (error) {
    // console.log('error', error);
    return res.status(500).json({ success: false, message: 'Failed' })
  }
}

module.exports = { register, login };
