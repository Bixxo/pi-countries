const { Router } = require('express');
const { getCountries } = require('../controllers/countries');
const { getCountryById } = require('../controllers/countriesId')
const { createActivity } = require('../controllers/createActivity')
const { getActivities } = require('../controllers/getActivities')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById)
router.post('/activities', createActivity)
router.get('/activities', getActivities)


module.exports = router;
