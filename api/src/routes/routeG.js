const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Genres} = require('../db');
const {apiKey} = process.env;

route.get('/', async (req, res) => {
    try{
        const genresApi = (await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)).data.results;

        genresApi.map(async (e) => await Genres.findOrCreate({
            where: {
                id: e.id,
                name: e.name,
            },
        }));

        const genresDb = await Genres.findAll();
        res.status(200).send(genresDb);

    } catch (error) {
        console.log(error);
    };
});

module.exports = route;