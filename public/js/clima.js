$(document).ready(function () {
  window.navigator.geolocation.getCurrentPosition(e => {
    const lat = e.coords.latitude;
    const lon = e.coords.longitude;

    getTemperature(lat, lon);
  })
  // 'Enviar' clicked
  $('button').click(function () {
    getTemperature();
  })

});

function getTemperature(lat = null, lon = null) {

  // Get city name
  let city = $('input[name="city"]').val();

  // Append in API's url
  let url = `/clima/search?city=${city}`;

  if (lat && lon) {
    url = `/clima/search?lat=${lat}&lon=${lon}`;
  }

  Swal.fire({
    title: 'Carregando',
    text: 'Buscando cidade...'
  })
  Swal.showLoading()
  // Make de AJAX call and get the data
  $.get(url, function (response) {
    // Put the data on screen
    $('input[name="city_result"]').val(response.name);
    $('input[name="temperature_result"]').val(response.main.temp + '°C');
    $('input[name="feelslike_result"]').val(response.main.feels_like + '°C');
    $('input[name="humidity_result"]').val((response.main.humidity) + '%');
    $('input[name="description_result"]').val(response.weather[0].description);
    Swal.close();
  })
    .fail(function () {
      Swal.fire(
        'Erro!',
        'Cidade não encontrada.',
        'error'
      )

      $('input[name="city_result"]').val('');
      $('input[name="temperature_result"]').val('');
      $('input[name="feelslike_result"]').val('');
      $('input[name="humidity_result"]').val('');
      $('input[name="description_result"]').val('');
    })

  // Clear the city input
  $('input[name="city"]').val('');
}