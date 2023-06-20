import { Router } from "express";

import Posts from "../models/post.js";

const router = Router();

router.get("/", async (req, res) => {
  const post = await Posts.find().populate("authorId");

  res.status(200).json(post);
});

router.post("/", async (req, res) => {
  try {
    const { authorId, image, content } = req.body || {};

    const newPost = new Posts({ authorId, image, content });

    await newPost.save();

    res.status(200).json({ result: "Post has been added!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/like/:postId", async (req, res) => {
  const { postId } = req.params || {};
  const { userId } = req.body || {};

  const thisPost = await Posts.findOne({ _id: postId });

  if (thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "This post is already liked by this user" });
    return;
  }

  thisPost.likedByUsers.push(userId);

  await thisPost.save();

  res.status(200).json({ result: "Post has been liked" });
});
router.put("/unlike/:postId", async (req, res) => {
  const { postId } = req.params || {};
  const { userId } = req.body || {};

  const thisPost = await Posts.findOne({ _id: postId });

  if (!thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "This post is already liked by this user" });
    return;
  }

  thisPost.likedByUsers = thisPost.likedByUsers.filter((id) => id !== userId);

  await thisPost.save();

  res.status(200).json({ result: "Post delate been liked" });
});

export default router;
