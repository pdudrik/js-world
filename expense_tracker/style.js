document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".button");
    for (let i=0; i<buttons.length; i++) {
        buttons[i].classList.add("button-transition");
    }
});
