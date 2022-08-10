debugger
// const termsArr = ["This is for the Shopper's Card", "This is for the Stokvel Card", "/TermsAndConditions/giftTerms.html", "This is for the Staff Card."]

let btnShopper = document.querySelector(".conditionTypeItemShopper");
let btnStokvel = document.querySelector(".conditionTypeItemStokvel");
let btnGift = document.querySelector(".conditionTypeItemGift");
let btnStaff = document.querySelector(".conditionTypeItemStaff");
let textBox = document.querySelector(".termsText");

//Import JSON file with coordinates
async function TermsAndConditionsContent() {
    // was const
    let { default: terms } = await
    import ("/Scripts/Pages/TermsContent.json", {
        assert: {
            type: "json",
        },
    })
    return terms;
}
debugger
let termsArr = await TermsAndConditionsContent();

console.log(termsArr)

function termsClick(array) {

    console.log(array.Type)
        // array.forEach


}

function shopperClick(array) {
    textBox.innerHTML = array[0].Content;
}

function stokvelClick(array) {
    textBox.innerHTML = array[1].Content;
}

function giftClick(array) {
    // console.log(/TermsAndConditions/giftTerms.html)
    textBox.innerHTML = array[2].Content;
}

function staffClick(array) {
    textBox.innerHTML = array[3].Content;
}
debugger
btnShopper.addEventListener("click", function() { shopperClick(termsArr) });
btnStokvel.addEventListener("click", function() { stokvelClick(termsArr) });
btnGift.addEventListener("click", function() { giftClick(termsArr) });
btnStaff.addEventListener("click", function() { staffClick(termsArr) });