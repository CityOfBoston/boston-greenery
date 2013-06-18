var map, texture, textureData, texturewidth, buildLayer;
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
  var terrainLayer = new L.TileLayer(terrain, {maxZoom: 18, attribution: terrainAttrib});
  map.addLayer(terrainLayer);
  map.setView(new L.LatLng(42.3548, -71.0660), 17);
  
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
  $.getJSON('bostoncommon.geojson', loadBuildings);
  $.getJSON('bigboston.geojson', loadBuildings);
});

function loadBuildings(polys){
  
  var textureimg = new Image();
  textureimg.onload = function(){
    texture = document.createElement('canvas');
    texture.width = textureimg.width;
    texturewidth = textureimg.width;
    texture.height = textureimg.height;
    texture.getContext('2d').drawImage(textureimg, 0, 0, textureimg.width, textureimg.height);
    textureData = texture.getContext('2d').getImageData(0, 0, texture.width, texture.height);
    
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