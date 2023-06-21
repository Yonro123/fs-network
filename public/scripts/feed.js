const postsCards = document.querySelector(".posts__cards");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const endpoint = "http://localhost:8080/api";

let limit = 3;
let page = 1;
let posts = [];

const createPost = (elem) => {
  const node = document.createElement("div");
  node.classList.add("post__card");
  node.innerHTML = `
        <div class="card__header">
          <div class="cardHeaderImg">
            <img src="${elem.authorId.avatar}" alt="">
          </div>
          <h3>${elem.authorId.name}</h3>
        </div>
        <div class="cardImg"><img src="${elem.image}" alt="1"></div>
        <div class="cardContent">
          <span>${elem.likes}</span>
          <div class="cardText">${elem.content}</div>
        </div>
    `;
  return node;
};

const getPosts = async () => {
  const response = await fetch(`${endpoint}/posts?page=${page}&limit=${limit}`);
  const result = await response.json();
  return result;
};

const drawPosts = (postsArray) => {
  const postsNodes = postsArray.map(createPost);
  postsCards.append(...postsNodes);
};

getPosts().then((data) => {
  posts = [...posts, ...data];
  drawPosts(posts);
});

const drawPaginations = () => {
  prev.addEventListener("click", function (e) {
    e.preventDefault();
    if (page < 0) return;
    page--;
    postsCards.innerHTML = "";
    getPosts().then(() => {
      drawPosts(posts);
    });
  });
  next.addEventListener("click", function (e) {
    e.preventDefault();
    page++;
    postsCards.innerHTML = "";
    getPosts().then((data) => {
      posts = [...posts, ...data];
      drawPosts(posts);
    });
  });
};
drawPaginations();
