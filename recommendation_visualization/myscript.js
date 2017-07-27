var data = d3.range(10).map(Math.random);

var w = 400,
    h = 200,
    barW = w / data.length-10,
    barH = function(d, i){return d / d3.max(data) * h;},
    barX = function(d, i){return i / data.length * w;},
    barY = function(d, i){return h - barH(d);};

d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("width", barW)
    .attr("height", barH)
    .attr("x", barX)
    .attr("y", barY);
