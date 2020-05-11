const express = require('express')
const router = express.Router();



router.get('/', (req, res) => {
  res.render('index', { title: "Diego Yosh" });
})


router.get('/clima', (req, res) => {
  res.render('./clima/index', {
    title: "Clima",
  })
})


module.exports = router