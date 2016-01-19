// linegraph with stats for total 3FG and 3FG%/efficiency

// curry 2015/2016: "tot3fg": 150,

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};


d3.json("./data/new3pointers.json", function(error, data){
  if (error) throw error;

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

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 70])
    .html(function(d){
        return "<strong>"+ d.player +":</strong> <span style='color:red'>" + d.Data.tot3fg + "</span>";
    });

  // ------------ CREATING 3FG LINE GRAPH --------------------- //

  var line = d3.svg.line()
    .interpolate("linear")
    .x( function (d) { return x(d.year); })
    .y( function (d) { return y(d.tot3fg); });

  var svg = d3.select("#linegraph")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  color.domain(data.map(function (d) { return d.player; }));

  var players = data;

  var minX = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.year; }); });
  var maxX = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.year; }); });
  var minY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return +d.tot3fg; }); });
  var maxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return +d.tot3fg; }); });

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
    .enter()
    .append("g")
    .attr("class", "playerdata");

  playerdata.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(d.Data);
    })
    .attr("id", function(d){
                return "line" +  d.player;
              })
    .style("stroke", "lightgrey")
    .on("mouseover", function(d) {
      if(this.style.stroke !== "red" ) {
        d3.select(this).attr("r", 10).style("stroke", "green");
        this.parentNode.appendChild(this);
      }
    })
    .on("mouseout", function(d) {
      if(this.style.stroke !== "red" ) {
        d3.select(this).attr("r", 5.5).style("stroke", "lightgrey");
      }
    });

  // playerdata.append("text")
  //   .datum(function (d) {
  //     return {
  //       name: d.player,
  //       year: d.Data[d.Data.length -1].year,
  //       tot3fg: d.Data[d.Data.length -1].tot3fg
  //     };
  //   })
  //   .attr("transform", function (d) {
  //     return "translate(" + x(d.year) + "," + y(d.value) + ")";
  //   })
  //   .attr("x", 3)
  //   .attr("dy", ".35em");
    // .text(function (d) {
    //   return d.name;
    // });

    svg.selectAll("line")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);


  // ------------------ CREATING EFFICIENCY LINE GRAPH --------------------//

  var effy = d3.scale.linear()
    .range([height,0]);

  var effyAxis = d3.svg.axis()
    .scale(effy)
    .orient("left");

  var effline = d3.svg.line()
    .interpolate("linear")
    .x( function (d) { return x(d.year); })
    .y( function (d) { return effy(+d.percentage); });

  var effsvg = d3.select("#efficiency")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height+ margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var effplayers = data;

  var effminY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return +d.percentage; }); });
  var effmaxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return +d.percentage; }); });

  x.domain([minX, maxX]);
  effy.domain([effminY, effmaxY]);

  effsvg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  effsvg.append("g")
    .attr("class", "y axis")
    .call(effyAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Efficiency");

  var effplayerdata = effsvg.selectAll(".effplayerdata")
    .data(effplayers)
    .enter().append("g")
    .attr("class", "effplayerdata");

  effplayerdata.append("path")
    .attr("class", "effline")
    .attr("d", function (d) {
      return effline(d.Data);
    })
    .attr("id", function(d){
                return d.player;
              })
    .style("stroke", "lightgrey")
    .on("mouseover", function(d) {
      if(this.style.stroke !== "red" ) {
        d3.select(this).attr("r", 10).style("stroke", "green");
        d3.select(this).moveToFront();
      }
    })
    .on("mouseout", function(d) {
      if(this.style.stroke !== "red" ) {
        d3.select(this).attr("r", 5.5).style("stroke", "lightgrey");
      }
    });

  effplayerdata.append("text")
    .datum(function (d) {
      return {
        name: d.player,
        year: d.Data[d.Data.length - 1].year,
        efficiency: d.Data[d.Data.length - 1].percentage
      };
    })
    .attr("transform", function (d, i) {
      return "translate(" + x(d.year) + "," + y(d.percentage, i) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function (d) {
      return d.name;
    });

  svg.selectAll('.axis line, .axis path, .axis effline')
   .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'});
});
