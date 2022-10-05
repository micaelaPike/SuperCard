//Import Profanity Filter
async function createArr() {
    let { default: profanityArr } = await
    import ("/Assets/Data/ProfanityFilter.json", {
        assert: {
            type: "json",
        },
    })
    return profanityArr;
}
const profanityDictionary = await createArr();

function profanityCheck(profanityList, input) {
    for (let i = 0; i < profanityList.length; i++) {
        let simarlarityProfanity = stringSimilarity.compareTwoStrings(profanityList.badWords[i].toLowerCase(), input.toLowerCase());
        if (simarlarityProfanity >= 0.5) {
            i = profanityList.length;
            return true;
        }
    }
    return false;
}

export function saveToArr(input) {
    // debugger

    if (profanityCheck(profanityDictionary, input) == false) {
        fetch("https://localhost:7095/search", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',

            headers: {
                'Content-Type': 'text/html',
            },
            body: input,

        })

        .then((response) => response.text())
            .then((input) => {
                console.log('Success:', input);
            })
            .catch((error) => {
                console.error('Error:', input);
            });
        //return response.text();
    }
}