let menuContainer = document.querySelector(".burger");


function changeHamburger(item) {
    console.log(item.classList);
    item.classList.toggle("change");
}

menuContainer.addEventListener("click", () => {
    changeHamburger(menuContainer);
});