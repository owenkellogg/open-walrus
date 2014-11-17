var SequentialLayout = require('famous/views/SequentialLayout');
var ScrollView = require('famous/views/ScrollView');
var Surface = require('famous/core/Surface');
var GridLayout = require('famous/views/GridLayout');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
var BaseView = require('./base_view.coffee');
var TitleView = require('./title_view.js');
var titleView = new TitleView();
var rerender;

GridLayout.prototype.getSize = function() {
  return [undefined, undefined];
};

function BalancesView(options) {
  this.collection = options.collection;
  BaseView.call(this, options);

  this.layout =  new HeaderFooterLayout({
    headerSize: 60,
    footerSize: 0
  });

  this.scrollView = new ScrollView({
    groupScroll: true,
    direction: 0,
    speedLimit: 10
  });

  var headerModifier = new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return Transform.scale(1, 0.5, 1);
    }
  });

  this.layout.header.add(headerModifier).add(titleView);
  this.layout.content.add(this.scrollView);

  this.collection.on('sync', function() {
    rerender(this.scrollView, this.collection);
  }.bind(this));
}

function rerender(scrollView, collection) {
  var surfaces = [];
  var surfaceGroups = [];
  var grids = [];

  collection.models.forEach(function(balance) {
    surfaces.push(new Surface({
      content: "<h2>"+parseFloat(balance.get('value')).toFixed(2)+" "+balance.get('currency')+"</h2>",
      size: [undefined, undefined],
      properties: {
        color: "#404040",
        lineHeight: '200px',
        textAlign: 'center',
        border: '1px solid #ccc'
      }
    }));
  });

  while (surfaces.length) {
    surfaceGroups.push(surfaces.splice(0,4));
  }

  surfaceGroups.forEach(function(group) {
    var grid = new GridLayout({
      dimensions: [2, 2]
    });
    grid.sequenceFrom(group);
    grids.push(grid);
  });

  scrollView.sequenceFrom(grids); 
}

BalancesView.prototype = Object.create(BaseView.prototype);
BalancesView.prototype.constructor = BalancesView;

module.exports = BalancesView;

