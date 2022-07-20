let btnSearchStore = document.querySelector("#btnSearchStore");
let btnLayerChange = document.querySelector("#btnLayerChange");
let btnZoom = document.querySelector(".btnZoom");
let featureGroupMarker = new L.FeatureGroup;
let searchErrorBox = document.querySelector(".searchError");
let inputSearchStore = document.getElementById("searchStore");

let storeGroupsArr = ["aer", "christie group", "ec dc", "erite", "fiznef", "kwanongoma", "kwawicks", "kzn dc", "lowveld dc", "mega", "moldenhauer group", "nick's foods", "pacina", "power group", "queenrose", "renckens", "supatrade", "vele"];
let storeTypesArr = ["spar", "bms", "mndeni"];

let closeButton = document.querySelector(".closeButton");

function closeError() {
    searchErrorBox.style.display = "none";
}

closeButton.addEventListener("click", closeError);

btnLayerChange.addEventListener("click", changeLayer);

btnZoom.addEventListener("click", zoomHome);

btnSearchStore.addEventListener("click", searchStore);

inputSearchStore.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        searchStore();
    }
});


function zoomHome() {
    map.flyTo([-28.0046, 26.7732], 5, { duration: 1.5, easeLinearity: 5 });
    inputSearchStore.value = "";

    if (!map.hasLayer(markerCluster)) {
        map.removeLayer(featureGroupMarker);
        map.addLayer(markerCluster);
    }
}

//Import JSON file with coordinates
async function createMarker() {
    // was const
    let { default: storeMarker } = await
    import ("/Scripts/Pages/MapMarkersV5.json", {
        assert: {
            type: "json",
        },
    })
    return storeMarker;
}

// witchcraft
// storeMarker = storeMarker.map(arrItem => {

//     arrItem.StoreName = arrItem.StoreName.toLowerCase();
//     arrItem.StoreType = arrItem.StoreType.toLowerCase();
//     arrItem.Address = arrItem.Address.toLowerCase();
//     arrItem.Group = arrItem.Group.toLowerCase();
//     return arrItem;
// });

//Options for fuse search
const options = {
    includeScore: true,
    // Search in these properties
    keys: ['Group', 'StoreName', 'Address'],
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.1
}

//Create Icon Objects/////////////////////////////////////////
let SuperCardIcon = L.icon({
    iconUrl: "/Assets/Logos/SuperCard.ico",
    iconSize: [20, 20],
    iconAnchor: [10, 0],
    popUpAnchor: [20, 0]
})

let bmsIcon = L.icon({
    iconUrl: "/Assets/Logos/BMSIcon.png",
    iconSize: [50, 30],
    iconAnchor: [25, 0],
    popUpAnchor: [50, 0]
})
let mndeniIcon = L.icon({
    iconUrl: "/Assets/Logos/MndeniLogo.png",
    iconSize: [40, 25],
    iconAnchor: [25, 0],
    popUpAnchor: [50, 0]
})

let sparIcon = L.icon({
        iconUrl: "/Assets/Logos/sparIcon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popUpAnchor: [40, 0]
    })
    ////////////////////////////////////////////////////////////
    //Map View on Load
let map = L.map('map', {
    minZoom: 0,
    maxZoom: 20
});
map.setView([-28.0046, 26.7732], 5);

//Map Tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
let mapLayer = "osMap";
OpenStreetMap_Mapnik.addTo(map);

/////////////////////////////////////////////////////////////

// Change Map Tiles
function changeLayer() {

    if (mapLayer == "osMap") {
        OpenStreetMap_Mapnik.setZIndex(0).addTo(map);
        Esri_WorldImagery.setZIndex(9000).addTo(map)
        mapLayer = "ewiMap";

    } else if (mapLayer == "ewiMap") {
        Esri_WorldImagery.setZIndex(0).addTo(map)
        OpenStreetMap_Mapnik.setZIndex(9000).addTo(map);
        mapLayer = "osMap";
    }
}
const markerLocations = await createMarker();

let lowerArr = markerLocations.map(arrItem => {
    let locationsCopy = {...arrItem };

    locationsCopy.StoreName = arrItem.StoreName.toLowerCase();
    locationsCopy.StoreType = arrItem.StoreType.toLowerCase();
    locationsCopy.Address = arrItem.Address.toLowerCase();
    locationsCopy.Group = arrItem.Group.toLowerCase();

    return locationsCopy;
})

// console.log(markerLocations)
// console.log(lowerArr)

let markerCluster = new L.MarkerClusterGroup({
    iconCreateFunction: function() {
        return L.divIcon({
            html: '<div></div>',
            width: "20px",
            height: "20px",
            className: 'markerIcon',
            iconSize: L.point(20, 20),

        });
    },
});

function displayMarkers(arrayLocations) {
    // markerCluster = new L.MarkerClusterGroup;
    arrayLocations.forEach((store, index) => {
        let marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: SuperCardIcon });
        // console.log(store.StoreType)
        if (store.StoreType == "Spar") {
            marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: sparIcon });
            if (arrayLocations[index].Group == '') {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Address }`);
            } else {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Group.fontcolor("red") } <br> ${ arrayLocations[index].Address }`);
            }
        } else if (store.StoreType == "BMS") {
            marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: bmsIcon });
            if (arrayLocations[index].Group == '') {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Address }`);
            } else {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Group.fontcolor("red") } <br> ${ arrayLocations[index].Address }`);
            }
        } else if (store.StoreType == "Mndeni") {
            marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: mndeniIcon });
            if (arrayLocations[index].Group == '') {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Address }`);
            } else {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Group.fontcolor("red") } <br> ${ arrayLocations[index].Address }`);
            }
        }
        markerCluster.addLayer(marker);

        markerCluster.addTo(map).on('click', function(e) {
            map.flyTo(e.latlng, 16, { duration: 1.5, easeLinearity: 5 });
        });
    });
}

function addIconAndPopUp(markerArray, index) {

    if (markerArray[index].StoreType == "spar") {

        let searchMarker = new L.marker([markerArray[index].Longitude, markerArray[index].Latitude], { icon: sparIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Group.fontcolor("red") } <br> ${ markerArray[index].Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);

    } else if (markerArray[index].StoreType == "bms") {

        let searchMarker = new L.marker([markerArray[index].Longitude, markerArray[index].Latitude], { icon: bmsIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Group.fontcolor("red") } <br> ${ markerArray[index].Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    } else if (markerArray[index].StoreType == "mndeni") {

        let searchMarker = new L.marker([markerArray[index].Longitude, markerArray[index].Latitude], { icon: mndeniIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Group.fontcolor("red") } <br> ${ markerArray[index].Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    }
    featureGroupMarker.addTo(map);
}

function addIconAndPopUpFuse(markerArray, index) {

    if (markerArray[index].item.StoreType == "spar") {

        let searchMarker = new L.marker([markerArray[index].item.Longitude, markerArray[index].item.Latitude], { icon: sparIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Group.fontcolor("red") } <br> ${ markerArray[index].item.Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);

    } else if (markerArray[index].item.StoreType == "bms") {

        let searchMarker = new L.marker([markerArray[index].item.Longitude, markerArray[index].item.Latitude], { icon: bmsIcon });
        if (markerArray[index].item.Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Group.fontcolor("red") } <br> ${ markerArray[index].item.Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    } else if (markerArray[index].item.StoreType == "mndeni") {

        let searchMarker = new L.marker([markerArray[index].item.Longitude, markerArray[index].item.Latitude], { icon: mndeniIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Group.fontcolor("red") } <br> ${ markerArray[index].item.Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    }
    featureGroupMarker.addTo(map);
}
const fuse = new Fuse(lowerArr, options)

//Displays the original set of markers
displayMarkers(markerLocations);

//Fires when users clicks the button to search for a store
function searchStore() {

    //clear the old search group
    map.removeLayer(featureGroupMarker);

    featureGroupMarker = new L.FeatureGroup;

    let inputSearchStoreValue = document.getElementById("searchStore").value;

    inputSearchStoreValue = inputSearchStoreValue.toLowerCase();

    //this is the fuzzy search
    // let arr = fuse.search(inputSearchStoreValue);
    let completeArr = lowerArr;

    let filteredResults = [];

    let fuseArr = fuse.search(inputSearchStoreValue);
    //Take out the results if they search the storeType
    debugger
    completeArr.forEach((arrItem, arrIndex) => {
        if (inputSearchStoreValue == storeTypesArr[arrIndex]) {

            filteredResults = completeArr.filter((arrItem) => arrItem.StoreType.includes(inputSearchStoreValue));
            map.removeLayer(markerCluster);
            filteredResults.forEach((arrItem, index) => {
                addIconAndPopUp(filteredResults, index);
            })
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 16, { duration: 1.5, easeLinearity: 5 });
            });
        } else
        if (inputSearchStoreValue == storeGroupsArr[arrIndex]) {
            filteredResults = completeArr.filter((arrItem) => arrItem.Group.includes(inputSearchStoreValue));
            map.removeLayer(markerCluster);
            filteredResults.forEach((arrItem, index) => {
                addIconAndPopUp(filteredResults, index);
            })
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 16, { duration: 1.5, easeLinearity: 5 });
            });
        } else
            console.log(fuseArr[0])
        if (fuseArr[0].score == 0) {
            map.removeLayer(markerCluster);

            let fuseObj = Object.values(fuseArr);
            console.log(fuseObj)

            addIconAndPopUpFuse(fuseArr, 0);
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 16, { duration: 1.5, easeLinearity: 5 });
            });
        }
    })
    map.flyToBounds(featureGroupMarker.getBounds(), { padding: [50, 50] }, { maxZoom: 25 });
}
//else {
//     //Take out the results that don't contain the word searched
//     // filteredResults = [];
//     // debugger
//     arr.forEach((item, index) => {
//         if (arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
//             filteredResults.push(arr[index]);
//         }
//         if (filteredResults.length == 0) {
//             filteredResults = arr;
//         }
//         //else if (!arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
//         // }
//     });
// }
// console.log(filteredResults)
//     //If they don't search the store type/////////////////////////////////
//     //No Match
// if (filteredResults.length == 0) {
//     searchErrorBox.style.setZIndex = "9999";
//     searchErrorBox.style.display = "block";
//     return;
// } else {

//     // //If they get a match of some kind

//     //Perfect Matches
//     if (filteredResults[0].score == 0) {
//         console.log(filteredResults)

//         //only one perfect match or No perfect match

//     }
//     filteredResults.forEach((item, index) => {
//         //group match
//         if (inputSearchStoreValue == filteredResults[index].item.Group.toLowerCase()) {
//             console.log(filteredResults);
//             //more than one perfect match or no perfect match
//             if (filteredResults[index].score == 0) {
//                 addIconAndPopUp(filteredResults, index);
//             }
//             if (filteredResults[index].score <= 0.1) {
//                 addIconAndPopUp(filteredResults, index);
//             }
//         }
//     })

// }

// function searchStore() {

//     //clear the old search group

//     map.removeLayer(featureGroupMarker);

//     featureGroupMarker = new L.FeatureGroup;

//     let inputSearchStoreValue = document.getElementById("searchStore").value;

//     inputSearchStoreValue = inputSearchStoreValue.toLowerCase();

//     //this is the fuzzy search
//     let arr = fuse.search(inputSearchStoreValue);
//     // console.log(result)
//     // let arr = Object.values(result);
//     console.log(arr)

//     let filteredResults = [];

//     //Take out the results if they search the storeType

//     if (inputSearchStoreValue == "spar" || inputSearchStoreValue == "bms" || inputSearchStoreValue == "mndeni") {
//         filteredResults = arr.filter((arrItem) => arrItem.item.StoreType.toLowerCase().includes(inputSearchStoreValue));
//     } else {
//         //Take out the results that don't contain the word searched
//         // filteredResults = [];
//         // debugger
//         arr.forEach((item, index) => {
//             if (arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
//                 filteredResults.push(arr[index]);
//             }
//             if (filteredResults.length == 0) {
//                 filteredResults = arr;
//             }
//             //else if (!arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
//             // }
//         });
//     }
//     console.log(filteredResults)
//         //If they don't search the store type/////////////////////////////////
//         //No Match
//     if (filteredResults.length == 0) {
//         searchErrorBox.style.setZIndex = "9999";
//         searchErrorBox.style.display = "block";
//         return;
//     } else {

//         //If they get a match of some kind
//         map.removeLayer(markerCluster);

//         //Perfect Matches
//         if (filteredResults[0].score == 0) {
//             console.log(filteredResults)

//             //only one perfect match or No perfect match
//             storeTypeCheck(filteredResults, 0);

//         }
//         filteredResults.forEach((item, index) => {
//             //group match
//             if (inputSearchStoreValue == filteredResults[index].item.Group.toLowerCase()) {
//                 console.log(filteredResults);
//                 //more than one perfect match or no perfect match
//                 if (filteredResults[index].score == 0) {
//                     storeTypeCheck(filteredResults, index);
//                 }
//                 if (filteredResults[index].score <= 0.1) {
//                     storeTypeCheck(filteredResults, index);
//                 }
//             }
//         })
//         featureGroupMarker.addTo(map).on('click', function(e) {
//             map.flyTo(e.latlng, 16, { duration: 1.5, easeLinearity: 5 });
//         });
//         map.flyToBounds(featureGroupMarker.getBounds(), { padding: [50, 50] }, { maxZoom: 25 });
//     }
//