var WoosterPoints = new Category([],'Random Points');
var myPoint = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot", [1, 1, 1992], [03, 02, 2011], "place", [], "aaaaa");
var myPoint2 = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot2", [01, 01, 1940], [03, 11, 1963], "place2", [], "aa3aa");
WoosterPoints.add(myPoint2);
WoosterPoints.add(myPoint);
/*
/* */

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
        button.innerHTML = '<i data-toggle="tooltip" title="Filters" class="fa fa-filter"></i>';

        var this_  = this;
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
        button.innerHTML = '<i data-toggle="tooltip" title="Edit" class="fa fa-pencil"></i>';

        var this_  = this;
        /*
        Opens Modal
        */
        var openEditModal = function(e) {
          $('#filterModal').modal('toggle');
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
    /*
    drawFilter -- generates html for filter
    */
    this.drawFilter = function() {
        //inject select zone
        var location = document.getElementById("filters");
        var htmlToReturn = "";
        htmlToReturn += "<select id='"+renderlocation+'_filters'+"' multiple='multiple' >";
        for (var i = this.mapData.length - 1; i >= 0; i--) {
             htmlToReturn += "<option value='"+i+"'>"+this.mapData[i].title+"</option>";

        };
        window.visibleCategories = [];
        window.hiddenCategories = [];
        htmlToReturn+="</select>";
        location.innerHTML += htmlToReturn;
        var handlers = { 
          afterSelect: function(values){
//set as invsibile
    window.hiddenCategories.push(values);
  },
  afterDeselect: function(values){
//set category as visible again
    window.visibleCategories.push(values);
  }


        }
        var selectName = String(renderlocation) + '_filters';
        $('select').multiSelect(handlers); 
    }
   /*==========================================*/
    //initalize map
    /*==========================================*/
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
            center: [0, 0],
            zoom: 2,
            rotation: 0
        })
    });
    this.m.on('singleclick', function(evt) {
        var coordinates = this.m.getEventCoordinate(evt.originalEvent);
    },this);
    
      /*==========================================*/
    //updatelayer () -- update layer features
    /*==========================================*/
    this.updateLayer = function(element, index, array) {
       //is the element a category or basemap??
       if(element.hasOwnProperty('kind')) {
       if(debug) console.log(this.mapData[0],element.getSource(),element.getRevision(),this.mapData[0],this.mapData[0].vectorSource(),element.getProperties());
        if(element.hasOwnProperty('tmid')) {
        if(this.mapData[element.tmid].visible) {
                element.setSource(this.mapData[element.tmid].vectorSource());
          } else {
                element.setSource(null);
          }
        }
    }
         
    }
    /*==========================================*/
    //update() -- redraws map
    /*==========================================*/
    this.update = function() {
        this.mapObjects.forEach(this.updateLayer,this);
        this.m.render(); //redraw
    };
    this.toggleCategories = function() {
            //update visible or invisible categories
    if( (window.hasOwnProperty('visibleCategories')) || (window.hasOwnProperty('hiddenCategories'))) {
       for (var i = window.visibleCategories.length - 1; i >= 0; i--) {
        var getValue = window.visibleCategories[i];
        var n = Number(getValue[0]);
            this.mapData[n].visible = true;
       };
   for (var i = window.hiddenCategories.length - 1; i >= 0; i--) {
        var getValue = window.hiddenCategories[i];
            var n = Number(getValue[0]);
            this.mapData[n].visible = false;
       };
    }
    //reset arrays
    window.hiddenCategories = [];
    window.visibleCategories = [];
    //apply updates
    this.update();
   
    }
    this.m.on('pointermove', function(evt) {
    this.toggleCategories();
     },this);
  };


}
var map = new Map(WoosterPoints, 'map');
map.initalize();