let btnSearchStore = document.querySelector("#btnSearchStore");
let btnLayerChange = document.querySelector("#btnLayerChange");
let btnZoom = document.querySelector(".btnZoom");
let featureGroupMarker = new L.FeatureGroup;
let searchErrorBox = document.querySelector(".searchError");
let inputSearchStore = document.getElementById("searchStore");
// debugger;

let closeButton = document.querySelector(".closeButton");

function closeError() {
    searchErrorBox.style.display = "none";
}

closeButton.addEventListener("click", closeError);

btnLayerChange.addEventListener("click", changeLayer);

btnZoom.addEventListener("click", zoomHome);

btnSearchStore.addEventListener("click", searchStore);

inputSearchStore.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
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

    const { default: storeMarker } = await
    import ("/Scripts/Pages/MapMarkersV3.json", {
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
    keys: ['StoreName', 'Address', 'Group'],
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.5
}

//Create Icon Objects/////////////////////////////////////////
let SuperCardIcon = L.icon({
    iconUrl: "/Assets/Logos/SuperCardFavicon.png",
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
    console.log(arrayLocations)
        // markerCluster = new L.MarkerClusterGroup;
    arrayLocations.forEach(function(item, index) {
        let marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: SuperCardIcon });

        if (item.StoreType === "Spar") {
            marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: sparIcon });
            if (arrayLocations[index].Group === '') {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Address }`);
            } else {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Group.fontcolor("red") } <br> ${ arrayLocations[index].Address }`);
            }
            markerCluster.addLayer(marker);

            markerCluster.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
            });

        } else if (item.StoreType === "BMS") {
            marker = L.marker([arrayLocations[index].Longitude, arrayLocations[index].Latitude], { icon: bmsIcon });
            if (arrayLocations[index].Group === '') {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Address }`);
            } else {
                marker.bindPopup(`${ arrayLocations[index].StoreName.bold() } <br> ${ arrayLocations[index].Group.fontcolor("red") } <br> ${ arrayLocations[index].Address }`);
            }
            markerCluster.addLayer(marker);

            markerCluster.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
            });
        }
    });
}

const fuse = new Fuse(markerLocations, options)

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
    let result = fuse.search(inputSearchStoreValue);

    let arr = Object.values(result);

    let filteredResults = [];

    //Take out the results if they search the storeType
    if (inputSearchStoreValue === "spar" || inputSearchStoreValue === "bms") {
        filteredResults = arr.filter((item) => item.item.StoreType.toLowerCase().includes(inputSearchStoreValue));
    } else {
        //Take out the results that don't contain the word searched
        arr.forEach((item, index) => {
            filteredResults = [];
            if (arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
                filteredResults.push(arr[index]);
            } else {
                filteredResults = result;
            }
        });
    }


    //If they don't search the store type/////////////////////////////////
    //No Match
    if (filteredResults.length === 0) {
        searchErrorBox.style.setZIndex = "9999";
        searchErrorBox.style.display = "block";
    } else {
        //If they get a match of some kind
        map.removeLayer(markerCluster);

        //Perfect Matches
        if (!(filteredResults[1] === 0)) {
            console.log("only one perfect match or No perfect match")
                //only one perfect match or No perfect match
            let searchMarker = L.marker([filteredResults[0].item.Longitude, filteredResults[0].item.Latitude], { icon: filteredResults[0].item.StoreType === "Spar" ? sparIcon : bmsIcon });

            if (filteredResults[0].item.StoreType === "Spar") {
                if (markerLocations[0].Group === '') {
                    searchMarker.bindPopup(`${ markerLocations[0].StoreName.bold() } <br> ${ markerLocations[0].Address }`);
                } else {
                    searchMarker.bindPopup(`${ markerLocations[0].StoreName.bold() } <br> ${ markerLocations[0].Group.fontcolor("red") } <br> ${ markerLocations[0].Address }`);
                }
                featureGroupMarker.addLayer(searchMarker);

            } else if (filteredResults[0].item.StoreType === "BMS") {
                if (markerLocations[0].Group === '') {
                    searchMarker.bindPopup(`${ markerLocations[0].StoreName.bold() } <br> ${ markerLocations[0].Address }`);
                } else {
                    searchMarker.bindPopup(`${ markerLocations[0].StoreName.bold() } <br> ${ markerLocations[0].Group.fontcolor("red") } <br> ${ markerLocations[0].Address }`);
                }
                featureGroupMarker.addLayer(searchMarker);
            }

            featureGroupMarker.addLayer(searchMarker);
            map.flyTo([filteredResults[0].item.Longitude, filteredResults[0].item.Latitude], 18, { duration: 1.5, easeLinearity: 5 });

        } else {

            //more than one perfect match or no perfect match
            console.log("more than one perfect match or no perfect match")
            filteredResults.forEach((item, index) => {
                if (filteredResults[index].score === 0) {
                    let searchMarker = L.marker([filteredResults[index].item.Longitude, filteredResults[index].item.Latitude], { icon: filteredResults[index].item.StoreType === "Spar" ? sparIcon : bmsIcon });

                    if (filteredResults[index].item.StoreType === "Spar") {
                        if (markerLocations[index].Group === '') {
                            searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                        } else {
                            searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Group.fontcolor("red") } <br> ${ markerLocations[index].Address }`);
                        }
                        featureGroupMarker.addLayer(searchMarker);

                    } else if (filteredResults[index].item.StoreType === "BMS") {
                        if (markerLocations[index].Group === '') {
                            searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                        } else {
                            searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Group.fontcolor("red") } <br> ${ markerLocations[index].Address }`);
                        }
                        featureGroupMarker.addLayer(searchMarker);
                    }

                    featureGroupMarker.addLayer(searchMarker);
                    map.flyTo([filteredResults[index].item.Longitude, filteredResults[index].item.Latitude], 18, { duration: 1.5, easeLinearity: 5 });
                }
            })
        }
        //if the match isn't perfect
        filteredResults.forEach((item, index) => {
            if (filteredResults[index].score <= 0.1) {
                let searchMarker = L.marker([filteredResults[index].item.Longitude, filteredResults[index].item.Latitude], { icon: filteredResults[index].item.StoreType === "Spar" ? sparIcon : bmsIcon });

                if (filteredResults[index].item.StoreType === "Spar") {
                    if (markerLocations[index].Group === '') {
                        searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                    } else {
                        searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Group.fontcolor("red") } <br> ${ markerLocations[index].Address }`);
                    }
                    featureGroupMarker.addLayer(searchMarker);

                } else if (filteredResults[index].item.StoreType === "BMS") {
                    if (markerLocations[index].Group === '') {
                        searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                    } else {
                        searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Group.fontcolor("red") } <br> ${ markerLocations[index].Address }`);
                    }
                    featureGroupMarker.addLayer(searchMarker);
                }
                featureGroupMarker.addLayer(searchMarker);
            }
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 18, { duration: 1.5, easeLinearity: 5 });
            });
            featureGroupMarker.addTo(map);
            map.flyToBounds(featureGroupMarker.getBounds(), { maxZoom: 20 });
        });
    }
}