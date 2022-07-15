let menuContainer = document.querySelector(".burger");
let hamburgerNavList = document.querySelector(".hamburgerNavList");
let heightOutput = window.innerHeight;
let widthOutput = window.innerWidth;

function changeHamburger(item) {
    item.classList.toggle("change");
}

function reportWindowSize() {
    heightOutput = window.innerHeight;
    widthOutput = window.innerWidth;

    if (widthOutput >= 880) {
        //debugger
        removeChange(menuContainer);
        removeChange(hamburgerNavList);
    }
}

window.onresize = reportWindowSize;

function removeChange(element) {
    if (element.classList.contains("change")) {
        element.classList.remove("change");
        element.offsetWidth;
    }
}




menuContainer.addEventListener("click", () => {
    changeHamburger(menuContainer);
    changeHamburger(hamburgerNavList);
});