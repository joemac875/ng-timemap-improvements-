function gDriveLoader(key) {
console.log(key);
var string="http://spreadsheets.google.com/feeds/list/ "+key;+"/default/public/values?alt=json";
var jqxhr = $.get( string, function() {
  alert( "success" );
})
  .done(function(data) {
    console.log(data);
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
}
