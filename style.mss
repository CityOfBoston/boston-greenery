/* ocean, rivers, coastline */
Map {
  background-color: #b8dee6;
  background-image: url('water.jpg');
}
#massachusettswater {
  line-color:#b8dee6;
  line-width:0.5;
  polygon-opacity:1;
  polygon-fill:#b8dee6;
  polygon-pattern-file: url('water.jpg');
}


/* land */
#boston {
  line-color:#b8dee6;
  line-width:0.5;
  polygon-opacity:1;
  polygon-fill:#dfdcaf;
}

/* buildings */
#bostoncommon, #boston-poly[ building != "" ] {
  line-color:#594;
  line-width:0.5;
  polygon-opacity:1;
  polygon-fill:#cfaf6f;
  //building-height: 0.00015;
  polygon-pattern-file: url('steel2.png');
}


#boston-poly [ leisure = "park" ], #boston-poly [ leisure = "recreation_ground" ] {
  line-color:#594;
  line-width:0.5;
  polygon-opacity:1;
  polygon-fill:#b8dee6;
  polygon-pattern-file: url('treeblot.png');
  polygon-pattern-opacity: 0.75;
}

#boston-line [ highway != "" ][ tunnel != "yes" ][ highway != "path" ][ highway != "footway" ][ highway != "cycleway" ] {
  line-color: #e0ffe0;
  line-width: 1;
}
/* make paths their own style */
#boston-line [ highway = "path" ], #boston-line [ highway = "footway" ], #boston-line [ highway = "cycleway" ] {
  line-color: #9ea070;
  line-width: 1.5;
}