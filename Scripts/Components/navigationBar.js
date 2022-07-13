let menuContainer = document.querySelector(".burger");
let hamburgerNavList = document.querySelector(".hamburgerNavList");

function changeHamburger(item) {
    console.log(item.classList);
    item.classList.toggle("change");
}

menuContainer.addEventListener("click", () => {
    changeHamburger(menuContainer);
    changeHamburger(hamburgerNavList);
});