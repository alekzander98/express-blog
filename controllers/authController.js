const User = require('../models/User')

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

    // 创建用户
    await User.create({ username, password, nickname });
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
    const isPwdMatch = password === user.password;
    if(!isPwdMatch){
      return res.status(200).json({ success: false, message: 'Invalid username or password' });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        account: user.username, 
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
