const axios = require('axios');

module.exports = {
  async getTemperature(latitude = null, longitude = null, city = null) {
    try {

      let url = '';

      if (city) {
        // Remove all accentuation
        const parsedCity = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        url = `https://api.openweathermap.org/data/2.5/weather?q=${parsedCity}&appid=5e1c01ecb9b61acc1e75d513bfd9aef8&lang=pt_br&units=metric`;
      } else
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5e1c01ecb9b61acc1e75d513bfd9aef8&lang=pt_br&units=metric`;


      const result = await axios.get(url);
      return result.data
    } catch (e) {
      console.log(e)
    }
  }
}