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

let occurrCounter = 0;
let arrReport = [];
let arrRecord = [];

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let monthName = month[d.getMonth()];
let year = d.getFullYear();

function lastDayofMonth(date) {
    let dayInMS = 1000 * 60 * 60 * 24;

    return new Date(date.getTime() + dayInMS).getDate() == 1;
}

function setInputCounter(input) {
    if (!arrReport == undefined) {
        for (let i = 0; i < arrReport.length; i++) {
            if (arrReport[i].user_input == input) {
                occurrCounter++;
                arrReport[i].Occurred = occurrCounter;
                return;
            }
        }
    }
}

function saveToArr(input) {
    debugger
    storeDictionary.forEach(function(arrayItem, arrIndex) {

        let simarlarity = stringSimilarity.compareTwoStrings(storeDictionary[arrIndex].Name.toLowerCase(), input);

        if (!arrReport == undefined) {
            for (let i = 0; i < arrReport.length; i++) {
                if (arrReport[i][0] == input) {
                    occurrCounter++;
                    arrReport[i][1] = occurrCounter;

                }
            }
        } else {
            occurrCounter = 0;
        }

        //arrRecord
        //arrRecord = [{ "user_input": in }]


        if (simarlarity <= 0.7) {
            if (arrReport == undefined) {
                arrReport.push(arrHeading);
            }
            arrRecord = [{ "user_input": input }, { "Occurred": occurrCounter }];
            arrReport.push(arrRecord);
        }

        console.log('arrReport ' + arrReport[0][0]);
        console.log('arrReport ' + arrReport[0][1]);

        let simarlarityProfanity = stringSimilarity.compareTwoStrings(profanityDictionary.badWords[arrIndex].toLowerCase(), input);

        if (simarlarityProfanity >= 0.5) {
            return [];
        }

        //setInputCounter(); //Updates the array if the store occurrs again
        console.log(arrReport);
        return arrReport;
    });
}

export function saveToXLSX(input) {
    // let title = "sc_Map_Search_Report_" + monthName + "_" + year;
    // let wb = XLSX.utils.book_new();


    // debugger
    // let data = saveToArr(input);

    // console.log(data);

    // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    // const fileExtension = ".xlsx";


    // wb.SheetNames.push("sc_website_" + month + "_" + year);

    // let ws_data = data;

    // let ws = XLSX.utils.json_to_sheet(ws_data)

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
    // FileSaver.saveAs(new Blob([s2ab(wbout)], { type: filetype }), title + fileExtension);
    // //     }

    //Sheet header names
    let worksheetColumnName = ["User Input", "Occurred"];

    let worksheetName = "sc_website_" + month + "_" + year;

    let filepath = "./sc_website_" + month + "_" + year + ".xlxs";

    //data
    let worksheetData = saveToArr(input)

}