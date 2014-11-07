var Backbone = require('../backbone');
var Balance = require('./balance');

var Balances = Backbone.Collection.extend({
  model: Balance,
  url: function() {
    return 'https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/balances';
  },
  parse: function(response) {
    return response.balances;
  }
});

module.exports = Balances;

