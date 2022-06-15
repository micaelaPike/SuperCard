mapboxgl.accessToken = 'pk.eyJ1IjoibWljYWVsYS1zYWJpc3MiLCJhIjoiY2w0ZmY0cW1nMDA2YTNqcG0xcWV3YmRhOCJ9.Y4ZMenp1rJ7DLu40QkYjXA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [28.034088, -26.195246],
    zoom: 4.5
});