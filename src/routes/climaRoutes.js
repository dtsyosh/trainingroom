const climaUtils = require('../utils/clima');

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('./clima/index', {
    title: "Clima",
    clima: "is-active"
  })
})

router.get('/search', async (req, res) => {
  const { lat, lon, city } = req.query;
  let response = {}
  if (city)
    response = await climaUtils.getTemperature(...Array(2), city)
  else
    response = await climaUtils.getTemperature(lat, lon)

  res.send(response)
})

module.exports = router;