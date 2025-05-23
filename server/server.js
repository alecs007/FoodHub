require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://foodhub-production-production.up.railway.app",
    "https://foodhub7.netlify.app",
  ],
  credentials: true,
};
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(helmet());
app.use(morgan("dev"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodhub-images",
    allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
  },
});

const upload = multer({ storage });

const deleteFromCloudinary = async (imageUrl) => {
  const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
};

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

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res
      .status(401)
      .json({ error: "❌ Unauthorized: Admin token not found" });
  }

  jwt.verify(token, ADMIN_PASSWORD, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "❌ Unauthorized: Invalid token" });
    }
    req.admin = decoded;
    next();
  });
};

app.get("/api/admin-check", verifyAdmin, (req, res) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ isAdmin: false, message: "No token" });
  }

  try {
    const verified = jwt.verify(token, ADMIN_PASSWORD);
    res.status(200).json({ isAdmin: true });
  } catch (err) {
    res.status(401).json({ isAdmin: false, message: "Invalid token" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "❌ Unauthorized: Invalid password" });
  }
  const token = jwt.sign({ role: "admin" }, ADMIN_PASSWORD, {
    expiresIn: "1h",
  });

  res.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "✅ Admin logged in successfully" });
});

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "✅ Admin logged out successfully" });
});

app.get("/api/approved", async (req, res) => {
  try {
    const posts = await Post.find({ status: "approved" });
    res.status(200).json(posts);
  } catch (err) {
    console.log("Failed to fetch posts", err);
    res.status(500).json({ error: "❌ Internal server error" });
  }
});

app.get("/api/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, status: "approved" });

    if (!post) {
      return res.status(404).json({ error: "❌ Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log("Failed to fetch post", err);
    res.status(500).json({ error: "❌ Internal server error" });
  }
});

app.get("/api/pending", verifyAdmin, async (req, res) => {
  try {
    const pendingPosts = await Post.find({ status: "pending" });
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
      imageUrl: req.file.path,
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

app.delete("/api/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    await deleteFromCloudinary(deletedPost.imageUrl);

    res
      .status(200)
      .json({ message: "✅ Post deleted successfully", deletedPost });
  } catch (err) {
    res.status(400).json({ error: "❌ Failed to delete post" });
  }
});

app.put("/api/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, author } = req.body;

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ error: "❌ Post not found" });
    }

    let updatedData = {
      title: title || existingPost.title,
      description: description || existingPost.description,
      category: category || existingPost.category,
      author: author || existingPost.author,
      imageUrl: existingPost.imageUrl,
    };

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (category) updatedData.category = category;
    if (author) updatedData.author = author;

    if (req.file) {
      if (existingPost.imageUrl) {
        await deleteFromCloudinary(existingPost.imageUrl);
      }
      updatedData.imageUrl = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "✅ Post updated successfully", updatedPost });
  } catch (err) {
    res.status(400).json({ error: "❌ Failed to update post" });
  }
});

app.patch("/api/:id/approve", verifyAdmin, async (req, res) => {
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
