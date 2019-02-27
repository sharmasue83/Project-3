
function buildMetadata(sample) {
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(response) {
 
  var panelData = d3.select("#sample-metadata");
  panelData.html("");
 
  var data = Object.entries(response);
  data.forEach(function(item) {
  panelData.append("div").text(item);
 });
 })}

function buildCharts(sample) {
  var sampleData = `/samples/${sample}`;
  
  d3.json(sampleData).then(function(response){
    var topTenOtuIds = response.otu_ids.slice(0,10);
    var topOtuLabels = response.otu_labels.slice(0,10);
    var topTenSampleValues = response.sample_values.slice(0,10);
    var data = [{
      "labels": topTenOtuIds,
      "values": topTenSampleValues,
      "hovertext": topOtuLabels,
      "type": "pie"
    }];
    
  Plotly.newPlot('pie', data);

  d3.json(sampleData).then(function(response){
    var bubbleOtuIds = response.otu_ids;
    var bubbleOuLabels = response.otu_labels;
    var bubbleSampleValues = response.sample_values;

    var bubbleChartData = {
      mode: 'markers',
      x: bubbleOtuIds,
      y: bubbleSampleValues,
      text: bubbleOuLabels,
      marker: {color: bubbleOtuIds, colorscale: 'Rainbow', size: bubbleSampleValues}
    };

    var bblData = [bubbleChartData];

    var layout = {
      showlegend: false,
      height: 600,
      width: 1200
      };
    
    Plotly.newPlot('bubble', bblData, layout); 
  })
})
}function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
