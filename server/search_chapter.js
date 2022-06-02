const MFA = require("mangadex-full-api");

function searchChapter(manga_id, cover_bin, req, res) {
  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log(manga_id);

      await MFA.Manga.get(manga_id, true).then(async (manga) => {
        console.log("manga found");
        manga
          .getFeed(
            {
              limit: 1000,
              translatedLanguage: ["en"],
            },
            false
          )
          .then(async (chapters) => {
            console.log(chapters);
            res.render("search_chapter/search_chapter.ejs", {
              chapters: chapters.length,
              manga: manga,
              cover: cover_bin,
            });
          });
      });
    })
    .catch(console.error);
}

exports.searchChapter = searchChapter;
