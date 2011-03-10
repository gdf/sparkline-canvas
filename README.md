sparkline.js: Sparkline Charts for HTML5 Canvas
===============================================

A simple javascript library for drawing [sparklines](http://en.wikipedia.org/wiki/Sparkline) in a canvas element.

Requires jquery.

Example
-------

See also demo.html for a working example.

  var sparkline = new Sparkline($('#charts'), {
    width: 150, height: 30, // size of the chart
    color: '#00F',          // color of the line/bars
    bgColor: '#000',        // background color for chart
    lastColor: '#F00',      // (optional) draw indicator of this color at most recent value
    quartilesColor: '#999', // (optional) draw lines of this color at median and 1st/3rd quartiles
    medianColor: '#333',    // (optional) draw line at just the median
    useBars: false,         // if true, chart will be drawn as histogram/bar chart
    transformFn: function(y) { return y; }, // fn to be applied to every value before plotting 
  });
  var data [ [0,2], [1,5], [2,1], [3,5], [4,0], [5,4], [6,9], /* ... */ ];
  sparkline.plot(data);


