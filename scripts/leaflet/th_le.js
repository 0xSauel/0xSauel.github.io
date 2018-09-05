var mapSW =[0, 8192],
	mapNE =[8192, 0];

//initialize map object
var map = L.map('map').setView([0,0], 4);

//Reference tiles
L.tileLayer('map/{z}/{x}/{y}.png', {
	minZoom: 3,
	maxZoom: 5,
	continuousWorld: false,
	noWrap: true,
	crs: L.CRS.Simple,
	edgeBufferTiles: 2,
}).addTo(map)

map.setMaxBounds(new L.LatLngBounds(
	map.unproject(mapSW, map.getMaxZoom()),
	map.unproject(mapNE, map.getMaxZoom())
	));


//Icons

var Myicon = L.icon({
	iconUrl: '/images/Der_Mahlstrom.png',
	iconSize: [79, 100],
	iconAnchor: [37, 90],
	popupAnchor: [0, -80],
	// shadowUrl: '/images/shadow.png',
	// shadowSize: [x, y],
	// shadowAnchor: [x, y],
})


//Markers (flags)
var referenceflag = L.marker([0, 0], {
	draggable: true,
}).addTo(map);
referenceflag.bindPopup('<b>REFERENCE</b>').openPopup();
//текущая гео
referenceflag.on('dragend', function(e) {
	referenceflag.getPopup().setContent(referenceflag.getLatLng().toString() + "<br />" + 'Pixels ' + map.project(referenceflag.getLatLng(), map.getMaxZoom().toString())).openOn(map);
});

//Flags
var marker1 = L.marker(map.unproject([1500, 1500]), map.getMaxZoom())
.bindPopup('tew')

var marker2 = L.marker([41, -37.25], {icon: Myicon})
.bindPopup('<b>Text</b><br>Lorem ipsum dolor sit amet')

var marker3 = L.marker(map.unproject([1500, 1600]), map.getMaxZoom())
.bindPopup('tew')

var marker4 = L.marker(map.unproject([500, 1500]), map.getMaxZoom())
.bindPopup('tew3')

var marker5 = L.marker([38, -100])
.bindPopup('tew2')

var marker6 = L.marker(map.unproject([700, 1500]), map.getMaxZoom())
.bindPopup('tew1')

//Layer Groups

var lg_1 = L.layerGroup([marker1, marker2, marker3]);
var lg_2 = L.layerGroup([marker4, marker5, marker6]);

var overlays = {
	"Group 1" : lg_1,
	"Group 2" : lg_2,
}

//Layer control
L.control.layers(null, overlays, {
	collapsed: false
}).addTo(map);