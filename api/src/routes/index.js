const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const gameRoute = require('../routes/routeV');
const genresRoute = require('../routes/routeG');
const postRoute = require('../routes/routePost')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gameRoute);
router.use('/genres', genresRoute);
router.use('/videogame', postRoute);

module.exports = router;
