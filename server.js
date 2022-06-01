const express = require("express"),
  show_manga = require("./server/show_manga"),
  search_chapter = require("./server/search_chapter"),
  show_chapter = require("./server/show_chapter"),
  port = process.env.PORT || 3000,
  app = express();

//set view engine and default directory
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./"));

//get the index page////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("index/index.ejs");
});

//get the 'search_manga' page///////////////////////////////////////////////////////////////////////////////////////////////
app.get("/search_manga", (req, res) => {
  res.render("search_manga/search_manga.ejs");
});

//post the 'show_manga'///////////////////////////////////////////////////////////////////////
app.post("/show_manga", (req, res) => {
  var manga_title = req.body.manga_title,
    offset = parseInt(req.body.offset);
  show_manga.showManga(manga_title, offset, req, res);
});

////////////////////////////////////////////////////////////////////////////////////////////
app.post("/search_chapter", (req, res) => {
  var manga_id = req.body.manga_id,
    cover_id = req.body.cover_id;
  search_chapter.searchChapter(manga_id, cover_id, req, res);
});

////////////////////////////////////////////////////////////////////////////////////////////
app.post("/show_chapter", (req, res) => {
  var manga_id = req.body.manga_id,
    manga_chapter = parseInt(req.body.manga_chapter);
  show_chapter.showChapter(manga_id, manga_chapter, req, res);
});

//listen to port////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port);
