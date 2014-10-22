"use strict";
// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Transitionable = require('famous/transitions/Transitionable');
var RenderController = require('famous/views/RenderController');

var SpringTransition = require('famous/transitions/SpringTransition');
var SnapTransition = require('famous/transitions/SnapTransition');
var homeView = require('./views/home.js');
var balancesView = require('./views/balances.js');

Transitionable.registerMethod('snap', SnapTransition);
Transitionable.registerMethod('spring', SpringTransition);

// create the main context
var mainContext = Engine.createContext();
mainContext.setPerspective(750);

var renderController = new RenderController();

mainContext.add(renderController);

homeView.submitSurface.on('click', function() {
  renderController.show(balancesView);
});


renderController.show(homeView);

