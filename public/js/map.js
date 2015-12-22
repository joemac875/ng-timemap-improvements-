/*==========================================*/
/*
categories -- an array of category objects
*/  
var categories = [];
/*
mapLayer -- stores all layers;
*/
var mapLayers = [];
/*==========================================*/


/*==========================================*/
//initalize map
/*==========================================*/


mapLayers.push(new ol.layer.Tile({ source: new ol.source.OSM() })); //add osm layer

    var map = new ol.Map({
      layers: mapLayers,
      target: document.getElementById('map'),
      view: new ol.View({
        center: [0, 0],
        zoom: 3
      })
    }); 
/*==========================================*/
