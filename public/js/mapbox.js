const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FodXJ0YXJvIiwiYSI6ImNsY3o1cDFsaDFiMmUzcHQ3d3lrcHU3dWkifQ.Y3gP_HppOYulqIs7W7aZdQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/sahurtaro/clczrfuyg001k14npghphsdi4',
  // scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 4,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
