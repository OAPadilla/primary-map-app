// document.write("map.js content")

// var data = [30, 86, 168, 281, 303, 435]
//
// d3.select(".map-chart")
//     .selectAll("div")
//     .data(data)
//         .enter()
//         .append("div")
//         .style("width", function(d) { return d + "px"; })
//         .text(function(d) { return d; });

// temporary data
// var candidateData = [
//     {
//         "name": "Joe Biden",
//         "color": "red"
//     },
//     {
//         "name": "Bernie Sanders",
//         "color": "blue"
//     },
//     {
//         "name": "Kamala Harris",
//         "color": "purple"
//     }
// ];

var stateData = [
    {
        "name": "Florida",
        "initial": "FL",
        "delegates": 219,
        "super": 29,
        "type": "closed primary",
        "allocation": "proportional",
        "date": "3-17-2020",
        "results": {
            "Joe Biden": 51,
            "Bernie Sanders": 30,
            "Kamala Harris": 19
        }
    }
];

const defaultColor = $('.states').css("fill");

var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .on("click", selectState);

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
        })));
});

var selectState = (function() {

    // Get selected candidate name and color
    var candidateName = d3.select("input[name='candidate']:checked").property("value");
    console.log(candidateName)

    // Get current color of selected state
    var currentColor = d3.select(this).style('fill');

    if (candidateName !== "Custom") {
        // Get appropriate color for candidate
        var candidateColor = defaultColor;
        for (var i = 0; i < candidateData.length; ++i) {
            if (candidateData[i].name === candidateName) {
                candidateColor = candidateData[i].color;
            }
        }

        // Change color to default if same candidate color, otherwise change to new color
        if (currentColor === candidateColor) {
            d3.select(this).style("fill", defaultColor);
        } else {
            d3.select(this).style("fill", candidateColor);
        }
    } else {
        updateStateResults();
    }
});

var updateStateColor = (function(candidateName, currentColor) {
    console.log("update state color test")
});

var updateStateResults = (function() {

});

var resetMap = (function() {
    svg.selectAll("*").style("fill", defaultColor);
});
