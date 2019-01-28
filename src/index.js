import L from "leaflet"
import { create } from './utils'
import { feature } from './utils'

var map = L.map('map').setView(new L.LatLng(44.241, 20.912), 9);


var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const createLayer = create(map)("http://localhost:8080/geoserver/gis/wms")
const getFeature = feature(map)("http://localhost:8080/geoserver/gis/wms")

let activeLayer = createLayer("gis:gis_osm_places_a_free_1").addTo(map)

document.getElementsByName('map').forEach(element => element.onclick = (event) => {
  map.removeLayer(activeLayer)
  activeLayer = createLayer(event.target.value).addTo(map)
})


map.addEventListener("click", (event) => console.log(activeLayer))