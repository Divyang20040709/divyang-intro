require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    const count = await User.countDocuments({});
    console.log(`User count: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUser();
