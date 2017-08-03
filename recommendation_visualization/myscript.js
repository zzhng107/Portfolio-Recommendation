// var data = d3.range(10).map(Math.random);


d3.json("result.json", function(data) {

    //Data preparation
    var portfolio_return = data["portfolio_return"];
    var max = d3.max(portfolio_return);
    var min = d3.min(portfolio_return);

    var numofsections = 9; // 5 sections = 6 points
    var numofpoints = numofsections + 1;
    var dxmark = (max-min)/numofsections;

    var xdata = Array.apply(null, Array(numofpoints)).map(Number.prototype.valueOf,0);
    var ydata = Array.apply(null, Array(numofpoints)).map(Number.prototype.valueOf,0);
    for (i = 0; i < numofpoints; i++) { 
        xdata[i] = min + i*dxmark;
    }
    for (i = 0; i < portfolio_return.length; i++) { 
        ydata[~~((portfolio_return[i]-min+0.5*dxmark)/dxmark)] +=1 ;
    }

    console.log(xdata);
    console.log(ydata);

    var jarray = [];
    for (i=0; i<xdata.length ; i++){
      jarray[i] = [xdata[i], ydata[i]];
    }

    // Main canvas size
    var w = 900,
        h = 600;

    // Scale adjustment
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


    // Drawing
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var line = d3.svg.line()
                     .interpolate("basis") 
                     .x(function(d){return xScale(d[0]);})
                     .y(function(d){return yScale(d[1]);});

    // var tip = d3.tip()
		  //       .attr('class', 'd3-tip')
		  //       // .attr('id','pie')
		  //       .style('transition-duration', '0.75s')
		  //       .offset([-10, 0])
		  //       .html(function(d) {
		  //         // return "<strong>People at this level:</strong> <span style='color:red'>" + d[1] + "</span>";
		  //         // return "<p>This is a SVG inside a tooltip:</p> <div id='pieChart'> <svg id='pieChartcanvas'></svg> </div>"
    //               return "<p>This is a SVG inside a tooltip:</p> <div id='pieChart'></div>"
		        
    //             });

    var tip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .text("a simple tooltip");


    // svg.call(tip);

    var widthofrect = w/jarray.length-20;
    var heightofrect;
    svg.selectAll("rect")
        .data(jarray)
        .enter().append("rect")  
        .attr("width", widthofrect)
        .attr("height", function(d){return d[1]/d3.max(ydata)*(h-100);})
        .attr("x", function(d){return xScale(d[0])-widthofrect/2;})
        .attr("y", function(d){return yScale(d[1]);})
        .attr("fill","skyblue")
        //tooltip part

        .on("mouseover", function(){return tip.style("visibility", "visible");})
        .on("mousemove", function(){return tip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tip.style("visibility", "hidden");});


        



    svg.append("path") // Add the valueline path.
        .attr("class", "line")
        .attr("d", line(jarray));

    // svg.selectAll("circle")
    //  .data(jarray)
    //  .enter().append("circle")
    //  .attr("cx",function(d){return xScale(d[0]);})
    //  .attr("cy",function(d){return yScale(d[1]);})
    //  .attr("r", 3)
    //  .attr("fill", "red");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    });

