//import * as FileSaver from "file-saver";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.11/package/xlsx.mjs";

//Import Search Results Dictionary
// async function createStores() {
//     // was const
//     let { default: storeList } = await
//     import ("/Assets/Data/SearchDictionary.json", {
//         assert: {
//             type: "json",
//         },
//     })
//     return storeList;
// }
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
// const storeDictionary = await createStores();
const profanityDictionary = await createArr();
// let arrReport = [];
// let arrRecord = [];

let occurrCounter = 1;

// const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const d = new Date();
// let monthName = month[d.getMonth()];
// let year = d.getFullYear();

const options = {
    isCaseSensitive: false,
    threshold: 0.7,
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    keys: [
        "User_Input"
    ]
}


// function lastDayofMonth(date) {
//     let dayInMS = 1000 * 60 * 60 * 24;

//     return new Date(date.getTime() + dayInMS).getDate() == 1;
// }

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

// function existingStoreCheck(storeList, input) {
//     for (let i = 0; i < storeList.length; i++) {
//         let simarlarityStores = stringSimilarity.compareTwoStrings(storeList[i].Name.toLowerCase(), input.toLowerCase());
//         if (simarlarityStores >= 0.7) {
//             i = storeList.length;
//             return true;
//         }
//     }
//     return false;
// }

// function similarEntryCheck(array, input) {
//     for (let i = 0; i < array.length; i++) {
//         let simarlarityEntries = stringSimilarity.compareTwoStrings(array[i].User_Input.toLowerCase(), input.toLowerCase());
//         if (simarlarityEntries >= 0.7) {
//             return i;
//         }
//     }
//     return -1;
// }

export function saveToArr(input) {
    debugger

    if (profanityCheck(profanityDictionary, input) == false) { // no profanity
        fetch("http://localhost:9000/Service.asmx?op=MapSearchReport", {
                method: 'POST',
                mode: 'no-cors',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
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