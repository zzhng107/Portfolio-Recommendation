// var data = d3.range(10).map(Math.random);


d3.json("result.json", function(data) {

    console.log(data["portfolio_return"]);

    var portfolio_return = data["portfolio_return"];
    var max = d3.max(portfolio_return);
    var min = d3.min(portfolio_return);

    var numofsections = 9; // 5 sections = 6 points
    var numofpoints = numofsections + 1;
    var dxmark = (max-min)/numofsections;

    var xdata = Array.apply(null, Array(numofpoints)).map(Number.prototype.valueOf,0);

    for (i = 0; i < numofpoints; i++) { 
        xdata[i] = min + i*dxmark;
    }

    var ydata = Array.apply(null, Array(numofpoints)).map(Number.prototype.valueOf,0);

    for (i = 0; i < portfolio_return.length; i++) { 
        ydata[~~((portfolio_return[i]-min+0.5*dxmark)/dxmark)] +=1 ;
    }

    console.log(xdata);
    console.log(ydata);

    var jarray = [];
    for (i=0; i<xdata.length ; i++){
      jarray[i] = [xdata[i], ydata[i]];
    }


    var w = 900,
        h = 600;

    // scale adjustment
    var padding = 50;

    var xScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[0]; })])
                     .range([padding, w-padding]);

    var yScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[1]; })])
                     .range([h-padding,padding]);

    // Axis setup
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(10);
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(10);
                  // .tickFormat(formatPercent);                 


    // SVG creation
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    svg.selectAll("circle")
     .data(jarray)
     .enter().append("circle")
     .attr("cx",function(d){return xScale(d[0]);})
     .attr("cy",function(d){return yScale(d[1]);})
     .attr("r", 3)
     .attr("fill", "teal");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        // .attr("transform", "translate(0," + 3*padding + ")")
        .call(yAxis)

    });

