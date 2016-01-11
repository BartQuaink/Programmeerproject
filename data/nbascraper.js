 // scraping NBA player information tutorial from http://www.gregreda.com/2015/02/15/web-scraping-finding-the-api/

var request = require('request');
var dl = require('datalib');
var d3 = require('d3');

var shots_url = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR'+
'AMS=2014-15&ContextFilter=&ContextMeasure=FGA&DateFrom=&D'+
'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca'+
'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&'+
'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=201939&Plu'+
'sMinus=N&Position=&Rank=N&RookieYear=&Season=2014-15&Seas'+
'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc'+
'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh'+
'owZones=0';

request.get(shots_url, function(err, res, body){
    var data = JSON.parse(body);
    var playerArray = data.resultSets[0].rowSet;

    var x = [];
    var y = [];
    var made = [];
    var attempts = [];
    playerArray.forEach(function(a){
        x.push(a[a.length-4]);
        y.push(a[a.length-3]);
        made.push(a[a.length-1]);
        attempts.push(a[a.length-2]);
    });
    var tenderData = [];
    for(var i = 0; i<playerArray.length; i++){
      tenderData.push({"x":Math.ceil((x[i]+243)/10),
          "y": Math.ceil((y[i]+17)/9),
          "made": made[i],
          "attempts": attempts[i]});
    }
    console.log("1");

    var coll = d3.nest()
        .key(function(d) {return [d.x, d.y]; })
        .rollup(function(v) {return{
            made: d3.sum(v, function(d) {return d.made}),
            attempts: d3.sum(v, function(d){return d.attempts}),
            shootingPercentage:  d3.sum(v, function(d) {return d.made})/d3.sum(v, function(d){return d.attempts})
        }})
        .entries(tenderData);
    console.log("2");

    var shotper = [];
      var finalData = [];
      var z = [];
      coll.forEach(function(a){
          a.key = JSON.parse("[" + a.key + "]");
          z.push(a.values.shootingPercentage);
      });

      var meanShot = dl.mean(z);
      var shotSTDV = dl.stdev(z);

      coll.forEach(function(a){
          var k = (a.values.shootingPercentage - meanShot)/shotSTDV;
          finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts})
      });
});
