const express = require("express");
const router = express.Router();

// In-memory data — replace with DB (Postgres/Mongo) if needed
const projects = [
  {
    id: 1,
    num: "01",
    title: "Zoomify",
    description:
      "I built a real-time Zoom Clone application that enables seamless video conferencing with features like live video/audio streaming, meeting rooms, and user authentication. The frontend is developed using React.js for a dynamic and responsive UI, while Node.js handles the backend logic and real-time communication. MongoDB is used to manage user data and session information efficiently. This project demonstrates my ability to build scalable, full-stack, real-time applications.",
    stack: ["Node.js", "React.js", "MongoDB"],
    github: "https://github.com/Divyang20040709/Zoomify__",
    featured: true,
  },
  {
    id: 2,
    num: "02",
    title: "Ecommerce-streamlit",
    description:
      "uilt an E-commerce web app using Streamlit with API integration to display real-time product data. Focused on simplicity, responsiveness, and smooth user experience.",
    stack: ["Python", "API", "Streamlit"],
    github: "https://github.com/Divyang20040709/ecommerce_fake",
    live: "https://ecommercefake-my.streamlit.app/",
    featured: true,
  },
  {
    id: 3,
    num: "03",
    title: "News App",
    description:
      "Built a News App using Streamlit with API integration to display real-time news articles by category. Focused on simplicity and user-friendly design. You can also see the full article on other tab by pressing button Read full article.",
    stack: ["Python", "API", "Streamlit"],
    github: "https://github.com/Divyang20040709/news_app",
    live: "https://mynewsapp.streamlit.app/",
    featured: true,
  },
  {
    id: 4,
    num: "04",
    title: "Currency Converter",
    description:
      "I developed a Currency Converter application using Streamlit that integrates with external APIs to provide real-time exchange rates. The app allows users to convert between multiple currencies instantly with an intuitive and user-friendly interface. This project demonstrates my ability to work with APIs, handle dynamic data, and build practical Python-based web applications.",
    stack: ["Python", "API", "Streamlit"],
    github: "https://github.com/Divyang20040709/currency_converter-",
    live: "https://my1stliveapp.streamlit.app/",
    featured: false,
  },
  {
    id: 5,
    num: "05",
    title: "Weather App",
    description:
      "I developed a Weather Application using Streamlit that fetches real-time weather data through API integration. Users can enter any city or country name to get accurate weather details, including temperature, conditions, and other key metrics. This project demonstrates my ability to work with APIs, handle user input dynamically, and build practical Python web applications.",
    stack: ["Python", "API", "Streamlit"],
    github: "https://github.com/Divyang20040709/Weather_app",
    live: "https://weatherapp-mine.streamlit.app/",
    featured: false,
  },   
  {
    id: 6,
    num: "06",
    title: "Expense Tracker",
    description:
      "I built a simple expense tracker web app using Streamlit that helps users manage their daily income and expenses. It allows adding and categorizing expenses, and shows useful insights like total spending, savings, and trends. I also used Pandas and Matplotlib to analyze data and create visual charts. Users can even download their expense data and customize categories.",
    stack: ["Python", "Matplotlib","Pandas", "Streamlit"],
    github: "https://github.com/Divyang20040709/expense_tracker",
    live: "https://expensetracker-dts.streamlit.app/",
    featured: false,
  },
];

// GET /api/projects
router.get("/", (req, res) => {
  const { featured } = req.query;
  const data = featured === "true" ? projects.filter((p) => p.featured) : projects;
  res.json({ projects: data });
});

// GET /api/projects/:id
router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

module.exports = router;
