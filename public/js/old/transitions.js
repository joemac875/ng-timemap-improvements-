  var rotateLeft = document.getElementById('rotate-left');
      rotateLeft.addEventListener('click', function() {
        var rotateLeft = ol.animation.rotate({
          duration: 2000,
          rotation: -4 * Math.PI
        });
        map.beforeRender(rotateLeft);
      }, false);
      var rotateRight = document.getElementById('rotate-right');
      rotateRight.addEventListener('click', function() {
        var rotateRight = ol.animation.rotate({
          duration: 2000,
          rotation: 4 * Math.PI
        });
        map.beforeRender(rotateRight);
      }, false);

      var rotateAroundRome = document.getElementById('rotate-around-rome');
      rotateAroundRome.addEventListener('click', function() {
        var currentRotation = view.getRotation();
        var rotateAroundRome = ol.animation.rotate({
          anchor: rome,
          duration: 1000,
          rotation: currentRotation
        });
        map.beforeRender(rotateAroundRome);
        view.rotate(currentRotation + (Math.PI / 2), rome);
      }, false);

      var panToLondon = document.getElementById('pan-to-london');
      panToLondon.addEventListener('click', function() {
        var pan = ol.animation.pan({
          duration: 2000,
          source: /** @type {ol.Coordinate} */ (view.getCenter())
        });
        map.beforeRender(pan);
        view.setCenter(london);
      }, false);

      var elasticToMoscow = document.getElementById('elastic-to-moscow');
      elasticToMoscow.addEventListener('click', function() {
        var pan = ol.animation.pan({
          duration: 2000,
          easing: elastic,
          source: /** @type {ol.Coordinate} */ (view.getCenter())
        });
        map.beforeRender(pan);
        view.setCenter(moscow);
      }, false);

      var bounceToIstanbul = document.getElementById('bounce-to-istanbul');
      bounceToIstanbul.addEventListener('click', function() {
        var pan = ol.animation.pan({
          duration: 2000,
          easing: bounce,
          source: /** @type {ol.Coordinate} */ (view.getCenter())
        });
        map.beforeRender(pan);
        view.setCenter(istanbul);
      }, false);

      var spinToRome = document.getElementById('spin-to-rome');
      spinToRome.addEventListener('click', function() {
        var duration = 2000;
        var start = +new Date();
        var pan = ol.animation.pan({
          duration: duration,
          source: /** @type {ol.Coordinate} */ (view.getCenter()),
          start: start
        });
        var rotate = ol.animation.rotate({
          duration: duration,
          rotation: 2 * Math.PI,
          start: start
        });
        map.beforeRender(pan, rotate);
        view.setCenter(rome);
      }, false);

      var flyToBern = document.getElementById('fly-to-bern');
      flyToBern.addEventListener('click', function() {
        var duration = 2000;
        var start = +new Date();
        var pan = ol.animation.pan({
          duration: duration,
          source: /** @type {ol.Coordinate} */ (view.getCenter()),
          start: start
        });
        var bounce = ol.animation.bounce({
          duration: duration,
          resolution: 4 * view.getResolution(),
          start: start
        });
        map.beforeRender(pan, bounce);
        view.setCenter(bern);
      }, false);

      var spiralToMadrid = document.getElementById('spiral-to-madrid');
      spiralToMadrid.addEventListener('click', function() {
        var duration = 2000;
        var start = +new Date();
        var pan = ol.animation.pan({
          duration: duration,
          source: /** @type {ol.Coordinate} */ (view.getCenter()),
          start: start
        });
        var bounce = ol.animation.bounce({
          duration: duration,
          resolution: 2 * view.getResolution(),
          start: start
        });
        var rotate = ol.animation.rotate({
          duration: duration,
          rotation: -4 * Math.PI,
          start: start
        });
        map.beforeRender(pan, bounce, rotate);
        view.setCenter(madrid);
      }, false);