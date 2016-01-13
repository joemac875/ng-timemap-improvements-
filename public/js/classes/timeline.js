/*
Vis Timeline Class
parameters:
  -renderobject -- id of div to render map at
  -objects -- category object or array of category objects
  -map -- ol3 map object to pair Timeline instance with
methods:
eventlisteners:
select-  timeline element click or tapped
rangechanged-  timeline is moved by user 
*/
function Timeline(renderpoint,objects,map,debug) {
  /*
    corresponding map to timeline
  */
  this.map = map || {};
    if ((typeof(renderpoint) === 'undefined') || typeof(objects) === 'undefined') {
        alert('Error: Invalid timeline parameters');
    };
  if (debug) console.log(renderpoint,objects);
 // DOM element where the Timeline will be attached
  var container = document.getElementById(String(renderpoint));
  //load data points
  var data = [];
  if(objects.constructor === Array) {
    for (var i = objects.length - 1; i >= 0; i--) {
      var tmobjects = objects[i].getTimelineObject(); 
      for (var p = tmobjects.length - 1; p >= 0; p--) {
        data.push(tmobjects[p]);
      };
    };
    } else {
      //only a single category of data exists
        data = objects.getTimelineObject();
      //check to ensure we got the proper data
        if (data.constructor !== Array)
          alert('Error: Invalid DataSet');
    }
  /*
     Begin declaration of class variables
  */
  // Create the vis DataSet 
  this.items = new vis.DataSet(data); 
  // Configuration for the Timeline
  this.options = {};
  this.showCurrentTime = false; // do not display bar at the current date
  //get first and last dates to set max and min with
  var counter = 0;
  function findStart(z) {
    console.log(data[z]);
  if (data[z].hasOwnProperty("start")) {
     return data[z].start--;
   } else {
    if(z < data.length) {
      z++;
      findStart(z);
    } else {
      alert('Error: no valid timeline points');
      return new Date();
    }
  }
}
  this.options.min = findStart(0);
  /*
      End declaration of class variables
  */
  //set visjs timeline maximum and minimum
  for (var i = data.length - 1; i >= 0; i--) {
    if ( typeof(data[i].start) !== 'undefined' ) {
        if ( data[i].start < this.options.min ) 
               this.options.min = data[i].start;
    }
  }
  this.options.maxHeight = "500px";
   /* Construct timeline */
   this.tm = new vis.Timeline(container, this.items, this.options);
   /* Add parent object to child for event listeners */
   this.tm.parent = this;
   /*  Listen for timeline range changes */
    this.tm.on('rangechanged', function (properties) {
       /* set window title */
      if(debug) console.log(this.parent.map.mapData);
      window.document.title = String(properties.start) + " to "+ String(properties.end);
      /* update visible objects on map */
      for (var i = this.parent.map.mapData.length - 1; i >= 0; i--) {
        if ( typeof(this.parent.map.mapData[i]) === 'undefined' ) { 
            alert('Error: Invalid Map Object!');
        } else {
            for ( var k = this.parent.map.mapData[i].elements.length - 1; k >= 0; k-- ) {
                var dates = this.parent.map.mapData[i].elements[k].getDates();
                if ((dates.start >= properties.start && dates.start <= properties.end) ||
       (properties.start >= dates.start && properties.start <= dates.end))
                        this.parent.map.mapData[i].elements[k].visible = true;
                    else
                        this.parent.map.mapData[i].elements[k].visible = false;
            };
            if(debug) console.log(this.parent);
          };
            this.parent.map.update();
      }
    })
    /*  Listen for clicks on timeline elements */
   this.tm.on('select', function (properties) {
    //get selected object
    var selectedItem = this.parent.items.get(properties.items[0]);
    if (debug) console.log(selectedItem);
    //jump to selected object on map if object is valid marker
    if (!(typeof selectedItem.latlon === "string" )) {
      this.parent.map.moveToPoint(selectedItem.latlon,selectedItem.html);
      //display html field on marker
    }
    });
    
};

