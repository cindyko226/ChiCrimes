
// import * as d3 from "d3";

// d3.csv("data.csv", function (data) {
//     // console.log('here');
//     data.forEach(function (d) {
//         console.log(d);
//     });
//     // console.log(data);
// });



var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var scale = 0.70,
    w = 1400 * scale,
    h = 900 * scale,
    data = [],
    map_portion = 0.55;

var projection = d3.geoAlbers()
    .translate([(w * map_portion) / 2, h / 2])
    .scale(82000)
    .rotate([87.850, 0])
    .center([0, 41.825]);

//41.965130329,-87.758377123

console.log(
  d3
    .geoAlbers()
    .translate([(w * map_portion) / 2, h / 2])
    .scale(82000)
    .rotate([87.85, 0])
    .center([0, 41.825])([-87.758377123, 41.965130329])
);



var path = d3.geoPath()
    .projection(projection);

var promises = [
    d3.json("wards.json"),
    d3.csv('data.csv')
];

var g = svg.append('g');

Promise.all(promises).then(ready);



function ready([chicago, data]) {

    var precincts = topojson.feature(chicago, chicago.objects.wards);

    
       g.attr("class", "precinct")
        .selectAll("path")
        .data(precincts.features)
        .enter()
        .append("path")
        .attr("d", path);

       g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle') 
        .attr('cx', function(d){
            return projection([d.Longitude,d.Latitude])[0];
        })
        .attr('cy', function(d){
            return projection([d.Longitude, d.Latitude])[1];
        })
        .attr('r', "3.5")
        .style('fill', function(d){
            if (d.PrimaryType === "THEFT"){
                return "red";
            } else if (d.PrimaryType === "BATTERY"){
                return "purple";
            } else if (d.PrimaryType === "WEAPONS VIOLATION"){
                return "yellow";
            } else if (d.PrimaryType === "CRIMINAL DAMAGE"){
                return "green";
            }else {
                return "pink";
            }
        })

                         
}
                                
// d3.csv('data.csv', function (data) {

//     // var locations = data.features;
//     // var hue = 0;
//     debugger
//     data.forEach(function (d) { 
//         console.log(d);
//         // hue += 0.36               
//         // d.color = 'hsl(' + hue + ', 100%, 50%)';
//     });
// })
                                
                                
// d3.csv("data.csv", function (data) {
//     // console.log('here');
//     data.forEach(function (d) {
//         console.log(d);
//     });
//     // console.log(data);
// });
                                