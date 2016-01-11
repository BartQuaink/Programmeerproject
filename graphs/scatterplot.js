var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    pad = 20,
    left_pad = 100,
    Data_url = './data/3pointers.json';

var svg = d3.select("scatterplot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var x = d3.scale.linear()
    .domain([0,25])
    .range([left_pad, width]);

var y = d3.scale.linear()
    .domain([0,3000])
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(24);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");



svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, "+(height-pad)+")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+(left_pad-pad)+", 0)")
    .call(yAxis);


// d3.json("./data/3pointers.json", function(error, data) {
//   if (error) throw error;
//
//   data.forEach(function(d) {
//     d.sepalLength = +d.sepalLength;
//     d.sepalWidth = +d.sepalWidth;
//   });
//
//   x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
//   y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
//
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("x", width)
//       .attr("y", -6)
//       .style("text-anchor", "end")
//       .text("Sepal Width (cm)");
//
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Sepal Length (cm)");
//
//   svg.selectAll(".dot")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "dot")
//       .attr("r", 3.5)
//       .attr("cx", function(d) { return x(d.sepalWidth); })
//       .attr("cy", function(d) { return y(d.sepalLength); })
//       .style("fill", function(d) { return color(d.species); });
//
//   var legend = svg.selectAll(".legend")
//       .data(color.domain())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);
//
//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) { return d; });
//
// });
