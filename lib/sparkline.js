/*
 * sparkline.js: Sparkline Charts for HTML5 Canvas
 *
 * https://github.com/gdf/sparkline-canvas
 *
 * Copyright (c) 2011 Greg Fast (gdf@speakeasy.net)
 * Released under the MIT license. 
 *
 */

function Sparkline(containerElt, o) {
  var opts = o || {};
  var width = opts.width || 150;
  var height = opts.height || 30;
  var color = opts.color || '#F00';
  var bgColor = opts.bgColor || '#000';
  var transformFn = opts.transformFn || function(y) { return y; }
 
  var canvas = $('<canvas>').attr('width', width).attr('height', height);
  var lastVal = $('<span>').attr('class', 'sparkline').text("0");
  var aSpan = $('<span>');
  containerElt.append(aSpan);
  aSpan.append(canvas);
  aSpan.append(lastVal);
  var ctx = canvas.get(0).getContext("2d");

  function compress(xyPoints) {
    var output = [];
    var ptsPerPixel = xyPoints.length / width;
    var p, i;
    var max=-Infinity, min=Infinity;
    for(p=0; p<width; p++) {
      //console.log("p=" + p);
      output[p] = {min: Infinity, max:-Infinity, sum:0, count:0, avg:NaN};
      var step = {
        start: Math.floor(p*ptsPerPixel), 
        end: Math.floor((p+1)*ptsPerPixel)
      };
      //console.log("i=" + step.start + " -> " + step.end);
      for(i=step.start; i<step.end; i++) {
        var y = xyPoints[i][1];
        y = transformFn(y);
        //console.log("y[" + i + "]=" + y);
        output[p].sum += y;
        output[p].count += 1;
        if (y <= output[p].min) { output[p].min=y; }
        if (y >= output[p].max) { output[p].max=y; }
        if (y <= min) { min=y; }
        if (y >= max) { max=y; }
      }
      output[p].avg = output[p].sum/output[p].count;
      //console.log(output[p]);
    }
    function scaleMe(y) {
      return Math.floor((y-min)/(max-min) * height);
    }
    output.forEach(function(x) {
      x.min = scaleMe(x.min);
      x.max = scaleMe(x.max);
      x.avg = scaleMe(x.avg);
      //console.log(x.min + " " + x.avg + " " + x.max);
    });
    return output;
  };

  function screenQuartiles(xyPoints) {
    var sortedYs = xyPoints.map(function(xy) {
      return xy[1];
    }).sort(function(a,b) { return a-b; });
    var i_q1 = Math.floor(sortedYs.length * 0.25);
    var i_q2 = Math.floor(sortedYs.length * 0.50);
    var i_q3 = Math.floor(sortedYs.length * 0.75);
    // ... profit!
  };

  return {
    plot: function(xyPoints) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      var screenPts = compress(xyPoints);
      ctx.beginPath();
      ctx.strokeStyle = color;
      var x;
      for(x=0; x<width; x++) {
        var y = screenPts[x];
        if (y.avg != NaN) {
          ctx.moveTo(x, height - y.min + 1);
          ctx.lineTo(x, height - y.max - 1);
        }
      }
      ctx.stroke();
      var v = xyPoints[xyPoints.length-1][1];
      var fnv = transformFn(v);
      //console.log("lastVal = " + v);
      lastVal.text(fnv);
    },
  };
}
