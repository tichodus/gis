import L from "leaflet"
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
    var defaultParameters = {
        service: 'WFS',
        version: '1.1.1',
        request: 'getFeature',
        typeName: layers,
        maxFeatures: 3000,
        outputFormat: 'application/json'
    };

    var customParams = {
        bbox: map.getBounds().toBBoxString(),
    };
    var parameters = L.Util.extend(defaultParameters, customParams);
    console.log(geoJsonUrl + L.Util.getParamString(parameters));

    $.ajax({
        url: url + L.Util.getParamString(parameters),
        datatype: 'json',
        jsonCallback: 'getJson',
        success: loadGeoJson
    });
}
