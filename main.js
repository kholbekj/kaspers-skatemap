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

const cheapMode = true;

const center = fromLonLat([13.402842787646158, 52.47313153940888]);

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

const layers = cheapMode ? [
  new TileLayer({
    source: new OSM()
  }),
  vectorLayer
] : [
  new TileLayer({
    source: stadia
  }),
  vectorLayer,
  new TileLayer({
    source: new StadiaMaps({
      layer: 'stamen_terrain_labels'
    })
  }),
];

const map = new Map({
  target: 'map',
  layers: layers,
  view: new View({
    center: center,
    zoom: 15,
  })
});
