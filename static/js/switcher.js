var button = document.getElementById("theme-switch");
var themeContainer = document.getElementById("main");
button.onclick = function() {
    if (themeContainer.classList.contains("style1")) {
        themeContainer.classList.add("style2");
        themeContainer.classList.remove("style1");
    } else if (themeContainer.classList.contains("style2")) {
        themeContainer.classList.add("style3");
        themeContainer.classList.remove("style2");
    } else {
        themeContainer.classList.add("style1");
        themeContainer.classList.remove("style3");
    }
};