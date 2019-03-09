//////////Creating Autocomplete input
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
  
      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item;
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });
      
      // Update the placeholder text.
      input.placeholder = "e.g. Game of Thrones";
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', '/names', true);
request.send();
 
 

// Select the submit button
var submit = d3.select("#filter-btn");

window.addEventListener('load', () => {buildDescription("Game of Thrones")});
submit.on("click", handleClick);
 

  function handleClick() {
 
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#ajax");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // check value
  console.log(inputValue);
  

  // run fucntion to display table according to selected data
  buildDescription(inputValue);
};

 function buildDescription(anyinput) {

 var url = `/description/${anyinput}`;
  d3.json(url, function(error, data) {
    console.log(url)
    console.log(data.country)
    // Use d3 to select the panel with id of `#tvserie-description`
    var serie_description=d3.select(`#tvserie-description`)
    // Use `.html("") to clear any existing metadata
    serie_description.html("") 
    var row = serie_description.append('p');
    row.html(`<p>Name: ${data.name}</p>
              <p>Genre: ${data.genre}</p>
              <p>Country: ${data.country}</p>
              <p>Language: ${data.language}</p>
              <p>Premiered: ${data.premiered}</p>
              <p>Rating: ${data.rating}</p>
              <p>Summary: </p>
              ${data.summary}`);
    var serie_image=d3.select(`#tvserie-image`)
    serie_image.attr("src", data.image)
    });
  };
