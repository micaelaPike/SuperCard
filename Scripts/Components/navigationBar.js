let menuContainer = document.querySelector(".burger");
let hamburgerNavList = document.querySelector(".hamburgerNavList");

function changeHamburger(item) {
    console.log(item.classList);
    item.classList.toggle("change");
}

// function removeChange(element) {
//     if (element.classList.contains("change")) {
//         element.classList.remove("change");
//         element.offsetWidth;
//     }

//     // element.classList.toggle("change");

// }

// let mediaQuery = window.matchMedia("(min-width: 880px)");
// // removeChange(menuContainer); // Call listener function at run time
// // removeChange(hamburgerNavList); // Call listener function at run time
// menuContainer.addEventListener("resize", mediaQuery); // Attach listener function on state changes
// hamburgerNavList.addListener("resize", mediaQuery); // Attach listener function on state changes

// if (mediaQuery.matches) {
//     removeChange(menuContainer);
//     removeChange(hamburgerNavList);
// }

menuContainer.addEventListener("click", () => {
    changeHamburger(menuContainer);
    changeHamburger(hamburgerNavList);
});



// if (window.matchMedia("(max-width: 880px)").matches) {
//     if (hamburgerNavList.classList.contains("change")) {
//         hamburgerNavList.classList.remove("change");
//         hamburgerNavList.offsetWidth;

//     }
// }