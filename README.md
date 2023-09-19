# maap
mapping on the internet

## WMS Sources
1. GIBS https://nasa-gibs.github.io/gibs-api-docs/available-visualizations/

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
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
```

3. [Make it rotate and pan smoothy with arrow keys](https://sandcastle.cesium.com/#c=rVZbb9s2FP4rrB9qGRVku3ur3WCpkyHGXLSIk77MQ0FLRxJXihRIyp5b+L/vkLpYku0tKBbAiHgu37l9PFIohTZkx2APirwnAvZkAZoVWfDFybxh6I4LKQxlAtTQJz82gpAt1bCiB1CfWfgN1DsSU67Bt6oEZCijriyVGXwojJGiLdUhCPiItucggu5YQg2T4gF4fu560i+xAlWE9lEvBTOMcn74wjTbcmh7UMEy59AWGpYBx7raslBBxExT8TsSybDIQJgANdTAPQd78oYR2w1H6HIczTZiI0LXy5SKiPebuUZPEOuchnC/Q9+H0sgrGx+EVOyotiiVd6DBLEVemFtXlxcXonzI5M4FH5VTKEMqesBwDVYGigYJGNvUR3pofIJcamZRbKDady8Vjz5XihOKm0yQcLmFIEccD2P4HWUJYn8s9qoyI4ixY5HXAR1VudYRQ6qMTBTNUxa2AlcQi5Y2iJXMrABVVPRQZ21MLkXCTBHBCegjNWlg5B0k2HrtXYoaNG49NKTJT4BVXiUZLFp3IjE/PEmvagUhEWjDREXIVvGu1l9c6XW4Jk2/Sc0n0wn+jfwGrlAV1ttKdiyLOiI//Ws8fDrkEKzuf3v6evfp+cPq/utitVz8XlbAAZklDRJ+KQyoHeWzUrgDZVhI+ToHiLBHk2AymVa6VCr23d6ci9pvcNAo+nF0AZprRaPIZbNi2iCzcOmgYST3ApdNw3zYnWhvcf5wggAf/0RI3ABQ9Z3FxHvVTbxhYFeMfu6elafTJWvMT5S1E3wAlqTm7KbVt6rD3NTZzrowGf277oojFJeJ14Eel1OdkDdkOqpOs/GY3EZ/FehvUqYJZloAiaUi2mFxljFTM46cDccFypjwuoo3bi6Tqd8kNWqSPZ9hA9JXXYapgewk7KiCW6Xk/g4Hip0lWM96T/Mc3YdO8ZwPyZ6ZtDpau2EN0b9E5QCfc697MR9phLdGd4scnUo6XkvqOb+YksuhnRTm+O8pWY//K6lHS4YWCS9HdFZXQvbm9JKgK4j/O6Y1+pmQ7p9P3k5OO2n0gh1Q5C/fAO793Xon4RJoj5m8fk1edcnYE7l+9mSdpoQcqGq2RW/DzK4smEJUL8XK4PLyJJaCj4DbCC85lDdblw7XN+qpjwN/MNfmwOGm7vmvLMulMqRQ3AuCsYEsx1cH6PG2wC8t/JLRuk55Pm67zvGjhrDo/WbQ+/DbDLABVGvUxAXna/YdNoOb+Rjtz1y5RFKI5BMWy+nBmqXTm1UpDIJgPsbjZU8jJd9S1UP+Bw)
(Fullscreen only)
![image](https://github.com/kevinkmcguigan/maap/assets/36888812/daebae11-c944-4d3a-9a9e-ab286947cf44)
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

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement) {
  const ray = viewer.camera.getPickRay(movement.position);
  const worldPosition = viewer.scene.globe.pick(ray, viewer.scene);
  
  if(Cesium.defined(worldPosition)) {
    const cartographicPosition = Cesium.Cartographic.fromCartesian(worldPosition);
    const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 10000),
      duration: 2,
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

let rotateInterval;
let verticalSpeed = 0.001;
let horizontalSpeed = 0.001;
let keys = {};

document.addEventListener('keydown', function(event) {
  keys[event.key] = true;

  if (!rotateInterval) {
    rotateInterval = setInterval(function() {
      const cameraHeight = viewer.camera.positionCartographic.height;
      const maxSpeed = Math.log(cameraHeight / 100000 + 1) / 1000;// Adjust this value for speed limit

      verticalSpeed = Math.min(verticalSpeed + 0.0001, maxSpeed);
      horizontalSpeed = Math.min(horizontalSpeed + 0.0001, maxSpeed);

      if (keys.ArrowDown) { // Swapped 'ArrowUp' with 'ArrowDown'
        viewer.camera.rotateUp(Cesium.Math.toRadians(verticalSpeed));
      }

      if (keys.ArrowUp) { // Swapped 'ArrowDown' with 'ArrowUp'
        viewer.camera.rotateDown(Cesium.Math.toRadians(verticalSpeed));
      }

      if (keys.ArrowRight) {
        viewer.camera.rotateRight(Cesium.Math.toRadians(horizontalSpeed));
      }

      if (keys.ArrowLeft) {
        viewer.camera.rotateLeft(Cesium.Math.toRadians(horizontalSpeed));
      }
    }, 20);
  }
});

document.addEventListener('keyup', function(event) {
  keys[event.key] = false;
  
  if (!keys.ArrowUp && !keys.ArrowDown && !keys.ArrowRight && !keys.ArrowLeft) {
    clearInterval(rotateInterval);
    rotateInterval = undefined;
    verticalSpeed = 0.001;  // Reset the speeds
    horizontalSpeed = 0.001;
  }
});
```

4. [Add in time slider with t+over](https://sandcastle.cesium.com/#c=rVdbb9s2FP4rbB4aGdVop32L3WBpkiJeXbSIk77MQ0FLxxYXihRIyp5b5L/vkLrLdtcMDRBEPJfv3A+ZSEljyYbDFjR5SyRsyRUYnqf0i6cFp5E/XilpGZegT0PyfSEJWTIDM7YD/ZlHj6DPyYoJA6FjrUFFKu7SEpXCu9xaJdtUE4GEjyi7DyLZhq+Z5Uregsj2VRv+FCPQeeQ+zVRyy5kQuy/c8KWAtgaTPPUKbaLlKQiM65wgBoRkOCRzsMQm3BCrPNH9dQlCItTyTjfSEHNbZ+acxCrKU5CWIodZuBHgTsFpzDenAzT3NBgv5EIW2aaRUNEjNYnKRXzpfQOsgHdt7Py45oZhCIZwaUFLJojXIHkWo6hxSJGvXsJkLPrlm6MPIOcZi+Bmg17cFkJBZZzJDTPOn1KbGrBTmeX20mcyWOWy+EjVxocxKOpemNRsh+ZqrBQ0o2uwrox3bFfr0EwZ7lCcoUp3q7SIP5eMBsX3Al0LtQSaIU6ANsIOswBxv3wVlGHGsMLcx0EHdFD6WlmMmLZqrVmW8KhluIS4anHpSqvUEZDFZA913MYUSq65zWNogD4ym1CrrmGNqTfBIau0VuuhYWP+D7BSq2grh9atyErs7lVQpoKQGIzlshyBVvA+1jc+9Mpc7WZYuxaSsxH+DMIaLtcl1uuS9lQE9YSdHh7rw/tdBnR28/7+6/Wnh3ezm69Xs+nVhyICgZOnlcXunrqW3zAxLogb0JZHTMwzgBhzNKKj0VnJS5Tm39wMHuS6ea3pLdpUol+uRZH+ZjTyA3cZ/51jLXDcMVMch5sYpxmSBDQ4KWIAyxUbkuG0PcIu02BMgYkng1Dfn3wg9SJgceyjnnFjsYNxnaJgrLYS12g9YbBpxsvh/OkJ1O3QvxDT7aCywHxFghfdDNWt3iWjnh/o4tRMcy3ezIZrlVvg68TujXQ1vp0RSbzsuAuTsn+qNPvOFWoddKCHRfuMyCtyNihPdduSvQp7kJTLoMt45Ys7Ogtrg4Pakf1GqEH6rMMwFZDLsqsDvdRaba+xWuTlS/LCkz7A7r6Vw/7EFUV4yILuFN+xGEfMdIMZNK4/HTP+kD3TtPP2Vxm/84V7nn2vc8SBXhV+xoUZrJ7rgVP5JQ44a852LyEdB9rrpbNWGmQCeKH/CNU5fBT0tx+iHlEaHYrLbSl8H9yjXHPL/JELzMw1ps2tqnmx3oLOAyXKtXZ7G/XCxkrYfms0KEErp8dQineK++qLVo8rWjxx3ru72GkHg6OSuIH5N6gF8N55PWpuocFPbOM8e8YuLl5nzTME1/HhYT2wOg7N1H81eSSA6XqL9zb/+Mjiz2X5KioFjt2eh5dmw60yeBKeTIzdCbioqvA7TzOlLcm1CCgdWkgz4d6kw2WO73hMlzGVd5NhW3WCT2HC47eLk96/FYsTjJUZg5xVLsQci7o4uZgMUX5PVSicZ7n+hHEJtnNiydnFrCBSSidDPB7WtEqJJdM95H8B)
![image](https://github.com/kevinkmcguigan/maap/assets/36888812/d8055411-a981-4bf4-8c82-576481c74662)
```
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  animation: false,
  timeline: true, // Set this to true to view the timeline
  creditContainer: document.createElement('div'),
});

viewer.clock.shouldAnimate = false; // Disables internal clock updates

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement) {
  const ray = viewer.camera.getPickRay(movement.position);
  const worldPosition = viewer.scene.globe.pick(ray, viewer.scene);
  
  if(Cesium.defined(worldPosition)) {
    const cartographicPosition = Cesium.Cartographic.fromCartesian(worldPosition);
    const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 10000),
      duration: 2,
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

let rotateInterval;
let verticalSpeed = 0.001;
let horizontalSpeed = 0.001;
let timeSpeed = 0;
let timeIncrement = 300; // Adjust to desired speed, here 300 seconds per keypress
let keys = {};

document.addEventListener('keydown', function(event) {
  keys[event.code] = true;

  if (!rotateInterval) {
    rotateInterval = setInterval(function() {
      const cameraHeight = viewer.camera.positionCartographic.height;
      const maxSpeed = Math.log(cameraHeight / 100000 + 1) / 1000;

      verticalSpeed = Math.min(verticalSpeed + 0.0001, maxSpeed);
      horizontalSpeed = Math.min(horizontalSpeed + 0.0001, maxSpeed);

      if (keys.ArrowDown && !keys.KeyT) {
        viewer.camera.rotateUp(Cesium.Math.toRadians(verticalSpeed));
      }

      if (keys.ArrowUp && !keys.KeyT) {
        viewer.camera.rotateDown(Cesium.Math.toRadians(verticalSpeed));
      }

      if (keys.ArrowRight && !keys.KeyT) {
        viewer.camera.rotateRight(Cesium.Math.toRadians(horizontalSpeed));
      }

      if (keys.ArrowLeft && !keys.KeyT) {
        viewer.camera.rotateLeft(Cesium.Math.toRadians(horizontalSpeed));
      }

      if (keys.KeyT && keys.ArrowRight) {
        timeSpeed = timeIncrement;
      } else if (keys.KeyT && keys.ArrowLeft) {
        timeSpeed = -timeIncrement;
      } else {
        timeSpeed = 0;
      }

      let newTime = Cesium.JulianDate.addSeconds(viewer.clock.currentTime, timeSpeed, new Cesium.JulianDate());
      viewer.clock.currentTime = newTime;
      viewer.timeline.updateFromClock();
      viewer.timeline.resize();
    }, 20);
  }
});

document.addEventListener('keyup', function(event) {
  keys[event.code] = false;
  
  if (!keys.ArrowUp && !keys.ArrowDown && !keys.ArrowRight && !keys.ArrowLeft && !keys.KeyT) {
    clearInterval(rotateInterval);
    rotateInterval = undefined;
    verticalSpeed = 0.001;
    horizontalSpeed = 0.001;
  }
});

```

5. [Toggle motion with shift!](https://sandcastle.cesium.com/#c=pVZtb9s4DP4run5YHcxTku1b2xXXtR2aW4YNTbsvl2FQbSYRIkuGJCfLtv73oyTbsRMnGHYBAth8eR6SImklShpLVhzWoMlbImFNrsHwIqNfvCw6TfzrtZKWcQn6NCY/p5KQJ2ZgzDagP/NkCfqMzJgwEDvVHFSi0rZsoTJ4V1irZFNqEpDwEW33QSRb8TmzXMk7EPm+61Y/wgx0kbhHM5LccibE5gs3/ElA04NJnnmHptDyDATmdUYQA2LiZImGlNs64zOSqqTIQFqKGmbhVoB7i05TvjrtIcxz73wqpzJUkSZCJUtqFqoQ6ZXnBKyspzwnzi7xNV8wmYrdok+QAeQkZwncrpDjLhhFFTSTK2YcW+lNDdiRzAt75fOPZoUMD5la+SB74bQCpWYbpKuxMtCMzsG64t+zTe1Dc2W4Q3FEle9aaZF+LhVbFH+CdC7UE9AccSLkiFvKAOL+fBaVaaYww8qmUQu0V8ZaMSZMWzXXLF/wpEFcQlw3tHSmVeYEqGJyB/W8iSmUnHNbpLAF+sjsglp1A3MsvYm6WGnttoOG7fQHYKVXaBqH1j6Rmdg8qKgsBSEpGMtl2biN5H2ub3zqFV0dZlyHFpPhAH+9uIYrdIn1upQ9h6SesY/jQ334sMmBjm/fP3y7+fT4bnz77Xo8uv4QMhCAnaUstvlIWtArJs6DcAXa8oSJSQ6QYo0GdDAYlrqF0vyHm7BOrZvKWt6QjSTG5VoU5W8GAzdOTrWEjUHJz+fSFJNPFpB+aIinsh5ilqY+pzE3FvsTVxz6p2otcbXV8wOr7fDwGQnvONR8ZhG27tQG07/BxG2+r8j61wFV2UDLfY+wIfxREMDHiqPD1O2q+tB6v5FekR9K7kggJXL7bFHvd0542y6c1qIJnXwHfL6wexun2i6tCV5428a+ydj3qgP8UAk1j1qw/dDZA/KSDHvlWzlRu43nATIuo7bipe+5wTCuycIk7PdmDbCr6oaomsbVll5prdY32F7k169mv2wVdTe16xTq/phH7d1yz1IcfNPOpVfP8D73Y97J/Jgf5XWB/V/me39QXeRec5TfWxwIYOcUjoUwhll3BE5xNABn8Kf8IQAkeyAvXpDlbtoYT9QMqDI8UKY6zOZabK3D5tY4xh+S/m16b97J/uogfYfxoFket5/xwvOA+u1n859CYGFvsOpufU0AV0BqotZ9Kim0dh8i9Iu36HHz8rRFicojOYQQLl3uqWlW3QVpkacI8t5dKpxn1Ou00sj6A7wSP5yvB+7hJD65MHYj4LL63v7Ns1xpSwotIkr7FrIc6wym/1TglReXrjHVpeKi33S9wNsl4enb6cnODXx6QhLBjEHNrBBigkFMTy4v+mi/5yoUtqycf8KRFWzjzBbDy3EQUkov+vja7WmVEk9M7yD/Bw)
![image](https://github.com/kevinkmcguigan/maap/assets/36888812/a77478ed-c919-4122-af21-3aca0bcfe41a)
```
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  animation: false,
  timeline: true, 
  creditContainer: document.createElement('div'),
});

viewer.clock.shouldAnimate = false; 

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement) {
  const ray = viewer.camera.getPickRay(movement.position);
  const worldPosition = viewer.scene.globe.pick(ray, viewer.scene);
  
  if(Cesium.defined(worldPosition)) {
    const cartographicPosition = Cesium.Cartographic.fromCartesian(worldPosition);
    const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 10000),
      duration: 2,
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

let rotateInterval;
let verticalSpeed = 0.001;
let horizontalSpeed = 0.001;
let timeSpeed = 0;
let timeIncrement = 300; 
let keys = {};
let latchedKeys = {};

document.addEventListener('keydown', function(event) {
  if (event.shiftKey) {
    latchedKeys[event.code] = !latchedKeys[event.code];
    keys[event.code] = false;
  } else {
    keys[event.code] = true;
  }
});

document.addEventListener('keyup', function(event) {
  keys[event.code] = false;
});

rotateInterval = setInterval(function() {
  const cameraHeight = viewer.camera.positionCartographic.height;
  const maxSpeed = Math.log(cameraHeight / 100000 + 1) / 1000;

  verticalSpeed = Math.min(verticalSpeed + 0.0001, maxSpeed);
  horizontalSpeed = Math.min(horizontalSpeed + 0.0001, maxSpeed);

  if (keys.ArrowDown || latchedKeys.ArrowDown) {
    viewer.camera.rotateUp(Cesium.Math.toRadians(verticalSpeed));
  }

  if (keys.ArrowUp || latchedKeys.ArrowUp) {
    viewer.camera.rotateDown(Cesium.Math.toRadians(verticalSpeed));
  }

  if (keys.ArrowRight || latchedKeys.ArrowRight) {
    viewer.camera.rotateRight(Cesium.Math.toRadians(horizontalSpeed));
  }

  if (keys.ArrowLeft || latchedKeys.ArrowLeft) {
    viewer.camera.rotateLeft(Cesium.Math.toRadians(horizontalSpeed));
  }

  if ((keys.KeyT && keys.ArrowRight) || (latchedKeys.KeyT && latchedKeys.ArrowRight)) {
    timeSpeed = timeIncrement;
  } else if ((keys.KeyT && keys.ArrowLeft) || (latchedKeys.KeyT && latchedKeys.ArrowLeft)) {
    timeSpeed = -timeIncrement;
  } else {
    timeSpeed = 0;
  }

  let newTime = Cesium.JulianDate.addSeconds(viewer.clock.currentTime, timeSpeed, new Cesium.JulianDate());
  viewer.clock.currentTime = newTime;
  viewer.timeline.updateFromClock();
  viewer.timeline.resize();
}, 20);
```
# OpenLayers

[Blending two Gibs layers](https://jsfiddle.net/)

![image](https://github.com/kkmcgg/maap/assets/36888812/835493aa-279f-453f-a6f7-f03555a32be9)


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIBS Viewer with OpenLayers</title>
    <style>
        html, body, #map {
            margin: 0;
            width: 100%;
            height: 100%;
            font-family: Arial, sans-serif;
            background-color: grey;
        }
                #map canvas {
            mix-blend-mode: darken;
        }
        
    </style>
    <link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css" type="text/css">
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>
</head>
<body>
<div id="map"></div>
<script>
    window.onload = function() {
        var map = new ol.Map({
          view: new ol.View({
              extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
              center: ol.proj.fromLonLat([-63.6465, 44.6820]), // Approximate center of Nova Scotia
              zoom: 6,  // Adjusted to zoom in closer to Nova Scotia
              maxZoom: 9
          }),
            target: 'map',
            renderer: ['canvas', 'dom']
        });

        var source = new ol.source.XYZ({
            url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/' +
                'MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-06-20/' +
                'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'
        });
        
        var source2 = new ol.source.XYZ({
            url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/' +
                'MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-06-21/' +
                'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'
        });
        
         var source3 = new ol.source.XYZ({
            url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/' +
                'MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-06-22/' +
                'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'
        });

        var layer = new ol.layer.Tile({ source: source , opacity:.2});
        var layer2 = new ol.layer.Tile({ source: source2 , opacity:.2});
        var layer3 = new ol.layer.Tile({ source: source3 , opacity:.2});

       map.addLayer(layer2);
       map.addLayer(layer);
       map.addLayer(layer3);
    };
</script>
</body>
</html>
```

[Basic WebGL Points](https://jsfiddle.net/)

![image](https://github.com/kkmcgg/maap/assets/36888812/5197beb6-71a7-45d3-99c7-f30c74f81d98)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenLayers WebGL Shader Example</title>
    <link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v6.5.0/css/ol.css">
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v6.5.0/build/ol.js"></script>
    <style>
        #map {
            width: 100%;
            height: 500px;
        }
    </style>
</head>
<body>
<div id="map"></div>
<script>
    window.onload = function () {
        const source = new ol.source.Vector({
            features: [new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([0, 0])))],
        });

        const layer = new ol.layer.WebGLPoints({
            source: source,
            style: {
                symbol: {
                    symbolType: 'circle',
                    size: 40,
                    color: '#FF5733',
                    opacity: 0.5,
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlP/AOW3MEoAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAoSURBVAjXY2AAAAACAAHiIbwzAAAAAElFTkSuQmCC'
                }
            }
        });

        const map = new ol.Map({
            target: 'map',
            layers: [layer],
            view: new ol.View({
                center: [0, 0],
                zoom: 2,
            })
        });
    };
</script>
</body>
</html>
```



# MapLibre

[Basic WMS display](https://jsfiddle.net/)

![image](https://github.com/kkmcgg/maap/assets/36888812/883c9c8f-28b6-48ec-8254-773e4f624699)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MapLibre GL JS with OSM</title>
    <script src='https://unpkg.com/maplibre-gl@2.0.0/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@2.0.0/dist/maplibre-gl.css' rel='stylesheet' />
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
<div id='map'></div>

<script>
    var map = new maplibregl.Map({
        container: 'map',
        style: {
            version: 8,
            sources: {
                'raster-tiles': {
                    type: 'raster',
                    tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256
                }
            },
            layers: [{
                id: 'osm-tiles',
                type: 'raster',
                source: 'raster-tiles',
                minzoom: 0,
                maxzoom: 22
            }]
        },
        center: [-63.6465, 44.6820], // Coordinates for Nova Scotia
        zoom: 6
    });
</script>

</body>
</html>
```

[Basic GIBS WMS](https://jsfiddle.net/)

![image](https://github.com/kkmcgg/maap/assets/36888812/46ba99cf-716c-49b7-87ba-5f9ea629308e)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MapLibre GL JS with OSM</title>
    <script src='https://unpkg.com/maplibre-gl@2.0.0/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@2.0.0/dist/maplibre-gl.css' rel='stylesheet' />
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
<div id='map'></div>

<script>
    var map = new maplibregl.Map({
        container: 'map',
        style: {
            version: 8,
            sources: {
                'raster-tiles': {
                    type: 'raster',
                                tiles: ['https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-06-21/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'],
                    //tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256
                }
            },
            layers: [{
                id: 'osm-tiles',
                type: 'raster',
                source: 'raster-tiles',
                minzoom: 0,
                maxzoom: 22
            }]
        },
        center: [-63.6465, 44.6820], // Coordinates for Nova Scotia
        zoom: 6
    });
</script>
</body>
</html>
```
# Pure WebGL

Basic WMS rendering

![image](https://github.com/kkmcgg/maap/assets/36888812/ba28f460-1140-4349-b40b-c8d91e1df3c1)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WMS to WebGL</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <canvas id="webglCanvas" width="512" height="512"></canvas>
    <script>
        const canvas = document.getElementById('webglCanvas');
        const gl = canvas.getContext('webgl');

        // Vertex Shader
        const vsSource = `
            attribute vec4 aVertexPosition;
            attribute vec2 aTextureCoord;

            varying highp vec2 vTextureCoord;

            void main(void) {
                gl_Position = aVertexPosition;
                vTextureCoord = aTextureCoord;
            }
        `;

        // Fragment Shader
        const fsSource = `
            varying highp vec2 vTextureCoord;
            uniform sampler2D uSampler;

            void main(void) {
                gl_FragColor = texture2D(uSampler, vTextureCoord);
            }
        `;

        function compileShader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        }

        const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
        const textureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord');

        const vertices = new Float32Array([
            1.0,  1.0,
           -1.0,  1.0,
            1.0, -1.0,
           -1.0, -1.0,
        ]);

        const textureCoordinates = new Float32Array([
            1.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            0.0,  0.0,
        ]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.STATIC_DRAW);

        function drawScene(texture) {
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vertexPosition);

            gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
            gl.vertexAttribPointer(textureCoord, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(textureCoord);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(gl.getUniformLocation(shaderProgram, 'uSampler'), 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        function loadTexture(url, callback) {
            const texture = gl.createTexture();
            const image = new Image();
            
             image.crossOrigin = "anonymous";  // Request CORS headers

            image.onload = function() {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                callback(texture);
            };

            image.src = url;
        }

        const wmsUrl = "https://basemap.nationalmap.gov/arcgis/services/USGSImageryOnly/MapServer/WMSServer?request=GetMap&service=WMS&version=1.1.1&layers=0&styles=&format=image/jpeg&srs=EPSG:4326&bbox=-90,40,-80,50&width=512&height=512";
        
        loadTexture(wmsUrl, function(texture) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.useProgram(shaderProgram);

            drawScene(texture);
        });

    </script>
</body>
</html>

```

# Chats

https://chat.openai.com/share/9883ee21-3d7e-4256-a86a-34e5e47b4101
https://chat.openai.com/share/53ac4e00-b91e-4083-a905-e4aae61a98c2
