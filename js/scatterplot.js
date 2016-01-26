// creating a scatterplot

// https://github.com/wbkd/d3-extended for this function
d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

d3.json("./data/total3pointers.json", function(error, data) {
  if (error) throw error;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html(function(d){
        return "<strong>"+ d.player +":</strong> <span style='color:red'>" + d.total3pointers + "</span>";
    });

  var margin = {top: 20, right: 20, bottom: 45, left: 40},
      width = 800,
      height = 400;

  //
  var svg = d3.select("#scatterplot")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(tip);

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

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")").call(xAxis);
  svg.append("g").attr("class", "y axis").call(yAxis);

  svg.append("text")
      .attr("fill", "#414241")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .text("Total 3FG");

  svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right - margin.left)
      .attr("y", height - margin.top)
      .text("Years in league");

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
    .style("fill", "grey");

    svg.selectAll("circle")
    .on("click", function(d) {
      selectedplayer = document.getElementById("selectedplayer").innerHTML = d.player;
      d3.select('"' + "#" + selectedplayer + '"').attr("r", 10).style("stroke", "red");
      d3.select("#joejohnson").attr("r", 10).style("stroke", "red");
    });

    selectedplayer = "stephencurry";
    selectedplayercode = "201939";

    svg.selectAll("circle")
    .on('mouseover', function() {
      d3.select(this).attr("r", 10);
      d3.select(this).style("fill", "red");
      this.parentNode.appendChild(this);
    })
    .on('mouseout', function(d){
      d3.select(this).attr("r", 5);
      d3.select(this).style("fill", "grey");
      // var nextSibling = d3.select("#circle-"+(d+1)).node();
      //   this.parentNode.insertBefore(this, nextSibling);
    })
    .on("click", function(d) {
      d3.select('#' + selectedplayer).style("stroke", "lightgrey");
      d3.select('#line' + selectedplayer).style("stroke", "lightgrey");

      d3.select("#linetext" + selectedplayer).style("stroke", "lightgrey");
      d3.select("#efflinetext" + selectedplayer).style("stroke", "lightgrey");

      selectedplayer = document.getElementById("selectedplayer").innerHTML = d.player;
      document.getElementById("selectedplayercode").innerHTML = d.playercode;
      // playerid = document.getElementByID

      d3.select('#' + selectedplayer).attr("r", 10).style("stroke", "red");
      d3.select('#line' + selectedplayer).attr("r", 10).style("stroke", "red");
      d3.select("#linetext" + selectedplayer).style("stroke", "red");
      d3.select("#efflinetext" + selectedplayer).style("stroke", "red");

      svg.select('line#' + selectedplayer).moveToFront();
      svg.select('#' + selectedplayer).moveToFront();
    });

    svg.selectAll("circle")
      .append("text")
      .attr("id", function(d){
                return "scatterplottext" +  d.player;
              })
        .style("stroke", "black")
        .datum(function (d) {
          return {
            name: d.player,
            years: d.years,
            total3pointers: d.total3pointers
          };
        })
        .attr("transform", function (d) {
          return "translate(" + x(d.years) + "," + y( d.total3pointers) + ")";
        })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function (d) {
          return d.name + ": " + d.total3pointers;
        });

  svg.selectAll('.axis line, .axis path')
     .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'});

});
