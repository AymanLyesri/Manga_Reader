const express = require("express");
const app = express();
const path = require("path");
const MFA = require("mangadex-full-api");

//set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static("./bootstrap/css"));
app.use("/include", express.static("./views"));

//get the first page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//get the 'search_manga' page
app.get("/search_manga", (req, res) => {
  res.render("search_manga.ejs");
});

// app.post("/search_manga", (req, res) => {
//   var manga_title = req.body.manga_title;
//   var manga_chapter = req.body.manga_chapter;

//   MFA.login("aymanthebruhman", "avalid22").then(async () => {
//     const list = await MFA.Manga.search({
//       title: manga_title,
//       limit: Infinity,
//     });

//     res.render("show_manga.ejs", { list: list });

//     console.log(list.length, "results for", manga_title);
//     console.log(
//       "The first result was written by",
//       (await list[0].authors[0].resolve()).name
//     );
//   });
// });

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
        order: { createdAt: "asc" },
      });

      console.log(manga.year);

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
        manga: manga,
      });
    })
    .catch(console.error);
});

//listen to port
const port = process.env.PORT || 3000;
app.listen(port);
