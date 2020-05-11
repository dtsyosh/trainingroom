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
  let url = `https://api.weatherstack.com/current?access_key=668ac68398767c928ef7d65985b6b2cd&query=${city}`;

  // Make de AJAX call and get the data
  $.get(url, function (response) {
    console.log(response)
    // Put the data on screen
    $('input[name="city_result"]').val(`${response.location.name} - ${region[response.location.region]}`);
    $('input[name="temperature_result"]').val(response.current.temperature + '°C');
    $('input[name="feelslike_result"]').val(response.current.feelslike + '°C');
    $('input[name="precip_result"]').val((response.current.precip * 100).toFixed(2) + '%');
  });

  // Clear the city input
  $('input[name="city"]').val('');
}