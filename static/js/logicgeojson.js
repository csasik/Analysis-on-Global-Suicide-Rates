// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.write( "Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat=position.coords.latitude ;
    let longi=position.coords.longitude;

let pos=[lat,longi];
const myMap =L.map("mapgeo", {
    center: pos,
    zoom: 13
  });

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
function hospitals(feature,layer){
  layer.bindPopup("<h3 align='center'>" + feature.properties.NAME +
  "</h3><hr><p>" + feature.properties.CITY + "</p>");
 };
L.geoJson(convertcsv,{
  onEachFeature:hospitals
}).addTo(myMap);
const marker = L.marker(pos, {
    draggable: true,
    color: 'black',
    title: "Your Location"
  }).addTo(myMap);
  
  // Binding a pop-up to our marker
  marker.bindPopup("You are Here!");
}
