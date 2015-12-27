//Timemap Classes
"use strict";
/*
Map Object Class
parameters:
  -lat: latiude in EPSG:4326
  -lon: lonitude in EPSG:4326
  -startDate: array of strings containing year, month and day 
  -endDate: array of strings containing year, month and day 
  -icon: html markup for description / icon
  -tags: array of strings
methods:
LatLon() -- returns latiude and longitude as openlayers lat lon object
getFeature() -- returns openlayers feature object for map object
getTimelineObject -- returns vis object for point
*/
function MapObject(lat, log, title, startDate, endDate, icon, tags, uniqueid) {

    //object properties
    this.lat = lat || 0;
    this.lon = log || 0;
    this.title = title;
    this.startDate = startDate || [];
    this.endDate = endDate || [];
    this.icon = icon || "";
    this.tags = tags || [];
    //object methods
    this.LonLat = function() {
        return ol.proj.fromLonLat([this.lon, this.lat]);
    };
    this.getFeature = function() {
        var iconFeature = new ol.Feature({
            geometry: new
            ol.geom.Point(ol.proj.transform([this.lat, this.lon], 'EPSG:4326', 'EPSG:3857')),
            name: this.title,
            tags: this.tags,
            icon: this.icon
        });
        return iconFeature;
    };
    this.getTimelineObject = function() {
        var visObject = {}; //API description @ http://visjs.org/docs/timeline/
        //is the object a point or line on the timeline?
        if (this.startDate === this.endDate) {
            visObject.type = 'point';
         } else {
             if ( this.endDate.length === 3 ) {
                    visObject.end = new Date(this.endDate[2],this.endDate[1],this.endDate[0]);
             };
         }
        visObject.content = title;
        visObject.start = new Date(this.startDate[2],this.startDate[1],this.startDate[0]);
        return visObject;
    };
}
/*
Category Class
parameters:
  -elements: list of MapObjects
  -icon: url of image to display
          vectorSource.addFeature(iconFeature);

*/
function Category(elements) {
    /*==========================================*/
    //variables
    /*==========================================*/
    this.elements = elements || [];
    this.icon = "http://openlayers.org/en/v3.9.0/examples/data/icon.png";
    /*==========================================*/
    //methods
    /*==========================================*/
    /*
    vectorSource - returns an openlayers3 vector containing the category features
    */
    this.vectorSource = function() {
        var iconFeatures = new ol.source.Vector({
                //create empty vector
        }); 
        // store the ol features
        for (var i = this.elements.length - 1; i >= 0; i--) {
            iconFeatures.addFeature(this.elements[i].getFeature());
        };
        return iconFeatures
    };
    /*
    features - returns a list containing the category features
    */
    this.features = function() {
        elementFeatures = [];
        for (var i = this.elements.length - 1; i >= 0; i--)
            elementFeatures.push(this.elements[i].getFeature());
        return elementFeatures;
    };
     /*
    features - returns ol graphic object for category maker
    */
    this.iconStyle = function() {
        //create the style
        return new ol.style.Style({
            image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: this.icon
            }))
        });
    };
    /*
    vectorLayer - returns ol object with category objects + category style
    */
    this.vectorLayer = function() {
            //add the feature vector to the layer vector, and apply a style to whole layer
        return new ol.layer.Vector({
            source: this.vectorSource(),
            style: this.iconStyle()
        });
    }
    /*
    add --  validates & appends a MapObject to the category's elements array
    */
    this.add = function(mapobj) {
        this.elements.push(mapobj);
    };
    /*
    getTimelineObject -- returns an array of vis timeline objects for the map
    */
    this.getTimelineObject = function() {
        var visObjects = [];
        for (var i = this.elements.length - 1; i >= 0; i--) {
            visObjects.push(this.elements[i].getTimelineObject());
        };
        return visObjects;
    };
};