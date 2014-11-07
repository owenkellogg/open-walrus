'use strict';

var Backbone = require('../backbone');

var Balance = Backbone.Model.extend({

  printBalance: function() {
    var balance = this;
    return balance.get('value')+' '+balance.get('currency')+' at '+balance.get('counterparty');
  }

});

module.exports = Balance;

