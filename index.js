const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const NewsModel = require("./models/news.js");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.json({ name: "Lavanya" });
});

app.post("/api/addnews", async (req, res) => {
  try {
    const news = await NewsModel.create(req.body);
    res.status(200).json(news);
    console.log(req.body);
  } catch (error) {
    res.status(500).send("Error adding news");
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res.status(200).json(news);
    console.log(req.body);
  } catch (error) {
    res.status(500).send("Error fetching news");
  }
});

app.get("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsModel.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Error fetching news by ID");
  }
});

app.put("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Error updating news");
  }
});

app.delete("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsModel.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting news");
  }
});

mongoose
  .connect(
    "mongodb+srv://lavanya_123:lavanya@cluster0.mq3fc.mongodb.net/myDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });
