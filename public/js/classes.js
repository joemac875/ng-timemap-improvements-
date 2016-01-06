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
  -visible: should this object be rendered
methods:
    LatLon(): returns latiude and longitude as openlayers lat lon object
    getFeature(): returns openlayers feature object for map object
    getTimelineObject():  returns vis timeline object for point
    getDates(): returns dates for object as js dates
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
    this.visible = true;
    //object methods
    this.LonLat = function() {
        return new ol.proj.transform([this.lat, this.lon], 'EPSG:4326', 'EPSG:3857');
    };
    this.getFeature = function() {
    if(this.visible)
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([this.lat, this.lon], 'EPSG:4326', 'EPSG:3857')),
            name: this.title,
            visible: this.visible,
            tags: this.tags,
            icon: this.icon
        });
    else
        var iconFeature = false;
        return iconFeature;
    };
    this.getTimelineObject = function() {
        var visObject = {}; //API description @ http://visjs.org/docs/timeline/
        visObject.latlon = this.LonLat(); 
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
    this.getDates = function()  {
        var returnObject = { start: new Date() };
        if (!(typeof(this.startDate) === 'undefined')) {
        //date format = mm/dd/yyyy
        if( this.startDate.length === 3 )
            returnObject.start = new Date(this.startDate[2],this.startDate[1],this.startDate[0]);
        //date format = Wed Mar 25 2015 01:00:00 GMT+0100 (W. Europe Standard Time)
        else if( this.startDate.length === 1 ) 
            returnObject.start = new Date(this.startDate[0]);
        else
            alert("Error: Unsupported start date format on marker:" + this.title);
    } else {
        alert("Error Date undefined on:" + this.title);
    }  
        //markers without without an end date are allowed, but don't return an end 
    if(!(typeof(this.endDate) === 'undefined')) {
        if( this.endDate.length == 3 )
            returnObject.end = new Date(this.endDate[2],this.endDate[1],this.endDate[0]);
        //date format = Wed Mar 25 2015 01:00:00 GMT+0100 (W. Europe Standard Time)
        else if( this.endDate.length == 1 ) 
            returnObject.end = new Date(this.endDate[0]);
        else
            alert("Error: Unsupported end date format on marker:" + this.title);
    }
        return returnObject;
    };
}
/*
Category Class
parameters:
  -elements: list of MapObjects
  -icon: url of image to display
methods:
vectorSource() - returns an openlayers3 vector containing the category features
features() - returns a list containing the category features
iconStyle() - returns ol style object for class of objects
*/
function Category(elements,title,icon) {
    /*==========================================*/
    //variables
    /*==========================================*/
    this.visible = true;
    this.title = title || guid();
    this.elements = elements || [];
    this.icon = icon || "http://openlayers.org/en/v3.9.0/examples/data/icon.png";
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
        iconFeatures.kind = 'ol.source.Vector';
        // store the ol features
        for (var i = this.elements.length - 1; i >= 0; i--) {
            if ( this.elements[i].visible === true )
                iconFeatures.addFeature(this.elements[i].getFeature());
        };
        return iconFeatures
    };
    /*
    features - returns a list containing the category features
    */
    this.features = function() {
        elementFeatures = [];
        for (var i = this.elements.length - 1; i >= 0; i--) {
            var feature = this.elements[i].getFeature();
            if (typeof feature === 'object')
                 elementFeatures.push(feature);
        }
        return elementFeatures;
    };
     /*
    iconStyle - returns ol graphic object for category maker
    */
    this.iconStyle = function() {
        //create the style
        return new ol.style.Style({
            image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                visible: this.visible,
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
            style: this.iconStyle(),
            visible: this.visible
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


