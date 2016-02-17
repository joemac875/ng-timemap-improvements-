
function gDriveLoader(key,onComplete,parent) {
  /*
  The schema object contains the ajax response property names which
  correspond to ng-TimeMap's MapObject class constructor parameters 
  */
  var schema =  {
"itemtype": "gsx$type",
"longitude": "gsx$longitude",
"latitude" :"gsx$latitude",
"html" : "gsx$datasource",
"title" : "gsx$title",
"tags" : "gsx$title",
"category" : "gsx$category",
"endDate" : "gsx$enddate",
"startDate" : "gsx$startdate",
"type" : "gsx$type"

  };

  function toMapObject(gdriveentry) {
  /*
  Converts gDrive row object into valid map object.
  First, loop through each property in the schema and add the corresponding spreadsheet value to the return Object
  */
    var object = {}; // placeholder to keep all values
    for (var property in schema) {
      /*
      Google Sheet JSON data structure
      }
      "gsx$longitude": {
      "$t": "value"
      }
      {
      */
      var entry = gdriveentry[String(schema[property])];
       object[property] = entry['$t']; 
    }
    /*
  Determine object type and construct timemap object
    */
    if ((object.itemtype.trim() === "marker") || (object.itemtype.trim() === "↵marker")) {
     return new MapObject(object["latitude"], object["longitude"], object["title"], object["startDate"].split('/'), object["endDate"].split('/'), 'icon', object["tags"].split(','), object["html"]);
    } else {
      if ((object.itemtype.trim() === "layer") || (object.itemtype.trim() === "↵layer")) {
        return new RemoteLayer(object["html"], RemoteLayer(object["type"]), object["title"], object["startDate"].split('/'),  object["endDate"].split('/'),object["tags"].split(','), guid());
      }
      var output = '';
    for (var property in gdriveentry) {
       output += property + ': ' + gdriveentry[property]['$t']+'; \n';
      }     
    alert('Error: invalid item type on:\n'+output);

    return {};
    }
  }
var string="https://spreadsheets.google.com/feeds/list/"+key+"/default/public/values?alt=json";

var jqxhr = jQuery.get( string, function() {
}).done(function(data) {
    console.log(data)
   if(data.hasOwnProperty('feed')) {
    var returnData = [];  // An array of layers and categories
    var categories = {};  //groups of Markers (MapObjects)
      //valid google drive response json
      if(Array.isArray(data.feed.entry))
        for (var i = data.feed.entry.length - 1; i >= 0; i--) {
          var convertRow = toMapObject(data.feed.entry[i]);
          if(convertRow.constructor.name === "MapObject") {
            /* Construct a category */
            if(typeof categories[convertRow.title] === 'undefined')
              categories[convertRow.title] = new Category([convertRow],String(convertRow.category));
            else if(convertRow.constructor.name === "Category")
              categories[convertRow.title].add(convertRow)
            /* Remote layers are themselves categories */
          } else if (convertRow.constructor.name === "RemoteLayer")
              returnData.push(convertRow);
              /* Add categories to return array */
          for (var category in categories) 
            returnData.push(categories[category]);
        };
        //call the onComplete function and pass the returned Data back 
        onComplete(parent,returnData);
    }
  })
  .fail(function() {
    alert( "Error: Unable to load"+string );
  });

}