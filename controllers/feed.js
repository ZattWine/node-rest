/**
 * GET posts from server.
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First Post",
        content: "This is the first post!",
      },
    ],
  });
};

/**
 * POST a post to server.
 */
exports.postPost = (req, res, next) => {
  // create post in db

  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully.",
    posts: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};
