const User = require("../models/user");
const Session = require("../models/session");

exports.createSession = async (req, res) => {
    console.log(req.body);
    const id = req.user._id;
    const {gross, net, accuracy} = req.body;
    if(!gross || !net || !accuracy)
    return res.status(400).json({
        message:"data not provided",
        status:"Fail"
    });
    const user = await User.findById(id);
    const session = await Session.create({gross, net, accuracy});
    user.sessions.unshift(session);
    await user.save();
    return res.status(200).json({
      status: 'success',
      data: user.sessions,
      message: 'session stored successfully',
    });
  };

exports.getSessions = async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).populate("sessions");
    if(!user) return res.status(404).json({
        status: 'failure',
        message: 'user not found',
      });
  
    return res.status(200).json({
      status: 'success',
      sessions: user.sessions,
      message: 'All sessions fetched successfully',
    });
  };
