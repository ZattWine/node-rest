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
  // create post in db

  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully.",
    posts: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Zayar",
      },
      createdAt: new Date(),
    },
  });
};
