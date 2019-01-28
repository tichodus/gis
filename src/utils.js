import L from "leaflet";
import $ from 'jquery';

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

/**
 * 
 * WFS REQUEST
 */
export const feature = (layers) => {
    return new Promise((resolve, reject) => {
        var owsrootUrl = 'http://localhost:8080/geoserver/gis/wfs';

        var defaultParameters = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: layers,
            outputFormat: 'text/javascript',
            format_options: 'callback:getJson',
            SrsName: 'EPSG:4326'
        };

        var parameters = L.Util.extend(defaultParameters);
        var URL = owsrootUrl + L.Util.getParamString(parameters);

        var ajax = $.ajax({
            url: URL,
            dataType: 'jsonp',
            contentType: 'application/json',
            jsonpCallback: 'getJson',
            success: function (response) {
                resolve(response)
            }
        })
    })
}

