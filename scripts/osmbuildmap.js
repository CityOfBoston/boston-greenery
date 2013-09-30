var map, texture, textureData, texturefill, texturefillb, texturefill2, texturefill2b, texturefill3, texturefill3b, buildLayer;
var moving = false;
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
$(document).ready(function(){
  // make a Leaflet map
  map = new L.Map('map');
  map.attributionControl.setPrefix('');
  var terrain = 'http://{s}.tiles.mapbox.com/v3/mapmeld.boston-greenery/{z}/{x}/{y}.png';
  var terrainAttrib = 'Map data &copy;2013 OpenStreetMap contributors, Tiles by City of Boston';
  var terrainLayer = L.tileLayer(terrain, {maxZoom: 18, attribution: terrainAttrib, maxNativeZoom: 15, maxZoom: 17 });
  map.addLayer(terrainLayer);
  map.setView(new L.LatLng(42.350399, -71.066906), 16);
  
  // avoid texturing during map moves
  map.on('movestart', function(e){
    moving = true;
  });
  map.on('zoomend', function(e){
    moving = false;
    buildLayer.setStyle({ "wallColor": "rgba(125,125,125,0.95)", "roofColor": null });
  });
  map.on('moveend', function(e){
    moving = false;
  });

  // load building GeoJSONs
  //$.getJSON('bostoncommon.geojson', loadBuildings);
  $.getJSON('bigboston.geojson', loadBuildings);
});

function blend(img, color) {
    // written by @OSMBuildings
    var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    var xoffset = Math.round(Math.random() * img.width);
    var yoffset = Math.round(Math.random() * img.height);
    //console.log(xoffset);
    //console.log(yoffset);
    context.drawImage(img, -1 * xoffset, -1 * yoffset, img.width, img.height);
    context.drawImage(img, -1 * xoffset, img.height - yoffset, img.width, img.height);
    context.drawImage(img, img.width - xoffset, -1 * yoffset, img.width, img.height);
    context.drawImage(img, img.width - xoffset, img.height - yoffset, img.width, img.height);

	context.fillStyle = color;
    context.fillRect(0, 0, img.width, img.height);
	return context.createPattern(canvas, 'repeat');
}

function loadBuildings(polys){
  
  var textureimg = new Image();
  textureimg.onload = function(){
    texture = document.createElement('canvas');
    texture.width = textureimg.width;
    texture.height = textureimg.height;
    
    var ctx = texture.getContext('2d');
    ctx.drawImage(textureimg, 0, 0, textureimg.width, textureimg.height);
    textureData = texture.getContext('2d').getImageData(0, 0, texture.width, texture.height);
    /*
    texturefill = blend( textureimg, 'rgba(200, 200, 200, 0.3)');
    texturefillb = blend( textureimg, 'rgba(200, 200, 200, 0.3)');
    texturefill2 = blend( textureimg, 'rgba(150, 150, 250, 0.3)');
    texturefill2b = blend( textureimg, 'rgba(150, 150, 250, 0.3)');
    texturefill3 = blend( textureimg, 'rgba(255, 250, 150, 0.3)');
    texturefill3b = blend( textureimg, 'rgba(255, 250, 150, 0.3)');
    */
    
    for(var f=0;f<polys.features.length;f++){
      var avg = [0, 0];
      for(var c=0;c<polys.features[f].geometry.coordinates[0].length;c++){
        avg[0] += polys.features[f].geometry.coordinates[0][c][0];
        avg[1] += polys.features[f].geometry.coordinates[0][c][1];
        if(polys.features[f].properties && polys.features[f].properties.h){
          polys.features[f].geometry.coordinates[0][c].push( polys.features[f].properties.h * 1.5 );
        }
        else{
          polys.features[f].geometry.coordinates[0][c].push( 100 ); // fixed height
        }
      }
      polys.features[f].properties = { "wallColor": "rgba(125,125,125,0.95)" };

    }
    if(polys.features.length){
      buildLayer = new L.BuildingsLayer().addTo(map).geoJSON(polys);
    }

  };
  //textureimg.src = "../images/treeblot.png";
  textureimg.src = "images/steel2.png";
  
  plotPoints();
}

function plotPoints(){
  // community gardens directly from Socrata API
  $.getJSON("http://data.cityofboston.gov/resource/cr3i-jj7v.json", function(gardens){
    for(var i=0;i<gardens.length;i++){
      if(gardens[i].location == "Address"){
        // first row = column names: skip
        continue;
      }
      var latlng;
      if(typeof gardens[i].coordinates != "undefined"){
        latlng = gardens[i].coordinates.split(",");
      }
      else if(typeof gardens[i].map_location != "undefined"){
        latlng = gardens[i].map_location.latitude + "," + gardens[i].map_location.longitude;
      }
      else{
        // not sure how to map this point
        console.log(gardens[i]);
        continue;
      }
      new L.Marker( new L.LatLng( latlng[0] * 1.0, latlng[1] * 1.0 ) )
        .bindPopup( describeGarden( gardens[i] ) )
        .addTo(map);
    }
  });
}

function describeGarden(garden){
  var text = '<h3>' + ( garden.site || garden.location || garden.area ) + '</h3>';
  if( typeof garden.location != "undefined" || typeof garden.area != "undefined" ){
    text += '<p>A community garden'
    if( typeof garden.location != "undefined" ){
      text += ' at ' + garden.location;
    }
    if( typeof garden.area != "undefined" ){
      text += ' in ' + garden.area.replace("Back Bay", "the Back Bay");
    }
    text += '</p>';
  }
  return text;
}

function replaceAll(src, oldr, newr){
  while(src.indexOf(oldr) > -1){
    src = src.replace(oldr, newr);
  }
  return src;
}
function zoomByAbout(e) {
  var x = .5*$('#map').width(),
  y = .5*$('#map').height(),
  mouse_point = e.containerPoint,
  new_center_point = new L.Point((x + mouse_point.x) / 2, (y + mouse_point.y) / 2),
  new_center_location = map.containerPointToLatLng(new_center_point);
  map.setView(new_center_location, map.getZoom() + 1); 
}