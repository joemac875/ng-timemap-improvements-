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
  -html: item description
methods:
    LatLon(): returns latiude and longitude as openlayers lat lon object
    getFeature(): returns openlayers feature object for map object
    getTimelineObject():  returns vis timeline object for point
    getDates(): returns dates for object as js dates
*/
function MapObject(lat, log, title, startDate, endDate, icon, tags, html) {
    //object properties
    this.lat = lat || 0;
    this.lon = log || 0;
    this.title = title;
    this.startDate = startDate || [];
    this.endDate = endDate || [];
    this.icon = icon || "";
    this.tags = tags || [];
    this.visible = true;
    this.html = html || "";
    //object methods
    this.LonLat = function() {
       return new ol.proj.transform([this.lat, this.lon], 'EPSG:4326', 'EPSG:3857');
    };
    this.getFeature = function() {
    if(this.visible)
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([this.lat, this.lon], 'EPSG:4326', 'EPSG:3857')),
            name: this.title,
            html: this.html,
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
        visObject.html = this.html;
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
Local geoJSON Category Object Class
notes:
geoJSON features themselves DO NOT have individual tags 
parameters:
  -json: json string for object
  -jsonstyle ol style object for json defined features
  -startDate: array of strings containing year, month and day 
  -endDate: array of strings containing year, month and day 
  -icon: html markup for description / icon
  -tags: array of strings
  -visible: should this object be rendered
methods:
    getFeature(): returns openlayers feature object for map object
    getTimelineObject():  returns vis timeline object for point
    getDates(): returns dates for object as js dates
    vectorSource: returns ol.Source.Vector object with geojson features.
*/

function geoJSONCategory(json, title, startDate, endDate,tags, uniqueid) {
    /* Define private vars */
    var image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({color: 'red', width: 1})
    });
    /* Create a default layout for data */
var defaultJSONStyle = {
  'Point': new ol.style.Style({
    image: image
  }),
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiPoint': new ol.style.Style({
    image: image
  }),
  'MultiPolygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  }),
  'Polygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  'GeometryCollection': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'magenta'
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta'
      })
    })
  }),
  'Circle': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })
};
    /* Declare public variables */
    this.title = title || '';
    this.kind = "geoJSONLayer"; 
    this.startDate = startDate || [];
    this.endDate = endDate || [];
    this.tags = tags || [];
    this.jsonString = json || {};
    this.jsonstyle = json;
    this.elements = [this]; // for future use.
    this.visible = true;
    /* Define private methods */
    /* styleFunction() -- gets styles for json features */
    var styleFunction = function(feature, resolution) {
    return defaultJSONStyle[feature.getGeometry().getType()];
    };
 /*==========================================*/
    /* Declare public methods */
    this.add =  function(jsonString) {
        this.jsonString = jsonString;
    }
    this.vectorSource = function() {
    return new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(this.jsonString)
      });
    }
    this.vectorLayer = function() {
    return new ol.layer.Vector({
        source: this.vectorSource(),
        visible: this.visible,
        style: styleFunction
      });
    }
    this.getTags = function() {
        return this.tags.cus_unique(); //return an array of unique tags
    }
    this.getDates = function()  {
        var returnObject = { start: new Date() };
        if (!(typeof(this.startDate) === 'undefined')) {
        //date format = mm/dd/yyyy
        if( this.startDate.length === 3 )
            returnObject.start = new Date(this.startDate[2],this.startDate[1],this.startDate[0]);
        //date format = "Wed Mar 25 2015 01:00:00 GMT+0100 (W. Europe Standard Time)"
        else if( this.startDate.length === 1 ) 
            returnObject.start = new Date(this.startDate[0]);
        else
            alert("Error: Unsupported start date format on layer:" + this.title);
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
            alert("Error: Unsupported end date format on layer:" + this.title);
    }
        return returnObject;
    };
    this.features = function() {
        /*
        For future use.
        */
        return this.elements.cus_unique();
    }
    this.getTimelineObject = function() {
        var visObject = {}; //API description @ http://visjs.org/docs/timeline/
        visObject.latlon = "geoJSON"; 
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
        return [visObject]; //expected as an array
    };
    /* initalize */
    this.add(json);
}
/*
Remote Layer Object Class
notes:
supports valid KML or geoJSON file as input
parameters:
  -url: location of remote data
  -type: 'GeoJSON' or 'KML'
  -startDate: array of strings containing year, month and day 
  -endDate: array of strings containing year, month and day 
  -icon: html markup for description / icon
  -tags: array of strings
  -visible: should this object be rendered
methods:
    getFeature(): returns openlayers feature object for map object
    getTimelineObject():  returns vis timeline object for point
    getDates(): returns dates for object as js dates
    vectorSource: returns ol.Source.Vector object with geojson features.
*/

function RemoteLayer(url, type, title, startDate, endDate,tags, uniqueid) {
    /* Check that remote file exists and is of propert format*/
    if( !((typeof type ===  "string") && ( (type === 'GeoJSON') || (type === 'KML') ) ))
            alert('Error:'+title+"is an invalid type.")
    /*==========================================*/
    /* Declare private variables */
    /*==========================================*/

    /*==========================================*/
    /* Declare public variables */
    /*==========================================*/
    this.title = title || '';
    this.kind = "remoteLayer"; 
    this.startDate = startDate || [];
    this.endDate = endDate || [];
    this.tags = tags || [];
    this.url = url || "";
    this.type = type || "invalid";
    this.elements = [this]; // for future use.
    this.visible = true;
    /* Define private methods */

    /*==========================================*/
    /* Declare public methods */
    /*==========================================*/

    /*
     this.vectorLayer() -- returns ol3 source object for map object
    */
    this.vectorSource = function() {
    if(this.type === 'GeoJSON')
        return new ol.source.Vector({
          url: this.url,
        format: new ol.format.GeoJSON()
        });
    if (this.type === 'KML')
        return new ol.source.Vector({
          url: this.url,
        format: new ol.format.KML()
        });
    }
    /*
     this.vectorLayer() -- returns ol3 vector object for map object
    */
    this.vectorLayer = function() {
    if(this.type === 'KML') 
        return new ol.layer.Vector({
        source: new ol.source.Vector({
          url: this.url,
          format: new ol.format.KML()
        })
      });

    if(this.type === 'GeoJSON')
        return  new ol.layer.Vector({
        source: new ol.source.Vector({
          url: this.url,
          format: new ol.format.GeoJSON()
        })
      });
    }
    this.getTags = function() {
        return this.tags.cus_unique(); //return an array of unique tags
    }
    this.getDates = function()  {
        var returnObject = { start: new Date() };
        if (!(typeof(this.startDate) === 'undefined')) {
        //date format = mm/dd/yyyy
        if( this.startDate.length === 3 )
            returnObject.start = new Date(this.startDate[2],this.startDate[1],this.startDate[0]);
        //date format = "Wed Mar 25 2015 01:00:00 GMT+0100 (W. Europe Standard Time)"
        else if( this.startDate.length === 1 ) 
            returnObject.start = new Date(this.startDate[0]);
        else
            alert("Error: Unsupported start date format on layer:" + this.title);
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
            alert("Error: Unsupported end date format on layer:" + this.title);
    }
        return returnObject;
    };
    this.features = function() {
        /*
        For future use.
        */
        return this.elements.cus_unique();
    }
    this.getTimelineObject = function() {
        var visObject = {}; //API description @ http://visjs.org/docs/timeline/
        visObject.latlon = this.type; // so the system knows this is a layer file 
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
        return [visObject]; //expected as an array
    };

}
/*
Category Class
parameters:
  -elements: list of MapObjects or geoJSON objects
  -icon: url of image to display
methods:
vectorSource() - returns an openlayers3 vector containing the category features
features() - returns a list containing the category features
iconStyle() - returns ol style object for class of objects
*/
function Category(elements,title,style) {
    /*==========================================*/
    //private variables
    /*==========================================*/
    var defaultMarkerStyle = {
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                visible: this.visible,
                src: "http://openlayers.org/en/v3.9.0/examples/data/icon.png"
            };
    /*==========================================*/
    //public variables
    /*==========================================*/
    this.visible = true;
    this.title = title || guid();
    this.elements = elements || [];
    this.markerStyle =  style || defaultMarkerStyle;
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
            image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ (this.markerStyle))
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
    getTags -- returns an array containing all MapObject tags (strings) with no duplicates
    */
    this.getTags = function () {
      var tags = [];
      for (var i = this.elements.length - 1; i >= 0; i--) {
       for (var k =  this.elements[i].tags.length - 1; k >= 0; k--) {
        if ( $.inArray(this.elements[i].tags[k],tags) < 0 )
         tags.push(this.elements[i].tags[k])
       };
      };
      return tags;
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


