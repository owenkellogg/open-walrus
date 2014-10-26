var View = require('famous/core/View');
var Transitionable = require('famous/transitions/Transitionable');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

var CurrencyModal = function(options) {
  View.call(this, options);

  var transitionable = this.transitionable = new Transitionable(0);

  var modifier = this.modifier = new Modifier({
    transform: function() {
      var p = transitionable.get();
      return Transform.translate(0, innerHeight * (1-p), 0)
    }
  });

  this.renderNode = View.prototype.add.call(this, modifier);
}

CurrencyModal.prototype = Object.create(View.prototype);
CurrencyModal.prototype.constuctor = CurrencyModal;

CurrencyModal.prototype.show = function show(callback) {
  this.transitionable.set(1, {
    method: 'spring',
    period: 600,
    dampingRatio: 0.4
  }, callback);
}

CurrencyModal.prototype.add = function add(renderTree) {
  return this.renderNode.add(renderTree);
}

CurrencyModal.prototype.hide = function hide(callback) {
  this.transitionable.set(0, {
    method: 'spring',
    period: 600,
    dampingRatio: 0.4
  }, callback);
}

module.exports = CurrencyModal;

