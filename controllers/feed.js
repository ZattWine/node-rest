const { validationResult } = require("express-validator");

const Post = require("../models/post");

/**
 * GET posts from server.
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "Post #1",
        content: "This is the first - #1 post!",
        imageUrl: "images/my_girl.jpg",
        creator: {
          name: "Zayar",
        },
        createdAt: new Date(),
      },
    ],
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

      throw err;
    });
};
