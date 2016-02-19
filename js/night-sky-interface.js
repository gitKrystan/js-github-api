// Based on Simple Night Sky by Assaf Gelber http://codepen.io/agelber/pen/sjIKp
var Sky = require ('./../js/sky.js');

$(function() {
  var $window = $(window);
  var sky = new Sky();
  sky.generateStars();

  $window.resize(function() {
    var widthAtBreakPoint = $window.width() > sky.getWidth();
    var heightAtBreakPoint = $window.height() > sky.getHeight();
    var windowAtBreakPoint = widthAtBreakPoint || heightAtBreakPoint;
    if (windowAtBreakPoint) {
      sky.generateStars();
    }
  });
});
