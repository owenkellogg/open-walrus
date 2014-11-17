var View = require('famous/core/View');
var ImageSurface = require('famous/surfaces/ImageSurface');
var InputSurface = require('famous/surfaces/InputSurface');
var Timer = require('famous/utilities/Timer');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');

var BaseView = require('./base_view.coffee');

function TitleView(options) {
  BaseView.call(this, options);

  var nameLogo = new ImageSurface({
    size: [150, 75],
    content: 'images/open-wallet.png',
    classes: ['backfaceVisibility']
  });
  var initialTime = Date.now();

  var triskelion = new ImageSurface({
    size: [40, 40],
    content: 'images/ripple-triskelion.png',
    classes: ['backfaceVisibility']
  });

  var triskelion2 = new ImageSurface({
    size: [40, 40],
    content: 'images/ripple-triskelion.png',
    classes: ['backfaceVisibility']
  });

  var triskelion3 = new ImageSurface({
    size: [40, 40],
    content: 'images/ripple-triskelion.png',
    classes: ['backfaceVisibility']
  });

  function orbit(magnitude, period) {
    return magnitude / 1.5 * Math.sin((Date.now() - initialTime) * 0.002 * period || 1);
  }

  function cosine(magnitude, period) {
    return magnitude / 3 * Math.cos((Date.now() - initialTime) * 0.002 * period || 1);
  }

  var orbitModifier = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return Transform.translate(orbit(175, 2.25), orbit(10, 2.25), cosine(175, 2.25));
    }
  });

  var orbitModifier2 = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return Transform.translate(orbit(175, 2), cosine(100,1), orbit(150, 2));
    }
  });

  var orbitModifier3 = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return Transform.translate(cosine(175, 0.8), orbit(30, 0.6), orbit(175, 0.8));
    }
  });

  this.add(nameLogo);
  this.add(orbitModifier).add(triskelion);
  this.add(orbitModifier2).add(triskelion2);
  this.add(orbitModifier3).add(triskelion3);
}

TitleView.prototype = Object.create(BaseView.prototype);
TitleView.prototype.constructor = TitleView;
TitleView.DEFAULT_OPTIONS = {};

module.exports = TitleView;

