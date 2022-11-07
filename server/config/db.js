const mongoose = require("mongoose");

exports.connectDB = () => {
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected", process.env.PORT))
  .catch((err) => console.log("DB Error => ", err));
};
