// Based on Simple Night Sky by Assaf Gelber http://codepen.io/agelber/pen/sjIKp
var Sky = require ('./../js/sky.js');

var setTombstoneRadius = function() {
  var $tombstone = $('.tombstone');
  var tombstoneWidth = $tombstone.width();
  var tombstoneRadius = tombstoneWidth / 3 + 'px';
  $('.tombstone').css( {
    'border-top-left-radius': tombstoneRadius,
    'border-top-right-radius': tombstoneRadius
  });
};

$(function() {
  var $window = $(window);
  var sky = new Sky();
  sky.generateStars();

  setTombstoneRadius();

  $window.resize(function() {
    setTombstoneRadius();

    var widthAtBreakPoint = $window.width() > sky.getWidth();
    var heightAtBreakPoint = $window.height() > sky.getHeight();
    var windowAtBreakPoint = widthAtBreakPoint || heightAtBreakPoint;
    if (windowAtBreakPoint) {
      sky.generateStars();
    }
  });
});
