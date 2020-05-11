const express = require('express')
const router = express.Router();

const climaRouter = require('./routes/climaRoutes')



router.get('/', (req, res) => {
  res.render('index', {
    title: "Diego Yosh",
    home: "is-active"
  });
})

router.use('/clima', climaRouter);





module.exports = router