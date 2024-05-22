import express from "express";
import {
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/all", getAllBlogs);
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/create", isUser, isAdmin, createBlog);
router.put("/update/:id", isUser, isAdmin, updateBlog);
router.delete("/delete/:id", isUser, isAdmin, deleteBlog);

export default router;
