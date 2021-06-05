const getButton = document.getElementById("btn-get");
const createButton = document.getElementById("btn-post");

getButton.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/posts")
    .then((res) => res.json())
    .then((resData) => console.log(resData))
    .catch((err) => console.log(err));
});
