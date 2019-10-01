var button = document.getElementById("theme-switch");
var themeContainer = document.getElementById("main");
var state = 0;

button.onclick = function() {
    var imageContainer = document.getElementsByClassName("navbar-brand");

    for (var i = 0; i < imageContainer.length; i++) {
        if (themeContainer.classList.contains("style1"), state === 0) {
            themeContainer.classList.add("style2");
            themeContainer.classList.remove("style1");
            imageContainer[i].firstElementChild.classList.add("hide");
            imageContainer[i].children[1].classList.remove("hide");
            imageContainer[i].lastElementChild.classList.add("hide");
        } else if (themeContainer.classList.contains("style2"), state === 1) {
            themeContainer.classList.add("style3");
            themeContainer.classList.remove("style2");
            imageContainer[i].firstElementChild.classList.add("hide");
            imageContainer[i].children[1].classList.add("hide");
            imageContainer[i].lastElementChild.classList.remove("hide");
        } else if (state === 2) {
            themeContainer.classList.add("style1");
            themeContainer.classList.remove("style3");
            imageContainer[i].firstElementChild.classList.remove("hide");
            imageContainer[i].children[1].classList.add("hide");
            imageContainer[i].lastElementChild.classList.add("hide");
        }
    }

    if (state < 2) {
        state++;
    } else {
        state = 0;
    }
};

// firstElementChild.nextElementSibling.classList
// childNodes[1].classList

// how does the function get from state 0 to 1 to 2?
// how does it know when it's at a certain state?