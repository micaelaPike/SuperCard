"use strict";

import { carouselCounter } from "../Components/carousel.js";
import { myInterval } from "../Components/timer.js";
import { cardCarousel } from "../Components/carousel.js";
import { carouselSelect } from "../Components/carousel.js";
import { changeSelectedBtn } from "../Components/carousel.js";


const cardDesciptionArr = ["The functionality of this card ensures that the funds are secured for a long period of time. Perfect for the end of the year when most celebrations occur.<br>The card is electronically blocked and pin protected, which assures the customers that the funds they have accumulated over the months are available at the end of the year. <br><br></br> Super<mark class='textRed'>Card</mark> opens the profile on the 15th of November and closes the profile on the 15th of February.",
    "This is the most popular card, perfectly replacing traditional stamps. This card is tailor made to suit the day-to-day shopper. No transactional costs involved means that the shopper can use the card multiple times a day, week or month with peace of mind that their funds are secure.",
    "The Gift Card can only be loaded with cash. <br>These cards are pre-registered and these cards are not pin protected.<br><br> It is important for the customer to remember that the admin fee will only be deducted if the card has not been used for 6 months.",
    "This card offers a retailer the opportunity to upload funds for their staff members and ensure that funds are spent in the store. <br/><br/> <span>Super<mark class='textRed'>Card</mark> will make these cards available upon the individual store’s request and will set up the rules of the card as per the store’s instruction.</span>"
];

const cardHeadingArr = ["Stokvel <mark class='cardHeadingRed'>Card</mark>", "Savings <mark class='cardHeadingRed'>Card</mark>", "Gift <mark class='cardHeadingRed'>Card</mark>", "Staff <mark class='cardHeadingRed'>Card</mark>"];

let cardHeading = document.querySelector(".cardHeading");
let cardDescription = document.querySelector(".cardDescription");
let carouselNext = document.querySelector(".carouselNext");

carouselNext.addEventListener("click", changeContent(carouselCounter));

function changeContent(cardIndex) {
    cardCarousel.classList.remove("animation");
    cardCarousel.src = cards[cardIndex];
    changeSelectedBtn(cardIndex);

    cardDescription.innerHTML = cardDesciptionArr[cardIndex];
    cardHeading.innerHTML = cardHeadingArr[cardIndex];

    clearInterval(myInterval);
}

function selectbtnAddClickCards() {
    cardCarousel.classList.remove("animation");
    carouselSelect.forEach(
        function(item, index) {
            console.log(item.id + " " + index);
            item.addEventListener("click", function() { changeContent(index) });
        });
}
document.addEventListener("DOMContentLoaded", function() {
    selectbtnAddClickCards();
});