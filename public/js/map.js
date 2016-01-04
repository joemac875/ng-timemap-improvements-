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
    The data parameter can either be an array of Categories or a single Category. 
    The mapObjects variable stores an array of openlayers objects holding the map layers and basemap objects
    */
    this.mapObjects = [];
    /*
    this.mapData - the orginal object(s) used to generate the map layers
    */
    this.mapData = [];
    /*
    generateOlLayers() -- Creates ol layers vector objects for map from Category or array of Category objects and loads them into map objects
    */
    this.generateOlLayers =  function() {
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
    }
    this.initalize = function() {
    this.generateOlLayers();
    //store a reference to our the orginal data set
    this.mapData.push(data);
    /*==========================================*/


    /*==========================================*/
    //initalize map
    /*==========================================*/
    //display only visible map elements
    if (debug) console.log(data.elements);
    this.m = new ol.Map({
        layers: this.mapObjects,
        target: document.getElementById(String(this.renderlocation)),
        view: new ol.View({
            center: [0, 0],
            zoom: 3
        })
    });
    this.m.on('singleclick', function(evt) {
        var coordinates = this.m.getEventCoordinate(evt.originalEvent);
        console.log(coordinates);
        console.log(this.mapObjects)
    });

    /*==========================================*/
    //update() -- redraws map
    /*==========================================*/
  };
    this.update = function() {
        for (var i = 0; i < this.mapObjects.length; i++) {
           var features = this.mapObjects[i].getSource(); // get features associated with layer
           console.log(typeof features);
           features.clear(); //remove features
           //add back visible features
           var mdata = this.mapData[i];
           console.log(this.mapData.length,i);
           for(var k = this.mapData[i].elements.length-1; k >=0; k--) {
                features.addFeature.addFeature(this.mapData[i].elements[k].getFeature());
           }
        };
        this.m.render(); //redraw
     
    }
}
var map = new Map(WoosterPoints, 'map');
map.initalize();