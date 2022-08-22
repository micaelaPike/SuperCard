let btnShopper = document.querySelector(".conditionTypeItemShopper");
let btnStokvel = document.querySelector(".conditionTypeItemStokvel");
let btnGift = document.querySelector(".conditionTypeItemGift");
let textBox = document.querySelector(".termsText");

//Import JSON file with coordinates
async function TermsAndConditionsContent() {
    let { default: terms } = await
    import ("/Assets/Data/TermsContent.json", {
        assert: {
            type: "json",
        },
    })
    return terms;
}

let termsArr = await TermsAndConditionsContent();

function shopperClick(array) {
    textBox.innerHTML = array[0].Content;
}

function stokvelClick(array) {
    textBox.innerHTML = array[1].Content;
}

function giftClick(array) {
    textBox.innerHTML = array[2].Content;
}


btnShopper.addEventListener("click", function() { shopperClick(termsArr) });
btnStokvel.addEventListener("click", function() { stokvelClick(termsArr) });
btnGift.addEventListener("click", function() { giftClick(termsArr) });