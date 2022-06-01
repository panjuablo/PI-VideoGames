const express = require('express');
const route = express.Router();
const { getApi, getName, getId } = require('../controls/controls')


route.get('/', async (req,res,next) => {
    const name = req.query.name;
    
    try {
        if(name){
            let allInfo = await getName(name);
            allInfo ? res.status(200).send(allInfo) : res.status(404).send('This game does not exist.');
        } else {
            const apiExe = await getApi();
            res.status(200).send(apiExe)
        }
    } catch (error) {
        next(error)
    }
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let allId = await getId(id);
        allId? res.status(200).send(allId) : res.status(404).send("Id no found.");
        console.log(allId);
    } catch (error) {
        res.status(404).send(error)
    }
});


module.exports = route;