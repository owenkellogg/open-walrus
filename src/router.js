var Backbone = require('backbone');
var app = require('./app');
var HomeView = require('./views/home');
var BalancesView = require('./views/balances');

module.exports = function(app) {

  var homeView = new HomeView();
  var balancesView = new BalancesView({
    collection: app.balances
  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      "accounts/:address/balances": "balances",
      "": "home"
    },
    home: function() {
      app.show(homeView);
    },
    balances: function(address) {
      console.log('route to balances');
      app.show(balancesView.layout);
      console.log('about to render');
      console.log(balancesView.rerender);
      balancesView.render();
    }
  });

  return AppRouter;
}

