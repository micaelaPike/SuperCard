//import Searcher from 'fast-fuzzy';
//import { Searcher } from "fast-fuzzy";
//const { Searcher } = require("fast-fuzzy");

let btnSearchStore = document.querySelector("#btnSearchStore");
let searchErrorBox = document.querySelector(".searchError");
let closeButton = document.querySelector(".closeButton");

// let list = [{
//         "title": "Old Man's War",
//         "author": "John Scalzi",
//         "tags": ["fiction"]
//     },
//     {
//         "title": "The Lock Artist",
//         "author": "Steve",
//         "tags": ["thriller"]
//     }
// ];

//Import JSON file with coordinates
async function createMarker() {

    const { default: storeMarker } = await
    import ("/Scripts/Pages/SuperCardMapMarkers.json", {
        assert: {
            type: "json",
        },
    })
    return storeMarker;
}

const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['StoreName', 'Address']
}


//debugger;

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

OpenStreetMap_Mapnik.addTo(map);
let mapLayer = "osMap";

// Change Map View
let btnLayerChange = document.querySelector("#btnLayerChange");

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

btnLayerChange.addEventListener("click", changeLayer);

const markerLocations = await createMarker();
//debugger;
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
    // console.log(markerLocations[index].Longitude, markerLocations[index].Latitude);
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

var myFGMarker = new L.FeatureGroup;

function searchStore() {
    // debugger;
    let inputSearchStore = document.getElementById("searchStore").value;
    let result = fuse.search(inputSearchStore);
    console.log(result[0].score);
    result.forEach((item, index) => {

        if ((result[0].score === 0) && (result.length = 1)) {
            map.flyTo([result[0].item.Longitude, result[0].item.Latitude], 17, { duration: 2, easeLinearity: 5 });
        } else if (result[index].score <= 0.6) {

            map.removeLayer(markerCluster);

            //myFGMarker = ([item.item.Longitude, item.item.Latitude]);
            // myFGMarker.bindPopup(`${ result[index].item.StoreName.bold() } <br> ${ result[index].item.Address }`);

            let searchMarker = L.marker([item.item.Longitude, item.item.Latitude]);

            if (result[index].item.StoreType === "Spar") {
                searchMarker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: sparIcon });
                searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                myFGMarker.addLayer(searchMarker);



            } else if (result[index].item.StoreType === "BMS") {
                searchMarker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: bmsIcon });
                searchMarker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
                myFGMarker.addLayer(searchMarker);


            }

            //searchMarker.bindPopup(`${ result[index].item.StoreName.bold() } <br> ${ result[index].item.Address }`);

            myFGMarker.addLayer(searchMarker);
            myFGMarker.addTo(map);

        }
    });

    map.fitBounds(myFGMarker.getBounds());

    if (result.length === 0) {
        searchErrorBox.style.setZIndex = "9999";
        searchErrorBox.style.display = "block";
        return;
    }
}


function closeError() {
    //inputSearchStore = document.querySelector("#searchStore");
    searchErrorBox.style.display = "none";
    //inputSearchStore.value = "";

}

btnSearchStore.addEventListener("click", searchStore);
closeButton.addEventListener("click", closeError);

// var element = document.getElementById('searchStore');
// var topPos = element.getBoundingClientRect().top + window.scrollY;
// var leftPos = element.getBoundingClientRect().left + window.scrollX;
// var d = document.getElementById("div1");
// var topPos = d.offsetTop;
// console.log(leftPos);