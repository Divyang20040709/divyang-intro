require("dotenv").config();
const mongoose = require("mongoose");
const Skill = require("./models/Skill");

const skills = [
  { icon: "⚛️", name: "Frontend", category: "Frontend", tags: ["React","HTML/CSS"] },
  { icon: "🔧", name: "Backend",  category: "Backend",  tags: ["Node.js","Python","FastAPI","REST APIs"] },
  { icon: "🗄️", name: "Databases",category: "Databases",tags: ["MongoDB","Firebase"] },
  { icon: "☁️", name: "DevOps & Cloud", category: "DevOps & Cloud", tags: ["AWS","GitHub Actions"] },
  { icon: "🛠️", name: "Tools",    category: "Tools",    tags: ["Git","VS Code","Postman","Anaconda"] },
  { icon: "🤖", name: "AI / ML",  category: "AI / ML",  tags: ["Hugging Face"] },
];

const seedSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    
    // Clear existing skills to avoid duplicates
    await Skill.deleteMany({});
    
    // Insert skills
    await Skill.insertMany(skills);
    
    console.log("✅ Successfully migrated all skills to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error(`❌ Migration Error: ${err.message}`);
    process.exit(1);
  }
};

seedSkills();
