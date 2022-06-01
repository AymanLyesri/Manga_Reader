const MFA = require("mangadex-full-api");

function showChapter(manga_id, manga_chapter, req, res) {
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

      res.render("show_chapter/show_chapter.ejs", {
        panels: pages,
        manga_chapter: manga_chapter,
        next_chapter: manga_chapter + 1,
        manga: manga,
      });
    })
    .catch(console.error);
}

exports.showChapter = showChapter;
