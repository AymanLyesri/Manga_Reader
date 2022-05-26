input = document.getElementById("1");
ok = document.getElementById("ok");

ok.addEventListener("click", function () {
  p = document.createElement("p");
  p.innerHTML = input.value;
  document.body.appendChild(p);
});
