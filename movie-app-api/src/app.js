const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const savedRoutes = require("./routes/saved.routes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "movie-app-api" });
});

app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(savedRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ message: "Selected image is too large. Please choose a smaller image." });
  }
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
