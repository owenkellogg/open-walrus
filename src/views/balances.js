var SequentialLayout = require('famous/views/SequentialLayout');
var ScrollView = require('famous/views/ScrollView');
var Surface = require('famous/core/Surface');
var GridLayout = require('famous/views/GridLayout');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
var TitleView = require('./title_view.js');
var titleLogoView = new TitleView();

var layout = new HeaderFooterLayout();

GridLayout.prototype.getSize = function() {
  return [undefined, undefined];
};

var grid = new GridLayout({
    dimensions: [2, 2]
});
var grid2 = new GridLayout({
    dimensions: [2, 2]
});

var scrollView = new ScrollView({
  groupScroll: true,
  direction: 0,
  speedLimit: 10
});

var gridSurfaces = [];
var grid2Surfaces = [];

grid.sequenceFrom(gridSurfaces);

grid2.sequenceFrom(grid2Surfaces);
scrollView.sequenceFrom([grid, grid2]);

var values = [
  ['XRP', '126,377'],
  ['XAU', '6.2'],
  ['BTC', '25.566'],
  ['USD', '3,267']
];

for(var i = 0; i < 4; i++) {
    gridSurfaces.push(new Surface({
        content: "<h2>"+values[i][0]+" "+values[i][1]+"</h2>",
        size: [undefined, undefined],
        properties: {
            color: "#404040",
            lineHeight: '200px',
            textAlign: 'center',
            border: '1px solid #ccc'
        }
    }));
    grid2Surfaces.push(new Surface({
        content: "<h2>"+values[i][0]+" "+values[i][1]+"</h2>",
        size: [undefined, undefined],
        properties: {
            color: "#404040",
            lineHeight: '200px',
            textAlign: 'center',
            border: '1px solid #ccc'
        }
    }));
}

var headerModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.scale(1, 0.2, 1);
  }
})

layout.header.add(headerModifier).add(titleLogoView);
layout.content.add(scrollView);

module.exports = layout;

