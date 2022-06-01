const fs = require("fs"),
  request = require("request"),
  MFA = require("mangadex-full-api");

function showManga(manga_title, offset, req, res) {
  MFA.login("aymanthebruhman", "avalid22").then(async () => {
    const list = await MFA.Manga.search({
      title: manga_title,
      limit: 4,
      offset: offset,
    }).catch((err) => {
      console.log(err);
    });

    if (list.length == 0) {
      res.render("search_manga/search_manga.ejs", {
        error: "No manga found!",
      });
    }

    var download = function (uri, filename, callback) {
      request.head(uri, function () {
        request(uri).pipe(fs.createWriteStream(filename).on("close", callback)); //needs a function
      });
    };

    let DIR = "./img/";

    fs.readdir(DIR, (error, filesInDirectory) => {
      if (error) throw error;

      for (let file of filesInDirectory) {
        console.log("File removed" + " : " + file);
        fs.unlinkSync(DIR + file);
      }
    });

    for (var i = 0; i < list.length; i++) {
      download(
        (await list[i].mainCover.resolve()).image256,
        "./img/img" + i + ".png",
        function () {
          console.log("done" + i);
        }
      );
      if (i == list.length - 1) {
        download(
          (await list[i].mainCover.resolve()).image256,
          "./img/img" + i + ".png",
          function () {
            res.render("show_manga/show_manga.ejs", {
              manga_title: manga_title,
              list: list,
              offset: offset,
              error: "",
            });
            console.log(" last done" + i);
          }
        );
      }
    }

    console.log("done and done");
  });
}

exports.showManga = showManga;
