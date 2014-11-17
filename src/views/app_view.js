var BaseView = require('./base_view.coffee');

function AppView(options) {
  BaseView.call(this, options);
};

AppView.prototype = Object.create(BaseView.prototype);
AppView.prototype.constructor = AppView;

module.exports = AppView;

