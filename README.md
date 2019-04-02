# 2018 Chicago Crimes

[Live Demo](https://cindyko226.github.io/ChiCrimes/)


A Chicago Map with crimes shown in circle dots, each color represents different type of crimes.  
The color square can filter out specific crimes and the total numbers of chosen crime type. 


## Technologies


### Frontend

* HTML5 Canvas for DOM manipulation and rendering.
* D3.js for map and circles.
* Webpack to bundle and serve up the various scripts.


## Features 

![Filter](https://github.com/cindyko226/ChicagoCrimes/blob/master/screenshots/crimes.gif)

Crimes Infomation 
```js
    Promise.all(promises).then(ready);
    
    .on('mouseover', function(d){
            d3.selectAll('circle').style('opacity', 0.7);
            d3.select(this)
              .style("opacity", 1)
              .attr("r", 20);
            d3.select("#date").text(d.Date);
            d3.select("#location").text(d.Block);
            d3.select("#primarytype").text( d.PrimaryType);
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
        
```


* See crimes rate with different color within specified ranges.
* Show details when hovering on the circles.
* Click color square to filter out specified crimes.