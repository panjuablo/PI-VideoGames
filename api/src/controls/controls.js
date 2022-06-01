const axios = require('axios');
const { Videogame, Genres, Platform } = require('../db');
const {Op} = require('sequelize');
const {apiKey} = process.env;
//const e = require('express');


const getApi = async () => {
    try{
        let api = `https://api.rawg.io/api/games?key=${apiKey}`;
        let api_1 = (await axios.get(api)).data;
        let pag_1 = await api_1.results;
        let api_2 = (await axios.get(api_1.next)).data;
        let pag_2 = await api_2.results;
        let api_3 = (await axios.get(api_2.next)).data;
        let pag_3 = await api_3.results;
        let api_4 = (await axios.get(api_3.next)).data;
        let pag_4 = await api_4.results;
        let api_5 = (await axios.get(api_4.next)).data;
        let pag_5 = await api_5.results;

        let pagTotal = [...pag_1, ...pag_2, ...pag_3, ...pag_4, ...pag_5];

        let infoApi = await pagTotal.map((e) => {
            return {
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                platforms: e.parent_platforms.map((e) => e.platform?.name ? e.platform.name : e),
                image: e.background_image,
                genres: e.genres.map((e) => e.name),
            }
        });

        
        let infoDb = await Videogame.findAll({
            include: {
                model: Genres,
                attributes:['name'],
                throwh: {attributes: []},
            },
            attributes: ['id','name','description','released','rating','platforms','image','createdInDb']
        });
        
        const allInfo = await infoDb? [...infoApi, ...infoDb] : [...infoApi];
    
        return allInfo;

    } catch (error) {
        console.log(error);
    };
};

const getName = async (name) => {
    try {
    const nameApi = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=15`)).data.results;
    const nameDb = await Videogame.findAll({
        includes: Genres,
        where: {
            name: {[Op.iLike] : `%${name}%`}
        },
        attributes: ['id','name','description','released','rating','platforms','image','createdInDb']
    });

    const nameAll = nameDb ? [...nameDb, ...nameApi] : [...nameApi];

    const nameMap = nameAll.map((e) => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            platforms: e.parent_platforms.map((e) => e.platform?.name ? e.platform.name : e),
            image: e.background_image,
            genres: e.genres.map((e) => e.name)
        };
    });
    
    return nameMap;
    
    } catch (error) {
        console.log(error);
    };
};

const getId = async (id) => {
    if (
        id.match(
            /^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i //regular expression para validar UUID V4
        )
    ){ try {
        let idDb = await Videogame.findAll({
            where: {id},
            include: [
                {model: Genres,
                attributes:['name'],
                throgh: {attributes: []}},
            ],
            attributes: ['id','name','description','released','rating','platforms','image','createdInDb']
        });
        return idDb [0];
    } catch (error) {           
        console.log(error);
    };
    } else {
         try {
            const idApi = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)).data;
            
            const idMod = {
                id: idApi.id,
                name: idApi.name,
                released: idApi.released,
                rating: idApi.rating,
                platforms: idApi.parent_platforms.map((e) => e.platform.name),
                image: idApi.background_image,
                genres: idApi.genres.map((e) => e.name),
                description: idApi.description_raw,
            };
    
            return idMod;
            
        } catch (error) {
            console.log(error);
        };  
    };
};

const postGame = async (req, res, next) => {
    try {
        const {id, name, released, rating, platforms, image, genres, description} = req.body;
        const createdInDb = true;
        const modGame = {id, name, released, rating, platforms, image, description};
        const newGame = await Videogame.create(modGame)

        for (let i of genres){
            const matchGen = await Genres.findOne({
                where: {
                    name: i,
                },
            });
            newGame.addGenres(matchGen);
            res.status(200).send(newGame.id);
        }
    } catch (error) {
        next(error);
    };
};

module.exports = { getApi, getName, getId, postGame}; 