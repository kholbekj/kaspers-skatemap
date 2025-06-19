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

const urlParams = new URLSearchParams(window.location.search);
const cheapMode = !urlParams.has('fancy') || urlParams.get('fancy') !== 'true';

const center = fromLonLat([13.402842787646158, 52.47313153940888]);

const stadia = new StadiaMaps({
  layer: 'stamen_watercolor',
});

const goodVectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://raw.githubusercontent.com/kholbekj/skatemap-assets/main/good.geojson",
    format: new GeoJSON()
  }),
  style: {
    'stroke-color': '#0c7d8a',
    'stroke-width': 2.1
  }
});

const excellentVectorLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://raw.githubusercontent.com/kholbekj/skatemap-assets/main/excellent.geojson",
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
  goodVectorLayer,
  excellentVectorLayer
] : [
  new TileLayer({
    source: stadia
  }),
  goodVectorLayer,
  excellentVectorLayer,
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
