var View = require('famous/core/View');
var ImageSurface = require('famous/surfaces/ImageSurface');
var InputSurface = require('famous/surfaces/InputSurface');
var Timer = require('famous/utilities/Timer');
var Transitionable = require('famous/transitions/Transitionable');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var Modal = require('./modal.js');
var dispatcher = require('../dispatcher');
var TitleView = require('./title_view');
var BaseView = require('./base_view.coffee');

function HomeView(options) {
  BaseView.apply(this, options); 
  var titleView = new TitleView();

  var titleTransitionable = new Transitionable(0);
  var inputTransitionable = new Transitionable(0);

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

  var currencyModal = new Modal();

  this.add(currencyModal);

  currencyModal
    .add(titleModifier)
    .add(titleView);

  currencyModal
    .add(usernameModifier)
    .add(usernameSurface)

  currencyModal
    .add(submitModifier)
    .add(submitSurface);

  this.modal = currencyModal;

  Timer.after(function() {
    currencyModal.show(function() {
      console.log("showed currency modal");
    });
  }, 1);

  this.submitSurface = submitSurface;
}

HomeView.prototype = Object.create(BaseView.prototype);
HomeView.prototype.constructor = HomeView;

module.exports = HomeView;

