/*  Creates a shot chart.
  Data is being read from files, updated by selecting a player in the scatterplot
  A function is written to get the years the players has played in the NBA.
  Then the slider is updated to these years, from which the user can update the data in the shot chart.
  With some simple math, an efficiency factor (k) is calculated, on which the efficiency in the shot chart will be based on.
*/

var clicked = document.getElementById("scatterplot"); // get info to be able to check if a player has been clicked
var stepSlider = document.getElementById('slider-step'); // initialise the step slider
var stepSliderValue = document.getElementById('slider-step-value'); // initialise the value of the slider

// create a step slider, no player has been selected yet so just a slider appears with no values
noUiSlider.create(stepSlider, {
  start: [ 1 ],
  step: 1,
  range: {
    'min': [ 1 ],
    'max': [ 5 ]
  }
});

// function to update the shotchart with all the data
function UpdateShotChart(PlayerID) {
  var player = document.getElementById("selectedplayercode").innerHTML; // get the player code to know which player has been selected
  var years = getYears(player); // use GetYears to get an array with the years the selected player has played in the NBA
  stepSlider.noUiSlider.off("update"); // event change was binded in another event, thus the listener looped multiple times, this fixes it

  // update the slider with the data from years
  stepSlider.noUiSlider.updateOptions({
    start: [ 1 ],
    step: 1,
		range: {
      'min' : 1,
			'max': years.length
		}
  });

  // each time the slider updates, the shot chart will update
  stepSlider.noUiSlider.on('update', function( values, handle ) {
    console.log(player);
  	stepSliderValue.innerHTML = Math.floor(values[handle]); // get the index for the corresponding season, this value = 1 means first season
    document.getElementById("slider-season").innerHTML = "Season: " + Math.floor(values[handle]); // display which season has been selected

    // get the data and update the chart for real
    d3.json("./data/shotchartdata/"+player+"/"+years[stepSliderValue.innerHTML - 1]+".json", function CreateShotChart(error, startdata) {
      if (error) throw error;
      var tenderData = startdata; // get startdata

      // nesting function to nest close values together
      var coll = d3.nest()
            .key(function(d) { return [d.x, d.y]; }) // selected keys are x and y value of a shot
            .rollup(function(v) { return { // returns a dictionary with data of shots of group with close x and y values
                made: d3.sum(v, function(d) {return d.made;}),
                attempts: d3.sum(v, function(d){return d.attempts;}),
                shootingPercentage:  d3.sum(v, function(d) {return d.made;})/d3.sum(v, function(d){return d.attempts;}) // shootingpct is made shots / attemps
            };})
            .entries(tenderData); // returns a new array that contains the key/value pairs for each index in the array

      // initialise several lists
      var shotper = [];
      var finalData = [];
      var z = [];
      coll.forEach(function(a) { // parse the stringified keys
          a.key = JSON.parse("[" + a.key + "]");
          z.push(a.values.shootingPercentage);
      });

      meanShot = mean(z); // calculate the mean of the array
      var shotSTDV = standardDeviation(z); // calculate the standard deviation of the array

      coll.forEach(function(a){
              var k = (a.values.shootingPercentage - meanShot)/shotSTDV; // efficiency factor, pct - mean of all shots divided by the std deviation of all shots
              finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts}); // push all data together in new array
          });

      var data = finalData; // set data as the final data, needed to update the chart with in html function
      d3.select(".shot-chart").remove(); // remove the old shot chart
      // eval needed to execute the json string of data in to the code written in <pre> in the HTML, so no evil/misuse here
      eval(document.getElementById('code').innerHTML); // create chart
    });
  });
}

clicked.addEventListener("click", UpdateShotChart, false); // if value in scatterplot is clicked, update the shot chart

// returns an array of which seasons a player has played in the NBA
function getYears(id) {
  if (id === "201939") {
    return ["2009-10","2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"]; }
  else if (id === "2594") {
    return ["2003-04","2004-05","2005-06","2006-07","2007-08","2008-09","2009-10","2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"]; }
  else if (id === "2207"){
    return ["2001-02","2002-03","2003-04","2004-05","2005-06","2006-07","2007-08","2008-09","2009-10","2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"]; }
  else if (id === "2037"){
    return ["2000-01", "2001-02","2002-03","2003-04","2004-05","2005-06","2006-07","2007-08","2008-09","2009-10","2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"]; }
  else if (id === "1891"){
    return ["2000-01", "2001-02"]; }
  else if (id === "1740"){
    return ["2000-01", "2001-02"]; }
  else if (id === "1718"){
    return ["2000-01", "2001-02"]; }
  else if (id === "1713"){
    return ["2000-01", "2001-02"]; }
  else if (id === "1497"){
    return ["2000-01", "2001-02"]; }
  else if (id === "978"){
    return ["2000-01", "2001-02"]; }
  else if (id == "977"){
    return ["2000-01", "2001-02"]; }
  else if (id === "951"){
    return ["2000-01", "2001-02"]; }
  else if (id === "467"){
    return ["2000-01", "2001-02"]; }
  else if (id === "397"){
    return ["2000-01", "2001-02"]; }
}

// calculates the mean of an array
function mean(array) {
  var total = 0;
  for(var i = 0; i < array.length; i++) {
    total += array[i]; // get total value of array
  }
  var avg = total / array.length; // total / length of the array is the mean
  return avg;
}

// calculates the standard deviation of an array
function standardDeviation(values){
  var avg = mean(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = mean(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}
