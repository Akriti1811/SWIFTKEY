const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send("Name  is Required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be of minimum 6 characters");
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is taken");
  const user = new User(req.body);
  try {
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try Again");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) res.status(400).send("User Not Found");
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD IN LOGIN ERROR", err);
      if (!match || err) return res.status(400).send("Wrong Password");
      // Generate token
      let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIn:"9d",
      });
      res.json({ token, user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.epdatedAt,

      } });
    });
  } catch {
    console.log("LOGIN ERROR", err);
    res.status(400).send("SIGNIN FAILED");
  }
};
