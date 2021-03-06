const axios = require('axios');
const parseDMS = require('parse-dms');
const proj4 = require('proj4');

const initials = {
  Acre: 'AC',
  Alagoas: 'AL',
  Amapá: 'AP',
  Amazonas: 'AM',
  Bahia: 'BA',
  Ceará: 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  Goiás: 'GO',
  Maranhão: 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  Paraná: 'PR',
  Paraíba: 'PB',
  Pará: 'PA',
  Pernambuco: 'PE',
  Piauí: 'PI',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  'Rio de Janeiro': 'RJ',
  Rondônia: 'RO',
  Roraima: 'RR',
  'Santa Catarina': 'SC',
  Sergipe: 'SE',
  'São Paulo': 'SP',
  Tocantins: 'TO',
};

function fixDMS(coordinates) {
  let fixedDMS = coordinates.replace('S', 'S ');
  fixedDMS = fixedDMS.replace(' °', '°');
  fixedDMS = fixedDMS.replace(' °', '°');
  // fixedDMS = fixedDMS.replace('°', '° ');
  // fixedDMS = fixedDMS.replace('º', 'º ');
  fixedDMS = fixedDMS.replace(' º', '°');
  fixedDMS = fixedDMS.replace(' º', '°');
  fixedDMS = fixedDMS.replace(" '", "'");
  fixedDMS = fixedDMS.replace(" '", "'");
  fixedDMS = fixedDMS.replace(/\`/g, "'");
  console.log(coordinates, fixedDMS);

  return fixedDMS;
}

function getType(coordinates) {
  if (coordinates.includes('S')) return 'dms';
  if (coordinates.includes('-')) return 'latlon';
  return 'utm';
}

function toLatLon(coordinates, type) {
  let lat = 0;
  let lon = 0;

  switch (type) {
    case 'dms':
      const result = parseDMS(fixDMS(coordinates));
      lat = result.lat;
      lon = result.lon;
      break;

    case 'utm':
      const coordinatesFormatted = coordinates
        .split(' ')
        .map((n) => parseInt(n));

      const utm = '+proj=utm +zone=23 +south';
      const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84  +no_defs';
      [lon, lat] = proj4(utm, wgs84, coordinatesFormatted);
      break;

    default:
      [lon, lat] = coordinates.replace(',', ' ').trim().split(' ');
      break;
  }

  return { lat, lon };
}

module.exports = {
  async getData(coordinates) {
    try {
      const { lat, lon } = toLatLon(coordinates, getType(coordinates));
      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=eb12c387025af0&lat=${lat}&lon=${lon}&format=json`
      );
      let { town, village, city, state } = data.address;

      return {
        city: city || village || town,
        state: initials[state],
        lat,
        lon,
        data,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
