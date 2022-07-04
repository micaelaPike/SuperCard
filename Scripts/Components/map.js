let btnSearchStore = document.querySelector("#btnSearchStore");
let searchErrorBox = document.querySelector(".searchError");
let closeButton = document.querySelector(".closeButton");
let inputSearchStore;


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

//Markers
markerLocations.forEach(function(item, index) {
    // console.log(markerLocations[index].Longitude, markerLocations[index].Latitude);
    let marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], );

    if (item.StoreType === "Spar") {
        marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: sparIcon });
        marker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
        markerCluster.addLayer(marker);

        markerCluster.addTo(map).on('click', function(e) {
            map.flyTo(e.latlng, 17, { duration: 3, easeLinearity: 5 });
        });
        // marker.setIcon(new sparIcon);
    } else if (item.StoreType === "BMS") {
        marker = L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: bmsIcon });
        marker.bindPopup(`${ markerLocations[index].StoreName.bold() } <br> ${ markerLocations[index].Address }`);
        markerCluster.addLayer(marker);

        markerCluster.addTo(map).on('click', function(e) {
            map.flyTo(e.latlng, 17, { duration: 3, easeLinearity: 5 });
        });
        // marker.setIcon(new bmsIcon);
    }


});


function searchStore() {
    inputSearchStore = document.getElementById("searchStore").value;

    let searchQuery = markerLocations.find(item => item.StoreName.toLowerCase() === inputSearchStore.toLowerCase() || item.Address.toLowerCase() === inputSearchStore.toLowerCase());
    console.log(searchQuery);
    if (searchQuery === undefined) {
        searchErrorBox.style.setZIndex = "9999";
        searchErrorBox.style.display = "block";
        return;
    }
    map.flyTo([searchQuery.Longitude, searchQuery.Latitude], 17, { duration: 2, easeLinearity: 5 });
}

function closeError() {
    inputSearchStore = document.querySelector("#searchStore");
    searchErrorBox.style.display = "none";
    inputSearchStore.value = "";

}

btnSearchStore.addEventListener("click", searchStore);
closeButton.addEventListener("click", closeError);

// var element = document.getElementById('searchStore');
// var topPos = element.getBoundingClientRect().top + window.scrollY;
// var leftPos = element.getBoundingClientRect().left + window.scrollX;
// var d = document.getElementById("div1");
// var topPos = d.offsetTop;
// console.log(leftPos);