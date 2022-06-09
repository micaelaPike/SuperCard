"use strict";



const cards = ["../Assets/Images/Cards/StokvelCard.png", "../Assets/Images/Cards/SavingsCard.png", "../Assets/Images/Cards/GiftCard.png", "../Assets/Images/Cards/StaffCard.png"]

let cardCarousel = document.querySelector(".cardCarousel");
let carouselSelect = document.querySelectorAll(".carouselSelect");

export let carouselCounter = 0;

export let myInterval = setInterval((changeState), 10000);


clearInterval(myInterval);


function changeStateTimer() {
    carouselCounter++;

    if (carouselCounter >= cards.length) {
        carouselCounter = 0;
    };

    cardCarousel.src = cards[carouselCounter];
    clearInterval(myInterval);
    myInterval = setInterval((changeState), 10000);
    console.log(carouselCounter);

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

export function changeState(btnIndex) {
    clearInterval(myInterval);
    cardCarousel.src = cards[btnIndex];
    carouselCounter = btnIndex;

    console.log(carouselCounter);

    changeSelectedBtn(carouselCounter);
}

export function selectbtnAddClick() {
    carouselSelect.forEach((el, index) => {
        console.log(el.id + " " + index);
        el.addEventListener("click", function() { changeState(index) });
    });
}

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
//  <!-- <script type="module" defer src="../Scripts/Components/carousel.js"></script> -->