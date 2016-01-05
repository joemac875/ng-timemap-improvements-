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
            var layer = data[i].vectorLayer();
            layer.kind = "Category";
            layer.tmid = i; //create unique id for access when updating
            this.mapObjects.push(layer);
            this.mapData[i] = data[i];
        };
    } else {
        //only a single data element exists
            var layer = data.vectorLayer();
            layer.kind = "Category";
            layer.tmid = 0; //create unique id for access when updating
            this.mapData[0] = data;
            this.mapObjects.push(layer);
    }
    }
    this.initalize = function() {
    this.generateOlLayers();
    //store a reference to our the orginal data set
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
            zoom: 2
        })
    });
    this.m.on('singleclick', function(evt) {
        var coordinates = this.m.getEventCoordinate(evt.originalEvent);
    });

 
  };
      /*==========================================*/
    //updatelayer () -- update layer features
    /*==========================================*/
    this.updateLayer = function(element, index, array) {
       //is the element a category or basemap??
       if(element.hasOwnProperty('kind')) {
       if(debug) console.log(this.mapData[0],element.getSource(),element.getRevision(),this.mapData[0],this.mapData[0].vectorSource(),element.getProperties());
        if(element.hasOwnProperty('tmid'))
             element.setSource(this.mapData[element.tmid].vectorSource());

         }
    }
    /*==========================================*/
    //update() -- redraws map
    /*==========================================*/
    this.update = function() {
        this.mapObjects.forEach(this.updateLayer,this);
        this.m.render(); //redraw
    }
}
var map = new Map(WoosterPoints, 'map');
map.initalize();