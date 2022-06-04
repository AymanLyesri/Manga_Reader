const MFA = require("mangadex-full-api");

function searchChapter(manga_id, language, cover_bin, req, res) {
  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log(manga_id);
      MFA.Manga.getFeed(
        manga_id,
        {
          limit: 1000,
          translatedLanguage: [language],
        },
        false
      ).then(async (chapters) => {
        console.log(chapters);
        res.render("search_chapter/search_chapter.ejs", {
          chapters: chapters.length,
          manga_id: manga_id,
          language: language,
          cover: cover_bin,
        });
      });
    })
    .catch(console.error);
}

exports.searchChapter = searchChapter;
