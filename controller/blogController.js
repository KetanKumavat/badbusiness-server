import Blog from "../models/blogSchema.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find();
    blogs = blogs.map((blog) => {
      const content = blog.content.find((item) => item.type === "paragraph");
      return {
        ...blog._doc,
        content: content ? [content] : [],
      };
    });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBlog = async (req, res) => {
  const { title, banner, content } = req.body;
  if (!title || !banner || !content) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const slug = title.toLowerCase().replace(/ /g, "-");
    const newBlog = new Blog({ title, slug, banner, content });
    if (title.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Title should not exceed 30 characters",
      });
    }
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, banner, content } = req.body;
  let updatedBlog;
  try {
    if (title && title.length > 0) {
      const slug = title.toLowerCase().replace(/ /g, "-");
      updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, slug, banner, content },
        { new: true, runValidators: true }
      );
    } else {
      updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, banner, content },
        { new: true, runValidators: true }
      );
    }

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
