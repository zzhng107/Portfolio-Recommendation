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
    var w = 400,
        h = 400;
    // Scale adjustment
    var padding = 50;
    var xScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[0]; })])
                     .range([padding, w-padding]);
    var yScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[1]; })])
                     .range([h-padding,padding]);

    // Tip Scale
    var xtipScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[0]; })])
                     .range([padding, w/2-padding]);
    var ytipScale = d3.scale.linear()
                     .domain([0, d3.max(jarray, function(d) { return d[1]; })])
                     .range([h/2-padding,padding]);
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

    // var tip = d3.select("body")
    //             .append("div")
    //             .style("position", "absolute")
    //             .style("z-index", "10")
    //             // .style("visibility", "hidden")
    //             .text("a simple tooltip")
    //             .append("svg")
    //             .attr("width", 50)
    //             .attr("height", 50);
                    // .style("opacity", 0);

      var width = w/2.5,
          height = h/2.4;
          radius = Math.min(width, height) / 2 - 10;
      var pidata = d3.range(data["portfolio"][0].length).map(Math.random).sort(d3.descending);
      var color = d3.scale.category20();
      var arc = d3.svg.arc()
          .outerRadius(radius);
      var pie = d3.layout.pie();
      var div = d3.select("body")
          // .append("div")
          // .html(function(d) {
          //         // return "<strong>People at this level:</strong> <span style='color:red'>" + d[1] + "</span>";
          //         // return "<p>This is a SVG inside a tooltip:</p> <div id='pieChart'> <svg id='pieChartcanvas'></svg> </div>"
          //         return "<p>tooltip:</p>";
                
          //       })
          .append("svg")
          .style("opacity","0")
          .datum(pidata)
          .attr("class", "tooltip")
          .attr("width", width)
          .attr("height", height);
          

        var textlabel = div.append("text")
                        // .text(username[0])
                        .attr("x",width/6.5)
                        .attr("y",height/11)
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "13px")
                        .attr("fill", "gray")
                        .style("font-weight","bold");

        var textreturn = div.append("text")
                        // .text(username[0])
                        .attr("x",width/3.1)
                        .attr("y",height/1.7)
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "18px")
                        .style("font-weight","bold");

          

          
      // var tooltiptest = d3.select("body")
      //   .append("div")
      //   .style("position", "absolute")
      //   .style("z-index", "10")
      //   .style("visibility", "hidden")
      //   .text("a simple tooltip");

      var arcs = div.selectAll("path")
          .data(pie)
          .enter()
          .append("path")
          .attr("transform", "translate(" + width / 2 + "," + height / 1.75 + ")")
          .attr("fill", function(d, i) { return color(i); });
          // .on("mouseover", function(){return tooltiptest.style("visibility", "visible");})
          // .on("mousemove", function(){return tooltiptest.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");});
          // .on("mouseout", mouseout);
        

      function tweenPie(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) { return arc(i(t)); };
      }

      function tweenDonut(b) {
        b.innerRadius = radius * .6;
        var i = d3.interpolate({innerRadius: 0}, b);
        return function(t) { return arc(i(t)); };
      }

    // var div = d3.select("body").append("svg")
    //       .attr("class", "tooltip")
    //       .attr("width", width)
    //       .attr("height", height)
    //       .append('g');

    // div.selectAll("circle")
    //  .data(jarray)
    //  .enter().append("circle")
    //  .attr("class","circle")
    //  .attr("cx",function(d){return xtipScale(d[0]);})
    //  .attr("cy",function(d){return ytipScale(d[1]);})
    //  .attr("r", 3)
    //  .attr("fill", "red");

    function mouseover() {
      d3.select(this)
        .transition()
        .duration(50)
        .style("fill","red");

      var num = parseInt(d3.select(this).attr("id"));

      // pidata = data["portfolio"][num];

      textlabel.text("Similar Investor #" + [num]);
      textreturn.text(jarray[num][0].toFixed(2)+"%")
                .attr("fill",function(){
                    if(jarray[num][0]>0){
                        return "green";
                    }
                    else{
                        return "red";
                    }
                });
      div.datum(data["portfolio"][num])
         .style("opacity","0.8")
      arcs.data(pie)
          // .enter()
          // .append("path")
          // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .attr("fill", function(d, i) { return color(i); });

      div.transition()    
         .duration(100)    
         .style("opacity", "0.9");    
      div.style("left", (d3.event.pageX - 34) + "px")   
         .style("top", (d3.event.pageY - 150) + "px");

      // pidata = rect

      arcs.transition()
        .ease("bounce")
        .duration(450)
        .attrTween("d", tweenPie)
      .transition()
        .ease("elastic")
        .delay(function(d, i) { return 200 + i * 50; })
        .duration(450)
        .attrTween("d", tweenDonut);
      // .on("mouseover",function(){
      //   ontip = true;
      // })

      // tip.transition()
      //     .duration(500)
      //     .style("opacity", 1);
    }

    function mousemove() {
      // div.on("mouseout",function(){
      //   // ontip = false;
      //   div.transition()    
      //       .duration(250)    
      //       .style("opacity", 0);
      // });  
      div.style("left", (d3.event.pageX - 34) + "px")
         .style("top", (d3.event.pageY - 150) + "px");
    }

    function mouseout() {
    d3.select(this)
      .transition()
      .duration(100)
      .style("fill",
          function()
          {
            if(d3.select(this).classed("myself")){
              return "pink";
            }
            else{
              return "skyblue"
            }
          }
      )

      div.transition()    
                .duration(500)    
                .style("opacity", 0);
    }

    // function drawCircle(x, y) {
    //   var squ_width = w/3;
    //   var squ_height = h/3;
    //     console.log('Drawing svg at', x, y);
    //   var tip = svg.append("div")
    //             .attr('class', 'tooltipsvg')
    //             // .append("svg")
    //             // .attr("x", x)
    //             // .attr("y", y)

    //             // .attr("width", squ_width)
    //             // .attr("height", squ_height);


    // }

    var widthofrect = w/jarray.length-15;
    var heightofrect;
    svg.selectAll("rect")
        .data(jarray)
        .enter().append("rect")
        .attr("id",function(d,i){
          return i;
        })
        .attr("width", widthofrect)
        .attr("height", function(d){return d[1]/d3.max(ydata)*(h-100);})
        .attr("x", function(d){return xScale(d[0])-widthofrect/2;})
        .attr("y", function(d){return yScale(d[1]);})
        .attr("rx",8)
        .attr("ry",8)
        .style("fill",
          function(d,i){
            if(i == Math.round(jarray.length/2+1)){
              return "pink";
            }
            else{
              return "skyblue"
            }
          }
        )
        .attr("class",
          function(d,i){
            if(i == Math.round(jarray.length/2+1)){
              return "myself";
            }
            else{
              return "others"
            }
          }
        )
        //tooltip part
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

        // onclick part
        // .on("click",function(){
        //     var coords = d3.mouse(this);
        //     console.log(coords);
        //     drawCircle(coords[0], coords[1]);
        //   }
        // );

    // Add the valueline path.
    svg.append("path")
        .attr("id","trendpath")
        .style("fill","none")
        .attr("class", "line")
        .attr("d", line(jarray));

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (padding/3) +","+(h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Number of Investors")
        .style("color","gray");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (w/2) +","+(h-(padding/3))+")")  // centre below axis
        .text("Return (%)")
        .style("color","gray");

    });

