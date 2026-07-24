const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");
const createAdmin = require("./utils/createAdmin");
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
dotenv.config();

const app = express();
console.log("authRoutes:", authRoutes);
console.log("contentRoutes:", contentRoutes);
console.log("uploadRoutes:", uploadRoutes);
console.log("dashboardRoutes:", dashboardRoutes);
console.log("mediaRoutes:", mediaRoutes);
console.log("userRoutes:", userRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

connectDB().then(async () => {
  await createAdmin();
});

app.get("/", (req, res) => {
  res.json({
    message: "RenewCred CMS Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});