"use strict";

import { myInterval } from "./timer";

const cards = ["../Assets/Images/Cards/StokvelCard.png", "../Assets/Images/Cards/SavingsCard.png", "../Assets/Images/Cards/GiftCard.png", "../Assets/Images/Cards/StaffCard.png"]

export let cardCarousel = document.querySelector(".cardCarousel");
export let carouselSelect = document.querySelectorAll(".carouselSelect");

export let carouselCounter = 0;

export function changeStateTimer() {
    cardCarousel.classList.add("animation");

    carouselCounter++;

    if (carouselCounter >= cards.length) {
        carouselCounter = 0;
    };

    cardCarousel.src = cards[carouselCounter];

    changeSelectedBtn(carouselCounter);
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

    cardCarousel.classList.remove("animation");
    cardCarousel.offsetWidth;
    cardCarousel.classList.add("animation");
    cardCarousel.src = cards[btnIndex];
    console.log(btnIndex);
    changeSelectedBtn(btnIndex);

    clearInterval(myInterval);
    myInterval;
}

function selectbtnAddClick() {
    carouselSelect.forEach(function(item, index) {
        item.addEventListener("click", function() { changeState(index) });
    })

}

document.addEventListener("DOMContentLoaded", function() {
    selectbtnAddClick();
    console.log(window.location.pathname);

    if (window.location.pathname !== "/Pages/index.html") {
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