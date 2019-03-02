var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#barchart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json("/all").then((shows) => {

  // function to count the number of shows based on a given key 
  function count_shows_by(column) {
    var counts = shows.reduce((count, row) => {
        var val = row[column];
        if (!count.hasOwnProperty(val)) {
          count[val] = 0;
        }
        count[val]++;
        return count;
      }, {});
    return counts;
  }

  // function to get the average rating based on a given key 
  function get_avg_rating_by(column) {
    var avgs = shows.reduce(([count, sum], row) => {
        var val = row[column];
        if (!sum.hasOwnProperty(val)) {
          count[val] = 0;
          sum[val] = 0;
        }
        count[val]++;
        sum[val] += row.rating;
        return sum/count;
      }, {});
    return avgs;
  }
  
    //    a.sum[val] = a.sum[val] + parseFloat(row.rating)


  counts_by_country = count_shows_by("country");
  avg_by_country = get_avg_rating_by("country");


  console.log(counts_by_country);
  console.log(avg_by_country);

});
/*	// cast types
    data.forEach(function(state) {
      state.healthcare = +state.healthcare;
      state.poverty = +state.poverty;
    });

    // scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.healthcare), d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // axes
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

	chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2) - 40)
      .attr("dy", "1em")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2 - 30}, ${height + margin.top + 30})`)
      .text("In Poverty (%)");
    
    // circles
    var circles = chartGroup.selectAll("g.circles");

    circles = circles.data(data)
            .enter()
            .append("g")
            .classed("circles", true)
            .attr("transform", d => "translate("+ [xLinearScale(d.poverty), yLinearScale(d.healthcare)] + ")");

    circles.append("circle")
    	.attr("r", "15")
   		.attr("fill", "lightblue")
   		.attr("opacity", ".5");

   	circles.append("text")
        .text(d => d.abbr)
    	.attr("font-size", "13px")
     	.attr("text-anchor", "middle");
    
    // tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .style("background", "orange")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    chartGroup.call(toolTip);

    circles.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
*/
