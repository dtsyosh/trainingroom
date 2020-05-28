const axios = require('axios');
const parseDMS = require('parse-dms');

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

module.exports = {
  async getData(coordinates) {
    try {
      const { lat, lon } = parseDMS(coordinates);

      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=eb12c387025af0&lat=${lat}&lon=${lon}&format=json`
      );
      let { town, village, city, state } = data.address;

      console.log(data);
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
