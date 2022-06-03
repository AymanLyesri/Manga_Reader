var btn = document.getElementsByClassName("btn");
var input = document.querySelector(".form-control");
var form = document.querySelector(".search_manga");

btn[0].addEventListener("click", function () {
  if (input.value != "") {
    //add a css animation from form
    form.classList.add("search_manga_quit");
  }
});
