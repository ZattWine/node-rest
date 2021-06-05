const { validationResult } = require("express-validator");

const Post = require("../models/post");

/**
 * GET posts from server.
 */
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully.", posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

/**
 * POST a post to server.
 */
exports.createPost = (req, res, next) => {
  // req validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/my_girl.jpg",
    creator: {
      name: "Zayar",
    },
  });

  post
    .save()
    .then((result) => {
      console.log(result);

      res.status(201).json({
        message: "Post created successfully.",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

/**
 * Get a single post.
 */
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find a post.");
        error.statusCode = 404;
        throw err;
      }

      res.status(200).json({ message: "Post fetch.", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
