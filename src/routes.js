const express = require('express')
const router = express.Router();

const climaUtils = require('./utils/clima')



router.get('/', (req, res) => {
  res.render('index', {
    title: "Diego Yosh",
    home: "is-active"
  });
})


router.get('/clima', (req, res) => {
  res.render('./clima/index', {
    title: "Clima",
    clima: "is-active"
  })
})

router.get('/clima/search', async (req, res) => {
  const { lat, lon, city } = req.query;
  let response = {}
  if (city)
    response = await climaUtils.getTemperature(...Array(2), city)
  else
    response = await climaUtils.getTemperature(lat, lon)

  res.send(response)
})



module.exports = router