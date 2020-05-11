const express = require('express')
const router = express.Router();

const climaRouter = require('./climaRoutes')



router.get('/', (req, res) => {
  res.render('index', {
    title: "Diego Yosh",
    home: "is-active"
  });
})

router.use('/clima', climaRouter);





module.exports = router