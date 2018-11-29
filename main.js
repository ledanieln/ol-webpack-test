import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Fill, Stroke, Style, Text} from 'ol/style.js';
import Overlay from 'ol/Overlay';

const txState = [-97.942999, 29.888998];
var txStateWebMercator = fromLonLat(txState);

const buildingLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: './data/buildings.geojson'
      })

});

const baseLayer = new TileLayer({
	source: new OSM()
})

const overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10],
  autoPan: true
});

const map = new Map({
  target: 'map-container',
  layers: [baseLayer, buildingLayer],
  view: new View({
    center: txStateWebMercator,
    zoom: 16
  })
});

overlay.getElement().addEventListener('click', function() {
	overlay.setPosition();
});

map.addOverlay(overlay);

map.on('click', function(e) {
  let markup = '';
  map.forEachFeatureAtPixel(e.pixel, function(feature) {
    markup += `${markup && '<hr>'}<table>`;
    const bldg_name = feature.get('Bldg_Nam_1');
    const status = feature.get('Status');
      //markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
    markup += `<tr><th>Building Name:</th> <td>${bldg_name}</td></tr>`;
    markup += `<tr><th>Status:</th> <td>${status}</td></tr>`;
    markup += '</table>';
  }, {hitTolerance: 1});
  if (markup) {
    document.getElementById('popup-content').innerHTML = markup;
    overlay.setPosition(e.coordinate);
  } else {
    overlay.setPosition();
  }
});