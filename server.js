const express = require("express");
const app = express();
const path = require("path");
const MFA = require("mangadex-full-api");
var fs = require("fs"),
  request = require("request");

//set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./"));

//get the first page////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//get the 'search_manga' page///////////////////////////////////////////////////////////////////////////////////////////////
app.get("/search_manga", (req, res) => {
  res.render("search_manga.ejs");
});
////////////////////////////////////////////////////////////////////////////////////////////
app.post("/search_manga", (req, res) => {
  var manga_title = req.body.manga_title;

  MFA.login("aymanthebruhman", "avalid22").then(async () => {
    const list = await MFA.Manga.search({
      title: manga_title,
      limit: Infinity,
    });

    var download = function (uri, filename, callback) {
      request.head(uri, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
      });
    };

    for (var i = 0; i < list.length; i++) {
      // list[i].mainCover = (await list[i].mainCover.resolve()).image256;
      download(
        (await list[i].mainCover.resolve()).image256,
        "./img/" + i + ".png",
        function () {
          console.log("done" + i);
        }
      );
    }

    res.render("show_manga.ejs", {
      list: list,
    });

    console.log(list.length, "results for", manga_title);
    console.log(
      "The first result was written by",
      (await list[0].authors[0].resolve()).name
    );
  });
});
////////////////////////////////////////////////////////////////////////////////////////////
app.post("/search_chapter", (req, res) => {
  var manga_id = req.body.manga_id;
  var cover_id = req.body.cover_id - 1;

  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log(manga_id);
      // Get a manga:

      let manga = await MFA.Manga.get(manga_id, true);

      // Get the manga's chapters:
      let chapters = await manga.getFeed(
        {
          limit: 1000,
          translatedLanguage: ["en"],
        },
        true
      );
      res.render("search_chapter.ejs", {
        chapters: chapters.length,
        manga: manga,
        cover: cover_id,
      });

      // Get the first chapter's pages:
    })
    .catch(console.error);
});
////////////////////////////////////////////////////////////////////////////////////////////
app.post("/show_chapter", (req, res) => {
  var manga_id = req.body.manga_id;
  var manga_chapter = parseInt(req.body.manga_chapter) - 1;
  var next_chapter = parseInt(manga_chapter) + 1;

  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log("logged in");
      // Get a manga:

      let manga = await MFA.Manga.get(manga_id);

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
        manga_title: manga.title,
        manga_chapter: manga_chapter,
        next_chapter: next_chapter,
        manga: manga,
      });
    })
    .catch(console.error);
});

//listen to port////////////////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port);
