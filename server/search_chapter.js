const MFA = require("mangadex-full-api");

function searchChapter(manga_id, cover_id, req, res) {
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
      res.render("search_chapter/search_chapter.ejs", {
        chapters: chapters.length,
        manga: manga,
        cover: cover_id,
      });
    })
    .catch(console.error);
}

exports.searchChapter = searchChapter;
