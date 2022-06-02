const fs = require("fs"),
  request = require("request"),
  MFA = require("mangadex-full-api"),
  imageToBase64 = require("image-to-base64");

function showManga(manga_title, offset, req, res) {
  MFA.login("aymanthebruhman", "avalid22").then(async () => {
    await MFA.Manga.search({
      title: manga_title,
      limit: 4,
      offset: offset,
    })
      .then(async (list) => {
        console.log("list found");
        if (list.length == 0) {
          res.render("show_manga/show_manga.ejs", {
            error: "No manga found!",
          });
        }

        async function foo(things) {
          const results = [];
          for (const thing of things) {
            // Good: all asynchronous operations are immediately started.
            thing.mainCover = (await thing.mainCover.resolve()).image256;
            results.push(imageToBase64(thing.mainCover));
          }
          // Now that all the asynchronous operations are running, here we wait until they all complete.
          return await Promise.all(results);
        }

        var url256 = await foo(list);

        res.render("show_manga/show_manga.ejs", {
          url: url256,
          manga_title: manga_title,
          list: list,
          offset: offset,
          error: "",
        });
        exports.list = list;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

exports.showManga = showManga;
