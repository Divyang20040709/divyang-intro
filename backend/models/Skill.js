const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Frontend", "Backend", "Databases", "DevOps & Cloud", "Tools", "AI / ML"],
  },
  icon: String,
  tags: [String],
});

module.exports = mongoose.model("Skill", skillSchema);
