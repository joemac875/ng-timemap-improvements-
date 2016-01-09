
/*
mapObjects -- stores all overlays 
*/
var mapObjects = [];
/*
Inital Map Center 
*/
var newMapObject = new MapObject(8.90, 37.44, "Our House", [05,20,1979], [05,05,2005], "", [], "uniqueid");
mapObjects.push(newMapObject);

var london = ol.proj.fromLonLat([-0.12755, 51.507222]);
var moscow = ol.proj.fromLonLat([37.6178, 55.7517]);
var istanbul = ol.proj.fromLonLat([28.9744, 41.0128]);
var rome = ol.proj.fromLonLat([12.5, 41.9]);
var bern = ol.proj.fromLonLat([7.4458, 46.95]);
var madrid = ol.proj.fromLonLat([-3.683333, 40.4]);
    //create the style
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png'
      }))
    });
      var view = new ol.View({
        // the view's initial state
        center: istanbul,
        zoom: 6
      });

      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            preload: 4,
            source: new ol.source.OSM()
          })
        ],
        // Improve user experience by loading tiles while animating. Will make
        // animations stutter on mobile or slow devices.
        loadTilesWhileAnimating: true,
        target: 'map',
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          })
        }),
        view: view
      });
      console.log(mapObjects.markers());
      //marker layer
      var vectorLayer = new ol.layer.Vector({
  source: mapObjects.markers(),
  style: iconStyle
});

    