const {Router} = require('express');
const {getAllDogs,getDogsByName,getDogsById} = require("../controllers/getDogs");
const router = Router();

router.get('/', async (req,res) => {
    let {name} = req.query;
    if (name) return await getDogsByName(name,res);
    else return await getAllDogs(res);
});

router.get('/:idRaza', async (req,res) => {
    const {idRaza} = req.params;
    return await getDogsById(idRaza,res);
});

module.exports = router;