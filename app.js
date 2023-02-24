//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent =
  "Unlock the power of winning with Golden Odds - your ultimate soccer prediction app";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const articlesList = [];
function addArticle(article) {
  articlesList.push(article);
}
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.render("home", {
    articlesList: articlesList,
    homeStartingContent: homeStartingContent,
  });
  console.log(articlesList);
});

app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  const article = articlesList.find((article) => article.id === parseInt(id));
  res.render("article", { article });
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
  id = articlesList.length + 1;
  const post = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    image:
      "https://firebasestorage.googleapis.com/v0/b/golden-odd.appspot.com/o/logo.png?alt=media&token=a3a33f2d-2f05-4ab5-8fe1-09e25699caaa",
  };
  addArticle(post);
  res.redirect("/home");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
