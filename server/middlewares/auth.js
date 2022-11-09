const User = require("../models/user")
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

exports.protect = async (req, res, next) => {
  // get token
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(400).json({
      status:"failure",
      message:"token not found"
    })
  }

  // { _id: '6367d40fe61d4dc6c32608e6', iat: 1667807294, exp: 1668584894 }
  // Token Verification 
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // Check if user still exists
  const freshUser = await User.findById(decoded._id);
  if (!freshUser) {
    return res.status(400).json({
      status:"failure",
      message:"token not valid or user not found."
    })
  }

  // grant access
  req.user = freshUser;
  next();
};

// token -> verify -> decoded -> _id -> user(_id) -> req.user = freshUser


exports.authCheck = (req, res, next) => {
  console.log(req.body);
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    req.credential = {
      name,
      email,
      password,
    };
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid Request" });
  }
};
