const MFA = require("mangadex-full-api"),
    imageToBase64 = require("image-to-base64");

function searchChapter(manga_id, language, req, res) {
    MFA.login("aymanthebruhman", "avalid22")
        .then(async() => {
            console.log(manga_id);
            MFA.Manga.getFeed(
                manga_id, {
                    limit: 1000,
                    translatedLanguage: [language],
                },
                false
            ).then(async(chapters) => {
                MFA.Manga.getCovers(manga_id).then(async(cover) => {
                    async function getCovers(things) {
                        const results = [];
                        var x = 0;
                        for (const thing of things) {
                            url = thing.image512;
                            results.push(imageToBase64(url));
                            x++;
                            if (x > 5) {
                                break;
                            }
                        }
                        return await Promise.all(results);
                    }

                    var covers = await getCovers(cover);

                    res.render("search_chapter/search_chapter.ejs", {
                        chapters: chapters.length,
                        cover: covers,
                        manga_id: manga_id,
                        language: language,
                    });
                });
            });
        })
        .catch(console.error);
}

exports.searchChapter = searchChapter;