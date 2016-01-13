// creating a scatterplot

d3.json("./data/total3pointers.json", function(error, data) {
  if (error) throw error;

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800,
      height = 400;

  //
  var svg = d3.select("#scatterplot")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
        return d.years;
      }))
      .range([0, width - margin.left - margin.right]);

  var y = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
        return d.total3pointers;
      }))
      .range([height- margin.top - margin.bottom, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickPadding(2);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickPadding(2);

  var color = d3.scale.category10();

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 70])
    .html(function(d){
        return "<strong>"+ d.player +":</strong> <span style='color:red'>" + d.total3pointers + "</span>";
    });

  svg.call(tip);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")").call(xAxis);
  svg.append("g").attr("class", "y axis").call(yAxis);

  svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("x", width / 8)
      .attr("y", -10)
      .text("Total 3 pointers made");

  // svg.append("text")
  //     .attr("fill", "#414241")
  //     .attr("text-anchor", "end")
  //     .attr("x", width - margin-right)
  //     .attr("y", height)
  //     .text("Years in league");

  var players = svg.selectAll("g.node").data(data, function(d){
    return d.player;
  });

  var playergroup = players.enter().append("g").attr("class", "node")
    .attr('transform', function(d) {
      return "translate(" + x(d.years) + "," + y(d.total3pointers) + ")";
    });

  playergroup.append("circle")
    .attr("r", 5)
    .attr("class", "dot")
    .style("fill", function(d) {
      return color(d.player);
    });

    svg.selectAll("circle")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on("click", function(d) {
      document.getElementById("selectedplayer").innerHTML = d.player;
    });

  svg.selectAll('.axis line, .axis path')
     .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'});

});
