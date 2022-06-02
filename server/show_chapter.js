const MFA = require("mangadex-full-api");

function showChapter(manga_id, manga_chapter, req, res) {
  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log("logged in");
      // Get a manga:

      await MFA.Manga.get(manga_id, true).then(async (manga) => {
        console.log(manga.year);
        await manga
          .getFeed(
            {
              limit: 1000,
              translatedLanguage: ["en"],
              order: { chapter: "asc" },
            },
            true
          )
          .then(async (chapters) => {
            await chapters[manga_chapter].getReadablePages().then((pages) => {
              res.render("show_chapter/show_chapter.ejs", {
                panels: pages,
                chapters: chapters.length,
                manga_chapter: manga_chapter,
                next_chapter: manga_chapter + 1,
                manga: manga,
              });
            });
          });
      });
    })
    .catch(console.error);
}

exports.showChapter = showChapter;
