const MFA = require("mangadex-full-api"),
  imageToBase64 = require("image-to-base64");

function showManga(manga_title, offset, req, res) {
  MFA.login("aymanthebruhman", "avalid22").then(async () => {
    await MFA.Manga.search(
      {
        title: manga_title,
        limit: 6,
        offset: offset,
      },
      false
    )
      .then(async (list) => {
        console.log("list found");
        if (list.length == 0) {
          res.render("show_manga/show_manga.ejs", {
            error: "No manga found!",
          });
        }

        async function getCovers(things) {
          const results = [];
          for (const thing of things) {
            // Good: all asynchronous operations are immediately started.
            results.push(
              imageToBase64((await thing.mainCover.resolve()).image256)
            );
          }
          // Now that all the asynchronous operations are running, here we wait until they all complete.
          return await Promise.all(results);
        }

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
