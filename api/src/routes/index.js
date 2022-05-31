const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const gameRoute = require('../routes/routeV')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gameRoute);
//router.use('/')

module.exports = router;
