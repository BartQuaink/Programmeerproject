// linegraph with stats for total 3FG and 3FG%/efficiency

// var player = document.getElementById("selectedplayer");
// console.log(player);

d3.json("./data/3pointers.json", function(error, data){
  if (error) throw error;

  kobe = data.kobebryant;
  dataplayer = [];
  for (var i in kobe){
    dataplayer.push(kobe[i]);
  }

  // console.log(dataplayer);

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800,
      height = 400;

  var svg = d3.select("#linegraph")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
    .domain([0,20])
    .range([0,width]);
  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom");

  var y = d3.scale.linear()
    .range([height, 0]);
  var yAxis = d3.svg.axis().scale(y)
    .orient("left");

  
});
