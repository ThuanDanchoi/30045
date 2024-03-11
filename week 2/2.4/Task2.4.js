// set the width and height of the chart, define padding between bars
var w = 500;
var h = 100;
var barpadding = 1;

// load data from a csv file 
d3.csv("Task_2.4_data.csv").then(function(data) {
    console.log(data);
    wombatSightings = data;
    barChart(wombatSightings);  // call bar function and loaded data
});

// define barChart function
function barChart() {
    var svg = d3.select("#chart") // append svg element
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        // bind data to rectangle elements and perform data-driven operations
    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")

        // set the x-coordinate of each bar dataset
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length);
        })

        // set the y-coordinate of each bar base on data
        .attr("y", function(d) {
            return h - (d.wombats * 4);
        })

        // set the width of each bar, accounting for padding between bars
        .attr("width", w / wombatSightings.length - barpadding)

        // set the height of each bar based on data
        .attr("height", function(d) {
            return d.wombats * 4;
        })

        // set the fill color of each bar based on data
        .attr("fill", function(d) {
            return "rgb(0, " + Math.round(d.wombats * 10) + ", " + Math.round(d.wombats * 5) + ")";
        });
}

// call the barChart function when the window has finished loading
window.onload = barChart();
