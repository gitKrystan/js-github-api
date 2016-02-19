var BREAKPOINT_FOR_SKY_RESIZE = 1.25;

function Sky() {
  this.$sky = $('.sky');
  this.setHeight();
  this.setWidth();
}

Sky.prototype.setHeight = function () {
  this.height = this.$sky.innerHeight() * BREAKPOINT_FOR_SKY_RESIZE;
  return this.height;
};

Sky.prototype.getHeight = function () {
  return this.height;
};

Sky.prototype.setWidth = function () {
  this.width = this.$sky.innerWidth() * BREAKPOINT_FOR_SKY_RESIZE;
  return this.width;
};

Sky.prototype.getWidth = function () {
  return this.width;
};

Sky.prototype.generateStars = function () {
  var skyHeight = this.setHeight();
  var skyWidth = this.setWidth();
  var numberOfStars = (skyHeight * skyWidth) / 10000;

  $('.star').remove();

  for (var i = 0; i < numberOfStars; i ++) {
    this.generateSingleStar();
  }
};

Sky.prototype.generateSingleStar = function () {
  var starSize = generateRandomInteger(5) + 2;
  var starTop = generateRandomInteger(this.getHeight());
  var starLeft = generateRandomInteger(this.getWidth());

  $('<div class="star">').css({
    width: starSize,
    height: starSize,
    top: starTop,
    left: starLeft,
  }).prependTo(this.$sky);
};

var generateRandomInteger = function(maxNumber)  {
  return Math.floor(Math.random() * maxNumber);
};

module.exports = Sky;
