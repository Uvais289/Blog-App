const mongoose= require ("mongoose");
require("dotenv").config();

const Connection= mongoose.connect(process.env.MONGODB_URI);

module.exports= Connection;