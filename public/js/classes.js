//Timemap Classes
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
initolOverlay() --
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
    this.vectorSource = function() {
        var iconFeatures = []; // store the ol features
        for (var i = this.elements.length - 1; i >= 0; i--) {
            iconFeatures.push(this.elements[i].getFeature());
        };
        return new ol.source.Vector({
            features: iconFeatures
        });
    };
    this.features = function() {
        elementFeatures = [];
        for (var i = this.elements.length - 1; i >= 0; i--)
            elementFeatures.push(this.elements[i].getFeature());
        return elementFeatures;
    };
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
    //add the feature vector to the layer vector, and apply a style to whole layer
    this.vectorLayer = function() {
        return new ol.layer.Vector({
            source: this.vectorSource(),
            style: this.iconStyle()
        });
    }
    this.add = function(mapobj) {
        this.elements.push(mapobj);
    };
};