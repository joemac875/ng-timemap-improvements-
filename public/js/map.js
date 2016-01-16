//
// Define map controls.
//
/*
Class FilterButton
defines an ol3 button which triggers the filter modal
*/
/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 * @param {Object=} caller
 */
app.FilterButton = function(opt_options, parent) {

    var options = opt_options || {};
    var buttonParent = parent || {};
    var button = document.createElement('button');
    button.innerHTML = '<i data-toggle="tooltip" title="Filters" data-placement="right" class="fa fa-filter"></i>';

    var this_ = this;
    console.log(this);
    /*
    Opens Modal
    */
    var openFilter = function(e) {
        $('#filterModal').modal('toggle');
    };
    /*
    On Modal Close, Filter results
    */
    var closeFilter = function() {
        timemap.map.toggleCategories();
    }
    $('#filterModal').on('hidden.bs.modal', closeFilter);
    button.addEventListener('click', openFilter, false);
    button.addEventListener('touchstart', openFilter, false);

    var element = document.createElement('div');
    element.className = 'filterButton ol-unselectable ol-control';
    element.timemapendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(timemap.FilterButton, ol.control.Control);

/*
    Class EditButton
    defines an ol3 button which triggers the edit modal
     */
/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.EditButton = function(opt_options, parent) {
    var options = opt_options || {};
    var button = document.createElement('button');
    button.innerHTML = '<i data-toggle="tooltip" title="Edit" data-placement="right"  class="fa fa-pencil"></i>';

    var this_ = this;
    /*
    Load edit view
    */
    var openEditModal = function(e) {
        window.location = "/edit/" + window.location.hash;
    };

    button.addEventListener('click', openEditModal, false);
    button.addEventListener('touchstart', openEditModal, false);

    var element = document.createElement('div');
    element.className = 'editButton ol-unselectable ol-control';
    element.timemapendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(timemap.EditButton, ol.control.Control);
/*==========================================*/
//define map class
/*==========================================*/
function Map(data, renderlocation, initialmapstate) {
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
    this.mapData - the original object(s) used to generate the map layers
    */
    this.mapData = [];
    /*
    generateOlLayers() -- Creates ol layers vector objects for map from Category or array of Category objects and loads them into map objects
    */
    this.generateOlLayers = function() {
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
    this.filterByTags = function(tag) {
            for (var i = this.mapData.length - 1; i >= 0; i--) {
                if (this.mapData[i].hasOwnProperty('tags'))
                    for (var k = this.mapData[i].tags.length - 1; k >= 0; k--) {
                        if (tag === this.mapData[i].tags[k])
                            this.mapData[i].visible = false;
                    };
                if (this.mapData[i].hasOwnProperty('elements'))
                    for (var k = this.mapData[i].elements.length - 1; k >= 0; k--) {
                        if (this.mapData[i].elements[k].hasOwnProperty('tags'))
                            for (var p = this.mapData[i].elements[k].length - 1; p >= 0; p--) {
                                if (tag === this.mapData[i].elements[k].tags[p])
                                    this.mapData[i].elements[k].visible = false;
                            };
                    };

            };
            this.update();
        }
        /*
        drawFilter -- generates html for filter
        */
    this.drawFilter = function() {
            /* Create UI and start event listeners for category filters */
            //inject select zone
            var location = document.getElementById("filters");
            var htmlToReturn = "";
            htmlToReturn += "<select id='" + renderlocation + '_filters' + "' multiple='multiple' >";

            for (var i = this.mapData.length - 1; i >= 0; i--) {
                htmlToReturn += "<option value='" + i + "'>" + this.mapData[i].title + "</option>";

            };
            timemap.visibleCategories = [];
            timemap.hiddenCategories = [];
            htmlToReturn += '</select>';
            location.innerHTML += htmlToReturn;
            var handlers = {
                afterSelect: function(values) {
                    //set as invsibile

                    timemap.hiddenCategories.push(values);
                },
                afterDeselect: function(values) {
                    //set category as visible again

                    timemap.visibleCategories.push(values);
                }


            }
            var selectName = String(renderlocation) + '_filters';
            $('select').multiSelect(handlers);
            /* Now add tag filter UI */
            var taglocation = document.getElementById("mapObjects");
            htmlToReturn = '';
            htmlToReturn += '<div data-placement="bottom" data-toggle="tooltip" title="Filter by tag"  class="tmtagCtrl" style="z-index:999; position: absolute; top: 10px; right: 10px; padding: 5px; background-color: rgba(255,255,255,0.5);"><select id="' + renderlocation + '_filters_tag">';
            htmlToReturn += '<option value="!!!!!_ALL_!!!!!!">' +
                "Show All" + '</option>';

            var tags = []; // a list of unique tags
            for (var i = this.mapData.length - 1; i >= 0; i--) {
                var categoryTags = this.mapData[i].getTags() || [];
                for (var z = categoryTags.length - 1; z >= 0; z--) {
                    if ($.inArray(categoryTags[z], tags) < 0) {
                        tags.push(categoryTags[z]);
                        htmlToReturn += '<option value="' + categoryTags[z] + '">' + categoryTags[z] + '</option>';
                    }
                };
            };
            htmlToReturn += '</select>';
            taglocation.innerHTML += htmlToReturn;
            //add event listener for tag change
            console.log('#' + renderlocation + '_filters_tag' + ' option:selected')
            var id = '#' + renderlocation + '_filters_tag';
            //add event listener for filter change
            $(id).change(function() {
                timemap.map.filterByTags($(id + " option:selected").text());
            });
        }
        /*==========================================*/
        //initialize map 
        /*==========================================*/

    /*
    Declare Private Vars
    */
    var zoom = 2;
    var center = [0, 0];
    var rotation = 0;
    
    if (typeof initialmapstate !== 'undefined') {
        // default zoom, center and rotation
        zoom = initialmapstate.zoom;
        center = initialmapstate.center;
        rotation = initialmapstate.rotation;
    }
    /*
        Create a popup window and display when a marker is clicked.
        */
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });

    this.initalize = function() {
        this.generateOlLayers();
        this.drawFilter();

        //display only visible map elements
        if (debug) console.log(data.elements);
        this.m = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([
                new timemap.FilterButton({}, this),
                new timemap.EditButton()
            ]),
            layers: this.mapObjects,
            target: document.getElementById(String(this.renderlocation)),
            view: new ol.View({
                center: center,
                zoom: zoom,
                rotation: rotation
            })
        });
        this.m.on('singleclick', function(evt) {
            var coordinates = this.m.getEventCoordinate(evt.originalEvent);
        }, this);
        var shouldUpdate = true;
        var view = this.m.getView();
        var updatePermalink = function() {
            if (!shouldUpdate) {
                // do not update the URL when the view was changed in the 'popstate' handler
                shouldUpdate = true;
                return;
            }

            var center = view.getCenter();
            var hash = '#map=' +
                view.getZoom() + '/' +
                Math.round(center[0] * 100) / 100 + '/' +
                Math.round(center[1] * 100) / 100 + '/' +
                view.getRotation();
            var state = {
                zoom: view.getZoom(),
                center: view.getCenter(),
                rotation: view.getRotation()
            };
            window.history.pushState(state, 'map', hash);
        };
        this.m.on('moveend', updatePermalink);

        // restore the view state when navigating through the history, see
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
        window.addEventListener('popstate', function(event) {
            if (event.state === null) {
                return;
            }
            this.m.getView().setCenter(event.state.center);
            this.m.getView().setZoom(event.state.zoom);
            this.m.getView().setRotation(event.state.rotation);
            shouldUpdate = false;
        });
        /*==========================================*/
        //updatelayer () -- update layer features
        /*==========================================*/
        this.updateLayer = function(element, index, array) {
                //is the element a category or basemap??
                if (element.hasOwnProperty('kind')) {
                    if (debug) console.log(this.mapData[0], element.getSource(), element.getRevision(), this.mapData[0], this.mapData[0].vectorSource(), element.getProperties());
                    if (element.hasOwnProperty('tmid')) {
                        if (this.mapData[element.tmid].visible) {
                            element.setSource(this.mapData[element.tmid].vectorSource());
                        } else {
                            element.setSource(null);
                        }
                    }
                }

            }
            /*==========================================*/
            //moveToPoint() -- pans map to inputted ol.point coords
            /*==========================================*/
        this.moveToPoint = function(location, html) {
            // var  = ol.proj.transform(latlon, 'EPSG:4326', 'EPSG:3857');
            // bounce by zooming out one level and back in
            var bounce = ol.animation.bounce({
                resolution: this.m.getView().getResolution() * 2
            });
            // start the pan at the current center of the map
            var pan = ol.animation.pan({
                source: this.m.getView().getCenter()
            });
            this.m.beforeRender(bounce);
            this.m.beforeRender(pan);
            // when we set the center to the new location, the animated move will
            // trigger the bounce and pan effects
            this.m.getView().setCenter(location);
            /*
            Display marker description box
            */
            var markerPixel = this.m.getPixelFromCoordinate(location)
            var feature = this.m.forEachFeatureAtPixel(markerPixel,
                function(feature, layer) {
                    return feature;
                });
            console.log(feature)
            if (feature) {
                popup.setPosition(location);
                $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': html
                });
                $(element).popover('show');
            } else {
                $(element).popover('destroy');
            }
        };
        /*==========================================*/
        //update() -- redraws map
        /*==========================================*/
        this.update = function() {
            //should a layer or layer object be displayed???
            this.mapObjects.forEach(this.updateLayer, this);
            this.m.render(); //redraw
        };
        /*
        toggleCategories()
        Hides invisible layers
        */
        this.toggleCategories = function() {
            //update visible or invisible categories
            if ((timemap.hasOwnProperty('visibleCategories')) || (timemap.hasOwnProperty('hiddenCategories'))) {
                for (var i = timemap.visibleCategories.length - 1; i >= 0; i--) {
                    var getValue = timemap.visibleCategories[i];
                    var n = Number(getValue[0]);
                    this.mapData[n].visible = true;
                    console.log(this.mapData[n]);

                };
                for (var i = timemap.hiddenCategories.length - 1; i >= 0; i--) {
                    var getValue = timemap.hiddenCategories[i];
                    var n = Number(getValue[0]);
                    this.mapData[n].visible = false;
                    console.log(this.mapData[n]);
                };
                //reset arrays
                timemap.hiddenCategories = [];
                timemap.visibleCategories = [];
            }
            this.update();
        };
        // display popup on click
        this.m.on('click', function(evt) {
            var feature = this.m.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
                });
            if (feature) {
                popup.setPosition(evt.coordinate);
                $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': feature.get('html')
                });
                $(element).popover('show');
            } else {
                $(element).popover('destroy');
            }
        }, this);

        // change mouse cursor when over marker
        this.m.on('pointermove', function(e) {
            if (e.dragging) {
                $(element).popover('destroy');
                return;
            }
            var pixel = this.m.getEventPixel(e.originalEvent);
            var hit = this.m.hasFeatureAtPixel(pixel);
            this.m.getTarget().style.cursor = hit ? 'pointer' : '';
        }, this);
        this.m.addOverlay(popup);
    }
}