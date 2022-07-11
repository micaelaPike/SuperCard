let btnSearchStore = document.querySelector("#btnSearchStore");
let btnLayerChange = document.querySelector("#btnLayerChange");
let featureGroupMarker = new L.FeatureGroup;
let searchErrorBox = document.querySelector(".searchError");
let closeButton = document.querySelector(".closeButton");
let inputSearchStore = document.getElementById("searchStore");

//Import JSON file with coordinates
async function createMarker() {

    const { default: storeMarker } = await
    import ("/Scripts/Pages/MapMarkers.json", {
        assert: {
            type: "json",
        },
    })
    return storeMarker;
}

const options = {
    includeScore: true,
    // Search in `StoreName` and in `Address` array
    keys: ['StoreName', 'Group', 'Address'],
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.5
}


//Create Icon Object
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

//Map View on Load
let map = L.map('map', {
    minZoom: 0,
    maxZoom: 20
});

map.setView([-28.0046, 26.7732], 5);

//Map Layers
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

// debugger;
// Change Map View
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

const fuse = new Fuse(markerLocations, options)



//Markers
markerLocations.forEach(function(item, index) {
    let marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: SuperCardIcon });

    if (item.StoreType === "Spar") {
        marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: sparIcon });
        marker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
        markerCluster.addLayer(marker);

        markerCluster.addTo(map).on('click', function(e) {
            map.flyTo(e.latlng, 17, { duration: 3, easeLinearity: 5 });
        });

    } else if (item.StoreType === "BMS") {
        marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: bmsIcon });
        marker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
        markerCluster.addLayer(marker);

        markerCluster.addTo(map).on('click', function(e) {
            map.flyTo(e.latlng, 17, { duration: 3, easeLinearity: 5 });
        });
    }


});


function searchStore() {

    map.removeLayer(featureGroupMarker);

    featureGroupMarker = new L.FeatureGroup;
    debugger;
    let inputSearchStoreValue = document.getElementById("searchStore").value;

    let result = fuse.search(inputSearchStoreValue);

    console.log(result)

    let arr = Object.values(result);

    console.log(arr)

    let filteredResults = [];

    //Take out the ones if they search the storeType
    if (inputSearchStoreValue === "Spar" || inputSearchStoreValue === "BMS") {
        filteredResults = arr.filter((item) => item.item.StoreType.toLowerCase().includes(inputSearchStoreValue.toLowerCase()));
    }

    //Take out the ones that don't contain the word searched
    arr.forEach((item, index) => {
        filteredResults = [];
        if (arr[index].item.StoreName.toLowerCase().includes(inputSearchStoreValue) || arr[index].item.Address.toLowerCase().includes(inputSearchStoreValue)) {
            filteredResults.push(arr[index]);
        } else {
            filteredResults = result;
        }
    });

    console.log(filteredResults)

    map.removeLayer(markerCluster);

    //Perfect Match
    if (filteredResults[0].score === 0) {
        let searchMarker = L.marker([filteredResults[0].item.Longitude, filteredResults[0].item.Latitude], { icon: filteredResults[0].item.StoreType === "Spar" ? sparIcon : bmsIcon });
        console.log(searchMarker)
        if (filteredResults[0].item.StoreType === "Spar") {
            searchMarker.bindPopup(`${ filteredResults[0].item.StoreName.bold() } <br> ${ filteredResults[0].item.Address }`);
            featureGroupMarker.addLayer(searchMarker);

        } else if (filteredResults[0].item.StoreType === "BMS") {
            searchMarker.bindPopup(`${ filteredResults[0].item.StoreName.bold() } <br> ${ filteredResults[0].item.Address }`);
            featureGroupMarker.addLayer(searchMarker);
        }

        featureGroupMarker.addLayer(searchMarker);


        map.flyTo([filteredResults[0].item.Longitude, filteredResults[0].item.Latitude], 17, { duration: 2, easeLinearity: 5 });
    } else {
        console.log("close")
        filteredResults.forEach((item, index) => {
            // debugger;

            //Near As Damnit
            if (filteredResults[index].score <= 0.3) {
                let searchMarker = L.marker([filteredResults[index].item.Longitude, filteredResults[index].item.Latitude], { icon: filteredResults[index].item.StoreType === "Spar" ? sparIcon : bmsIcon });

                if (filteredResults[index].item.StoreType === "Spar") {
                    searchMarker.bindPopup(`${ filteredResults[index].item.StoreName.bold() } <br> ${ filteredResults[index].item.Address }`);
                    featureGroupMarker.addLayer(searchMarker);

                } else if (filteredResults[index].item.StoreType === "BMS") {
                    searchMarker.bindPopup(`${ filteredResults[index].item.StoreName.bold() } <br> ${ filteredResults[index].item.Address }`);
                    featureGroupMarker.addLayer(searchMarker);
                }

                featureGroupMarker.addLayer(searchMarker);

            }

            //Can't Quite Find a Match
            console.log("not really")

            if (filteredResults[index].score > 0.3 && filteredResults[index].score <= 0.5) {

                let searchMarker = L.marker([filteredResults[index].item.Longitude, filteredResults[index].item.Latitude], { icon: filteredResults[index].item.StoreType === "Spar" ? sparIcon : bmsIcon });
                if (filteredResults[index].item.StoreType === "Spar") {
                    searchMarker.bindPopup(`${ filteredResults[index].item.StoreName.bold() } <br> ${ filteredResults[index].item.Address }`);
                    featureGroupMarker.addLayer(searchMarker);

                } else if (filteredResults[index].item.StoreType === "BMS") {
                    searchMarker.bindPopup(`${ filteredResults[index].item.StoreName.bold() } <br> ${ filteredResults[index].item.Address }`);
                    featureGroupMarker.addLayer(searchMarker);
                }

                featureGroupMarker.addLayer(searchMarker);

            }
            featureGroupMarker.addTo(map).on('click', function(e) {
                map.flyTo(e.latlng, 17, { duration: 3, easeLinearity: 5 });
            });
            featureGroupMarker.addTo(map);
            map.flyToBounds(featureGroupMarker.getBounds(), { maxZoom: 20 });
        });

        // if (filteredResults[0].score > 0.5) {
        //     searchErrorBox.style.setZIndex = "9999";
        //     searchErrorBox.style.display = "block";
        // }}


    }

    function closeError() {
        searchErrorBox.style.display = "none";
    }

    btnLayerChange.addEventListener("click", changeLayer);

    btnSearchStore.addEventListener("click", searchStore);

    inputSearchStore.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchStore();
        }
    });

    closeButton.addEventListener("click", closeError);

    // var element = document.getElementById('searchStore');
    // var topPos = element.getBoundingClientRect().top + window.scrollY;
    // var leftPos = element.getBoundingClientRect().left + window.scrollX;
    // var d = document.getElementById("div1");
    // var topPos = d.offsetTop;
    // console.log(leftPos);
}