const biomaUtils = require('../utils/bioma');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('./bioma/index', {
    title: 'Bioma',
    bioma: 'is-active',
  });
});

router.get('/search', async (req, res) => {
  const { coordinates } = req.query;

  const response = await biomaUtils.getData(coordinates);

  res.send(response);
});

module.exports = router;
