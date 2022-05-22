const axios = require('axios');
const { Videogames, Gender, Platform } = require('../db');
const { YOUR_API_KEY } = process.env;
const api = `https://api.rawg.io/api/games?key=${ YOUR_API_KEY }`;

const getApi = async () => {
    let apiPag1 = [],
        apiPag2 = [],
        apiPag3 = [],
        apiPag4 = [],
        apiPag5 = [],
        apiPag6 = [];
  
    Promise.all([
        (apiPag1 = await axios.get(api)),
        (apiPag2 = await axios.get(`${api}&page=2`)),
        (apiPag3 = await axios.get(`${api}&page=3`)),
        (apiPag4 = await axios.get(`${api}&page=4`)),
        (apiPag5 = await axios.get(`${api}&page=5`)),
        (apiPag6 = await axios.get(`${api}&page=6`)),
    ]);
  
    let apiRes = [
        ...apiPag1.data.results,
        ...apiPag2.data.results,
        ...apiPag3.data.results,
        ...apiPag4.data.results,
        ...apiPag5.data.results,
        ...apiPag6.data.results,
    ];

    const apiFull = apiRes.map( e => {
        return {
            name: e.name,
            id: e.id,
            released: e.released,
            rating: e.rating,
            platforms: e.parent_platforms.map((e) => e.platform.name),
            image: e.background_image ? e.background_image : e.image,
        }
    });

    const getDetails = async(id) => {

    }
}


module.exports = {}