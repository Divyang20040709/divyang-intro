require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");

const projects = [
  {
    num: "01",
    title: "Zoomify",
    description: "I built a real-time Zoom Clone application that enables seamless video conferencing with features like live video/audio streaming, meeting rooms, and user authentication. The frontend is developed using React.js for a dynamic and responsive UI, while Node.js handles the backend logic and real-time communication. MongoDB is used to manage user data and session information efficiently. This project demonstrates my ability to build scalable, full-stack, real-time applications.",
    techStack: ["Node.js", "React.js", "MongoDB"],
    githubLink: "https://github.com/Divyang20040709/Zoomify__",
    featured: true,
  },
  {
    num: "02",
    title: "Ecommerce-streamlit",
    description: "Built an E-commerce web app using Streamlit with API integration to display real-time product data. Focused on simplicity, responsiveness, and smooth user experience.",
    techStack: ["Python", "API", "Streamlit"],
    githubLink: "https://github.com/Divyang20040709/ecommerce_fake",
    liveLink: "https://ecommercefake-my.streamlit.app/",
    featured: true,
  },
  {
    num: "03",
    title: "News App",
    description: "Built a News App using Streamlit with API integration to display real-time news articles by category. Focused on simplicity and user-friendly design. You can also see the full article on other tab by pressing button Read full article.",
    techStack: ["Python", "API", "Streamlit"],
    githubLink: "https://github.com/Divyang20040709/news_app",
    liveLink: "https://mynewsapp.streamlit.app/",
    featured: true,
  },
  {
    num: "04",
    title: "Currency Converter",
    description: "I developed a Currency Converter application using Streamlit that integrates with external APIs to provide real-time exchange rates. The app allows users to convert between multiple currencies instantly with an intuitive and user-friendly interface. This project demonstrates my ability to work with APIs, handle dynamic data, and build practical Python-based web applications.",
    techStack: ["Python", "API", "Streamlit"],
    githubLink: "https://github.com/Divyang20040709/currency_converter-",
    liveLink: "https://my1stliveapp.streamlit.app/",
    featured: false,
  },
  {
    num: "05",
    title: "Weather App",
    description: "I developed a Weather Application using Streamlit that fetches real-time weather data through API integration. Users can enter any city or country name to get accurate weather details, including temperature, conditions, and other key metrics. This project demonstrates my ability to work with APIs, handle user input dynamically, and build practical Python web applications.",
    techStack: ["Python", "API", "Streamlit"],
    githubLink: "https://github.com/Divyang20040709/Weather_app",
    liveLink: "https://weatherapp-mine.streamlit.app/",
    featured: false,
  },   
  {
    num: "06",
    title: "Expense Tracker",
    description: "I built a simple expense tracker web app using Streamlit that helps users manage their daily income and expenses. It allows adding and categorizing expenses, and shows useful insights like total spending, savings, and trends. I also used Pandas and Matplotlib to analyze data and create visual charts. Users can even download their expense data and customize categories.",
    techStack: ["Python", "Matplotlib","Pandas", "Streamlit"],
    githubLink: "https://github.com/Divyang20040709/expense_tracker",
    liveLink: "https://expensetracker-dts.streamlit.app/",
    featured: false,
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    
    // Clear existing projects to avoid duplicates
    await Project.deleteMany({});
    
    // Insert projects
    await Project.insertMany(projects);
    
    console.log("✅ Successfully migrated all projects to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error(`❌ Migration Error: ${err.message}`);
    process.exit(1);
  }
};

seedProjects();
