(function(a){function k(h,c){var r=h[0]-c[0],e=h[1]-c[1];return r*r+e*e}function Ca(h){for(var c=0,r=0,e=0,a=h.length-3;e<a;e+=2)c+=h[e],r+=h[e+1];h=2*(h.length-2);return[c/h<<0,r/h<<0]}function Da(h){var c=h.length/2,r=new Z(c),e=0,a=c-1,m,f,j,B,k=[],G=[],H=[];for(r[e]=r[a]=1;a;){f=0;for(m=e+1;m<a;m++){j=h[2*m];var q=h[2*m+1],z=h[2*e],A=h[2*e+1],F=h[2*a],D=h[2*a+1],s=F-z,C=D-A,x=void 0;if(0!==s||0!==C)x=((j-z)*s+(q-A)*C)/(s*s+C*C),1<x?(z=F,A=D):0<x&&(z+=s*x,A+=C*x);s=j-z;C=q-A;j=s*s+C*C;j>f&&(B=
m,f=j)}2<f&&(r[B]=1,k.push(e),G.push(B),k.push(B),G.push(a));e=k.pop();a=G.pop()}for(m=0;m<c;m++)r[m]&&H.push(h[2*m],h[2*m+1]);return H}var Ea=Ea||Array,Z=Z||Array,f=Math,La=f.exp,Ma=f.log,Na=f.sin,Oa=f.cos,wa=f.tan,Pa=f.atan,aa=f.min,xa=f.max,qa=document,j,Fa=function(h){var c,a,e;if(0===h.s)c=a=e=h.l;else{e=0.5>h.l?h.l*(1+h.s):h.l+h.s-h.l*h.s;var f=2*h.l-e;h.h/=360;c=U(f,e,h.h+1/3);a=U(f,e,h.h);e=U(f,e,h.h-1/3)}return new j(255*c<<0,255*a<<0,255*e<<0,h.a)},U=function(h,c,a){0>a&&(a+=1);1<a&&(a-=
1);return a<1/6?h+6*(c-h)*a:0.5>a?c:a<2/3?h+6*(c-h)*(2/3-a):h},f=function(h,a,r,e){this.r=h;this.g=a;this.b=r;this.a=4>arguments.length?1:e},V=f.prototype;V.toString=function(){return"rgba("+[this.r<<0,this.g<<0,this.b<<0,this.a.toFixed(2)].join()+")"};V.adjustLightness=function(a){var c=j.toHSLA(this);c.l*=a;c.l=Math.min(1,Math.max(0,c.l));return Fa(c)};V.adjustAlpha=function(a){return new j(this.r,this.g,this.b,this.a*a)};f.parse=function(a){var c;a+="";if(~a.indexOf("#"))return c=a.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/),
new j(parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16),c[4]?parseInt(c[4],16)/255:1);if(c=a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))return new j(parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10),c[4]?parseFloat(c[5]):1);if(c=a.match(/hsla?\(([\d.]+)\D+([\d.]+)\D+([\d.]+)(\D+([\d.]+))?\)/))return Fa({h:parseInt(c[1],10),s:parseFloat(c[2]),l:parseFloat(c[3]),a:c[4]?parseFloat(c[5]):1})};f.toHSLA=function(a){var c=a.r/255,r=a.g/255,e=a.b/255,f=Math.max(c,r,e),m=Math.min(c,r,e),
j,B=(f+m)/2,k;if(f===m)j=m=0;else{k=f-m;m=0.5<B?k/(2-f-m):k/(f+m);switch(f){case c:j=(r-e)/k+(r<e?6:0);break;case r:j=(e-c)/k+2;break;case e:j=(c-r)/k+4}j/=6}return{h:360*j,s:m,l:B,a:a.a}};j=f;var Ga,f=Math,D=f.sin,I=f.cos,Qa=f.tan,Ha=f.asin,Ia=f.atan2,R=f.PI,q=180/R,Ra=357.5291/q,Sa=0.98560028/q,Ta=1.9148/q,Ua=0.02/q,Va=3E-4/q,Wa=102.9372/q,Ja=23.45/q,Xa=280.16/q,Ya=360.9856235/q;Ga=function(a,c,f){f=-f/q;c/=q;a=a.valueOf()/864E5-0.5+2440588;var e=Ra+Sa*(a-2451545),j=Ta*D(e)+Ua*D(2*e)+Va*D(3*e),
j=e+Wa+j+R,e=Ha(D(j)*D(Ja)),j=Ia(D(j)*I(Ja),I(j));f=Xa+Ya*(a-2451545)-f-j;return{altitude:Ha(D(c)*D(e)+I(c)*I(e)*I(f)),azimuth:Ia(D(f),I(f)*D(c)-Qa(e)*I(c))-R/2}};var ba=Math.PI,Ka=ba/2,Za=ba/4,$a=180/ba,ab=256,ya=14,ca="latitude",da="longitude",bb=3,cb=4,G=0,B=1,H=2,F=3,ra=4,S=5,M=6;a.OSMBuildings=function(h){function c(b,O){var d={};b/=ea;O/=ea;d[ca]=0>=O?90:1<=O?-90:$a*(2*Pa(La(ba*(1-2*O)))-Ka);d[da]=360*(1===b?1:(b%1+1)%1)-180;return d}function f(){if(R&&!(x<ya)){var b=c(s-T,C-pa),O=c(s+z+T,C+
A+pa);sa&&sa.abort();var d={w:b[da],n:b[ca],e:O[da],s:O[ca],z:x},b=R.replace(/\{ *([\w_]+) *\}/g,function(b,a){return d[a]}),g=e,a=new XMLHttpRequest;a.onreadystatechange=function(){4===a.readyState&&a.status&&!(200>a.status||299<a.status)&&a.responseText&&g(JSON.parse(a.responseText))};a.open("GET",b);a.send(null);sa=a}}function e(b){var a,d,g,E,c=[],f=d=0;W=ya;I(x);sa=null;if(b&&b.meta.z===x){E=b.meta;g=b.data;if(y&&p&&y.z===E.z){d=y.x-E.x;f=y.y-E.y;b=0;for(a=p.length;b<a;b++)c[b]=p[b][H][0]+d+
","+(p[b][H][1]+f)}y=E;p=[];b=0;for(a=g.length;b<a;b++)if(E=[],!(g[b][B]>fa)&&(d=Da(g[b][H]),!(8>d.length))){E[H]=d;E[ra]=Ca(d);E[G]=aa(g[b][G],fa);E[B]=g[b][B];d=E[H][0]+","+E[H][1];E[S]=!(c&&~c.indexOf(d));E[F]=[];E[M]=[];d=(f=g[b][bb])?j.parse(ta[f]||f):null;f=(f=g[b][cb])?j.parse(ta[f]||f):null;E[F]=[d,d?d.adjustLightness(0.8):null,f];for(d=0;3>d;d++)E[F][d]&&(E[M][d]=E[F][d].adjustAlpha(J)+"");p.push(E)}U()}}function q(b,a){var d,g,c=[],f,h,e,l,j,n,k,m,p=za-x;f=0;for(h=b.length;f<h;f++)if(j=
b[f],k=j[B]>>p,!(k>fa)){n=j[H];m=new Ea(n.length);e=0;for(l=n.length-1;e<l;e+=2)d=n[e+1],g=aa(1,xa(0,0.5-Ma(wa(Za+Ka*n[e]/180))/ba/2)),d=(d/360+0.5)*ea<<0,g=g*ea<<0,m[e]=d,m[e+1]=g;m=Da(m);if(!(8>m.length)){l=[];l[H]=m;l[ra]=Ca(m);l[G]=aa(j[G]>>p,fa);l[B]=k;l[S]=a;l[F]=j[F];l[M]=[];for(e=0;3>e;e++)l[F][e]&&(l[M][e]=l[F][e].adjustAlpha(J)+"");c.push(l)}}return c}function m(b,a,d){void 0===d&&(d=[]);var g,c,f,e=b[0]?b:b.features,h,l,k,n,p,r,A=a?1:0,v=a?0:1;if(e){b=0;for(g=e.length;b<g;b++)m(e[b],a,
d);return d}"Feature"===b.type&&(g=b.geometry,k=b.properties);"Polygon"===g.type&&(h=[g.coordinates]);"MultiPolygon"===g.type&&(h=g.coordinates);if(h){a=k.height;r=e=null;if(k.color||k.wallColor)b=k.color||k.wallColor,e=j.parse(ta[b]||b);k.roofColor&&(b=k.roofColor,r=j.parse(ta[b]||b));b=0;for(g=h.length;b<g;b++){l=h[b][0];n=[];c=p=0;for(f=l.length;c<f;c++)n.push(l[c][A],l[c][v]),p+=a||l[c][2]||0;if(p){f=c=[];var u=H;for(var t=void 0,w=void 0,y=void 0,z=void 0,x=0,s=void 0,C=void 0,s=0,C=n.length-
3;s<C;s+=2)t=n[s],w=n[s+1],y=n[s+2],z=n[s+3],x+=t*z-y*w;if("CW"!==(0<x/2?"CW":"CCW")){t=[];for(w=n.length-2;0<=w;w-=2)t.push(n[w],n[w+1]);n=t}f[u]=n;c[G]=p/l.length<<0;c[B]=k.minHeight;c[F]=[e,e?e.adjustLightness(0.8):null,r];d.push(c)}}}return d}function D(b,a){b?(ga=m(b,a),W=0,I(x),y={n:90,w:-180,s:-90,e:180,x:0,y:0,z:x},p=q(ga,!0),U()):(ga=null,$())}function I(b){var a,d,g;x=b;ea=ab<<x;b=x;a=W;d=za;b=aa(xa(b,a),d);J=1-aa(xa(0+0.3*((b-a)/(d-a)),0),0.3);Aa=Q.adjustAlpha(J)+"";ha=ua.adjustAlpha(J)+
"";ia=X.adjustAlpha(J)+"";if(p){b=0;for(a=p.length;b<a;b++){g=p[b];g[M]=[];for(d=0;3>d;d++)g[F][d]&&(g[M][d]=g[F][d].adjustAlpha(J)+"")}}}function U(){clearInterval(Ba);N=0;va.render();

Ba=setInterval(function(){
  N=1.1;
  if(1<N){
    clearInterval(Ba);
    N=1;
    for(var b=0,a=p.length;b<a;b++)
      p[b][S]=0
  }
  ja.render();
  $()
},33)
}function na(){ja.render();va.render();$()}function $(){K.clearRect(0,0,z,A);if(y&&p&&!(x<W||ka)){var b,a,d,g,c,f,e,h,l,j=s-y.x,n=C-y.y,m=va.getMaxHeight(),r=[la+j,ma+n],P,v,u,t,w,q;p.sort(function(b,

a){return k(a[ra],r)/a[G]-k(b[ra],r)/b[G]});b=0;for(a=p.length;b<a;b++)if(c=p[b],!(c[G]<=m)){v=!1;f=c[H];P=[];d=0;for(g=f.length-1;d<g;d+=2)P[d]=h=f[d]-j,P[d+1]=l=f[d+1]-n,v||(v=0<h&&h<z&&0<l&&l<A);if(v){d=c[S]?c[G]*N:c[G];f=Y/(Y-d);c[B]&&(d=c[S]?c[B]*N:c[B],e=Y/(Y-d));h=[];d=0;for(g=P.length-3;d<g;d+=2)l=P[d],u=P[d+1],v=P[d+2],t=P[d+3],w=oa(l,u,f),q=oa(v,t,f),c[B]&&(u=oa(l,u,e),t=oa(v,t,e),l=u.x,u=u.y,v=t.x,t=t.y),(v-l)*(w.y-u)>(w.x-l)*(t-u)&&(K.fillStyle=l<v&&u<t||l>v&&u>t?c[M][1]||ha:c[M][0]||
Aa,V([v,t,l,u,w.x,w.y,q.x,q.y])),h[d]=w.x,h[d+1]=w.y;K.fillStyle=c[M][2]||ia;K.strokeStyle=c[M][1]||ha;V(h,!0)}}}}

function ptInPoly(pt, polyCords){
    var pointX = pt[0];
    var pointY = pt[1];
	var i, j, c = 0;
	for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++){
		if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])){
			c = !c;
		}
	}
	return c;
}

function V(b,a){
  if(b.length){
    K.beginPath();
    K.moveTo(b[0],b[1]);
    for(var d=2,c=b.length;d<c;d+=2){
      K.lineTo(b[d],b[d+1]);
    }
    K.closePath();
    a&&K.stroke();
    
    if(!moving){
      var pts = [ ];
      var xmin = b[0];
      var xmax = b[0];
      var ymin = b[1];
      var ymax = b[1];
      for(var pt=0;pt<b.length;pt+=2){
        if(pt){
          xmin = Math.min(xmin, b[pt]);
          xmax = Math.max(xmax, b[pt]);
          ymin = Math.min(ymin, b[pt+1]);
          ymax = Math.max(ymax, b[pt+1]);
        }
        pts.push( [ b[pt], b[pt+1] ] );
      }
    
      var intendedColor = K.fillStyle.replace("rgba(","").replace(")","").split(", ");    
      //console.log(intendedColor);
      var colorOffset = [ intendedColor[0] * 1 - 125, intendedColor[1] * 1 - 125, intendedColor[2] * 1 - 125, intendedColor[3] * 1 ];
      //console.log(colorOffset);
    
	  var texturewidth = texture.width;
	  var textureheight = texture.height;

      for(var x=xmin; x<xmax; x++){
        for(var y=ymin; y<ymax; y++){
	      if(ptInPoly([x,y], pts)){
	        var texturex = (x-xmin) % texture.width;
	        var texturey = (y-ymin) % texture.height;
	        var texturepixel = [
	          Math.max(0, Math.min(255, textureData.data[ texturey * 4 * texturewidth + texturex * 4 ] + colorOffset[0])),
	          Math.max(0, Math.min(255, textureData.data[ texturey * 4 * texturewidth + texturex * 4 + 1] + colorOffset[1])),
	          Math.max(0, Math.min(255, textureData.data[ texturey * 4 * texturewidth + texturex * 4 + 2] + colorOffset[2])),
	          1 - (1 - colorOffset[3]) / 2
	        ];
	        K.fillStyle = "rgba(" + texturepixel.join(",") + ")";
	        K.fillRect(x, y, 1, 1);
	      }
	    }
      }
    }
    else{
      K.fill();
    }
  }
}

function oa(b,a,d){return{x:(b-la)*d+la<<0,y:(a-ma)*d+ma<<0}}var z=0,A=0,T=0,pa=0,s=0,C=0,x,ea,sa,K,R,Q=new j(200,190,180),ua=Q.adjustLightness(0.8),X=Q.adjustLightness(1.2),Aa=Q+"",ha=ua+"",ia=X+"",ga,y,p,N=1,Ba,J=1,W=ya,za=20,fa,la,
ma,Y,ka,ta={brick:"#cc7755",bronze:"#ffeecc",canvas:"#fff8f0",concrete:"#999999",copper:"#a0e0d0",glass:"#e8f8f8",gold:"#ffcc00",grass:"#009933",metal:"#aaaaaa",panel:"#fff8f0",plaster:"#999999",roof_tiles:"#f08060",silver:"#cccccc",slate:"#666666",stone:"#996666",tar_paper:"#333333",wood:"#deb887"},Z={container:null,items:[],init:function(b){var a=this.container=qa.createElement("DIV");a.style.pointerEvents="none";a.style.position="absolute";a.style.left=0;a.style.top=0;ja.init(this.create());va.init(this.create());
K=this.create();b.appendChild(a);return a},create:function(){var b=qa.createElement("CANVAS");b.style.webkitTransform="translate3d(0,0,0)";b.style.imageRendering="optimizeSpeed";b.style.position="absolute";b.style.left=0;b.style.top=0;var a=b.getContext("2d");a.lineCap="round";a.lineJoin="round";a.lineWidth=1;a.mozImageSmoothingEnabled=!1;a.webkitImageSmoothingEnabled=!1;this.items.push(b);this.container.appendChild(b);return a},setSize:function(b,a){for(var d=this.items,c=0,f=d.length;c<f;c++)d[c].width=
b,d[c].height=a}},ja={enabled:!0,context:null,color:new j(0,0,0),colorStr:this.color+"",date:null,alpha:1,length:0,directionX:0,directionY:0,init:function(b){this.context=b;this.setDate((new Date).setHours(10))},setEnabled:function(b){this.enabled=!!b},render:function(){var b=this.context,a,d,g,f;b.clearRect(0,0,z,A);if(this.enabled&&y&&p&&!(x<W||ka))if(a=c(s+T,C+pa),a=Ga(this.date,a.latitude,a.longitude),!(0>=a.altitude)){d=1/wa(a.altitude);g=0.4/d;this.directionX=Oa(a.azimuth)*d;this.directionY=
Na(a.azimuth)*d;this.color.a=g;f=this.color+"";var e,h,j,l,k,n,m=s-y.x,r=C-y.y,q,v,u,t,w,D,F=[];b.beginPath();a=0;for(d=p.length;a<d;a++){h=p[a];v=!1;j=h[H];q=[];g=0;for(e=j.length-1;g<e;g+=2)q[g]=k=j[g]-m,q[g+1]=n=j[g+1]-r,v||(v=0<k&&k<z&&0<n&&n<A);if(v){j=h[S]?h[G]*N:h[G];h[B]&&(l=h[S]?h[B]*N:h[B]);k=null;g=0;for(e=q.length-3;g<e;g+=2)n=q[g],u=q[g+1],v=q[g+2],t=q[g+3],w=this.project(n,u,j),D=this.project(v,t,j),h[B]&&(u=this.project(n,u,l),t=this.project(v,t,l),n=u.x,u=u.y,v=t.x,t=t.y),(v-n)*(w.y-
u)>(w.x-n)*(t-u)?(1===k&&b.lineTo(n,u),k=0,g||b.moveTo(n,u),b.lineTo(v,t)):(0===k&&b.lineTo(w.x,w.y),k=1,g||b.moveTo(w.x,w.y),b.lineTo(D.x,D.y));b.closePath();F.push(q)}}b.fillStyle=f;b.fill();b.globalCompositeOperation="destination-out";b.beginPath();a=0;for(d=F.length;a<d;a++){l=F[a];b.moveTo(l[0],l[1]);g=2;for(e=l.length;g<e;g+=2)b.lineTo(l[g],l[g+1]);b.lineTo(l[0],l[1]);b.closePath()}b.fillStyle="#00ff00";b.fill();b.globalCompositeOperation="source-over"}},project:function(b,a,c){return{x:b+this.directionX*
c,y:a+this.directionY*c}},setDate:function(b){this.date=b;this.render()}},va={context:null,maxHeight:8,init:function(b){this.context=b},render:function(){var b=this.context;b.clearRect(0,0,z,A);if(y&&p&&!(x<W||ka)){var a,c,g,f,e,h,j,l=s-y.x,k=C-y.y,n,m;b.beginPath();a=0;for(c=p.length;a<c;a++){g=p[a];m=!1;e=g[H];n=[];g=0;for(f=e.length-1;g<f;g+=2)n[g]=h=e[g]-l,n[g+1]=j=e[g+1]-k,m||(m=0<h&&h<z&&0<j&&j<A);if(m){g=0;for(f=n.length-3;g<f;g+=2)m=n[g],e=n[g+1],g?b.lineTo(m,e):b.moveTo(m,e);b.closePath()}}b.fillStyle=
ia;b.strokeStyle=ha;b.stroke();b.fill()}},getMaxHeight:function(){return this.maxHeight}};this.setStyle=function(a){a=a||{};if(a.color||a.wallColor)Q=j.parse(a.color||a.wallColor),Aa=Q.adjustAlpha(J)+"",ua=Q.adjustLightness(0.8),ha=ua.adjustAlpha(J)+"",X=Q.adjustLightness(1.2),ia=X.adjustAlpha(J)+"";a.roofColor&&(X=j.parse(a.roofColor),ia=X.adjustAlpha(J)+"");void 0!==a.shadows&&ja.setEnabled(a.shadows);na();return this};this.geoJSON=function(b,c){if("object"===typeof b)D(b,!c);else{var d=qa.documentElement,
e=qa.createElement("script");a.jsonpCallback=function(b){delete a.jsonpCallback;d.removeChild(e);D(b,!c)};d.insertBefore(e,d.lastChild).src=b.replace(/\{callback\}/,"jsonpCallback")}return this};this.setCamOffset=function(a,c){la=T+a;ma=A+c};this.setMaxZoom=function(a){za=a};this.setDate=function(a){ja.setDate(a);return this};this.appendTo=function(a){return Z.init(a)};this.loadData=f;this.onMoveEnd=function(){var a=c(s,C),e=c(s+z,C+A);na();y&&(a[ca]>y.n||a[da]<y.w||e[ca]<y.s||e[da]>y.e)&&f()};this.onZoomEnd=
function(a){ka=!1;I(a.zoom);ga?(p=q(ga),na()):($(),f())};this.onZoomStart=function(){ka=!0;na()};this.setOrigin=function(a,c){s=a;C=c};this.setSize=function(a,c){z=a;A=c;T=z/2<<0;pa=A/2<<0;la=T;ma=A;Y=z/(1.5/(window.devicePixelRatio||1))/wa(45)<<0;Z.setSize(z,A);fa=Y-50};this.setZoom=I;this.render=$;R=h};a.OSMBuildings.VERSION="0.1.8a";a.OSMBuildings.ATTRIBUTION='&copy; <a href="http://osmbuildings.org">OSM Buildings</a>'})(this);
L.BuildingsLayer=L.Class.extend({map:null,osmb:null,container:null,blockMoveEvent:null,lastX:0,lastY:0,initialize:function(a){L.Util.setOptions(this,a)},onMove:function(){var a=L.DomUtil.getPosition(this.map._mapPane);this.osmb.setCamOffset(this.lastX-a.x,this.lastY-a.y);this.osmb.render()},onMoveEnd:function(){if(this.blockMoveEvent)this.blockMoveEvent=!1;else{var a=L.DomUtil.getPosition(this.map._mapPane),k=this.map.getPixelOrigin();this.lastX=a.x;this.lastY=a.y;this.container.style.left=-a.x+"px";
this.container.style.top=-a.y+"px";this.osmb.setCamOffset(0,0);this.osmb.setSize(this.map._size.x,this.map._size.y);this.osmb.setOrigin(k.x-a.x,k.y-a.y);this.osmb.onMoveEnd()}},onZoomStart:function(){this.osmb.onZoomStart()},onZoomEnd:function(){var a=L.DomUtil.getPosition(this.map._mapPane),k=this.map.getPixelOrigin();this.osmb.setOrigin(k.x-a.x,k.y-a.y);this.osmb.onZoomEnd({zoom:this.map._zoom});this.blockMoveEvent=!0},addTo:function(a){a.addLayer(this);return this},onAdd:function(a){this.map=a;
a=this.map._panes.overlayPane;this.osmb?a.appendChild(this.container):(this.osmb=new OSMBuildings(this.options.url),this.container=this.osmb.appendTo(a),this.osmb.maxZoom=this.map._layersMaxZoom);a=L.DomUtil.getPosition(this.map._mapPane);var k=this.map.getPixelOrigin();this.osmb.setSize(this.map._size.x,this.map._size.y);this.osmb.setOrigin(k.x-a.x,k.y-a.y);this.osmb.setZoom(this.map._zoom);this.container.style.left=-a.x+"px";this.container.style.top=-a.y+"px";this.map.on({move:this.onMove,moveend:this.onMoveEnd,
zoomstart:this.onZoomStart,zoomend:this.onZoomEnd},this);this.map.attributionControl.addAttribution(OSMBuildings.ATTRIBUTION);this.osmb.loadData();this.osmb.render()},onRemove:function(a){a.attributionControl.removeAttribution(OSMBuildings.ATTRIBUTION);a.off({move:this.onMove,moveend:this.onMoveEnd,zoomstart:this.onZoomStart,zoomend:this.onZoomEnd},this);this.container.parentNode.removeChild(this.container)},geoJSON:function(a,k){return this.osmb.geoJSON(a,k)},setStyle:function(a){return this.osmb.setStyle(a)},
setDate:function(a){return this.osmb.setDate(a)}});
