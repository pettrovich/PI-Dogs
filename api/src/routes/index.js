const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogsMiddleware = require ('./getDogs');
const postDogMiddleware = require ('./postDog');
const temperamentMiddleware = require ('./getTemperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", getDogsMiddleware);
router.use("/temperament", temperamentMiddleware);
router.use("/dog", postDogMiddleware);

router.get('/', (req, res) => {
    res.send('Henry Dogs');
  });

module.exports = router;