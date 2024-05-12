# Kasper's skatemap

[Check out the Berlin map](https://kaspers-skatemap.surge.sh)

<img width="1009" alt="image" src="https://github.com/kholbekj/kaspers-skatemap/assets/2786571/5e79a354-6246-403f-b3cb-29200730edbe">


This is a small static js app that combines data from Stadia Maps, Openstreemap, Openlayers and Overpass to create a simple overlayed map that identifies surfaces that would probably be decent to skate on. It does not constitute legal advice on where roller skating is permissible, safe or appropriate - it's essentially a filter for sidewalks, pedestrian streets, crossings and bike lanes which have decent smoothness. This relies on OSM tagging from users, and shouldn't be regarded as fact.

Development server can be run with

    npm start

To generate a build ready for production:

    npm run build

## GeoJSON
I'm using a different github repo to expose the data currently, there might be more appropriate places to put it. It's a bit too large to be super practical (currently Berlin is over 20mb), which is also why I've only scoped it to Berlin. If you would like to have a different hood feel free to make your own version, or let me know and maybe I have time to add an extra page.

The data is generated (at the time of writing) using the following overpass turbo query:

```
[out:json][timeout:25];
area[name="Berlin"];
(
  way(area)["highway"~"pedestrian|cycleway"]["smoothness"~"excellent|good"]->.smoothies;
  way(around.smoothies:5.0)["highway"="crossing"]["smoothness"~"excellent|good"];
  way(area)["highway"="footway"]["smoothness"="excellent"];
);
out geom;
```

Which is essentially selecting all the pedestrian and bike lanes with good enough smoothness, then every decent crossing that is within 5 meters of those, and finally all the excellent sidewalks/paths. I will probably tweak that over time, suggestions are welcome. 

I left out streets as most of them have great surface, but I don't have a way to filter out the ones you might actually dare skating on.

