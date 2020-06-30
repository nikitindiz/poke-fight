const express = require('express');
const pokemonController = require('../controllers/pokemon-controller');

const router = express.Router();

router.get('/:id/:info', pokemonController.pokemonGetIdInfo);
router.get('/:id', pokemonController.pokemonGetId);
router.get('/', pokemonController.pokemonGet);

module.exports = router;
