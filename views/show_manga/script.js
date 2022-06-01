var btn = document.querySelectorAll(".btn");
var input = document.querySelector(".form-control");
var form = document.querySelector(".search_manga_form");

btn[0].addEventListener("click", function () {
  if (input.value != "") {
    //remove a css animation from form
    form.classList.remove("search_manga_form_up");
  }
});
