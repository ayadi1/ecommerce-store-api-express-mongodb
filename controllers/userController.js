require("dotenv").config();

const User = require("../modules/userModule");
var bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const userInfo = req.body;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "please provide all required field" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ success: false, msg: "email or password not work" });
    }
    const verifyPss = await bcrypt.compare(password, findUser.password);
    if (!verifyPss) {
      return res.status(404).json({ success: false, msg: "email or password not work" });
    }
    const token = await findUser.genToken(findUser._id, findUser.email);

    return res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

const register = async (req, res) => {
  try {
    const userInfo = req.body;
    const { email, password, name, isAdmin, isSuperAdmin } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, msg: "please provide all required field" });
    }
    if (isAdmin) {
      if (isAdmin == process.env.SECRET_ADMINS_KEY) {
        userInfo.isAdmin = true;
      }
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ success: false, msg: "email already exist" });
    }
    if (isSuperAdmin) {
      if (isSuperAdmin == process.env.SECRET_SUPER_ADMINS_KEY) {
        userInfo.isSuperAdmin = true;
        userInfo.isAdmin = true;
      }
    }
    const newUser = await User.create(userInfo);
    const token = await newUser.genToken(newUser._id, newUser.email);

    return res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { login, register };
