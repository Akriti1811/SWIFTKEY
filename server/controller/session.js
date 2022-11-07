const User = require("../models/user");
const Session = require("../models/session");

exports.createSession = async (req, res) => {
  const id = req.body.id;
  const { words_per_minute, accuracy } = req.body;
  if (!words_per_minute || !accuracy)
    return res.status(400).json({
      message: "data not provided",
      status: "Fail",
    });
  const user = await User.findById(id);
  console.log(user);
  const session = await Session.create({ words_per_minute, accuracy });
  console.log(session);
  user.sessions.unshift(session);
  await user.save();
  res.status(200).json({
    status: "success",
    data: user.sessions,
    message: "session stored successfully",
  });
};

exports.getSessions = async (req, res) => {
  const id = req.body.id;
  const user = await User.findById(id).populate("sessions");
  if (!user)
    return res.status(404).json({
      status: "failure",
      message: "user not found",
    });

  return res.status(200).json({
    status: "success",
    data: user.sessions,
    message: "All sessions fetched successfully",
  });
};
