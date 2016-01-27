// creating a scatterplot
d3.json("./data/total3pointers.json", function(error, data) {
  if (error) throw error;

  var margin = {top: 50, right: 150, bottom: 45, left: 40},
      width = 1100,
      height = 550;

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

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")").call(xAxis);
  svg.append("g").attr("class", "y axis").call(yAxis);

  svg.append("text")
      .attr("fill", "#414241")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("x", margin.left - 25)
      .attr("y", margin.top - 25)
      .text("Total 3FG");

  svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right - margin.left)
      .attr("y", height - margin.top - 10)
      .text("Years in league");

  var players = svg.selectAll("g.node").data(data, function(d){
    return d.player;
  });

  var playergroup = players.enter().append("g").attr("class", "node")
    .attr('transform', function(d) {
      return "translate(" + x(d.years) + "," + y(d.total3pointers) + ")";
    });

  playergroup.append("circle")
    .attr("id", function(d){
            return d.player;
          })
    .attr("r", 5)
    .attr("class", "dot")
    .style("fill", "grey");

    selectedplayer = "stephencurry";
    selectedplayercode = "201939";

    svg.selectAll("circle")
    .on('mouseover', function() {
      d3.select(this).attr("r", 10).style("fill", "red");
      d3.select("#scatterplottext" + this.id).attr("font-size", "15px").style("stroke", "red");
    })
    .on('mouseout', function(d){
      d3.select(this).attr("r", 5).style("fill", "grey");
      d3.select("#scatterplottext" + this.id).attr("font-size", "10px").style("stroke", "grey");
    })
    .on("click", function(d) {
      d3.select('#eff' + selectedplayer).style("stroke", "lightgrey");
      d3.select('#line' + selectedplayer).style("stroke", "lightgrey");

      d3.select("#linetext" + selectedplayer).style("stroke", "lightgrey");
      d3.select("#efflinetext" + selectedplayer).style("stroke", "lightgrey");

      selectedplayer = document.getElementById("selectedplayer").innerHTML = d.player;
      document.getElementById("selectedplayercode").innerHTML = d.playercode;

      d3.select('#eff' + selectedplayer).attr("r", 10).style("stroke", "red");
      d3.select('#line' + selectedplayer).attr("r", 10).style("stroke", "red");
      d3.select("#linetext" + selectedplayer).style("stroke", "red");
      d3.select("#efflinetext" + selectedplayer).style("stroke", "red");

      tempfile = document.getElementById("line" + selectedplayer).parentNode;
      efftempfile = document.getElementById("eff" + selectedplayer).parentNode;
      document.getElementById("linesvg").appendChild(tempfile);
      document.getElementById("effsvg").appendChild(efftempfile);

    });

  playergroup.append("text")
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
    .attr("x", 10)
    .attr("y", -5)
    .attr("font-size", "10px")
    .attr("dy", ".35em")
    .style("stroke", "grey")
    .text(function (d) {
      return d.name + ": " + d.total3pointers;
    });

});
