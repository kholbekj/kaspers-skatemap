import './style.css';
import {Map, View} from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import {Raster as RasterSource, StadiaMaps} from 'ol/source.js';
import ImageLayer from 'ol/layer/Image';

const center = fromLonLat([13.4078820811102, 52.53529449970289]);
console.log(center)

const stadia = new StadiaMaps({
  layer: 'stamen_watercolor',
});

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://raw.githubusercontent.com/kholbekj/skatemap-assets/main/export.geojson",
    format: new GeoJSON()
  }),
  style: {
    'stroke-color': '#ea129e',
    'stroke-width': 3
  }
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: stadia
    }),
    vectorLayer,
    new TileLayer({
      source: new StadiaMaps({
        layer: 'stamen_terrain_labels'
      })
    }),
  ],
  view: new View({
    center: center, //[52.52, 13.405],
    zoom: 16
  })
});
