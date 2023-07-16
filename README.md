# maap
mapping on the internet

# Cesium Sandcastle Tutorial

1. [Make a clean simple globe](https://sandcastle.cesium.com/#c=lVNNi9swEP0rgy/JQpDpdesNpUuhC1taaNmTL4o8iYfqI0jjhLT0v3ckr7cmLcXrk+bNe29mrFFdw7eeEpzJWjARNSNo8HiGe0w0ODgRnjEC+cTaG1StN0HOE34346qngq1XpoT3wbMmj3G1gZ+tB6jntTpKemcRuEfY6YRg9UX8jmS+Y1SZntHHDH4p2C3stU24+a/TAYMJ3bPBFCxS9sFJIwNz8EWc4/clXCRPBj2Ck3LzEQr6ScBXjOD1iQ6aKXjo0R7nPf1JfZTMK7qbeeaLjIPJ5yQBMWlrL5D6cL4u8jCjPkzMJ0oktovKak9urGqmXRAS9yXJ5NAKVIq+MBf5TlLQPO5PkD/hIOyfryIijrNMxEWuIuuIM3SUXSz6EXpZ5FvoghkcelbjU/lgMUfrVUen1Y3Y/7p52/pqUzWJLxa32SN/78gdQ2QYol0rVTM6KcGY6t0geyFuKWVhpjb1XNqIMVB311ZXb6qtwFidkmT2g7Vf6Qe21baphf+X1AbdkT98PmGUwTKtf7N9HEGlVFNL+G8lh2B3Ol45/wY)
![image](https://github.com/kevinkmcguigan/maap/assets/36888812/0153c5cc-d303-4af6-bac1-79db8e86900a)
```// This will create a new Cesium viewer instance.
const viewer = new Cesium.Viewer('cesiumContainer', {
  // This will disable the base layer picker.
  baseLayerPicker: false,
  // This will disable the geocoder.
  geocoder: false,
  // This will disable the home button.
  homeButton: false,
  // This will disable the scene mode picker.
  sceneModePicker: false,
  // This will disable the navigation help button.
  navigationHelpButton: false,
  // This will disable the navigation instructions initially shown.
  navigationInstructionsInitiallyVisible: false,
  // This will disable the animation container with the timeline.
  animation: false,
  // This will disable the timeline at the bottom of the screen.
  timeline: false,
  // This will disable the credit display.
  creditContainer: document.createElement('div'),
});
```
2. [Make a smooth double click to zoom to 10km](https://sandcastle.cesium.com/#c=nVRRT9swEP4rVl+aSpED7A0K2ihFVCsCrYynSMi1L6k1x45sJyib+O87J2lIC3tZpEjx3X3f3X13DjfaeVJLeAVLLomGV7IAJ6uCPre2aMrb48Joz6QGO43Jn1QTsmUO1qwB+yj5L7DnJGPKQRxcORhuxKFtZwq4rrw3emx1HDTcY+xHEs1qmTMvjb4DVX6EvvtX2IGtePh0Ky29ZEo1z9LJrYIxgmlZtICx0csCFPY1tnELQvqh43MiDK8K0J6ih3lYKginaCpkPZ0h5G12kepUJwlZtAGYikCNIWTHtFCobGYs8TsgU2EqLItwhQ1PuyCaat5OYR98MIYN5gS9KRmHZYi+64KibmSUM10zF/L3aOrAr3RZ+W+tIlFW6e6jMHVb9qybX5fSsgbTDVwFWEZz8GEcP1gzYGhpnAwsIdEe+2qsEo+9452lnSnNldkCLZEnwhzxgbMjCa/Mor5NARlqLaID0llf6z4jZ9ab3LJyJ/kocU+xGHlpZk0RDOhi+oj1YsypjM6lrwS8E90zv6Pe3ECO0rvos6x0gB2x4YL9B1mP6tYosOEq3aqmXZluKsSb7hQWBwSWzdtdpl384QQz1TyZqJeOEAHOS92v/kisVpsvrVT78oa24qGVmJye4DOLQ1Eb8ISpvkcs6fQkRh8pwIN1Q77K9snOBlCmZL7zgytgz4gDVE30uLdOyTe8TvG/lv+pKYGul7dPLzcPP6/Xy5fFerX4PruYxJO5842Cq30NX2VRGutJZVVEaeKhKLEhcMm2Qv3wJju3n9w8GUPneKmJFJfp5OjHl05QfOYcerJKqY38Denkap5g/AeoMkxInT/UYBVrQtju9GrdGSml8wSPnyO9MWrL7BHzXw)
![image](https://github.com/kevinkmcguigan/maap/assets/36888812/9849d721-7b42-4e9c-b51f-2d0c2c91539f)


```const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  animation: false,
  timeline: false,
  creditContainer: document.createElement('div'),
});

// Create an event handler for the 'double click' event.
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement) {
  const ray = viewer.camera.getPickRay(movement.position);
  const worldPosition = viewer.scene.globe.pick(ray, viewer.scene);
  
  if(Cesium.defined(worldPosition)) {
    const cartographicPosition = Cesium.Cartographic.fromCartesian(worldPosition);
    const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

    // Fly the camera to the clicked location.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 10000), // Set altitude to 10,000 meters
      duration: 2, // Set flight duration to 2 seconds
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);```
