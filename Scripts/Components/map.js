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
let osm = L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jzUEBDy0K2YzaDzSHs7U", {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
});

osm.addTo(map);

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