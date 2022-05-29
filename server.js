const express = require("express");
const app = express();
const mangoose = require("mongoose");
const Blog = require("./models/blog.js");
const path = require("path");
const MFA = require("mangadex-full-api");

//connect to database
dbURL =
  "mongodb+srv://ayman:avalid22@manga.3tmoe.mongodb.net/manga?retryWrites=true&w=majority";
mangoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

//set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static("./bootstrap/css"));

//get the first page
app.get("/", (req, res) => {
  res.render("v1.ejs", { name: "bitch" });
});

//get the 'search_manga' page
app.get("/search_manga", (req, res) => {
  res.render("search_manga.ejs");
});

app.post("/show_chapter", (req, res) => {
  var manga_title = req.body.manga_title;
  var manga_chapter = req.body.manga_chapter;
  var next_chapter = parseInt(manga_chapter) + 1;

  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log("logged in");
      // Get a manga:
      let manga = await MFA.Manga.getByQuery({
        title: manga_title,
      });

      // Get the manga's chapters:
      let chapters = await manga.getFeed(
        {
          limit: 1000,
          translatedLanguage: ["en"],
          order: { chapter: "asc" },
        },
        true
      );

      // Get the first chapter's pages:

      let pages = await chapters[manga_chapter].getReadablePages();

      res.render("show_chapter.ejs", {
        panels: pages,
        manga_title: manga_title,
        manga_chapter: manga_chapter,
        next_chapter: next_chapter,
      });
    })
    .catch(console.error);
});

//listen to port 3000
app.listen(3000);
