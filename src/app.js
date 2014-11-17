var RenderController = require('famous/views/RenderController');
var Engine = require('famous/core/Engine');
var dispatcher = require('./dispatcher');

var Transitionable = require('famous/transitions/Transitionable');
var SpringTransition = require('famous/transitions/SpringTransition');
var SnapTransition = require('famous/transitions/SnapTransition');
var Backbone = require('backbone');

var Balances = require('./models/balances');

Transitionable.registerMethod('snap', SnapTransition);
Transitionable.registerMethod('spring', SpringTransition);

var AppView = require('./views/app_view');
var appView = new AppView();

var app = new RenderController();
var Router = require('./router')(app);
var mainContext = Engine.createContext();
mainContext.setPerspective(750);

mainContext.add(app);

var balances = new Balances({});
balances.fetch();

var router = new Router();

dispatcher.register(function(payload) {
  if (payload.actionType === 'accountSelected') {
    router.navigate('/accounts/'+payload.account+'/balances', { trigger: true });
  }
});

Backbone.history.start();

