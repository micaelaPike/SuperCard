let map = L.map("map").setView([-29.087217, 26.154898], 5);

let osm = L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jzUEBDy0K2YzaDzSHs7U", {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
});

osm.addTo(map);