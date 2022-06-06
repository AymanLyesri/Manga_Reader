const MFA = require("mangadex-full-api"),
  imageToBase64 = require("image-to-base64");

function showManga(manga_title, offset, req, res) {
  MFA.login("aymanthebruhman", "avalid22").then(async () => {
    console.log("searching for " + manga_title);
    await MFA.Manga.search(
      {
        title: manga_title,
        limit: 6,
        offset: offset,
      },
      false
    )
      .then(async (list) => {
        console.log("manga list found");
        if (list.length === 0) {
          res.render("show_manga/show_manga.ejs", {
            error: "No manga found!",
            list: [],
          });
        }

        async function getCovers(things) {
          const results = [];
          for (const thing of things) {
            // Good: all asynchronous operations are immediately started.
            url = (await thing.mainCover.resolve()).image256;
            base64 = imageToBase64(url);
            results.push(base64);
          }

          // Now that all the asynchronous operations are running, here we wait until they all complete.
          return await Promise.all(results);
        }

        console.log("all ended :)");

        var url256 = await getCovers(list);

        res.render("show_manga/show_manga.ejs", {
          url: url256,
          manga_title: manga_title,
          list: list,
          offset: offset,
          error: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

exports.showManga = showManga;
