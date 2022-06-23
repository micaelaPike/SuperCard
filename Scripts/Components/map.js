async function createMarker() {

    const { default: storeMarker } = await
    import ("/Scripts/Pages/SuperCardMapMarkers.json", {
        assert: {
            type: "json",
        },
    })

    return storeMarker;
}

let map = L.map("map").setView([-31.075604644053644, 24.43222989279748], 5);

let osm = L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jzUEBDy0K2YzaDzSHs7U", {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
});

osm.addTo(map);

let SuperCardIcon = L.icon({
    iconUrl: "/Assets/Logos/SuperCardFavicon.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
})

const markerLocations = await createMarker();

console.log(markerLocations);

// markers
L.marker([-31.0451, 24.4411], { icon: SuperCardIcon }).addTo(map);


markerLocations.forEach(function(item, index) {
    console.log(markerLocations[index].Longitude, markerLocations[index].Latitude);
    L.marker([markerLocations[index].Longitude, markerLocations[index].Latitude], { icon: SuperCardIcon }).addTo(map);

})