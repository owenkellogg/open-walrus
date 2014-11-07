var Backbone = require('../backbone');

var Account = Backbone.Model.extend({
  url: function() {
    return 'https://id.ripple.com/v1/authinfo?username='+this.get('name')
  }
});

module.exports = Account;

