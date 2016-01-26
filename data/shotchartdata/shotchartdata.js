var player = ["201939"];
var years = ["2015-16","2014-15", "2013-14", "2012-13", "2011-12"];

var stepSlider = document.getElementById('slider-step');

noUiSlider.create(stepSlider, {
	start: [ 1 ],
	step: 1,
	range: {
		'min': [ 1 ],
		'max': [ 5 ]
	}
});

var stepSliderValueElement = document.getElementById('slider-step-value');

stepSlider.noUiSlider.on('update', function( values, handle ) {
	stepSliderValueElement.innerHTML = Math.floor(values[handle]);
  d3.select(".shot-chart").remove();

  d3.json("./data/shotchartdata/"+player[0]+"/"+years[stepSliderValueElement.innerHTML - 1]+".json", function CreateShotChart(error, startdata) {
    console.log(years[stepSliderValueElement.innerHTML - 1]);

    var tenderData = startdata;
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

    meanShot = mean(z);
    var shotSTDV = standardDeviation(z);

    coll.forEach(function(a){
            var k = (a.values.shootingPercentage - meanShot)/shotSTDV;
            finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts});
        });

    var hiddenElement = document.getElementById("ShotChartData");
    hiddenElement.innerHTML = JSON.stringify(finalData);

    var data = finalData;
    eval(document.getElementById('code').innerHTML);
  });
});

function mean(array) {
  var total = 0;
  for(var i = 0; i < array.length; i++) {
    total += array[i];
}
  var avg = total / array.length;
  return avg;
}

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
