const fs = require("fs"),
  request = require("request"),
  MFA = require("mangadex-full-api");

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

        var download = function (uri, filename, callback) {
          request.head(uri, function () {
            request(uri).pipe(
              fs.createWriteStream(filename).on("close", callback)
            );
          });
        };

        fs.readdir("./img/", (error, filesInDirectory) => {
          if (error) throw error;

          for (let file of filesInDirectory) {
            console.log("File removed" + " : " + file);
            fs.unlinkSync("./img/" + file);
          }
        });

        for (var i = 0; i < list.length; i++) {
          list[i].mainCover = (await list[i].mainCover.resolve()).image256;
        }
        res.render("show_manga/show_manga.ejs", {
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
