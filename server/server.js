const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const PORT = 8080;
const MONGO_URI = "mongodb://127.0.0.1:27017/foodhub";

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(helmet());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/avif",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(
        new Error("Only JPEG, PNG, JPG, WEBP and AVIF images are allowed")
      );
    }
  },
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ Error connecting to MongoDB", err));

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

const Post = mongoose.model("Post", postSchema);

app.get("/api/approved", async (req, res) => {
  try {
    const posts = await Post.find({ status: "approved" });
    res.status(200).json(posts);
  } catch (err) {
    console.log("Failed to fetch posts", err);
    res.status(500).json({ error: "❌ Internal server error" });
  }
});

app.get("/api/pending", async (req, res) => {
  try {
    console.log("🔍 Fetching pending recipes...");
    const pendingPosts = await Post.find({ status: "pending" });
    console.log("✅ Found pending posts:", pendingPosts);
    res.status(200).json(pendingPosts);
  } catch (err) {
    console.error("Failed to fetch pending posts", err);
    res.status(500).json({ error: "❌ Internal server error" });
  }
});

app.post("/api", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    if (!title || !description || !req.file || !category || !author) {
      return res.status(400).json({ error: "Every field is required" });
    }

    const newPost = new Post({
      title,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      category,
      author,
      status: "pending",
    });

    await newPost.save();
    res.status(201).json({ message: "✅ Post added successfully", newPost });
  } catch (err) {
    res.status(400).json({ error: "❌ Failed to add post" });
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const imagePath = path.join(
      __dirname,
      "uploads",
      path.basename(deletedPost.imageUrl)
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res
      .status(200)
      .json({ message: "✅ Post deleted successfully", deletedPost });
  } catch (err) {
    res.status(400).json({ error: "❌ Failed to delete post" });
  }
});

app.patch("/api/:id/approve", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "❌ Post not found" });
    }

    res
      .status(200)
      .json({ message: "✅ Post approved successfully", updatedPost });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to update post status" });
  }
});

app.listen(PORT, () => {
  console.log(`🔄 Server is running on port ${PORT}`);
});
