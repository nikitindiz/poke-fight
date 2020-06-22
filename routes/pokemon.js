var express = require('express');
const pokedex = require('./pokedex.json');

var router = express.Router();

/* GET pokemon list */
router.get('/:id/:info', function(req, res, next) {
  const { id, info } = req.params;
  const idAsNumber = parseInt(id, 10);

  const foundPokemon = pokedex.find((singlePokemon) => {
    return singlePokemon.id === idAsNumber;
  });

  res.send(foundPokemon[info]);
});

router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  const idAsNumber = parseInt(id, 10);

  const foundPokemon = pokedex.find((singlePokemon) => {
    return singlePokemon.id === idAsNumber;
  });

  res.send(foundPokemon);
});

router.get('/', function(req, res, next) {
  res.send(pokedex);
});

module.exports = router;
