"use strict";

import { myInterval } from "../Components/timer.js";
import { cardCarousel, carouselSelect, changeSelectedBtn, cards, setCounter } from "../Components/carousel.js";

const cardDesciptionArr = ["This is our most popular card, perfectly replacing traditional stamps. This card is tailor-made to suit the day-to-day shopper.<br><br>No transactional costs involved mean that the shopper can use the card multiple times a day, week, or month with peace of mind that their funds are secure.<br><br>Being pin protected means that the shopper can rest easy, knowing that if the card is lost, the funds cannot be accessed.<br><br>To load the card, cash needs to be deposited at the till or via EFT. All participating Spar cashiers are trained in this process. It’s quick and easy.<br><br>Balance enquires and mini statements are also available at the till on this card profile. <div class = 'footer terms'><a href='../Pages/6_Terms.html'> Terms & Conditions </a></div>",
    "The functionality of this card ensures that the funds are secured for a long period of time.<br><br>The Stokvel Card can only be spent between the 15th of November and the 15th of February, perfect for the end of the year when most celebrations occur.<br><br>The card is electronically blocked, and pin protected, which assures the customers that the funds they have accumulated over the months are available at the end of the year.<br><br><div class = 'footer terms'><a href='../Pages/6_Terms.html'> Terms & Conditions </a></div>",
    "The Gift Card can only be loaded with cash.<br><br>These cards are pre-registered and are not pin protected. The customer needs to remember that the admin fee will only be deducted when the second deposit has been made.<br><br>If you want to spoil someone special, this card is perfect and easy to use.<br><br>Simply load the card with cash at any participating Spar and pass it along to that someone for the perfect gift.<div class = 'footer terms'><a href='../Pages/6_Terms.html'> Terms & Conditions </a></div>",
    "This card offers the retailer the opportunity to deposit funds onto the card for their staff members. This ensures that funds are spent within the store.<br><br>Super<mark>Card</mark> will make these cards available upon the individual store’s request and will set up the rules of the card as per the store’s instruction.<div class = 'footer terms'><a href='../Pages/6_Terms.html'> Terms & Conditions </a></div>"
];

const cardHeadingArr = ["Shopper's", "Stokvel", "Gift", "Staff"];

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