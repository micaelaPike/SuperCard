//Import Profanity Filter
async function createArr() {
    // was const
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

    if (profanityCheck(profanityDictionary, input) == false) { // no profanity
        // fetch("http://localhost:9000/Service.asmx", {
        fetch("http://localhost:9000/Service.asmx?op=search_log_call", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'omit',

            headers: {
                'Content-Type': 'String',
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
    }
}


// export async function postData(data) {

//     const response = await fetch("http://localhost:9000/Service.asmx", {
//         method: 'POST',
//         mode: 'no-cors',
//         cache: 'no-cache',
//         credentials: 'omit',
//         headers: {
//             'Content-Type': 'String'
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referrer',
//         body: (data)
//     });

//     return response.text();
// }