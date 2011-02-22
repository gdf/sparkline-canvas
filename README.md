sparkline.js: Sparkline Charts for HTML5 Canvas
===============================================

A simple javascript library for drawing [sparklines](http://en.wikipedia.org/wiki/Sparkline) in a canvas element.

Requires jquery.

See demo.html for an example.

Options
-------

* width, height: size of chart
* color: color to use to draw line/bars
* bgColor: background color for chart
* lastColor: if defined, an indicator of this color will be added for the most recent value
* quartilesColor: if defined, draw indicators for the median and 1st/3rd quartiles 
* useBars: if true, chart will be drawn as histogram/bar chart
* transformFn: a function to by applied to every value before plotting

