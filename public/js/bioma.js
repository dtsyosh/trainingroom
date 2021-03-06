$(document).ready(function () {
  $('button').click(function () {
    const coordinates = $('input[name="coordinates"]').val();

    getData(coordinates);
  });
});

function getData(coordinates) {
  // Append in API's url
  let url = `/bioma/search?coordinates=${coordinates}`;

  Swal.fire({
    title: 'Carregando',
    text: 'Buscando dados...',
  });
  Swal.showLoading();
  // Make de AJAX call and get the data
  $.get(url, function (response) {
    // Put the data on screen
    $('input[name="city_result"]').val(response.city);
    $('input[name="state_result"]').val(response.state);
    // $('input[name="biome_result"]').val(response.biome);

    $('#map').empty();
    const { lat, lon, data } = response;
    drawMap(lat, lon);
    fillConversionField(lat, lon);

    Swal.close();
  }).fail(function () {
    Swal.fire('Erro!', 'Coordenadas não encontradas.', 'error');

    $('input[name="city_result"]').val();
    $('input[name="state_result"]').val();
    // $('input[name="biome_result"]').val();
  });

  // Clear the city input
  $('input[name="coordinates"]').val('');
}

function drawMap(lat, lon) {
  require([
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/Home',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
  ], function (Map, MapView, Home, FeatureLayer, GraphicsLayer, Graphic) {
    var map = new Map({ basemap: 'topo' });
    var view = new MapView({
      container: 'map',
      map: map,
      center: [lon, lat],
      zoom: 6,
    });
    var homeBtn = new Home({
      view: view,
    });
    view.ui.add(homeBtn, 'top-left');
    var layer = null,
      layerUrl =
        'https://mapasinterativos.ibge.gov.br/arcgis/rest/services/BIOMA/MapServer',
      layer = new FeatureLayer(layerUrl);

    var graphicsLayer = new GraphicsLayer();
    var point = {
      type: 'point',
      latitude: lat,
      longitude: lon,
    };

    var simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [226, 119, 40], // orange
      outline: {
        color: [255, 255, 255], // white
        width: 0.5,
      },
    };

    var pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
    });
    map.addMany([layer, graphicsLayer]);

    graphicsLayer.add(pointGraphic);
  });
}

function ConvertDEGToDMS(deg, lat) {
  var absolute = Math.abs(deg);

  var degrees = Math.floor(absolute);
  var minutesNotTruncated = (absolute - degrees) * 60;
  var minutes = Math.floor(minutesNotTruncated);
  var seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

  if (lat) {
    var direction = deg >= 0 ? 'N' : 'S';
  } else {
    var direction = deg >= 0 ? 'E' : 'W';
  }

  return degrees + '°' + minutes + "'" + direction;
}

function fillConversionField(x, y) {
  const input = $('#toDmsConversion');

  input.val(`${ConvertDEGToDMS(x, true)} ${ConvertDEGToDMS(y, false)}`);
}
