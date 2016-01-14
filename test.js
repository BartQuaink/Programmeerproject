var data = [
    {
        "City": "New York",
        "Data": [
            {
                "Date": "20111001",
                "Value": "63.4"
            },
            {
                "Date": "20111002",
                "Value": "58.0"
            },
            {
                "Date": "20111003",
                "Value": "53.3"
            }
        ]
    },
    {
        "City": "San Francisco",
        "Data": [
            {
                "Date": "20111001",
                "Value": "62.7"
            },
            {
                "Date": "20111002",
                "Value": "59.9"
            },
            {
                "Date": "20111003",
                "Value": "59.1"
            }
        ]
    },
    {
        "City": "Austin",
        "Data": [
            {
                "Date": "20111001",
                "Value": "72.2"
            },
            {
                "Date": "20111002",
                "Value": "67.7"
            },
            {
                "Date": "20111003",
                "Value": "69.4"
            }
        ]
    }
];

var margin = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
},
width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) {
    return x(d.Date);
})
    .y(function (d) {
    return y(d.Value);
});

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

color.domain(data.map(function (d) { return d.City; }));

data.forEach(function (kv) {
    kv.Data.forEach(function (d) {
        d.Date = parseDate(d.Date);
    });
});

var cities = data;

var minX = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.Date; }); });
var maxX = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.Date; }); });
var minY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.Value; }); });
var maxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.Value; }); });

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
    .text("Temperature (ºF)");

var city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

city.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
    return line(d.Data);
})
    .style("stroke", function (d) {
    return color(d.City);
});

city.append("text")
    .datum(function (d) {
    return {
        name: d.City,
        date: d.Data[d.Data.length - 1].Date,
        value: d.Data[d.Data.length - 1].Value
    };
})
    .attr("transform", function (d) {
    return "translate(" + x(d.date) + "," + y(d.value) + ")";
})
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function (d) {
        return d.name;
});
