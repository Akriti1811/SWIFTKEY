const User = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.credential;

  User.countDocuments({ email, password }, function (err, count) {
    if (count > 0) {
      res.status(200).json({ err: "Login Successfully" });
    } else {
      res.status(401).json({ err: "Wrong Credentials" });
    }
  });
};

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
