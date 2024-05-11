import './style.css';
import {Map, View} from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';

const center = fromLonLat([13.4078820811102, 52.53529449970289]);
console.log(center)

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://kaspers-stakemap-assets.surge.sh/export.geojson",
    format: new GeoJSON()
  }),
  style: {
    'stroke-color': 'purple',
    'stroke-width': 3
  }
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    center: center, //[52.52, 13.405],
    zoom: 16
  })
});
