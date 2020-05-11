$body = $("body");

$(document).on({
  ajaxStart: function () { $body.addClass("loading"); },
  ajaxStop: function () { $body.removeClass("loading"); }
});

$(document).ready(function () {

  // 'Enviar' clicked
  $('button').click(function () {
    getTemperature();
  })

});

function getTemperature() {
  const region = {
    'Amazonas': 'AM',
    'Roraima': 'RR',
    'Amapa': 'AP',
    'Para': 'PA',
    'Tocantins': 'TO',
    'Rondonia': 'RO',
    'Acre': 'AC',
    'Maranhao': 'MA',
    'Piaui': 'PI',
    'Ceara': 'CE',
    'Rio Grande do Norte': 'RN',
    'Pernambuco': 'PE',
    'Paraiba': 'PB',
    'Sergipe': 'SE',
    'Alagoas': 'AL',
    'Bahia': 'BA',
    'Mato Grosso': 'MT',
    'Mato Grosso do Sul': 'MS',
    'Goias': 'GO',
    'Sao Paulo': 'SP',
    'Rio de Janeiro': 'RJ',
    'Espírito Santo': 'ES',
    'Minas Gerais': 'MG',
    'Parana': 'PR',
    'Rio Grande do Sul': 'RS',
    'Santa Catarina': 'SC'
  }
  // Get city name
  let city = $('input[name="city"]').val();

  // Append in API's url
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e1c01ecb9b61acc1e75d513bfd9aef8&lang=pt_br&units=metric`;

  // Make de AJAX call and get the data
  $.get(url, function (response) {
    console.log(response)
    // Put the data on screen
    $('input[name="city_result"]').val(response.name);
    $('input[name="temperature_result"]').val(response.main.temp + '°C');
    $('input[name="feelslike_result"]').val(response.main.feels_like + '°C');
    $('input[name="humidity_result"]').val((response.main.humidity) + '%');
    $('input[name="description_result"]').val(response.weather[0].description);
  });

  // Clear the city input
  $('input[name="city"]').val('');
}