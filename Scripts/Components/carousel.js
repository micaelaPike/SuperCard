"use strict";

import { myInterval } from "./timer.js";

export const cards = ["../Assets/Images/Cards/StokvelCard.png", "../Assets/Images/Cards/SavingsCard.png", "../Assets/Images/Cards/GiftCard.png", "../Assets/Images/Cards/StaffCard.png"]

export let cardCarousel = document.querySelector(".cardCarousel");
export let carouselSelect = document.querySelectorAll(".carouselSelect");

export let carouselCounter = 0;

let intervalId = 0;

if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
    intervalId = myInterval();

}

export function changeStateTimer() {
    cardCarousel.classList.add("animation");

    carouselCounter++;

    if (carouselCounter >= cards.length) {
        carouselCounter = 0;
    };

    cardCarousel.src = cards[carouselCounter];

    changeSelectedBtn(carouselCounter);
    console.log(carouselCounter);
}

export function changeSelectedBtn(selectedBtnIndex) {

    if (carouselSelect[0].classList.contains("selected")) {
        carouselSelect[0].classList.remove("selected");
    } else
        for (let i = 0; i < (carouselSelect.length); i++) {
            if (carouselSelect[i].classList.contains("selected")) {
                carouselSelect[i].classList.remove("selected");
            }
        }
    carouselSelect[selectedBtnIndex].classList.add("selected");
}

function changeState(btnIndex) {

    debugger;
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        clearInterval(intervalId);
    }
    cardCarousel.classList.remove("animation");
    cardCarousel.offsetWidth;
    cardCarousel.classList.add("animation");
    cardCarousel.src = cards[btnIndex];
    carouselCounter = btnIndex - 1;
    console.log(btnIndex);
    changeSelectedBtn(btnIndex);
    if (window.location.pathname === "/index.html") {
        intervalId = myInterval();
    }
    //myInterval = setInterval((changeStateTimer), 5000);
}

function selectbtnAddClick() {
    carouselSelect.forEach(function(item, index) {
        item.addEventListener("click", function() { changeState(index) });
    })

}

document.addEventListener("DOMContentLoaded", function() {
    selectbtnAddClick();
    cardCarousel.classList.add("animation");

    console.log(window.location.pathname);

    if (window.location.pathname !== "/index.html" || window.location.pathname !== "/") {
        clearInterval(myInterval);
        cardCarousel.classList.remove("animation");
    }
});



// function getOffset(el) {
//     let rect = el.getBoundingClientRect();

//     return {
//         left: rect.left + window.scrollX,
//         top: rect.top + window.scrollY
//     };
// }

// newFunction();

// function newFunction() {
//     console.log(getOffset(cardCarousel).left + " " + getOffset(cardCarousel).top);
// }