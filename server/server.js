const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/auth")
const sessionRoutes = require("./routes/session")
const {connectDB} = require("./config/db")
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

// api routes
app.use("/api", authRoutes);
app.use("/api/session", sessionRoutes);

// fs.readdirSync('./routes').map((r)=>  app.use("/api", require('./routes/' + r)));


// db connection
connectDB();


const port = process.env.PORT || 8000;
app.listen(port,
  ()=> console.log('server is running')
);