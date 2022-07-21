"use strict";

import { myInterval } from "../Components/timer.js";
import { carouselCounter, cardCarousel, carouselSelect, changeSelectedBtn, cards, setCounter } from "../Components/carousel.js";

const cardDesciptionArr = ["This is our most popular card, perfectly replacing traditional stamps. This card is tailor made to suit the day-to-day shopper.<br><br> No transactional costs involved means that the shopper can use the card multiple times a day, week or month with peace of mind that their funds are secure.",
    "The functionality of this card ensures that the funds are secured for a long period of time. Perfect for the end of the year when most celebrations occur.<br><br>The card is electronically blocked and pin protected, which assures the customers that the funds they have accumulated over the months are available at the end of the year. <br><br></br> <a>Super<mark>Card</mark> opens the profile on the 15th of November and closes the profile on the 15th of February.</a>",
    "The Gift Card can only be loaded with cash. <br>These cards are pre-registered and these cards are not pin protected.<br><br> It is important for the customer to remember that the admin fee will only be deducted if the card has not been used for 6 months.",
    "This card offers a retailer the opportunity to upload funds for their staff members and ensure that funds are spent in the store. <br/><br/><a> Super<mark>Card</mark> will make these cards available upon the individual store’s request and will set up the rules of the card as per the store’s instruction.</a>"
];

const cardHeadingArr = ["Savings", "Stokvel", "Gift", "Staff"];

let cardHeadingType = document.querySelector(".type");
let cardDescription = document.querySelector(".cardDescription");
let carouselNext = document.querySelector('.carouselNext');


function cardData(index) {
    cardHeadingType.innerHTML = cardHeadingArr[index] + "&nbsp";
    cardDescription.innerHTML = cardDesciptionArr[index];
}


carouselNext.addEventListener("click", nextButtonClick);

function changeContent(cardIndex) {

    if (cardCarousel.classList.contains("animation")) {
        cardCarousel.classList.remove("animation");
    }
    setCounter();
    cardCarousel.src = cards[cardIndex];
    changeSelectedBtn(cardIndex);


    cardData(cardIndex);

    clearInterval(myInterval);
}

function nextButtonClick() {


    if (carouselSelect[carouselSelect.length - 1].classList.contains("selected")) {
        cardCarousel.src = cards[0];
        changeSelectedBtn(0);
        cardData(0);
        return;
    }
    for (let z = 0; z < (carouselSelect.length); z++) {
        if (carouselSelect[z].classList.contains("selected")) {
            cardCarousel.src = cards[z + 1];
            changeSelectedBtn((z + 1));
            cardData(z + 1);
            return;
        }
    }
}

function selectbtnAddClickCards() {
    carouselSelect.forEach(
        function(item, index) {
            item.addEventListener("click", function() { changeContent(index) });
            cardData(index);

        });
}
document.addEventListener("DOMContentLoaded", function() {
    if (cardCarousel.classList.contains("animation")) {
        cardCarousel.classList.remove("animation");
    }
    selectbtnAddClickCards();
    cardData(0);

});