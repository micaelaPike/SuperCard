//import * as FileSaver from "file-saver";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.11/package/xlsx.mjs";

//Import Search Results Dictionary
async function createStores() {
    // was const
    let { default: storeList } = await
    import ("/Assets/Data/SearchDictionary.json", {
        assert: {
            type: "json",
        },
    })
    return storeList;
}
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
const storeDictionary = await createStores();
const profanityDictionary = await createArr();
let arrReport = [];
let arrRecord = [];

let occurrCounter = 1;

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let monthName = month[d.getMonth()];
let year = d.getFullYear();

function lastDayofMonth(date) {
    let dayInMS = 1000 * 60 * 60 * 24;

    return new Date(date.getTime() + dayInMS).getDate() == 1;
}

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

function existingStoreCheck(storeList, input) {
    for (let i = 0; i < storeList.length; i++) {
        let simarlarityStores = stringSimilarity.compareTwoStrings(storeList[i].Name.toLowerCase(), input.toLowerCase());
        if (simarlarityStores >= 0.7) {
            i = storeList.length;
            return true;
        }
    }
    return false;
}

function similarEntryCheck(array, input) {
    for (let i = 0; i < array.length; i++) {
        let simarlarityEntries = stringSimilarity.compareTwoStrings(array[i].User_Input.toLowerCase(), input.toLowerCase());
        if (simarlarityEntries >= 0.7) {
            i = array.length;
            return true;
        }
    }
    return false;
}

function saveToArr(input) {
    debugger


    if (arrReport.length !== 0) {
        if (profanityCheck(profanityDictionary, input) == false) { // no profanity
            if (existingStoreCheck(storeDictionary, input) == false) { //not similar to an existing store
                if (similarEntryCheck(arrReport, input) == false) { //not similar to a user entry
                    arrRecord = { "User_Input": input, "Occurred": 1 };
                    arrReport.push(arrRecord);
                    return arrReport;
                } else {
                    let arrIndex = arrReport.findIndex((obj) => obj.User_Input === input);
                    occurrCounter++;
                    arrReport[arrIndex] = { "User_Input": input, "Occurred": occurrCounter };
                    console.log(arrReport[0].User_Input + " " + arrReport[0].Occurred)

                    return arrReport;
                }
            } else {
                let arrIndex = arrReport.findIndex((obj) => obj.User_Input === input);
                occurrCounter++;
                arrReport[arrIndex] = { "User_Input": input, "Occurred": occurrCounter };
                console.log(arrReport[0].User_Input + " " + arrReport[0].Occurred)

                return arrReport;
            }
        } else {
            console.log(arrReport[0].User_Input + " " + arrReport[0].Occurred)

            return arrReport;
        }
    } else {
        arrRecord = { "User_Input": input, "Occurred": 1 };
        arrReport.push(arrRecord);
        console.log(arrReport[0].User_Input + " " + arrReport[0].Occurred)

        return arrReport;
    }

}

export function saveToXLSX(input) {
    let title = "sc_Map_Search_Report_" + monthName + "_" + year;
    let wb = XLSX.utils.book_new();


    //let data = JSON.stringify(saveToArr(input));

    // console.log(saveToArr(input));
    return saveToArr(input);

    // console.log(data);

    // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    // //const fileExtension = ".xlsx";


    // wb.SheetNames.push(title);

    // let ws_data = data;

    // // let ws = XLSX.utils.json_to_sheet(ws_data)

    // wb.Sheets["sc_website_" + month + "_" + year] = ws;

    // let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // function s2ab(s) {
    //     var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    //     var view = new Uint8Array(buf); //create uint8array as viewer
    //     for (var i = 0; i < s.length; i++) { view[i] = s.charCodeAt(i) & 0xFF }; //convert to octet
    //     return buf;
    // }
    // console.log(data);
    // //     if (lastDayofMonth) {
    // FileSaver.saveAs(new Blob([s2ab(wbout)], { type: filetype }), title + ".xlsx");
    //     }
}