const express = require('express')
const router = express.Router();



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


module.exports = router