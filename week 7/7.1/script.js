function init() {
    var margin = {top: 10, right: 20, bottom: 30, left: 50},
        w = 600 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y-%m");

    var x = d3.scaleTime().range([0, w]),
        y = d3.scaleLinear().range([h, 0]);

    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y);

    var area = d3.area()
        .x(function(d) { return x(d.date); })
        .y0(h)
        .y1(function(d) { return y(d.number); });

    var svg = d3.select("#chart").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("Unemployment_78-95.csv", function(d) {
        d.date = parseDate(d.year + '-' + d.month);
        d.number = +d.number;
        return d;
    }).then(function(data) {
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.number; })]);

        svg.append("path")
           .data([data])
           .attr("class", "area")
           .attr("d", area);

        svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + h + ")")
           .call(xAxis);

        svg.append("g")
           .attr("class", "y axis")
           .call(yAxis);

        svg.append("line")
           .attr("class", "halfMillionMark")
           .attr("x1", 0)
           .attr("y1", y(500000))
           .attr("x2", w)
           .attr("y2", y(500000));

        svg.append("text")
           .attr("class", "halfMillionLabel")
           .attr("x", 0)
           .attr("y", y(500000) - 7)
           .text("Half a million unemployed");
    });
}
init();
