var debug = true;
/*==========================================*/
/*
categories -- an array of category objects
*/  
var categories = [];
var WoosterPoints =  new Category([]);
var myPoint = new MapObject(Math.random()*360-180, Math.random()*180-90, "Myspot", [1,1,1992], [03,02,2011], "place", [], "aaaaa");
var myPoint2 = new MapObject(Math.random()*360-180, Math.random()*180-90, "Myspot2", [01,01,1940], [03,11,1963], "place2", [], "aa3aa");
WoosterPoints.add(myPoint2);
WoosterPoints.add(myPoint);
console.log(WoosterPoints);
/*
mapLayer -- stores all layers;
*/
var mapLayers = [];
/*==========================================*/

   


/*==========================================*/
//initalize map
/*==========================================*/


mapLayers.push(new ol.layer.Tile({ source: new ol.source.OSM() })); //add osm layer
mapLayers.push(WoosterPoints.vectorLayer());
if (debug) console.log(WoosterPoints.vectorLayer());
    var map = new ol.Map({
      layers: mapLayers,
      target: document.getElementById('map'),
      view: new ol.View({
        center: [0, 0],
        zoom: 3
      })
    }); 

map.on('singleclick', function(evt) {
            var coordinates = map.getEventCoordinate(evt.originalEvent);
            console.log(coordinates);
});
/*==========================================*/
//
// Define rotate to north control.
//



