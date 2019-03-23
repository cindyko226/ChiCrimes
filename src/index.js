



var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

svg.attr('viewBox', '250 100 600 600');

var scale = 0.70,
    w = 1400 * scale,
    h = 1200 * scale,
    data = [],
    map_portion = 0.65;

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


var colorset = ["red", "blue", "yellow", "plum", "green","pink",'white', ''];
var textset = [
  "THEFT / MOTOR VEHICLE THEFT",
  "BATTERY / ASSAULT",
  "WEAPONS VIOLATION / CRIM SEXUAL ASSAULT",
  "BURGLARY / ROBBERY",
  "NARCOTICS",
  "OTHER OFFENSE / OFFENSE INVOLVING CHILDREN",
  "HOMICIDE",
  "SHOW ALL",
  "CLICK COLOR SQUARE TO FILTER CRIMES"
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
        .attr('r', "3")
        .style('fill', function(d){
            if (d.PrimaryType === "THEFT" || d.PrimaryType === "MOTOR VEHICLE THEFT") {
                return "red";
            } else if (d.PrimaryType === "BATTERY" || d.PrimaryType === "ASSAULT") {
                return "plum";
            } else if (d.PrimaryType === "WEAPONS VIOLATION" || d.PrimaryType === "CRIM SEXUAL ASSAULT") {
                return "yellow";
            } else if (d.PrimaryType === "BURGLARY" || d.PrimaryType === "ROBBERY") {
                return "blue";
            } else if (d.PrimaryType === "NARCOTICS") {
                return "pink";
            } else if (d.PrimaryType === "OTHER OFFENSE" || d.PrimaryType === "OFFENSE INVOLVING CHILDREN") {
                return "green";
            } else {
                return "white";
            }
        })
        .style('stroke', 'none')
        .attr('class', function(d){
            if (d.PrimaryType === "THEFT" || d.PrimaryType === "MOTOR VEHICLE THEFT") {
                return "red";
            } else if (d.PrimaryType === "BATTERY" || d.PrimaryType === "ASSAULT") {
                return "plum";
            } else if (d.PrimaryType === "WEAPONS VIOLATION" || d.PrimaryType === "CRIM SEXUAL ASSAULT") {
                return "yellow";
            } else if (d.PrimaryType === "BURGLARY" || d.PrimaryType === "ROBBERY") {
                return "blue";
            } else if (d.PrimaryType === "NARCOTICS") {
                return "pink";
            } else if (d.PrimaryType === "OTHER OFFENSE" || d.PrimaryType === "OFFENSE INVOLVING CHILDREN") {
                return "green";
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
            d3.select("#primarytype").text("HOMICIDE"
            );
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
            d3.select(this).attr("r", 3);
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
            return 130 + (i * 30);
          })
          .attr("width", 20)
          .attr("fill", function(d) {
            return d;
          })
          .attr("class", "colorbar")
          .style('stroke', 'none')
          .on('click', function(d){
              if(d === 'red'){
                  d3.selectAll('circle').style('display','none');
                  d3.selectAll('.red').style('display', 'block');
              }else if( d === 'blue'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.blue').style('display', 'block');
              } else if (d === 'yellow'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.yellow').style('display', 'block');
              }else if (d === 'plum'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.plum').style('display', 'block');
              }else if (d === 'green'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.green').style('display', 'block');
              }else if ( d === 'pink'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.pink').style('display', 'block');
              }else if (d === 'white'){
                  d3.selectAll('circle').style('display', 'none');
                  d3.selectAll('.white').style('display', 'block');
              }else{
                  d3.selectAll('circle').style('display', 'block');
              }
          });

        
       
        g.selectAll("text")
        .data(textset)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", 550)
        .attr("y", function(d, i){
            return 145 + (i * 30)
        })
        .style('stroke', function (d) {
            if (d === "CLICK COLOR SQUARE TO FILTER CRIMES") {
                return "DarkSlateGray";
            } else {
              return "white";
            }
            })
        .style('fill', function(d) {
            if (d === 'CLICK COLOR SQUARE TO FILTER CRIMES') {
                return "DarkSlateGray";
            }else{
                return 'white';
            }
        })
        .style('font-family', 'Arial')
        .attr('class', function(d){
            if (d === 'CLICK COLOR SQUARE TO FILTER CRIMES') {
                return 'pulse';
            }
        });
        
        




    // var colorRange = ["#9cdbe5", "#e0e0e0", "#59ddf2"];
    // var color = d3.scaleLinear().range(colorRange).domain([-1, 0, 1]);

    // var radialGradient = svg.append("defs")
    //     .append("radialGradient")
    //     .attr("id", "radial-gradient");

    // radialGradient.append("stop")
    //     .attr("offset", "0%")
    //     .attr("stop-color", color(-1));

    // radialGradient.append("stop")
    //     .attr("offset", "50%")
    //     .attr("stop-color", color(0));

    // radialGradient.append("stop")
    //     .attr("offset", "100%")
    //     .attr("stop-color", color(1));

    // svg.append("circle")
    //     .attr("cx", width * 0.65)
    //     .attr("cy", height * 0.55)
    //     .attr("r", height * 0.03)
    //     .style("opacity", 0.7)
    //     .style("fill", "url(#radial-gradient)")
    //     .attr('class', 'pulse')





      
       
    }
    
 
    // .attr("class", 'pulse')
                         