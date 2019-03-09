// svg placement
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 100,
  bottom: 200,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('#barchart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

var chart = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('/all').then((shows) => {

  // function to count the number of shows based on a given column 
  function count_shows_by(column) {
    return shows.reduce((count, row) => {
        var val = row[column];
        if (!count.hasOwnProperty(val)) {
          count[val] = 0;
        };
        count[val]++;
        return count;
      }, {});
  }
  
  // function to get the average rating based on a given column 
  function get_avg_rating_by(column) {
    var counts = count_shows_by(column);
    var sums = shows.reduce((sum, row) => {
        var val = row[column];
        if (!sum.hasOwnProperty(val)) {
          sum[val] = 0;
        };
        sum[val] += row.rating;
        return sum;
      }, {});
    avgs = Object.values(sums).map(function(n, i) { return n / Object.values(counts)[i]; });
    return Object.keys(sums).reduce((o, k, i) => ({...o, [k]: avgs[i]}), {});
  }
  
  // get year based on premiere date
  shows.forEach(function (show) {
    var date = new Date(show.premiered);
    show['year'] = date.getFullYear();
  });

  // build bar chart based on a chosen x-axis
  function buildChart(x) {

    // clear existing chart
    chart.html('')

    // get count of shows, filter out NaN, and re-format as array of objects
    var counts = count_shows_by(x);
    var counts_data = Object.keys(counts).filter(key => key.toLowerCase() !== 'nan').map(key => ({[x]: key, count: counts[key]}));
    
    // get average ratings, filter out NaN, and re-format as array of objects
    var ratings = get_avg_rating_by(x);
    var ratings_data = Object.keys(ratings).filter(key => key.toLowerCase() !== 'nan').map(key => ({[x]: key, rating: ratings[key].toFixed(2)}));

    // scales
    var xScale = d3.scaleBand()
      .range([0, width])
      .domain(counts_data.map((d) => d[x]))
      .padding(0.4);
    
    var y1Scale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(counts_data, d => d.count)]);

    var y2Scale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 10]);

    //var makeYLines = () => d3.axisLeft()
     // .scale(y1Scale);

    // axes
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')  
        .style('text-anchor', 'end')
        .style('fill', 'white')  
        .style('font-size', '10px')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');

    chart.append('g')
      .call(d3.axisLeft(y1Scale))
      .selectAll('text')  
        .style('fill', '#FFA07A')  
        .style('font-size', '10px');

    chart.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(y2Scale))
      .selectAll('text')  
        .style('fill', '#58F783')  
        .style('font-size', '10px')

  //  chart.append('g')
 //     .attr('class', 'grid')
 //     .call(makeYLines()
 //       .tickSize(-width, 0, 0)
 //       .tickFormat('')
  //    )

    // count bars
    var barGroups1 = chart.selectAll()
      .data(counts_data)
      .enter()
      .append('g')

    barGroups1
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[x]))
      .attr('y', (d) => y1Scale(d.count))
      .attr('height', (d) => height - y1Scale(d.count))
      .attr('width', xScale.bandwidth()/2)
      .attr('fill', '#FFA07A')
      .on('mouseenter', function (actual) {
        
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (d) => xScale(d[x]) - 5)
          .attr('width', xScale.bandwidth()/2 + 10);
        
        chart.append('text')
            .attr('id', 'ytext')
            .attr('x', xScale(actual[x]))
            .attr('y', y1Scale(actual.count) - 10)
            .style('fill', 'white')
            .text(actual.count);

        chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y1Scale(actual.count))
          .attr('x2', xScale(actual[x]))
          .attr('y2', y1Scale(actual.count))
          .style('stroke', 'white')
          .style('stroke-dasharray', '5 5');
      })
      .on('mouseleave', function () {
        
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a[x]))
          .attr('width', xScale.bandwidth()/2)

        chart.selectAll('#limit').remove();
        chart.selectAll('#ytext').remove();
      })

      // ratings bars
      var barGroups2 = chart.selectAll()
        .data(ratings_data)
        .enter()
        .append('g')

      barGroups2
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d[x])+xScale.bandwidth()/2)
        .attr('y', (d) => y2Scale(d.rating))
        .attr('height', (d) => height - y2Scale(d.rating))
        .attr('width', xScale.bandwidth()/2)
        .attr('fill', '#58F783')
        .on('mouseenter', function (actual) {
          
          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (d) => xScale(d[x])+xScale.bandwidth()/2 - 5)
            .attr('width', xScale.bandwidth()/2 + 10);
          
          chart.append('text')
              .attr('id', 'ytext')
              .attr('x', xScale(actual[x]))
              .attr('y', y2Scale(actual.rating) - 10)
              .style('fill', 'white')
              .text(actual.rating);

          chart.append('line')
            .attr('id', 'limit')
            .attr('x1', xScale(actual[x])+xScale.bandwidth()/2)
            .attr('y1', y2Scale(actual.rating))
            .attr('x2', width)
            .attr('y2', y2Scale(actual.rating))
            .style('stroke', 'white')
            .style('stroke-dasharray', '5 5');
        })
        .on('mouseleave', function () {
          
          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (d) => xScale(d[x])+xScale.bandwidth()/2)
            .attr('width', xScale.bandwidth()/2)

          chart.selectAll('#limit').remove();
          chart.selectAll('#ytext').remove();
        })
  }

  // y-axis labels
  svg.append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2))
    .attr('y', margin.left / 3)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Number of shows')
    .style('fill', '#FFA07A')  
    .style('font-size', '15px');

  svg.append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2))
    .attr('y', margin.left + width + margin.right / 2)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Average rating')
    .style('fill', '#58F783')  
    .style('font-size', '15px');

  // x-axis labels
  svg.append('text')
    .attr('class', 'xlabel')
    .attr('x', width / 2 + margin.left)
    .attr('y', height + margin.bottom - 60)
    .attr('text-anchor', 'middle')
    .text('Genre')
    .style('fill', 'white')  
    .style('font-size', '15px')
    .on('mouseover', function() { d3.select(this).style('cursor', 'pointer') })
    .on('click', function() { 
      d3.selectAll('.xlabel').attr('opacity', .5);
      d3.select(this).attr('opacity', 1);
      buildChart('genre', 'ratings');
     });

  svg.append('text')
    .attr('class', 'xlabel')
    .attr('x', width / 2 + margin.left)
    .attr('y', height + margin.bottom - 40)
    .attr('text-anchor', 'middle')
    .text('Country')
    .style('fill', 'white')  
    .style('font-size', '15px')
    .attr('opacity', .5)
    .on('mouseover', function() { d3.select(this).style('cursor', 'pointer') })
    .on('click', function() { 
      d3.selectAll('.xlabel').attr('opacity', .5);
      d3.select(this).attr('opacity', 1);
      buildChart('country', 'ratings') 
    });

  svg.append('text')
    .attr('class', 'xlabel')
    .attr('x', width / 2 + margin.left)
    .attr('y', height + margin.bottom - 20)
    .attr('text-anchor', 'middle')
    .text('Year')
    .style('fill', 'white')  
    .style('font-size', '15px')
    .attr('opacity', .5)
    .on('mouseover', function() { d3.select(this).style('cursor', 'pointer') })
    .on('click', function() { 
      d3.selectAll('.xlabel').attr('opacity', .5);
      d3.select(this).attr('opacity', 1);
      buildChart('year', 'ratings');
     });
    
  buildChart('genre');

});