var WoosterPoints = new Category([]);
var myPoint = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot", [1, 1, 1992], [03, 02, 2011], "place", [], "aaaaa");
var myPoint2 = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot2", [01, 01, 1940], [03, 11, 1963], "place2", [], "aa3aa");
WoosterPoints.add(myPoint2);
WoosterPoints.add(myPoint);
/*
/* */
var debug = true;
/*==========================================*/
function Map(data, renderlocation) {
    /*
    renderlocation -- id of div container for map
    */
    this.renderlocation = renderlocation || '';
    /*
    categories -- an array of category objects
    */
    this.categories = [];
    /*
    mapLayer -- stores all layers;
    */
    this.mapLayers = [];
    /*
    The data parameter can either be an array of Categories or a single Category. 
    */
    this.mapObjects = [];
    this.initalize = function() {
    this.mapObjects = [];
    //add osm layer
    this.mapObjects.push(new ol.layer.Tile({
        source: new ol.source.OSM()
    })); 
    if (data.constructor === Array) {
        for (var i = data.length - 1; i >= 0; i--) {
            this.mapObjects.push(data[i].vectorLayer());
        };
    } else {
        this.mapObjects.push(data.vectorLayer());
    }
    //store a reference to our the orginal data set
    this.mapData = data;
    /*==========================================*/


    /*==========================================*/
    //initalize map
    /*==========================================*/
    //display only visible map elements
    if (debug) console.log(data.elements);
    var m = new ol.Map({
        layers: this.mapObjects,
        target: document.getElementById(String(this.renderlocation)),
        view: new ol.View({
            center: [0, 0],
            zoom: 3
        })
    });
    m.on('singleclick', function(evt) {
        var coordinates = m.getEventCoordinate(evt.originalEvent);
        console.log(coordinates);
    });
           console.log(m.layers);

    this.update();
    /*==========================================*/
    //update() -- redraws map
    /*==========================================*/
  };
    this.update = function() {
       // this.mapLayer = map;
        console.log('updated!')
    }
}
var map = new Map(WoosterPoints, 'map');
map.initalize();