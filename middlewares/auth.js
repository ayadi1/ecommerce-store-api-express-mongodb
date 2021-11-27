require("dotenv").config();
const User = require("../modules/userModule");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.split(" ")[1]) {
    return res.status(400).json({ success: false, msg: "missing token" });
  }
  const token = authorization.split(" ")[1];
  try {
    const verifyToken = await jwt.verify(token, process.env.TOKEN_STRING_KEY);
    const { id, email } = verifyToken;
    req.user = { userID: id, email };
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: "token invalid" });
  }
};

module.exports = auth;
