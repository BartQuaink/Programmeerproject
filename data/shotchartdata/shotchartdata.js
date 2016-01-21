d3.json("./data/shotchartdata/201939/2015-16.json", function(error, data) {

  var tenderData = data;
  var coll = d3.nest()
        .key(function(d) {return [d.x, d.y]; })
        .rollup(function(v){return{
            made: d3.sum(v, function(d) {return d.made;}),
            attempts: d3.sum(v, function(d){return d.attempts;}),
            shootingPercentage:  d3.sum(v, function(d) {return d.made;})/d3.sum(v, function(d){return d.attempts;})
        };})
        .entries(tenderData);

  var shotper = [];
  var finalData = [];
  var z = [];
  coll.forEach(function(a){
      a.key = JSON.parse("[" + a.key + "]");
      z.push(a.values.shootingPercentage);
  });

  meanShot = datalib.;
  var shotSTDV = standardDeviation(z);

  coll.forEach(function(a){
          var k = (a.values.shootingPercentage - meanShot)/shotSTDV;
          finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts});
      });

});

function standardDeviation(values){
  var avg = average(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
