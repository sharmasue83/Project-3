console.log('hello')

/// Create a map object
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
   /*
   // An array containing each country's name, location
   var cities = [{
    location: [-25.274,    133.775],
    name: "Australia"
   },
   {
    location: [50.503, 4.469],
    name: "Belgium"
   },
   {
    location: [56.130,-106.346],
    name: "Canada"
   },
   {
    location: [56.26392,9.50178],
    name: "Denmark"
   },
   {
    location: [46.2276,2.213],
    name: "France"
   },
   {
    location: [51.165691,10.451526],
    name: "Germany"
   },
   {
    location: [47.162494, 19.50330],
    name: "Hungary"
   },
   {
    location: [64.963051, -19.020835],
    name: "Iceland"
   },
   {
    location: [53.41291,-8.24389],
    name: "Ireland"
   },
   {
    location: [31.046051,34.8516],
    name: "Israel"
   },
   {
    location: [41.87194,12.56738],
    name: "Italy"
   },
   {
    location: [36.204824,138.252924],
    name: "Japan"
   },
   {
    location: [35.907757,127.766922],
    name: "Korea"
   },
   {
    location: [52.132633, 5.291266],
    name: "Netherlands"
   },
   {
    location: [-40.900557, 174.885971],
    name: "New Zealand  "
   },
   {
    location: [60.472024, 8.468946],
    name: "Norway"
   },
   {
    location: [51.919438,19.145136],
    name: "Poland"
   },
   {
    location: [61.5241, 105.31],
    name: "Russia"
   },
   {
    location: [1.3520831, 103.81983],
    name: "Singapore"
   },
   {
    location: [40.463667, -3.74922],
    name: "Spain"
   },
   {
    location: [60.128161, 18.643501],
    name: "Sweeden"
   },
   {
    location: [38.963745, 35.243322],
    name: "Turkey"
   },
   {
    location: [48.379433, 31.16558],
    name: "Ukraine"
   },
   {
    location: [55.378051,    -3.435973],
    name: "United Kingdom"
   
   },
   {
    location: [37.09024,-95.712891],
    name: "United States"
   }
   ];
   
   d3.json("/all").then((error, shows) => {
       console.log(shows)
   
    // function to count the number of shows based on a given key
    function count_shows_by(column) {
      return shows.reduce((count, row) => {
          var val = row[column];
          if (!count.hasOwnProperty(val)) {
            count[val] = 0;
          }
          count[val]++;
          return count;
        }, {});
    }
   })
   
   // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
   for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    L.marker(city.location)
      .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Total web sereies : " + city.count + "</h3>")
      .addTo(myMap);
   }
   */