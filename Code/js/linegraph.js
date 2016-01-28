/* linegraph with stats for total 3FG and 3FG%/efficiency
  Data is one dataset with info for 3 pointers for each player in a year.
  From this data, 2 graphs will be made, one for total 3 pointers and on for percentage.
*/
d3.json("./data/new3pointers.json", function(error, data){
  if (error) throw error;

  // create variables for both graphs
  var margin = {top: 20, right: 80, bottom: 50, left: 40},
      width = 1050 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0,width]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  // -------------------------------------- CREATING 3FG LINE GRAPH -------------------------------------- //

  // create y values and y axis
  var y = d3.scale.linear()
      .range([height, 0]);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  // "hold the line" - Toto
  var line = d3.svg.line()
      .interpolate("linear")
      .x( function (d) { return x(d.year); })
      .y( function (d) { return y(d.tot3fg); });

  // create svg for the linegraph with total 3fg
  var svg = d3.select("#linegraph")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("id", "linesvg")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // copy data for total 3fg line graph
  var players = data;

  // set min and max values for the axes, minX and maxX will be used for both graphs
  var minX = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.year; }); });
  var maxX = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.year; }); });
  var minY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return +d.tot3fg; }); });
  var maxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return +d.tot3fg; }); });

  // set domain
  x.domain([minX, maxX]);
  y.domain([minY, maxY]);

  // add x and y axes, and add text to the axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
          .attr("x", width - margin.left)
          .attr("y", 30)
          .style("text-anchor", "end")
          .text("Years in league");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Total 3FG Made");

  // add the data to the svg
  var playerdata = svg.selectAll(".playerdata")
      .data(players)
      .enter()
      .append("g")
          .attr("class", "playerdata");

  // draw the line, add id to the line
  playerdata.append("path")
      .attr("class", "line")
      .attr("d", function (d) {
          return line(d.Data);
      })
      .attr("id", function(d){
          return "line" +  d.player;
      })
    .style("stroke", "lightgrey")
    // on mouseover, highlight selected line and name green, append to svg to show on top
    .on("mouseover", function(d) {
        if (this.style.stroke !== "red") {
            d3.select(this).attr("r", 10).style("stroke", "green");
            d3.select("#linetext" + d.player).style("stroke", "green");

            linetempfile = this.parentNode;
            document.getElementById("linesvg").appendChild(linetempfile);
        }
    })
    // and back to normal when mouse out
    .on("mouseout", function(d) {
        if(this.style.stroke !== "red") {
            d3.select(this).attr("r", 5.5).style("stroke", "lightgrey");
            d3.select("#linetext" + d.player).style("stroke", "lightgrey");
        }
    });

  // add text at end of players line, plus give it an id for coloring
  playerdata.append("text")
      .attr("id", function(d) {
          return "linetext" +  d.player;
      })
      .style("stroke", "lightgrey")
      .datum(function (d) {
          return {
              name: d.player,
              year: d.Data[d.Data.length -1].year,
              tot3fg: d.Data[d.Data.length -1].tot3fg
          };
      })
      .attr("transform", function (d) {
          return "translate(" + x(d.year) + "," + y(d.tot3fg) + ")";
      })
      .attr("x", 3)
      .attr("font-size", "12px")
      .attr("dy", ".35em")
      .text(function (d) {
          return d.name;
      });

  // -------------------------------------- CREATING EFFICIENCY LINE GRAPH -------------------------------------- //

  // create y axis for efficiency line graph
  var effy = d3.scale.linear()
      .range([height,0]);

  // create formatter for percentage
  var formatPercent = d3.format(".0%");

  var effyAxis = d3.svg.axis()
      .scale(effy)
      .orient("left")
      .tickFormat(formatPercent);

  // make the efficiency line
  var effline = d3.svg.line()
      .interpolate("linear")
      .x( function (d) { return x(d.year); })
      .y( function (d) { return effy(+d.percentage); });

  // create svg for the efficiency
  var effsvg = d3.select("#efficiency")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height+ margin.top + margin.bottom)
      .append("g")
          .attr("id", "effsvg")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // get data for the efficiency line
  var effplayers = data;

  // set the min and max y values for the y axis
  var effminY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return +d.percentage; }); });
  var effmaxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return +d.percentage; }); });

  // set domain for y axis
  effy.domain([effminY, effmaxY]);

  // add text to the axes
  effsvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
          .attr("x", width - margin.left)
          .attr("y", 30)
          .style("text-anchor", "end")
          .text("Years in league");

  effsvg.append("g")
      .attr("class", "y axis")
      .call(effyAxis)
      .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Percentage of 3FG made");

  // add data to the svg
  var effplayerdata = effsvg.selectAll(".effplayerdata")
      .data(effplayers)
      .enter()
      .append("g")
          .attr("class", "effplayerdata");

  // draw the line
  effplayerdata.append("path")
      .attr("class", "effline")
      .attr("d", function (d) {
          return effline(d.Data);
      })
      .attr("id", function(d) {
          return "eff" + d.player;
      })
      .style("stroke", "lightgrey")
      // same as before, highlight line and add to top
      .on("mouseover", function(d) {
          if(this.style.stroke !== "red") {
              d3.select(this).attr("r", 10).style("stroke", "green");
              d3.select("#efflinetext" + d.player).style("stroke", "green");

              tempfile = this.parentNode;
              document.getElementById("effsvg").appendChild(tempfile);
          }
      })
      .on("mouseout", function(d) {
          if(this.style.stroke !== "red" ) {
              d3.select(this).attr("r", 5.5).style("stroke", "lightgrey");
              d3.select("#efflinetext" + d.player).style("stroke", "lightgrey");
          }
      });

  // add text to end of lines
  effplayerdata.append("text")
      .attr("id", function(d){
          return "efflinetext" +  d.player;
      })
      .style("stroke", "lightgrey")
      .datum(function (d) {
          return {
              name: d.player,
              year: d.Data[d.Data.length - 1].year,
              percentage: d.Data[d.Data.length - 1].percentage
          };
      })
      .attr("transform", function (d) {
          return "translate(" + x(d.year) + "," + effy( d.percentage) + ")";
      })
      .attr("x", 3)
      .attr("font-size", "12px")
      .attr("dy", ".35em")
      .text(function (d) {
          return d.name;
      });
});
