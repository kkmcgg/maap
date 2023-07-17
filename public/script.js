// // Obtain access token after successful sign-in
// const authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
// const accessToken = authResponse.access_token;

// // Authenticate Earth Engine API with the access token
// ee.data.authenticateViaOauth(accessToken);

const apiKey = process.env.API_KEY;

// Authenticate Earth Engine API with the API key
ee.data.authenticateViaAPIKey(apiKey);

// Make an Earth Engine API request
ee.Image('COPERNICUS/S2_SR/20210701T045621_20210701T050249_T44PVS').getInfo(function(imageInfo) {
  console.log(imageInfo);
});


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
