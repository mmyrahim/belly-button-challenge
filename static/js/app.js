// json url provided
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// retrive json data and log it
d3.json(url).then(function(data) {
    console.log(data);
  });


// initializing the dashboard at start up
function init() {

    

// create drop down menu
    let dropdownMenu = d3.select("#selDataset");

    

// get sample names to use in drop down menu and set as variable from the url provided
    d3.json(url).then((data) => {
        
        let dataNames = data.names;
        dataNames.forEach((id) => {
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        

// get first sample from list and log it's ID
        let testSubject = dataNames[0];

        console.log(testSubject);

        

// build out the initial dashboard view for the first sample
        demographicInfo(testSubject);
        barChart(testSubject);
        bubbleChart(testSubject);
    });
};


// function to build demographic data fetches and displays the demographic metadata for a given sample
function demographicInfo(sample) {

    

// retrive json data from the url
    d3.json(url).then((data) => {

        

// set variables for demographic data and log and extract the metadata for the selected sample
        let metadata = data.metadata;
        let resultID = metadata.filter(result => result.id == sample);
        console.log(resultID)

        let firstID = resultID[0];

        

// clear out the existing metadata display
        d3.select("#sample-metadata").html("");

        

// add each key/value pair to the chart and log as they are being appended to the metadata display section
Object.entries(firstID).forEach(([key,resultID]) => {
    console.log(key,resultID);
    d3.select("#sample-metadata").append("h5").text(`${key}: ${resultID}`);
});
});

};


// function to build bar chart
function barChart(sample) {



// retriveing json data
d3.json(url).then((data) => {
        

// set variables for bar chart and log
let dataSamples = data.samples;
let resultID = dataSamples.filter(result => result.id == sample);
let firstID = resultID[0];
let otu_ids = firstID.otu_ids;
let otu_labels = firstID.otu_labels;
let sample_values = firstID.sample_values;

console.log(otu_ids,otu_labels,sample_values);



// set up variables to graph (show in descending order)
let y_axis = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
let x_axis = sample_values.slice(0,10).reverse();
let labels = otu_labels.slice(0,10).reverse();



// create trace for bar chart
let colors = ['#FF33A1', '#FF5733', '#33FF57','#33FFA1', '#33A1FF', '#A1FF33', '#A133FF', '#A1FFA1', '#5733FF', '#FFA133',] 
let traceBar = {
    type: "bar",
    orientation: "h",
    x: x_axis,
    y: y_axis,
    text: labels,
    mode: "markers",
    marker: {
        color: colors
    }            
};



// creatiing layout for bar chart
let layout = {
    title: {
        text: "<b>top OTUs (up to 10) found in test subjects</b>",
        font: {color: "black", size: 14}
    },
    width: 600,
    height: 475
};



// plot the data into bar chart
Plotly.newPlot("bar", [traceBar], layout)
});
};


// function to build bubble chart
function bubbleChart(sample) {



// retrive json data
d3.json(url).then((data)
