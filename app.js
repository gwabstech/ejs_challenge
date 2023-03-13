const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent =
  "Gwabstech Solutions extends a warm welcome back to you. .";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Define an array of articles
const articlesList = [
  {
    id: 1,
    title: "Article 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/golden-odd.appspot.com/o/logo.png?alt=media&token=a3a33f2d-2f05-4ab5-8fe1-09e25699caaa",
  },
  {
    id: 2,
    title: "Article 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/golden-odd.appspot.com/o/logo.png?alt=media&token=a3a33f2d-2f05-4ab5-8fe1-09e25699caaa",
  },
  {
    id: 3,
    title: "Article 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/golden-odd.appspot.com/o/logo.png?alt=media&token=a3a33f2d-2f05-4ab5-8fe1-09e25699caaa",
  },
];

function addArticle(article) {
  articlesList.push(article);
}
let id = articlesList.length;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// adding rourte params
app.get("/home", (req, res) => {
  res.render("home", {
    articlesList: articlesList,
    homeStartingContent: homeStartingContent,
  });
  console.log(req.params.id);
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent,
  });
});

app.get("/add_past_page", (req, res) => {
  res.render("compose");
});

app.post("/add_past_page", (req, res) => {
  const post = {
    id: (id = id + 1),
    title: req.body.title,
    content: req.body.content,
    image:
      "https://firebasestorage.googleapis.com/v0/b/golden-odd.appspot.com/o/logo.png?alt=media&token=a3a33f2d-2f05-4ab5-8fe1-09e25699caaa",
  };
  addArticle(post);
  res.redirect("home");
});

// Route to render the detailed view of an article
app.get("/article/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const article = articlesList.find((article) => article.id === requestedId);
  res.render("article", {
    title: article.title,
    content: article.content,
    image: article.image,
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
