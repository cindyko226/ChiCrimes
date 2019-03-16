
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
    .rotate([87.750, 0])
    .center([0, 41.825]);

//41.965130329,-87.758377123

// console.log(
//   d3
//     .geoAlbers()
//     .translate([(w * map_portion) / 2, h / 2])
//     .scale(82000)
//     .rotate([87.85, 0])
//     .center([0, 41.825])([-87.758377123, 41.965130329])
// );



var path = d3.geoPath()
    .projection(projection);

var promises = [
    d3.json("wards.json"),
    d3.csv('data.csv')
];

var g = svg.append('g');


var colorset = ["salmon", "palegreen", "rgb(255, 230, 61)", "plum", "powderblue","pink",'white'];
var textset = [
  "THEFT / MOTOR VEHICLE THEFT",
  "BATTERY / ASSAULT",
  "WEAPONS VIOLATION / CRIM SEXUAL ASSAULT",
  "BURGLARY / ROBBERY",
  "NARCOTICS",
  "OTHER OFFENSE / OFFENSE INVOLVING CHILDREN",
  'OTHER'
];

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
        .attr("class", 'dot')
        .style('fill', function(d){
            if (d.PrimaryType === "THEFT" || d.PrimaryType === "MOTOR VEHICLE THEFT") {
              return "salmon";
            } else if (d.PrimaryType === "BATTERY" || d.PrimaryType === "ASSAULT") {
              return "plum";
            } else if (d.PrimaryType === "WEAPONS VIOLATION" || d.PrimaryType === "CRIM SEXUAL ASSAULT") {
                return "rgb(255, 230, 61)";
            } else if (d.PrimaryType === "BURGLARY" || d.PrimaryType === "ROBBERY") {
                return "palegreen";
            } else if (d.PrimaryType === "NARCOTICS") {
                return "pink";
            } else if (d.PrimaryType === "OTHER OFFENSE" || d.PrimaryType === "OFFENSE INVOLVING CHILDREN") {
                return "powderblue";
            } else {
                return "white";
            }
        })
        .on('mouseover', function(d){
            d3.selectAll('circle').style('opacity', 0.7);
            d3.select(this)
              .style("opacity", 1)
              .attr("r", 20);
            d3.select("#date").text(d.Date);
            d3.select("#location").text(d.Block);
            d3.select("#primarytype").text(d.PrimaryType);
            d3.select("#arrest")
                .text(d.Arrest)
                .style('color', (d.Arrest === "true") ? "green" : "red");
            d3.select('#tooltip')
                .style('left', (d3.event.pageX + 20) + 'px')
                .style('top', (d3.event.pageY - 80) + 'px')
                .style('display', 'block')
           
                
                
        })
        .on('mouseout', function (d) {
            d3.selectAll('circle').style('opacity', 1)
            d3.select(this).attr("r", 3.5);
            d3.select('#tooltip')
                .style('display', 'none');
        });
        
        g.selectAll("rect")
          .data(colorset)
          .enter()
          .append("rect")
          .attr("height", 20)
          .attr("x", 500)
          .attr("y", function(d, i) {
            return 30 + (i * 30);
          })
          .attr("width", 20)
          .attr("fill", function(d) {
            return d;
          })
          .attr("class", "colorbar")
          .style('stroke', 'none');
       
        g.selectAll("text")
        .data(textset)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", 550)
        .attr("y", function(d, i){
            return 45 + (i * 30)
        })
        .style('stroke', 'white')
        .style('fill', 'white')
        .style('font-family', 'Arial');
  


        
            

}
                                
                          
                                
// d3.csv("data.csv", function (data) {
//     // console.log('here');
//     data.forEach(function (d) {
//         console.log(d);
//     });
//     // console.log(data);
// });
                                