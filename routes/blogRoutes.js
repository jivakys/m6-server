const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
const auth = require("../utils/auth");

// router.use(auth)
router.get("/", blogController.welcome);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", auth, blogController.oneBlog);
router.get("/blogs/search", blogController.searchBlogs);
// router.get(
//   "/blogs/filter/:category/sort/:order",
//   auth,
//   blogController.filterAndSortBlogs
// );
router.get("/blogs/", auth, blogController.filterAndSortBlogs);
router.post("/blogs", auth, blogController.createBlog);
router.put("/blogs/:id", auth, blogController.updateBlog);
router.patch("/blogs/:id/like", auth, blogController.likeBlog);
router.patch("/blogs/:id/comment", auth, blogController.commentOnBlog);
router.delete("/blogs/:id", auth, blogController.deleteBlog);

module.exports = router;
