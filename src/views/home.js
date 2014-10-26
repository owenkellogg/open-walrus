var View = require('famous/core/View');
var ImageSurface = require('famous/surfaces/ImageSurface');
var InputSurface = require('famous/surfaces/InputSurface');
var Timer = require('famous/utilities/Timer');
var Transitionable = require('famous/transitions/Transitionable');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var CurrencyModal = require('./modal.js');
var Surface = require('famous/core/Surface');

var titleTransitionable = new Transitionable(0);
var inputTransitionable = new Transitionable(0);

// your app here
var nameLogo = new ImageSurface({
  size: [150, 75],
  content: 'images/open-wallet.png',
  classes: ['backfaceVisibility']
});

var triskelion = new ImageSurface({
  size: [75, 75],
  content: 'images/ripple-triskelion.png',
  classes: ['backfaceVisibility']
});

var triskelion2 = new ImageSurface({
  size: [75, 75],
  content: 'images/ripple-triskelion.png',
  classes: ['backfaceVisibility']
});

var triskelion3 = new ImageSurface({
  size: [75, 75],
  content: 'images/ripple-triskelion.png',
  classes: ['backfaceVisibility']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateX(4 * titleTransitionable.get() * Math.PI * 2);  
  }
});

function orbit(magnitude, period) {
  return magnitude / 1.5 * Math.sin((Date.now() - initialTime) * 0.002 * period || 1);
}

function cosine(magnitude, period) {
  return magnitude / 1.5 * Math.cos((Date.now() - initialTime) * 0.002 * period || 1);
}

var orbitModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.translate(orbit(175, 2.25), orbit(175, 2.25), cosine(175, 2.25));
  }
});

var orbitModifier2 = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.translate(orbit(175, 2), cosine(125,2), orbit(150, 2));
  }
});

var orbitModifier3 = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.translate(cosine(175, 0.8), orbit(175, 0.8), orbit(175, 0.8));
  }
});

var titleLogoView = new View({});

titleLogoView.add(centerSpinModifier).add(nameLogo);
titleLogoView.add(orbitModifier).add(triskelion);
titleLogoView.add(orbitModifier2).add(triskelion2);
titleLogoView.add(orbitModifier3).add(triskelion3);

var titleModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    var y = - (titleTransitionable.get() * 150);
    return Transform.translate(0, y, 0);
  }
});

var usernameSurface = new InputSurface({
  classes: ['inputs', 'username'],
  type: 'text',
  placeholder: 'ripple trade username'
});

var usernameModifier = new Modifier({
  align: [0.1, 0.6],
  size: [innerWidth * 0.7, 40],
  transform: function() {
    var progress = inputTransitionable.get();
    if (progress < 0.5) {
      return Transform.translate(5000, 0, 0);
    }
    return Transform.translate(1000 * (1 - progress), 0, 0);
  }
});

var submitSurface = new InputSurface({
  classes: ['inputs', 'submit'],
  type: 'submit',
  value: 'Login'
});

var submitModifier = new Modifier({
  align: [0.22, 0.75],
  size: [innerWidth * 0.7, 40],
  transform: function() {
    var progress = inputTransitionable.get();
    if (progress < 0.5) {
      return Transform.translate(-5000, 0, 0);
    }
    return Transform.translate(-1000 * (1 - progress), 0, 0);
  }
});

Timer.after(function() {
  titleTransitionable.set(1, {
    duration: 1000,
    curve: "easeOutBounce"
  });
  inputTransitionable.set(1, {
    method: 'spring',
    period: 600,
    dampingRatio: 0.4
  });
}, 120);

var view = new View();


var currencyModal = new CurrencyModal();

view
  .add(currencyModal);

currencyModal
  .add(titleModifier)
  .add(titleLogoView);

currencyModal
  .add(usernameModifier)
  .add(usernameSurface)

currencyModal
  .add(submitModifier)
  .add(submitSurface);

modal = currencyModal;

Timer.after(function() {
  currencyModal.show(function() {
    console.log("showed currency modal");
  });
}, 1);

view.submitSurface = submitSurface;

module.exports = view;

