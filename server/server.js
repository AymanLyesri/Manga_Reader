const express = require("express"),
    show_manga = require("./show_manga"),
    search_chapter = require("./search_chapter"),
    show_chapter = require("./show_chapter"),
    compression = require("compression"),
    port = process.env.PORT || 3000,
    app = express();

//set view engine and default '/' and compression method///////////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./"));
app.use(
    compression({
        level: 6,
    })
);

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
    show_manga.showManga(
        req.body.manga_title,
        parseInt(req.body.offset),
        req,
        res
    );
});

////////////////////////////////////////////////////////////////////////////////////////////
app.post("/search_chapter", (req, res) => {
    search_chapter.searchChapter(
        req.body.manga_id,
        req.body.language,
        req.body.cover_bin,
        req,
        res
    );
});

////////////////////////////////////////////////////////////////////////////////////////////
app.post("/show_chapter", (req, res) => {
    show_chapter.showChapter(
        req.body.manga_id,
        req.body.language,
        parseInt(req.body.manga_chapter),
        req,
        res
    );
});

//listen to port////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port);