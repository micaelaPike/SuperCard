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

btnSearchStore.addEventListener("click", () => {
    searchStore()
    if (inputSearchStore.value == "") {
        inputSearchStore.focus();
    }
});

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
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
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
    arrayLocations.forEach((store, index) => {
        let marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: SuperCardIcon });
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
            map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
        });
    });
}

function addIconAndPopUp(markerArray, index) {
    if (markerArray[index].StoreType.toLowerCase() == "spar") {

        let searchMarker = new L.marker([markerArray[index].Longitude, markerArray[index].Latitude], { icon: sparIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Group.fontcolor("red") } <br> ${ markerArray[index].Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    } else if (markerArray[index].StoreType.toLowerCase() == "bms") {

        let searchMarker = new L.marker([markerArray[index].Longitude, markerArray[index].Latitude], { icon: bmsIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].StoreName.bold() } <br> ${ markerArray[index].Group.fontcolor("red") } <br> ${ markerArray[index].Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    } else if (markerArray[index].StoreType.toLowerCase() == "mndeni") {
        console.log(
            markerArray[index].StoreType
        )
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
    console.log(markerArray);

    if (markerArray[index].item.StoreType.toLowerCase() == "spar") {

        let searchMarker = new L.marker([markerArray[index].item.Longitude, markerArray[index].item.Latitude], { icon: sparIcon });
        if (markerArray[index].Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Group.fontcolor("red") } <br> ${ markerArray[index].item.Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);

    } else if (markerArray[index].item.StoreType.toLowerCase() == "bms") {

        let searchMarker = new L.marker([markerArray[index].item.Longitude, markerArray[index].item.Latitude], { icon: bmsIcon });
        if (markerArray[index].item.Group == '') {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Address }`);
        } else {
            searchMarker.bindPopup(`${ markerArray[index].item.StoreName.bold() } <br> ${ markerArray[index].item.Group.fontcolor("red") } <br> ${ markerArray[index].item.Address }`);
        }
        featureGroupMarker.addLayer(searchMarker);
    } else if (markerArray[index].item.StoreType.toLowerCase() == "mndeni") {

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
const fuse = new Fuse(markerLocations, options)

//Displays the original set of markers
displayMarkers(markerLocations);

//Fires when users clicks the button to search for a store
function searchStore() {

    let inputSearchStoreValue = document.getElementById("searchStore").value;
    inputSearchStoreValue = inputSearchStoreValue.toLowerCase();
    if (inputSearchStoreValue == undefined) {
        inputSearchStoreValue = "";
    }


    if (!inputSearchStoreValue == "") {
        //clear the old search group
        map.removeLayer(featureGroupMarker);

        featureGroupMarker = new L.FeatureGroup;

        //this is the fuzzy search
        // let arr = fuse.search(inputSearchStoreValue);
        //let completeArr = lowerArr;

        let filteredResults = [];

        let fuseArr = fuse.search(inputSearchStoreValue);
        //Take out the results if they search the storeType
        if (fuseArr.length == 0) {
            inputSearchStore.value = "";
            searchErrorBox.style.setZIndex = "9999";
            searchErrorBox.style.display = "block";
            return;
        }
        markerLocations.forEach((arrItem, arrIndex) => {
            if (inputSearchStoreValue == storeTypesArr[arrIndex]) {
                filteredResults = markerLocations.filter((arrItem) => arrItem.StoreType.toLowerCase().includes(inputSearchStoreValue));
                map.removeLayer(markerCluster);
                filteredResults.forEach((arrItem, index) => {
                    addIconAndPopUp(filteredResults, index);
                })
                featureGroupMarker.addTo(map).on('click', function(e) {
                    map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
                });
            } else
            if (inputSearchStoreValue == storeGroupsArr[arrIndex]) {
                filteredResults = markerLocations.filter((arrItem) => arrItem.Group.toLowerCase().includes(inputSearchStoreValue));
                map.removeLayer(markerCluster);
                filteredResults.forEach((arrItem, index) => {
                    addIconAndPopUp(filteredResults, index);
                })
                featureGroupMarker.addTo(map).on('click', function(e) {
                    map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
                });
            }
        })
        if (fuseArr[0].score == 0) {
            map.removeLayer(markerCluster);
            let fuseObj = Object.values(fuseArr);
            addIconAndPopUpFuse(fuseObj, 0);
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
            });
        } else {
            map.removeLayer(markerCluster);
            let fuseObj = Object.values(fuseArr);
            fuseObj.forEach((arrItem, index) => {
                addIconAndPopUpFuse(fuseObj, index);
                featureGroupMarker.addTo(map).on('click', function(e) {
                    map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
                })

            })
        }
        map.flyToBounds(featureGroupMarker.getBounds(), { padding: [15, 15] }, {
            maxZoom: 18
        });
    }
}