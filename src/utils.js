import L from "leaflet";
import $ from "jquery"


const url = 'http://localhost:8080/geoserver/gis/wms';
export const create = (map) => (url) => (layers) => {
    return L.tileLayer.wms(url, {
        layers,
        format: "image/gif  ",
        transparent: true,
        version: "1.1.0",
        detectRetina: true,
        crs: L.CRS.EPSG4326
    })
}

export const feature = (map) => (url) => (layers) => {
    return new Promise((resolve, reject) => {
        const owsrootUrl = url || 'http://localhost:8080/geoserver/gis/ows';

        const defaultParameters = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'gis:gis_osm_places_a_free_1',
            outputFormat: 'text/javascript',
            format_options: 'callback:getJson',
            SrsName: 'EPSG:4326'
        };

        const parameters = L.Util.extend(defaultParameters);
        const URL = owsrootUrl + L.Util.getParamString(parameters);

        $.ajax({
            url: URL,
            dataType: 'jsonp',
            contentType: 'application/json',
            jsonpCallback: 'getJson',
            success: function (response) {
                resolve(response)
                console.log(response);
                // L.geoJson(response, {
                //   onEachFeature: function (feature, url) {
                //     popupOptions = { maxWidth: 250 };
                //     url.bindPopup(
                //       "<br><b>name: </b>" + feature.properties.name +
                //       "<br><b>osm_id: </b>" + feature.properties.osm_id +
                //       "<br><b>address:</b> " + feature.properties.address +
                //       "<br><b>barrier: </b>" + feature.properties.barrier +
                //       "<br><b>highway: </b>" + feature.properties.highway +
                //       "<br><b>other_tags: </b>" + feature.properties.other_tags +
                //       "<br><b>place: </b>" + feature.properties.place
                //       , popupOptions);
                //   }, pointToLayer: function (feature, latlng) {
                //     return getMarker(feature, latlng);
                //   }
                // }).addTo(markerPoints);
            }
        })
    })
}

