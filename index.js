const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const { connection } = require("./configs/db");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://eager-sunbonnet-bass.cyclic.cloud",
    changeOrigin: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", blogRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Home API Route" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.PORT}`);
});
