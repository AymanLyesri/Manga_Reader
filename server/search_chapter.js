const MFA = require("mangadex-full-api");

function searchChapter(manga_id, cover_id, req, res) {
  MFA.login("aymanthebruhman", "avalid22")
    .then(async () => {
      console.log(manga_id);

      await MFA.Manga.get(manga_id, true).then(async (manga) => {
        console.log("manga found");
        chapters = manga.getFeed(
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
        exports.manga = manga;
      });
    })
    .catch(console.error);
}

exports.searchChapter = searchChapter;
