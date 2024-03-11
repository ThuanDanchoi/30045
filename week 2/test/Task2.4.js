
var w = 500;
var h = 100;
var barpadding = 1;

 
d3.csv("Task_2.4_data.csv").then(function(data) {
    console.log(data);
    wombatSightings = data;
    barChart(wombatSightings);  
});
function barChart(data) {
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length);
        })
        .attr("y", function(d) {
            return h - (d.wombats * 4);
        })
        .attr("width", w / wombatSightings.length - barpadding)
        .attr("height", function(d) {
            return d.wombats * 4;
        })
        .attr("fill", function(d) {
             
            var brownValue = Math.round(d.wombats * 5);  
            return "rgb(139, " + brownValue + ", " + brownValue + ")";
        });
        
        
        
}


window.onload = barChart();
