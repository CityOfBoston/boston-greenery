# Boston Greenery

## Overview

Boston Greenery has two branches:

* tilemill, a map style for TileMill / MapBox which emphasizes green space, footpaths, and bike paths in the city.

<img src="https://raw.github.com/mapmeld/boston-greenery/tilemill/boston-greenery.png"/>

* gh-pages, a static HTML/CSS/JavaScript site which loads the custom tiles from MapBox and adds 3D buildings

<img src="https://raw.github.com/mapmeld/boston-greenery/gh-pages/boston-buildings.png"/>


## MSS and TileMill

MSS is a map-styling language based on CSS, LESS, and Mapnik. For example, this style draws lines which are roads, but not tunnels:

    #boston-line [ highway != "" ][ tunnel != "yes" ] {
      line-color: #e0ffe0;
      line-width: 1;
    }

<a href="http://www.mapbox.com/tilemill/">TileMill</a> is a free and open-source map editor from MapBox. Import data sources as map layers, and connect
them to the same MSS styles, to make your own map! You can then save your map from TileMill as an image, PDF file, or MBTiles, which can be uploaded to MapBox.

## Data Sources for TileMill

### Buildings and Parks - boston-buildings, boston-parks

Download <strong>osm2pgsql shapefiles</strong> for your city from <a href="http://metro.teczno.com/">http://metro.teczno.com/</a>

If your city is not available on that site, find the OSM2PGSQL tool or file a pull request on the <a href="https://github.com/migurski/Extractotron/commits/master/cities.txt">Extractotron repo</a>

Use the included <strong>boston.osm-polygon.shp</strong> for both layers. You are loading the file twice so that you can place buildings above all other layers - including roads and water - while parks should be beneath roads and water.

### Roads - boston-line

Download <strong>osm2pgsql shapefiles</strong> for your city from <a href="http://metro.teczno.com/">http://metro.teczno.com/</a>

If your city is not available on that site, find the OSM2PGSQL tool or file a pull request on the <a href="https://github.com/migurski/Extractotron/commits/master/cities.txt">Extractotron repo</a>

Use the included <strong>boston.osm-line.shp</strong> for its roads.

### Rivers, Lakes, and Ponds - massachusettswater

Download <strong>massachusetts.shapefiles.zip</strong> for your region (state level in the US, regional or national worldwide) from <a href="http://downloads.cloudmade.com/">http://downloads.cloudmade.com/</a>

<strong>massachusetts_water</strong> contains both inland water and islands' coastlines.

### Land Area - boston

Download the <strong>coastline shapefile</strong> for your city from <a href="http://metro.teczno.com/">http://metro.teczno.com/</a>

If your city is not available on that site, find the OSM2PGSQL tool or file a pull request on the <a href="https://github.com/migurski/Extractotron/commits/master/cities.txt">Extractotron repo</a>

This separate download should include one file, <strong>boston.coastline.shp</strong>.

### Additional Islands - bostonoffshore

Islands in a park in the Charles River (pictured below) need to appear, but Boston Common needs to have its
pond. Downloaded island outlines from OpenStreetMap in XML format, saved as .OSM, and used
<a href="http://geoconverter.hsr.ch/">http://geoconverter.hsr.ch/</a> and hand-editing to convert to KML polygons.

BostonOffshore.kml is included in this repo.

<img src="https://raw.github.com/mapmeld/boston-greenery/tilemill/boston-offshore.png"/>


## 3D Buildings

### Mapping with Leaflet

<a href="http://leafletjs.com">Leaflet.js</a> is an open-source JavaScript library for interactive online maps.

To make a map using Boston's custom MapBox tiles:

    var greenTiles = 'http://{s}.tiles.mapbox.com/v3/mapmeld.boston-greenery/{z}/{x}/{y}.png';
    var greenAttrib = 'Map data &copy;2013 OpenStreetMap contributors, Tiles by City of Boston';
    var greenLayer = new L.TileLayer(greenTiles, {maxZoom: 18, attribution: greenAttrib});

    var map = new L.Map('map');
    map.addLayer(greenLayer);
    map.setView(new L.LatLng(42.3548, -71.0660), 17);

### Going 3D with OSM Buildings

<a href="http://osmbuildings.org/">OSM Buildings</a> is an open-source JavaScript library for rendering 3D buildings on HTML5 Canvas. It does not use WebGL, Silverlight, or other 3D plugins.

This project modifies OSM Buildings to support textures and to render buildings immediately, instead of raising them out of the ground.

To render 3D buildings from a GeoJSON file, first make sure each point has a z coordinate, then:

    new L.BuildingsLayer().geoJSON( geojsoncontent ).addTo(map);

### Data Source

The City of Boston has a shapefile of buildings which includes elevation and height information. This public data was used to create bigboston.geojson, which is available in the gh-pages branch of this repo.