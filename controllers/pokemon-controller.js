const pokedex = require('../routes/pokedex.json');

const pokemonGetIdInfo = (req, res) => {
    const { id, info } = req.params;
    const idAsNumber = parseInt(id, 10);

    if (!isNaN(idAsNumber)) {
        const foundPokemon = pokedex.find((singlePokemon) => {
            return singlePokemon.id === idAsNumber;
        });

        res.send(foundPokemon[info]);
    } else {
        res.status(500).send('Error, wrong id type');
    }
};

const pokemonGetId = (req, res) => {
    const { id } = req.params;
    const idAsNumber = parseInt(id, 10);

    if (!isNaN(idAsNumber)) {
        const foundPokemon = pokedex.find((singlePokemon) => {
            return singlePokemon.id === idAsNumber;
        });

        res.send(foundPokemon);
    } else {
        res.status(500).send('Error, wrong id type');
    }
}

const pokemonGet = function (req, res) {
    res.send(pokedex);
}

module.exports = {
    pokemonGetIdInfo,
    pokemonGetId,
    pokemonGet
};