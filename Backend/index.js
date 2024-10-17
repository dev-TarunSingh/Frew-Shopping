require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

  app.use(cors());


app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});