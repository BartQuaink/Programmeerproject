// linegraph with stats for total 3FG and 3FG%/efficiency

var player = document.getElementById("selectedplayer");
console.log(player);

d3.json("./data/new3pointers.json", function(error, data){
  if (error) throw error;

  // total3fg = [];
  // efficiency = [];
  //
  // for (var i in player) {
  //   total3fg.push(player[i][0]);
  //   efficiency.push(player[i][1]);
  // }
  //
  // console.log(total3fg);
  // console.log(efficiency);

  // player = data.stephencurry;
  // console.log(player);

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .range([0,width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  // ------------ CREATING 3FG LINE GRAPH --------------------- //

  var svg = d3.select("#linegraph")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var line = d3.svg.line()
    .interpolate("basis")
    .x( function (d) { return x(d.year); })
    .y( function (d) { return y(d.tot3fg); });

  color.domain(data.Data.map(function (d) { return d.player; }));

  var players = data;

  var minX = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.year; }); });
  var maxX = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.year; }); });
  var minY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.tot3fg; }); });
  var maxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.tot3fg; }); });

  x.domain([minX, maxX]);
  y.domain([minY, maxY]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Total 3FG");

  var playerdata = svg.selectAll(".playerdata")
    .data(players)
    .enter().append("g")
    .attr("class", "playerdata");

  playerdata.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(d.Data);
    })
    .style("stroke", function (d) {
      return color(d.player);
    });

  playerdata.append("text")
    .datum(function (d) {
      return {
        name: d.player,
        year: d.year[d.Data.length -1].year,
        tot3fg: d.Data[d.Data.length -1].tot3fg
      };
    })
    .attr("transform", function (d) {
      return "translate(" + x(d.year) + "," + y(d.value) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function (d) {
      return d.name;
    });


  // ------------------ CREATING EFFICIENCY LINE GRAPH --------------------//

  var effsvg = d3.select("#efficiency")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
});
