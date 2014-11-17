var ModalView = require('./modal');
var dispatcher = require('../dispatcher');
var InputSurface = require('famous/surfaces/InputSurface');
var Modifier = require('famous/core/Modifier');
var Transitionable = require('famous/transitions/Transitionable');
var Transform = require('famous/core/Transform');
var Timer = require('famous/utilities/Timer');

LoginModal = function(options) {
  ModalView.call(this, options);

  var inputTransitionable = new Transitionable(0);
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

  submitSurface.on('click', function() {
    dispatcher.dispatch({
      actionType: 'accountSelected',
      account: 'stevenzeiler'
    });
  }.bind(this));

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

  this
    .add(usernameModifier)
    .add(usernameSurface)

  this
    .add(submitModifier)
    .add(submitSurface)

    Timer.after(function() {
      inputTransitionable.set(1, {
        method: 'spring',
        period: 600,
        dampingRatio: 0.4
      });
    }, 120);
}

LoginModal.prototype = Object.create(ModalView.prototype);
LoginModal.prototype.constructor = LoginModal;

module.exports = LoginModal;

