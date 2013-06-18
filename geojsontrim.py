# geojsontrim.py
# cut each coordinate [x, y, z] to [x, y] with <= 6 decimal places

import json

gj = open('bigboston2.geojson', 'r')
fixed = open('bigboston.geojson', 'w')

coord = gj.readline()

while(coord):
  if(coord.find('coordinates') > -1):
    coord = coord[0:len(coord)-2]
    jline = json.loads( coord )
    for r in range(0, len(jline["geometry"]["coordinates"])):
      for c in range(0, len(jline["geometry"]["coordinates"][r])):
        #print jline["geometry"]["coordinates"][r][c]
      
        lng = jline["geometry"]["coordinates"][r][c][0]
        lng = round( lng, 6 )

        lat = jline["geometry"]["coordinates"][r][c][1]
        lat = round( lat, 6 )
      
        jline["geometry"]["coordinates"][r][c] = [ lng, lat ]
    
    fixed.write( json.dumps( jline ) )
      
    
  else:
    fixed.write( coord )

  coord = gj.readline()