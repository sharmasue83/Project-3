 // Select the submit button
 var submit = d3.select("#filter-btn");

 // XXXX window.addEventListener('load', () => {displayTable(data)});
 submit.on("click", handleClick);

 function handleClick() {
 
   // Prevent the page from refreshing
   d3.event.preventDefault();
 
   // Select the input element and get the raw HTML node
   var inputElement = d3.select("#TextEnter");
 
   // Get the value property of the input element
   var inputValue = inputElement.property("value");
 
   // check value
   console.log(inputValue);
   
   // filter data based on input value
   var filteredData = data.filter(DateRow => DateRow.datetime === inputValue);
   
   // run fucntion to display table according to selected data
   displayTable(filteredData);
 };

// Building the function to display table
function displayTable(anyinput){

//selecting body
var tbody = d3.select("tbody");

//empty the table
tbody.html("");

// for each row of filtered data
anyinput.forEach(function(DateRow) {
   // append tr
   var row = tbody.append("tr");
   //append a cell for each [key, value] pair
   Object.entries(DateRow).forEach(function([key, value]) {
    //Append a cell to the row for each value in the weather report object
    var cell = tbody.append("td");
    cell.text(value);
   });
});

};
