const getButton = document.getElementById("btn-get");
const createButton = document.getElementById("btn-post");

getButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/posts")
    .then((res) => res.json())
    .then((resData) => console.log(resData))
    .catch((err) => console.log(err));
});

createButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/post", {
    method: "POST",
    body: JSON.stringify({
      title: "Post #1",
      content: "This is a post #1",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((resData) => console.log(resData))
    .catch((err) => console.log(err));
});
