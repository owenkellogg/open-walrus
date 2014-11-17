var View = require('famous/core/View');
var ImageSurface = require('famous/surfaces/ImageSurface');
var InputSurface = require('famous/surfaces/InputSurface');
var Timer = require('famous/utilities/Timer');
var Transitionable = require('famous/transitions/Transitionable');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var LoginModal = require('./login_modal.js');
var TitleView = require('./title_view');
var LoginModal = require('./login_modal');
var BaseView = require('./base_view.coffee');

function HomeView(options) {
  BaseView.apply(this, options); 
  var titleView = new TitleView();

  var titleTransitionable = new Transitionable(0);

  var titleModifier = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      var y = - (titleTransitionable.get() * 150);
      return Transform.translate(0, y, 0);
    }
  });

  Timer.after(function() {
    titleTransitionable.set(1, {
      duration: 1000,
      curve: "easeOutBounce"
    });
  }, 120);

  var loginModal = new LoginModal();

  this.add(loginModal);

  loginModal
    .add(titleModifier)
    .add(titleView);

  this.modal = loginModal;

  Timer.after(function() {
    loginModal.show(function() {
      console.log("showed currency modal");
    });
  }, 1);
}

HomeView.prototype = Object.create(BaseView.prototype);
HomeView.prototype.constructor = HomeView;

module.exports = HomeView;

