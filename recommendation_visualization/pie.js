( function() {
    var data = {
        lineChart : [
            {
                date  : '2006-02-22',
                label : 'foo',
                value : 450
            },
            {
                date  : '2006-08-22',
                label : 'bar',
                value : 500
            },
            {
                date  : '2007-01-11',
                label : 'baz',
                value : 700
            },
            {
                date  : '2008-10-01',
                label : 'boing',
                value : 1000
            },
            {
                date  : '2009-02-24',
                label : 'loool',
                value : 1423
            },
            {
                date  : '2010-12-30',
                label : 'YEAH',
                value : 1450
            },
            {
                date  : '2011-05-15',
                label : 'Hurray',
                value : 1550
            },
            {
                date  : '2012-04-02',
                label : 'WTF',
                value : 1600
            },
            {
                date  : '2013-08-19',
                label : 'OMG',
                value : 1610
            },
            {
                date  : '2013-11-11',
                label : 'ROFL',
                value : 1620
            }
        ],
        pieChart  : [
            {
                color: 'red',
                title: 'flowers',
                value: 0.13
            },
            {
                color: 'blue',
                title: 'trains',
                value: 0.07
            },
            {
                color: 'orange',
                title: 'trains',
                value: 0.04
            },
            {
                color: 'yellow',
                title: 'trains',
                value: 0.06
            },
            {
                color: 'green',
                title: 'trains',
                value: 0.05
            },
            {
                color: 'purple',
                title: 'trains',
                value: 0.45
            },
            {
                color: 'navy',
                title: 'trains',
                value: 0.20
            }

        ]
    };

    var DURATION = 2500;
    var DELAY    = 500;

    /**
     * draw the fancy pie chart
     *
     * @param {String} elementId elementId
     * @param {Array}  data      data
     */

    function drawPieChart( elementId, detailContainerId, data ) {
        var containerEl = document.getElementById( elementId ),
            width       = containerEl.clientWidth,
            height      = width*0.8,
            radius      = Math.min( width, height ) / 2,
            container   = d3.select( containerEl ),
            svg         = container.select( 'svg' )
                .attr( 'width', width )
                .attr( 'height', height );
        var pie = svg.append( 'g' )
            .attr(
                'transform',
                'translate(' + width / 2 + ',' + height / 2 + ')'
            );

        var detailContainerEL = document.getElementById(detailContainerId);
        var detailedInfoContainer = d3.select(detailContainerEL);
        var detailSvg = detailedInfoContainer.select('svg');

        var detailedInfo = detailSvg.append( 'g' )
            .attr( 'class', 'pieChart--detailedInformation' );

        var twoPi   = 2 * Math.PI;
        var pieData = d3.layout.pie()
            .value( function( d ) { return d.value; } );

        var arc = d3.svg.arc()
            .outerRadius( radius - 20)
            .innerRadius( 0 );

        var pieChartPieces = pie.datum( data )
            .selectAll('path')
            .data( pieData )
            .enter()
            .append('path')
            .attr('class', function(d) {
                return 'pieChart__' + d.data.color;
            } )
            .attr( 'filter', 'url(#pieChartInsetShadow)' )
            .attr( 'd', arc )
            .each( function() {
                this._current = { startAngle: 0, endAngle: 0 };
            } )
            .transition()
            .duration( DURATION )
            .attrTween( 'd', function( d ) {
                var interpolate = d3.interpolate( this._current, d );
                this._current = interpolate( 0 );
                return function( t ) {
                    return arc( interpolate( t ) );
                };
            } )
            .each( 'end', function handleAnimationEnd( d ) {
                drawDetailedInformation(d.data);
            } );

        drawChartCenter();

        function drawChartCenter() {
            var centerContainer = pie.append( 'g' )
                .attr( 'class', 'pieChart--center' );

            centerContainer.append( 'circle' )
                .attr( 'class', 'pieChart--center--outerCircle' )
                .attr( 'r', 0 )
                .attr( 'filter', 'url(#pieChartDropShadow)' )
                .transition()
                .duration( DURATION )
                .delay( DELAY )
                .attr( 'r', radius - 55 );

            centerContainer.append( 'circle' )
                .attr( 'id', 'pieChart-clippy' )
                .attr( 'class', 'pieChart--center--innerCircle' )
                .attr( 'r', 0 )
                .transition()
                .delay( DELAY )
                .duration( DURATION )
                .attr( 'r', radius - 60 )
                .attr( 'fill', '#fff' );

            centerContainer.append('text')
                .text ( '  A 34%' )
                .attr( 'class', 'pieChart--detail--percentage' )
                .attr( 'x', -37)
                .attr( 'y', -20);

            centerContainer.append('text')
                .text ( '  B 66%' )
                .attr( 'class', 'pieChart--detail--percentage' )
                .attr( 'x', -37)
                .attr( 'y', 20);
        }


        function drawDetailedInformation (data) {

            var infoWidth = width * 0.1;
            var anchor;
            var infoContainer;
            var position;

            var detail_1 = document.getElementById(detailContainerId);
            var detailedInfoContainer = d3.select(detailContainerEL);
            var detailSvg = detailedInfoContainer.select('svg');

            // add detailedInfo 'g' to the #pieChartDetailsSVG
            infoContainer = detailedInfo.append('g')
                .attr('width', infoWidth);

            /*
             if ( ( bBox.x + bBox.width / 2 ) > 0 ) {
             infoContainer = detailedInfo.append( 'g' )
             .attr( 'width', infoWidth )
             .attr(
             'transform',
             'translate(' + ( width - infoWidth ) + ',' + ( bBox.height + bBox.y ) + ')'
             );
             anchor   = 'end';
             position = 'right';
             } else {
             infoContainer = detailedInfo.append( 'g' )
             .attr( 'width', infoWidth )
             .attr(
             'transform',
             'translate(' + 0 + ',' + ( bBox.height + bBox.y ) + ')'
             );
             anchor   = 'start';
             position = 'left';
             }
             */


            /*
             infoContainer.data( [ data.value * 100 ] )
             .append( 'text' )
             .text ( '0 %' )
             .attr( 'class', 'pieChart--detail--percentage' )
             .attr( 'x', ( position === 'left' ? 0 : infoWidth ) )
             .attr( 'y', -10 )
             .attr( 'text-anchor', anchor )
             .transition()
             .duration( DURATION )
             .tween( 'text', function( d ) {
             var i = d3.interpolateRound(
             +this.textContent.replace( /\s%/ig, '' ),
             d
             );

             return function( t ) {
             this.textContent = i( t ) + ' %';
             };
             } );

             infoContainer.append( 'line' )
             .attr( 'class', 'pieChart--detail--divider' )
             .attr( 'x1', 0 )
             .attr( 'x2', 0 )
             .attr( 'y1', 0 )
             .attr( 'y2', 0 )
             .transition()
             .duration( DURATION )
             .attr( 'x2', infoWidth );

             infoContainer.data( [ data.description ] )
             .append( 'foreignObject' )
             .attr( 'width', infoWidth )
             .attr( 'height', 100 )
             .append( 'xhtml:body' )
             .attr(
             'class',
             'pieChart--detail--textContainer ' + 'pieChart--detail__' + position
             )
             .html( data.description );
             }

             */

        }
    }


    var colors = [
        {'red': '#d79d91'},
        {'blue': '#6bb7c7'},
        {'orange': '#c78c4e'},
        {'yellow': '#c7bb2d'},
        {'green': '#26c73a'},
        {'purple': '#7f44c7'},
        {'navy': '#1187c7'}
    ];


    var firstColorBox = d3.select('#color_1').append('svg')
        .attr("width", 30)
        .attr("height", 30);

    var firstRectColorBox = firstColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#d79d91');


    var secondColorBox = d3.select('#color_2').append('svg')
        .attr("width", 30)
        .attr("height", 30);

    var secondRectColorBox = secondColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#6bb7c7');


    var thirdColorBox = d3.select('#color_3').append('svg')
        .attr("width", 30)
        .attr("height", 30);


    var thirdRectColorBox = thirdColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#c78c4e');


    var fourthColorBox = d3.select('#color_4').append('svg')
        .attr("width", 30)
        .attr("height", 30);


    var fourthRectColorBox = fourthColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#c7bb2d');


    var fithColorBox = d3.select('#color_5').append('svg')
        .attr("width", 30)
        .attr("height", 30);

    var fithRectColorBox = fithColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#26c73a');


    var sixthColorBox = d3.select('#color_6').append('svg')
        .attr("width", 30)
        .attr("height", 30);

    var sixthRectColorBox = sixthColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#7f44c7');


    var seventhColorBox = d3.select('#color_7').append('svg')
        .attr("width", 30)
        .attr("height", 30);

    var seventhRectColorBox = seventhColorBox
        .append("rect")
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", '#1187c7');




    /**
     * draw the fancy line chart
     *
     * @param {String} elementId elementId
     * @param {Array}  data      data
     */
    function drawLineChart( elementId, data ) {
        // parse helper functions on top
        var parse = d3.time.format( '%Y-%m-%d' ).parse;
        // data manipulation first
        data = data.map( function( datum ) {
            datum.date = parse( datum.date );

            return datum;
        } );

        // TODO code duplication check how you can avoid that
        var containerEl = document.getElementById( elementId ),
            width       = containerEl.clientWidth *1.2,
            height      = width * 0.5,
            margin      = {
                top    : 0,
                right  : 0,
                left   : 0
            },

            detailWidth  = 100,
            detailHeight = 55,
            detailMargin = 10,

            container   = d3.select( containerEl ),
            svg         = container.select( 'svg' )
                .attr( 'width', width )
                .attr( 'height', height + margin.top ),

            x          = d3.time.scale().range( [ 0, width - detailWidth ] ),
            xAxis      = d3.svg.axis().scale( x )
                .ticks ( 8 )
                .tickSize( -height ),
            xAxisTicks = d3.svg.axis().scale( x )
                .ticks( 16 )
                .tickSize( -height )
                .tickFormat( '' ),
            y          = d3.scale.linear().range( [ height, 0 ] ),
            yAxisTicks = d3.svg.axis().scale( y )
                .ticks( 12 )
                .tickSize( width )
                .tickFormat( '' )
                .orient( 'right' ),

            area = d3.svg.area()
                .interpolate( 'linear' )
                .x( function( d )  { return x( d.date ) + detailWidth / 2; } )
                .y0( height )
                .y1( function( d ) { return y( d.value ); } ),

            line = d3.svg.line()
                .interpolate( 'linear' )
                .x( function( d ) { return x( d.date ) + detailWidth / 2; } )
                .y( function( d ) { return y( d.value ); } ),

            startData = data.map( function( datum ) {
                return {
                    date  : datum.date,
                    value : 0
                };
            } ),

            circleContainer;

        // Compute the minimum and maximum date, and the maximum price.
        x.domain( [ data[ 0 ].date, data[ data.length - 1 ].date ] );
        // hacky hacky hacky :(
        y.domain( [ 0, d3.max( data, function( d ) { return d.value; } ) + 700 ] );

        svg.append( 'g' )
            .attr( 'class', 'lineChart--xAxisTicks' )
            .attr( 'transform', 'translate(' + detailWidth / 2 + ',' + height + ')' )
            .call( xAxisTicks );

        svg.append( 'g' )
            .attr( 'class', 'lineChart--xAxis' )
            .attr( 'transform', 'translate(' + detailWidth / 2 + ',' + ( height + 7 ) + ')' )
            .call( xAxis );

        svg.append( 'g' )
            .attr( 'class', 'lineChart--yAxisTicks' )
            .call( yAxisTicks );

        // Add the line path.
        svg.append( 'path' )
            .datum( startData )
            .attr( 'class', 'lineChart--areaLine' )
            .attr( 'd', line )
            .transition()
            .duration( DURATION )
            .delay( DURATION / 2 )
            .attrTween( 'd', tween( data, line ) )
            .each( 'end', function() {
                drawCircles( data );
            } );


        // Add the area path.
        svg.append( 'path' )
            .datum( startData )
            .attr( 'class', 'lineChart--area' )
            .attr( 'd', area )
            .transition()
            .duration( DURATION )
            .attrTween( 'd', tween( data, area ) );

        // Helper functions!!!
        function drawCircle( datum, index ) {
            circleContainer.datum( datum )
                .append( 'circle' )
                .attr( 'class', 'lineChart--circle' )
                .attr( 'r', 0 )
                .attr(
                    'cx',
                    function( d ) {
                        return x( d.date ) + detailWidth / 2;
                    }
                )
                .attr(
                    'cy',
                    function( d ) {
                        return y( d.value );
                    }
                )
                .on( 'mouseenter', function( d ) {
                    d3.select( this )
                        .attr(
                            'class',
                            'lineChart--circle lineChart--circle__highlighted'
                        )
                        .attr( 'r', 7 );

                    d.active = true;

                    showCircleDetail( d );
                } )
                .on( 'mouseout', function( d ) {
                    d3.select( this )
                        .attr(
                            'class',
                            'lineChart--circle'
                        )
                        .attr( 'r', 6 );

                    if ( d.active ) {
                        hideCircleDetails();

                        d.active = false;
                    }
                } )
                .on( 'click touch', function( d ) {
                    if ( d.active ) {
                        showCircleDetail( d )
                    } else {
                        hideCircleDetails();
                    }
                } )
                .transition()
                .delay( DURATION / 10 * index )
                .attr( 'r', 6 );
        }

        function drawCircles( data ) {
            circleContainer = svg.append( 'g' );

            data.forEach( function( datum, index ) {
                drawCircle( datum, index );
            } );
        }

        function hideCircleDetails() {
            circleContainer.selectAll( '.lineChart--bubble' )
                .remove();
        }

        function showCircleDetail( data ) {
            var details = circleContainer.append( 'g' )
                .attr( 'class', 'lineChart--bubble' )
                .attr(
                    'transform',
                    function() {
                        var result = 'translate(';

                        result += x( data.date );
                        result += ', ';
                        result += y( data.value ) - detailHeight - detailMargin;
                        result += ')';

                        return result;
                    }
                );

            details.append( 'path' )
                .attr( 'd', 'M2.99990186,0 C1.34310181,0 0,1.34216977 0,2.99898218 L0,47.6680579 C0,49.32435 1.34136094,50.6670401 3.00074875,50.6670401 L44.4095996,50.6670401 C48.9775098,54.3898926 44.4672607,50.6057129 49,54.46875 C53.4190918,50.6962891 49.0050244,54.4362793 53.501875,50.6670401 L94.9943116,50.6670401 C96.6543075,50.6670401 98,49.3248703 98,47.6680579 L98,2.99898218 C98,1.34269006 96.651936,0 95.0000981,0 L2.99990186,0 Z M2.99990186,0' )
                .attr( 'width', detailWidth )
                .attr( 'height', detailHeight );

            var text = details.append( 'text' )
                .attr( 'class', 'lineChart--bubble--text' );

            text.append( 'tspan' )
                .attr( 'class', 'lineChart--bubble--label' )
                .attr( 'x', detailWidth / 2 )
                .attr( 'y', detailHeight / 3 )
                .attr( 'text-anchor', 'middle' )
                .text( data.label );

            text.append( 'tspan' )
                .attr( 'class', 'lineChart--bubble--value' )
                .attr( 'x', detailWidth / 2 )
                .attr( 'y', detailHeight / 4 * 3 )
                .attr( 'text-anchor', 'middle' )
                .text( data.value );
        }

        function tween( b, callback ) {
            return function( a ) {
                var i = d3.interpolateArray( a, b );

                return function( t ) {
                    return callback( i ( t ) );
                };
            };
        }
    }



    function ಠ_ಠ() {
        drawPieChart('pieChart', 'pieChartDetails', data.pieChart );
        //drawLineChart(    'lineChart',    data.lineChart );
    }

    // yeah, let's kick things off!!!
    ಠ_ಠ();

})();


















