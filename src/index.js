import L from "leaflet"
import { create } from './utils'
import { feature } from './utils'
  ;


var map = L.map('map').setView(new L.LatLng(44.241, 20.912), 9);


var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var baseLayers = {
  "Open Street Map": OpenStreetMap,
};

const createLayer = create(map)("http://localhost:8080/geoserver/gis/wms")

let activeLayer = createLayer("gis:gis_osm_places_a_free_1").addTo(map);
var markerPoints = L.layerGroup();

feature(activeLayer.options.layers).then(response => {
  L.geoJson(response, {
    onEachFeature: function (feature, url) {
      var popupOptions = { maxWidth: 250 };
      url.bindPopup(
        "<br><b>name: </b>" + feature.properties.name +
        "<br><b>osm_id: </b>" + feature.properties.osm_id
        , popupOptions);
    }, pointToLayer: function (feature, latlng) {
      return getMarker(feature, latlng);
    }
  }).addTo(markerPoints);

  markerPoints.addTo(map);
})



document.getElementsByName('map').forEach(element => element.onclick = (event) => {
  map.removeLayer(activeLayer)
  activeLayer = createLayer(event.target.value).addTo(map)
  map.removeLayer(markerPoints)
  markerPoints = L.layerGroup();
  feature(activeLayer.options.layers).then(response => {
    L.geoJson(response, {
      onEachFeature: function (feature, url) {
        var popupOptions = { maxWidth: 250 };
        url.bindPopup(
          "<br><b>name: </b>" + feature.properties.name +
          "<br><b>osm_id: </b>" + feature.properties.osm_id
          , popupOptions);
      }, pointToLayer: function (feature, latlng) {
        return getMarker(feature, latlng);
      }
    }).addTo(markerPoints);

    markerPoints.addTo(map);
  })
})


  // var legend = L.control({ position: 'bottomleft' });
  // legend.onAdd = function (map) {
  //   var div = L.DomUtil.create('div', 'legend');
  //   var labels = ["Roads", "River", "Buildings", "Cafe", "Fast food", "Restaurant", "Gas station", "Bank", "School", "Historic", "Power tower", "Bus station", "Hotel", "Other"];
  //   var colors = ["#00F", "#00e7ef", "#858585", "#f3a6b2", "#c9151b", "#8d5a99", "#0dc900", "#ecf710", "#e8718d", "#becf50", "#987db7", "#729b6f", "#e77148", "#ff7800"];
  //   div.innerHTML = '<div><b>Legend</b></div>';
  //   div.style.backgroundColor = '#FFF';
  //   div.style.padding = '12px';
  //   for (let i = 0; i < labels.length; i++) {
  //     div.innerHTML += '<i style="background:' + colors[i] + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
  //       + '<i>' + labels[i] + '<i><br/>';
  //   }
  //   return div;
  // };
  // legend.addTo(map);




