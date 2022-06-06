const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    e.pageX = e.pageX - window.innerWidth / 2;
    e.pageY = e.pageY - window.innerHeight / 2;
    cursor.setAttribute(
        "style",
        "top: " + e.pageY + "px; left: " + e.pageX + "px;"
    );
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs((slideIndex += n));
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}