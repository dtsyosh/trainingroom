const express = require('express');
const router = express.Router();

const climaRouter = require('./climaRoutes');
const biomaRouter = require('./biomaRoutes');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Diego Yosh',
    home: 'is-active',
  });
});

router.use('/clima', climaRouter);
router.use('/bioma', biomaRouter);

module.exports = router;
