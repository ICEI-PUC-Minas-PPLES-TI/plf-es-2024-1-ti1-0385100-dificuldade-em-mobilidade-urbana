const map = L.map('map').setView([-19.922755, -43.945159], 15);
let markersGroup = L.layerGroup().addTo(map);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=', {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarkers(stops) {
    markersGroup.clearLayers();
    let bounds = L.latLngBounds();
    
    stops.forEach(stop => {
        const marker = L.marker([stop.latitude, stop.longitude]).addTo(markersGroup);
        marker.bindPopup(`<b>${stop.endereco}</b><br>ID: ${stop.id}`);
        bounds.extend(marker.getLatLng());
    });

    if (bounds.isValid()) {
        map.fitBounds(bounds, {
            padding: [50, 50],
            animate: true,
            duration: 3.0
        });
    }
}