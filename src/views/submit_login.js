var InputSurface = require('famous/surfaces/InputSurface');
var Modifier = require('famous/core/Modifier');

function SubmitLogin(options) {
  var transitionable = options.transitionable;

  this.surface = new InputSurface({
    classes: ['inputs', 'submit'],
    type: 'submit',
    value: 'Login'
  });

  this.modifier = new Modifier({
    align: [0.22, 0.75],
    size: [innerWidth * 0.7, 40],
    transform: function() {
      var progress = transitionable.get();
      if (progress < 0.5) {
        return Transform.translate(-5000, 0, 0);
      }
      return Transform.translate(-1000 * (1 - progress), 0, 0);
    }
  });
}

SubmitLogin.prototype.getSurface = function() {
  return this.surface;
}

SubmitLogin.prototype.getModifier = function() {
  return this.modifier;
}

module.exports = SubmitLogin;
