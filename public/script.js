// GEE code example
var image = ee.Image('COPERNICUS/S2_SR/20210701T045621_20210701T050249_T44PVS');

// D3.js code example
var svg = d3.select('#map')
  .append('svg')
  .attr('width', 400)
  .attr('height', 300);

svg.append('circle')
  .attr('cx', 200)
  .attr('cy', 150)
  .attr('r', 50)
  .attr('fill', 'steelblue');
