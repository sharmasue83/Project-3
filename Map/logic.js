// Create a map object
var myMap = L.map("map", {
  center: [20.0, 5.0],
  zoom: 3,
  minZoom:2
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each country's name, location, and total number of Tv series
var cities = [{
  location: [-25.274,	133.775],
  name: "Australia",
  Number_of_shows: "63"
},
{
  location: [50.503, 4.469],
  name: "Belgium",
  Number_of_shows: "2"
},
{
  location: [56.130,-106.346],
  name: "Canada",
  Number_of_shows: "88"
},
{
  location: [56.26392,9.50178],
  name: "Denmark",
  Number_of_shows: "10"
},
{
  location: [46.2276,2.213],
  name: "France",
  Number_of_shows: "17"
},
{
  location: [51.165691,10.451526],
  name: "Germany",
  Number_of_shows: "5"
},
{
  location: [47.162494, 19.50330],
  name: "Hungary",
  Number_of_shows: "1"
},
{
  location: [64.963051, -19.020835],
  name: "Iceland",
  Number_of_shows: "1"
},
{
  location: [53.41291,-8.24389],
  name: "Ireland",
  Number_of_shows: "9"
},
{
  location: [31.046051,34.8516],
  name: "Israel",
  Number_of_shows: "4"
},
{
  location: [41.87194,12.56738],
  name: "Italy",
  Number_of_shows: "3"
},
{
  location: [36.204824,138.252924],
  name: "Japan",
  Number_of_shows: "157"
},
{
  location: [35.907757,127.766922],
  name: "Korea",
  Number_of_shows: "55"
},
{
  location: [52.132633, 5.291266],
  name: "Netherlands",
  Number_of_shows: "3"
},
{
  location: [-40.900557, 174.885971],
  name: "New Zealand  ",
  Number_of_shows: "5"
},
{
  location: [60.472024, 8.468946],
  name: "Norway",
  Number_of_shows: "9"
},
{
  location: [51.919438,19.145136],
  name: "Poland",
  Number_of_shows: "2"
},
{
  location: [61.5241, 105.31],
  name: "Russia",
  Number_of_shows: "13"
},
{
  location: [1.3520831, 103.81983],
  name: "Singapore",
  Number_of_shows: "1"
},
{
  location: [40.463667, -3.74922],
  name: "Spain",
  Number_of_shows: "7"
},
{
  location: [60.128161, 18.643501],
  name: "Sweeden",
  Number_of_shows: "9"
},
{
  location: [38.963745, 35.243322],
  name: "Turkey",
  Number_of_shows: "4"
},
{
  location: [48.379433, 31.16558],
  name: "Ukraine",
  Number_of_shows: "2"
},
{
  location: [55.378051,	-3.435973],
  name: "United Kingdom",
  Number_of_shows: "525"
},
{
  location: [37.09024,-95.712891],
  name: "United States",
  Number_of_shows: "1754"
}
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Total Web Series:  " + city.Number_of_shows + "</h3>")
    .addTo(myMap);
}
