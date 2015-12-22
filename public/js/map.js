/*==========================================*/
/*
categories -- an array of category objects
*/  
var categories = [];
var WoosterPoints =  new Category([]);
var myPoint  = new MapObject(73.11, 12.11, "Myspot", [1,1,1992], [03,02,2011], "place", [], "aaaaa");
WoosterPoints.add(myPoint);
console.log(WoosterPoints);
/*
mapLayer -- stores all layers;
*/
var mapLayers = [];
mapLayers.push(WoosterPoints.vectorLayer())
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
