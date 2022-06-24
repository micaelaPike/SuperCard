"use strict";

import { myInterval } from "./timer.js";

export const cards = ["../Assets/Images/Cards/StokvelCard.png", "../Assets/Images/Cards/SavingsCard.png", "../Assets/Images/Cards/GiftCard.png", "../Assets/Images/Cards/StaffCard.png"]

export let cardCarousel = document.querySelector(".cardCarousel");
export let carouselSelect = document.querySelectorAll(".carouselSelect");

export let carouselCounter = 0;

export function setCounter() {
    carouselCounter++;
    if (carouselCounter === cards.length) {
        carouselCounter = 0;
        return;
    }
}

export function incCounter() {
    carouselCounter++;

}

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

    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        clearInterval(intervalId);
    }
    cardCarousel.classList.remove("animation");
    cardCarousel.offsetWidth;
    cardCarousel.classList.add("animation");

    if ((carouselCounter < 0) || (carouselCounter >= cards.length)) {
        carouselCounter = 0;
    };

    cardCarousel.src = cards[btnIndex];
    carouselCounter = btnIndex - 1;
    // console.log(btnIndex);
    changeSelectedBtn(btnIndex);
    if (window.location.pathname === "/index.html") {
        intervalId = myInterval();
    }
}

function selectbtnAddClick() {
    carouselSelect.forEach(function(item, index) {
        item.addEventListener("click", function() { changeState(index) });
    })

}

document.addEventListener("DOMContentLoaded", function() {
    selectbtnAddClick();
    cardCarousel.classList.add("animation");


    if (window.location.pathname !== "/index.html" || window.location.pathname !== "/") {
        clearInterval(myInterval);
        cardCarousel.classList.remove("animation");
    }
});