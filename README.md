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

3. 
