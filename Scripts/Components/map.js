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

//Create Icon Object
let SuperCardIcon = L.icon({
    iconUrl: "/Assets/Logos/SuperCardFavicon.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popUpAnchor: [0, 0]
})

//Map View on Load
let map = L.map("map").setView([-28.0046, 26.7732], 5);

//Map Layers
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

OpenStreetMap_Mapnik.addTo(map);

//Change Map View
// let btnLayerChange = document.querySelector("#btnLayerChange");
// let osm = true;

// btnLayerChange.addEventListener("click", changeLayer);

// function changeLayer() {

//         let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     OpenStreetMap_Mapnik.addTo(map);
// }

//     let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//         maxZoom: 19,
//         attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//     });

//     Esri_WorldImagery.addTo(map);


const markerLocations = await createMarker();

//Marker load confirmation
//console.log(markerLocations);

//Central Marker
// L.marker([-28.0046, 26.7732], { icon: SuperCardIcon })
//     .bindPopup("Central Marker").addTo(map);

//Markers
markerLocations.forEach(function(item, index) {
    console.log(markerLocations[index].Longitude, markerLocations[index].Latitude);
    L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: SuperCardIcon })
        .bindPopup(`${markerLocations[index].StoreName.bold()} <br>
        ${markerLocations[index].Address}`)
        .addTo(map);
});