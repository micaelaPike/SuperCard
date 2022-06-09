"use strict";
import { carouselCounter } from "../Components/carousel.js";



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

export function changeState(btnIndex) {
    cardCarousel.src = cards[btnIndex];
    carouselCounter = btnIndex;
    clearInterval(myinterval);
    carouselTimer();

    console.log(carouselCounter);

    changeSelectedBtn(carouselCounter);
}

export function selectbtnAddClick() {
    carouselSelect.forEach((el, index) => {
        console.log(el.id + " " + index);
        el.addEventListener("click", function() { changeState(index); });
    });
}