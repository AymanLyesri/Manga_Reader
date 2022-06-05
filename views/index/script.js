const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    e.pageX = e.pageX - window.innerWidth / 2;
    e.pageY = e.pageY - window.innerHeight / 2;
    cursor.setAttribute(
        "style",
        "top: " + e.pageY + "px; left: " + e.pageX + "px;"
    );
});