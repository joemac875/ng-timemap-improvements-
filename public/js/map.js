/* Begin Test Code */
var WoosterPoints = new Category([], 'Random Points');
var myPoint = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot", [1, 1, 1992], [03, 02, 2011], "place", ['location'], "aaaaa");
var myPoint2 = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot2", [01, 01, 1940], [03, 11, 1963], "place2", [], "aa3aa");
var rome = new MapObject(12.5,41.9, "Rome", [01, 01, 1910], [03, 11, 1943], "place2", ['location','place'], "aa3aa");
var london = new MapObject(-0.12755,51.5072229, "Jolly Good Olde England", [01, 01, 1877], [03, 11, 1983], "place2", ['place'], "aa3aa");
WoosterPoints.add(london);
WoosterPoints.add(rome);
WoosterPoints.add(myPoint2);
WoosterPoints.add(myPoint);
  var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857'
          }
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, -2e6], [8e6, 2e6]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, 2e6], [8e6, -2e6]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'MultiLineString',
              'coordinates': [
                [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                [[1e6, -7.5e5], [1e6, 7.5e5]],
                [[-7.5e5, -1e6], [7.5e5, -1e6]],
                [[-7.5e5, 1e6], [7.5e5, 1e6]]
              ]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6], [-3e6, 6e6]]],
                [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6], [0, 6e6]]],
                [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6], [3e6, 6e6]]]
              ]
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'GeometryCollection',
              'geometries': [
                {
                  'type': 'LineString',
                  'coordinates': [[-5e6, -5e6], [0, -5e6]]
                },
                {
                  'type': 'Point',
                  'coordinates': [4e6, -5e6]
                },
                {
                  'type': 'Polygon',
                  'coordinates': [[[1e6, -6e6], [2e6, -4e6], [3e6, -6e6]]]
                }
              ]
            }
          }
        ]
      };

var objectLayer = new geoJSONCategory(geojsonObject, 'test', [05, 03, 1962], [11, 11, 1974],['a tag'], 'abcdjf');
var testmap = [];
testmap.push(WoosterPoints);
testmap.push(objectLayer);

/* End Test Code*/

var debug = true;

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;


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
 */
app.FilterButton = function(opt_options) {

    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = '<i data-toggle="tooltip" title="Filters" data-placement="right" class="fa fa-filter"></i>';

    var this_ = this;
    /*
    Opens Modal
    */
    var openFilter = function(e) {
        $('#filterModal').modal('toggle');
    };

    button.addEventListener('click', openFilter, false);
    button.addEventListener('touchstart', openFilter, false);

    var element = document.createElement('div');
    element.className = 'filterButton ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(app.FilterButton, ol.control.Control);

/*
    Class EditButton
    defines an ol3 button which triggers the edit modal
     */
/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.EditButton = function(opt_options) {

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
    element.appendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(app.EditButton, ol.control.Control);

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
            app.visibleCategories = [];
            app.hiddenCategories = [];
            htmlToReturn += '</select>';
            location.innerHTML += htmlToReturn;
            var handlers = {
                afterSelect: function(values) {
                    //set as invsibile
               
                        app.hiddenCategories.push(values);
                },
                afterDeselect: function(values) {
                    //set category as visible again
    
                        app.visibleCategories.push(values);
                }


            }
            var selectName = String(renderlocation) + '_filters';
            $('select').multiSelect(handlers);
            /* Now add tag filter UI */
            var taglocation = document.getElementById("mapObjects");
            htmlToReturn = '';
            htmlToReturn +='<div data-placement="bottom" data-toggle="tooltip" title="Filter by tag"  class="tmtagCtrl" style="z-index:999; position: absolute; top: 10px; right: 10px; padding: 5px; background-color: rgba(255,255,255,0.5);"><select id="'+ renderlocation + '_filters_tag">';
            var tags = [];
            for (var i = this.mapData.length - 1; i >= 0; i--) {
                 var categoryTags = this.mapData[i].getTags() || [];
                 for (var z = categoryTags.length - 1; z >= 0; z--) {
                    if ( $.inArray(categoryTags[z],tags) < 0 )  {
                        tags.push(categoryTags[z]);
                        htmlToReturn += '<option value="'+categoryTags[z]+'">'+categoryTags[z]+'</option>';
                    }
                 };
             };
             htmlToReturn += '</select>'; 
             taglocation.innerHTML += htmlToReturn;
             //add event listener for tag change
             console.log('#'+renderlocation +'_filters_tag ' + ' option:selected')
             $( '#'+renderlocation +'_filters_tag ' + ' option:selected' ).change(function() {
                app.visibleTag = $( this ).text();
                console.log(app.visibleTag);
            });
        }
        /*==========================================*/
        //initalize map
        /*==========================================*/
    // default zoom, center and rotation
      var zoom = 2;
      var center = [0, 0];
      var rotation = 0;
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
                new app.FilterButton(),
                new app.EditButton()
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
        this.moveToPoint = function(location) {
            console.log(location);
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
        };
            /*==========================================*/
            //update() -- redraws map
            /*==========================================*/
        this.update = function() {
            this.mapObjects.forEach(this.updateLayer, this);
            this.m.render(); //redraw
        };
        /*
        toggleCategories()
        Hides invisible layers
        */
        this.toggleCategories = function() {
            //update visible or invisible categories
            if ((app.hasOwnProperty('visibleCategories')) || (app.hasOwnProperty('hiddenCategories'))) {
                for (var i = app.visibleCategories.length - 1; i >= 0; i--) {
                    var getValue = app.visibleCategories[i];
                    var n = Number(getValue[0]);
                    this.mapData[n].visible = true;
                };
                for (var i = app.hiddenCategories.length - 1; i >= 0; i--) {
                    var getValue = app.hiddenCategories[i];
                    var n = Number(getValue[0]);
                    this.mapData[n].visible = false;
                };
            }
            //reset arrays
            app.hiddenCategories = [];
            app.visibleCategories = [];
            //apply updates
            this.update();

        }
        /* onMouseMove over map event handler */
        this.m.on('pointermove', function(evt) {
            this.toggleCategories();
        }, this);
    };


}
var map = new Map(testmap, 'map');
map.initalize();