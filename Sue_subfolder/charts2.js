
const xhttp = new XMLHttpRequest();

url = "/all"
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    console.log(data);
    var tvGenre = d3.nest().key(function(d){
    return d.genre; 
    })
    .rollup(function(v) {return v.length;})
    .entries(data);
    console.log(JSON.stringify(tvGenre));
    var tvRatings = d3.nest()
    .key(function(d){
      return d.genre;
    })
    .rollup(function(v){ return d3.mean(v, function(d){return d.rating;});})
    .entries(data);
    console.log(JSON.stringify(tvRatings));
    //Add data to blank svg
    var maxAmount = 0;
    for (var i =0; i< tvGenre.length; i++){
      console.log(tvGenre[i]);
      //console.log(tvGenre[i]["key"]);
      //console.log(tvGenre[i]["value"]);
      if (maxAmount < tvGenre[i]['value']){
        maxAmount = tvGenre[i]['value'];
      }
    }
    var xVal = []
    var yVal = []
    for (var i=0; i < tvGenre.length; i++) {
      xVal.push(tvGenre[i]["key"]);
      yVal.push(tvGenre[i]["value"]);

      
    }
    console.log(xVal);
    console.log(yVal);

    maxAmount = Math.ceil(maxAmount/10)*10;
    console.log(maxAmount);
    const svg = d3.select("svg"), 
    margin = {top: 20, right: 20, bottom: 30, left: 40}, 
    width = +svg.attr("width") - margin.left - margin.right, 
    height = +svg.attr("height") - margin.top - margin.bottom, 
    x = d3.scaleBand().rangeRound([0, width]).padding(0.2), 
    y = d3.scaleLinear().rangeRound([height, 0]), 
    g = svg.append("g") 
    .attr("transform", `translate(${margin.left},${margin.top})`); 
    x.domain(tvGenre.map(d => d.key)); 
    y.domain([0, d3.max(tvGenre, d => d.value)]); 
    
    g.append("g") 
    .attr("class", "axis axis-x") 
    .attr("transform", `translate(0,${height})`) 
    .call(d3.axisBottom(x)); 
    g.append("g") 
    .attr("class", "axis axis-y") 
    .call(d3.axisLeft(y).ticks(10));

    g.selectAll(".bar") 
    .data(tvGenre) 
    .enter().append("rect") 
    .attr("class", "bar") 
    .attr("x", d => x(d.key)) 
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value));






  }




};


xhttp.open("GET", url, true);
xhttp.send();


//

// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 500;
var heightPad = 50;
var widthPad = 50;
// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};
//Setup blank svg
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#conatinerChart")
  .append("svg")
  .attr("height", svgHeight + (heightPad*2))
  .attr("width", svgWidth +(widthPad *2))
  .append("g")
  .attr("transform","translate(" + widthPad + "," + heightPad+  ")");

  

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


  
  
/*
function tvShow(){
  //add data route
  var url = "/description/Bitten"

  d3.json(url).then(function(error, data){

    console.log(data);
    
  });
}


function buildPlot() {
  var url1 = "/all"

  d3.json(url1)
  .then(function(i,d){
    console.log(d);
    
      
    });
  }


tvShow()

buildPlot()

*/