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
    Array.from(profanityList).forEach(function(arrayItem, arrIndex) {
        let simarlarityProfanity = stringSimilarity.compareTwoStrings(profanityList.badWords[arrIndex].toLowerCase(), input.toLowerCase());

        if (simarlarityProfanity <= 0.5) {
            return false;
        } else {
            return true;
        }
    })
}

function existingStoreCheck(storeList, input) {
    storeList.forEach(function(arrayItem, arrIndex) {
        let simarlarityStores = stringSimilarity.compareTwoStrings(storeList[arrIndex].Name.toLowerCase(), input.toLowerCase());
        if (simarlarityStores <= 0.7) {
            return false;
        } else {
            return true;
        }
    })
}

function similarEntryCheck(array, input) {
    Array.from(array).forEach(function(item, index) {
        let simarlarityEntries = stringSimilarity.compareTwoStrings(array[index][0].User_Input.toLowerCase(), input.toLowerCase());

        if (simarlarityEntries <= 0.7) {
            return false;
        } else {
            return true;
        }
    })
}

function saveToArr(input) {
    debugger
    console.log(arrReport);

    if (arrReport.length !== 0) {
        Array.from(profanityDictionary).forEach(function(ArrayItem, ArrayIndex) {
            if (!profanityCheck(profanityDictionary, input)) {
                storeDictionary.forEach(function(arrItem, arrIndex) {
                    if (!existingStoreCheck(storeDictionary, input)) {
                        Array.from(arrReport).forEach(function(item, index) {
                            if (!similarEntryCheck(arrReport, input)) {
                                arrRecord = { "User_Input": input, "Occurred": 1 };
                                arrReport.push(arrRecord);
                                return arrReport;
                            }
                        })
                    } else {
                        occurrCounter++;
                        arrReport[arrIndex] = { "User_Input": input, "Occurred": occurrCounter };
                        return arrReport;
                    }
                })
            } else {
                return arrReport;
            }
        })
    } else {
        arrRecord = { "User_Input": input, "Occurred": 1 };
        arrReport.push(arrRecord);
        console.log("after " + arrReport);
        return arrReport;
    }
}

export function saveToXLSX(input) {
    let title = "sc_Map_Search_Report_" + monthName + "_" + year;
    let wb = XLSX.utils.book_new();



    //let data = JSON.stringify(saveToArr(input));

    // console.log(saveToArr(input));
    saveToArr(input);

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