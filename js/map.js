
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.light'
}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>US States Data</h4>' + (props ?
    'zhvi estimation<br />$' + props.zhvi + '<br />' +
    'zhvi created Date: ' + props.date
    : 'Hover over a state');
};

info.addTo(map);



function getColorZhvi(d) {
  return d > 400000 ? '#17282F' :
    d > 350000 ? '#2E4953' :
      d > 300000 ? '#4D6E7A' :
        d > 250000 ? '#6C919F' :
          d > 200000 ? '#8CADB9' :
            d > 150000 ? '#AFC7D0' :
              d > 100000 ? '#DAE9EF' :
                '#ccddff';
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColorZhvi(feature.properties.zhvi)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Zillow Housing data &copy; <a href="https://www.zillow.com/research/data/">Zillow</a>');


var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    gradesZhvi = [100000, 150000, 200000, 250000, 300000, 350000, 400000],
    labels = [],
    from, to;

  // for Zhvi
  for (var i = 0; i < gradesZhvi.length; i++) {
    from = gradesZhvi[i];
    to = gradesZhvi[i + 1];

    labels.push(
      '<i style="background:' + getColorZhvi(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  labels.push('<i><b>zhvi</b></i>');


  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);