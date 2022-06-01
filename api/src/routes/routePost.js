const express = require('express');
const route = express.Router();
const { postGame } = require('../controls/controls');

route.post('/', postGame);

module.exports = route;