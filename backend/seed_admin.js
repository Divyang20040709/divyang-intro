require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    
    // Check if admin already exists
    const adminExists = await User.findOne({ username: "admin" });
    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: "admin",
      password: "admin123"
    });

    await admin.save();
    console.log("✅ Admin account created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error seeding admin: ${err.message}`);
    process.exit(1);
  }
};

seedAdmin();
