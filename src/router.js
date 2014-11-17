var Backbone = require('backbone');
var app = require('./app');
var HomeView = require('./views/home');
var balancesView = require('./views/balances');

module.exports = function(app) {

  var homeView = new HomeView();

  var AppRouter = Backbone.Router.extend({
    routes: {
      "accounts/:address/balances": "balances",
      "": "home"
    },
    home: function() {
      app.show(homeView);
    },
    balances: function(address) {
      app.show(balancesView);
    }
  });

  return AppRouter;
}

