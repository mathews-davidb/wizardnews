const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");

// app.get("/", (req, res) => res.send("Hello World!"));

app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = postBank.list();

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    res.status(404);
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>
    `);
  } else {
    res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <h2>
            <span class="news-position"></span>${post.title}
            <small>(by ${post.name})</small><br>
          </h2>
          <p class="post-content">
            ${post.content}
          </p>
        </div>
    </div>
  </body>
</html>`);
  }
});

app.get("/users/:name", (req, res) => {
  console.log(req.params.name);
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

//comment
