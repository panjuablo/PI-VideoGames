const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Videogames, Gender, Platform } = require('../db');

const getDetails = async(id) => {
    try {
        const apiInfo = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${ YOUR_API_KEY }`)).data;
        const apiData = {
            id: apiInfo.id,
            name: apiInfo.name,
            released: apiInfo.released,
            rating: apiInfo.rating,
            genres: apiInfo.genres.map((e) => e.name),
            platforms: apiInfo.parent_platforms.map((e) => e.platform.name),
            image: apiInfo.background_image,
            description: apiInfo.description_raw
        };
        return apiData;
    } catch (error) {
        console.log(error);
    }
};